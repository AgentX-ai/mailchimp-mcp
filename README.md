# Mailchimp MCP Server

[![npm version](https://img.shields.io/npm/v/@agentx-ai/mailchimp-mcp-server)](https://www.npmjs.com/package/@agentx-ai/mailchimp-mcp-server)

[![Watch the Notion Tutorial video](https://img.shields.io/badge/Watch_on-YouTube-red?logo=youtube&style=for-the-badge)](https://youtu.be/YcUrRAnFp8Q)
[![Website](https://img.shields.io/badge/Website-🌐-purple)](https://www.agentx.so/mcp/mailchimp)

A Model Context Protocol (MCP) server that provides read-only access to Mailchimp's Marketing API for comprehensive email marketing data retrieval.

## Usage

The server can be used with any MCP client. Configure your client to use:

```json
{
  "mcpServers": {
    "mailchimp": {
      "command": "npx",
      "args": ["@agentx-ai/mailchimp-mcp-server"],
      "env": {
        "MAILCHIMP_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Features

This MCP server supports the following Mailchimp Marketing API endpoints (read-only operations):

### Automation Management

**Note about automations:** These endpoints are for classic automations, not automation flows. Unfortunately those are not available in the [Mailchimp API](https://mailchimp.com/developer/marketing/api/customer-journeys-journeys-steps-actions/) as of yet.

- **List Automations** - Get all automations in your account
- **Get Automation** - Retrieve details of a specific automation

### Automation Email Management

- **List Automation Emails** - Get all emails in an automation
- **Get Automation Email** - Retrieve details of a specific email

### Subscriber Management

- **List Automation Subscribers** - View subscribers in automation queue
- **Get Automation Queue** - Get the automation email queue

### List Management

- **List Lists** - Get all lists in your account
- **Get List** - Retrieve details of a specific list

### Campaign Management

- **List Campaigns** - Get all campaigns in your account
- **Get Campaign** - Retrieve details of a specific campaign

### Member Management

- **List Members** - Get all members in a specific list
- **Get Member** - Retrieve details of a specific member

### Segment Management

- **List Segments** - Get all segments in a specific list
- **Get Segment** - Retrieve details of a specific segment

### Template Management

- **List Templates** - Get all templates in your account
- **Get Template** - Retrieve details of a specific template

### Reports and Analytics

- **Get Automation Report** - Get automation report data
- **Get Automation Email Report** - Get automation email report data
- **Get Subscriber Activity** - Get subscriber activity for an automation email
- **List Campaign Reports** - Get all campaign reports
- **Get Campaign Report** - Get detailed report for a specific campaign

### Account Information

- **Get Account** - Get account information and statistics

### Folder Management

- **List Folders** - Get all campaign folders
- **Get Folder** - Retrieve details of a specific folder

### File Manager

- **List Files** - Get all files in the File Manager
- **Get File** - Retrieve details of a specific file

### Landing Pages

- **List Landing Pages** - Get all landing pages
- **Get Landing Page** - Retrieve details of a specific landing page

### E-commerce

- **List Stores** - Get all e-commerce stores
- **Get Store** - Retrieve details of a specific store
- **List Products** - Get all products in a store
- **Get Product** - Retrieve details of a specific product
- **List Orders** - Get all orders in a store
- **Get Order** - Retrieve details of a specific order

### Conversations

- **List Conversations** - Get all conversations
- **Get Conversation** - Retrieve details of a specific conversation

### Merge Fields

- **List Merge Fields** - Get all merge fields in a specific list
- **Get Merge Field** - Retrieve details of a specific merge field

## Local Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

### Configuration

Set the following environment variable:

```bash
MAILCHIMP_API_KEY=your-mailchimp-api-key-here
```

Your Mailchimp API key should include the data center suffix (e.g., `xxxxxxxxxxxxxxxx-us1`).

### Available Tools

#### Automation Management

##### list_automations

Lists all automations in your Mailchimp account.

```typescript
// No parameters required
```

##### get_automation

Get details of a specific automation by workflow ID.

```typescript
{
  workflow_id: string; // Required: The workflow ID of the automation
}
```

#### Automation Email Management

##### list_automation_emails

List all emails in an automation.

```typescript
{
  workflow_id: string; // Required: The workflow ID
}
```

##### get_automation_email

Get details of a specific email in an automation.

```typescript
{
  workflow_id: string; // Required: The workflow ID
  email_id: string; // Required: The email ID
}
```

#### Subscriber Management

##### list_automation_subscribers

List subscribers in an automation email queue.

```typescript
{
  workflow_id: string; // Required: The workflow ID
  email_id: string; // Required: The email ID
}
```

##### get_automation_queue

Get the automation email queue.

```typescript
{
  workflow_id: string; // Required: The workflow ID
  email_id: string; // Required: The email ID
}
```

#### List Management

##### list_lists

List all lists in your Mailchimp account.

```typescript
// No parameters required
```

##### get_list

Get details of a specific list.

```typescript
{
  list_id: string; // Required: The list ID
}
```

#### Campaign Management

##### list_campaigns

List all campaigns in your Mailchimp account.

```typescript
// No parameters required
```

##### get_campaign

Get details of a specific campaign.

```typescript
{
  campaign_id: string; // Required: The campaign ID
}
```

#### Member Management

##### list_members

List all members in a specific list.

```typescript
{
  list_id: string; // Required: The list ID
}
```

##### get_member

Get details of a specific member.

```typescript
{
  list_id: string; // Required: The list ID
  subscriber_hash: string; // Required: The subscriber hash
}
```

#### Segment Management

##### list_segments

List all segments in a specific list.

```typescript
{
  list_id: string; // Required: The list ID
}
```

##### get_segment

Get details of a specific segment.

```typescript
{
  list_id: string; // Required: The list ID
  segment_id: number; // Required: The segment ID
}
```

#### Template Management

##### list_templates

List all templates in your Mailchimp account.

```typescript
// No parameters required
```

##### get_template

Get details of a specific template.

```typescript
{
  template_id: number; // Required: The template ID
}
```

#### Reports and Analytics

##### get_automation_report

Get automation report data.

```typescript
{
  workflow_id: string; // Required: The workflow ID
}
```

##### get_automation_email_report

Get automation email report data.

```typescript
{
  workflow_id: string; // Required: The workflow ID
  email_id: string; // Required: The email ID
}
```

##### get_subscriber_activity

Get subscriber activity for an automation email.

```typescript
{
  workflow_id: string; // Required: The workflow ID
  email_id: string; // Required: The email ID
  subscriber_hash: string; // Required: The subscriber hash
}
```

##### list_campaign_reports

List all campaign reports.

```typescript
// No parameters required
```

##### get_campaign_report

Get detailed report for a specific campaign.

```typescript
{
  campaign_id: string; // Required: The campaign ID
}
```

#### Account Information

##### get_account

Get account information.

```typescript
// No parameters required
```

#### Folder Management

##### list_folders

List all campaign folders.

```typescript
// No parameters required
```

##### get_folder

Get details of a specific folder.

```typescript
{
  folder_id: string; // Required: The folder ID
}
```

#### File Manager

##### list_files

List all files in the File Manager.

```typescript
// No parameters required
```

##### get_file

Get details of a specific file.

```typescript
{
  file_id: string; // Required: The file ID
}
```

#### Landing Pages

##### list_landing_pages

List all landing pages.

```typescript
// No parameters required
```

##### get_landing_page

Get details of a specific landing page.

```typescript
{
  page_id: string; // Required: The landing page ID
}
```

#### E-commerce

##### list_stores

List all e-commerce stores.

```typescript
// No parameters required
```

##### get_store

Get details of a specific store.

```typescript
{
  store_id: string; // Required: The store ID
}
```

##### list_products

List all products in a store.

```typescript
{
  store_id: string; // Required: The store ID
}
```

##### get_product

Get details of a specific product.

```typescript
{
  store_id: string; // Required: The store ID
  product_id: string; // Required: The product ID
}
```

##### list_orders

List all orders in a store.

```typescript
{
  store_id: string; // Required: The store ID
}
```

##### get_order

Get details of a specific order.

```typescript
{
  store_id: string; // Required: The store ID
  order_id: string; // Required: The order ID
}
```

#### Conversations

##### list_conversations

List all conversations.

```typescript
// No parameters required
```

##### get_conversation

Get details of a specific conversation.

```typescript
{
  conversation_id: string; // Required: The conversation ID
}
```

#### Merge Fields

##### list_merge_fields

List all merge fields in a specific list.

```typescript
{
  list_id: string; // Required: The list ID
}
```

##### get_merge_field

Get details of a specific merge field.

```typescript
{
  list_id: string; // Required: The list ID
  merge_field_id: number; // Required: The merge field ID
}
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Development Mode

```bash
npm run watch
```

### Inspector

```bash
npm run inspector
```

## API Reference

This MCP server implements read-only operations from the Mailchimp Marketing API v3. For detailed API documentation, visit:
https://mailchimp.com/developer/marketing/api/

## License

This project is licensed under the MIT License.
