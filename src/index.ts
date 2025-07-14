#!/usr/bin/env node

import dotenv from "dotenv";
dotenv.config();

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { MailchimpService } from "./services/mailchimp.js";
import { getToolDefinitions, handleToolCall } from "./tools/index.js";

// Initialize Mailchimp with API key from environment variable
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
if (!MAILCHIMP_API_KEY) {
  throw new Error("MAILCHIMP_API_KEY environment variable is required");
}

// Initialize the Mailchimp service
const mailchimpService = new MailchimpService(MAILCHIMP_API_KEY);

const server = new Server(
  {
    name: "mailchimp-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Handler that lists available tools.
 * Exposes all Mailchimp Automations API capabilities as tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: getToolDefinitions(mailchimpService),
  };
});

/**
 * Handler for tool calls.
 * Routes each tool call to the appropriate Mailchimp service method.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    return await handleToolCall(
      mailchimpService,
      request.params.name,
      request.params.arguments
    );
  } catch (error: any) {
    console.error("Mailchimp Error:", error);

    // Handle Mailchimp API errors
    if (error.message && error.message.includes("Mailchimp API Error:")) {
      throw new McpError(ErrorCode.InternalError, error.message);
    }

    // Handle other errors
    if (error instanceof Error) {
      throw new McpError(ErrorCode.InternalError, error.message);
    }

    throw new McpError(ErrorCode.InternalError, "An unexpected error occurred");
  }
});

/**
 * Start the server using stdio transport.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Mailchimp MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
