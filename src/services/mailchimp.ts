import fetch from "node-fetch";
import {
  MailchimpAutomation,
  MailchimpAutomationEmail,
  MailchimpAutomationSubscriber,
  MailchimpAutomationQueue,
  MailchimpList,
  MailchimpCampaign,
  MailchimpMember,
  MailchimpSegment,
  MailchimpTemplate,
  MailchimpCampaignReport,
  MailchimpAccount,
  MailchimpFolder,
  MailchimpFile,
  MailchimpLandingPage,
  MailchimpStore,
  MailchimpProduct,
  MailchimpOrder,
  MailchimpConversation,
  MailchimpMergeField,
} from "../types/index.js";

export class MailchimpService {
  private apiKey: string;
  private dataCenter: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    // Extract data center from API key (format: xxxxxxxx-us1)
    const keyParts = apiKey.split("-");
    this.dataCenter = keyParts[keyParts.length - 1];
    this.baseUrl = `https://${this.dataCenter}.api.mailchimp.com/3.0`;
  }

  private async makeRequest<T = any>(
    endpoint: string,
    options: any = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const auth = Buffer.from(`anystring:${this.apiKey}`).toString("base64");

    const fetchOptions: any = {
      ...options,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Mailchimp API Error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json() as Promise<T>;
  }

  private async makePaginatedRequest<T = any>(
    endpoint: string,
    sortField: string = "create_time",
    sortDirection: "ASC" | "DESC" = "DESC"
  ): Promise<T> {
    // Mailchimp API allows up to 1000 items per page
    const params = new URLSearchParams({
      count: "1000",
      sort_field: sortField,
      sort_dir: sortDirection,
    });

    const url = `${this.baseUrl}${endpoint}?${params.toString()}`;
    const auth = Buffer.from(`anystring:${this.apiKey}`).toString("base64");

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Mailchimp API Error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json() as Promise<T>;
  }

  // Automation Management
  async listAutomations(): Promise<{ automations: MailchimpAutomation[] }> {
    return await this.makePaginatedRequest(
      "/automations",
      "create_time",
      "DESC"
    );
  }

  async getAutomation(workflowId: string): Promise<MailchimpAutomation> {
    return await this.makeRequest(`/automations/${workflowId}`);
  }

  // Automation Email Management
  async listAutomationEmails(
    workflowId: string
  ): Promise<{ emails: MailchimpAutomationEmail[] }> {
    return await this.makePaginatedRequest(
      `/automations/${workflowId}/emails`,
      "send_time",
      "DESC"
    );
  }

  async getAutomationEmail(
    workflowId: string,
    emailId: string
  ): Promise<MailchimpAutomationEmail> {
    return await this.makeRequest(
      `/automations/${workflowId}/emails/${emailId}`
    );
  }

  // Automation Subscriber Management
  async listAutomationSubscribers(
    workflowId: string,
    emailId: string
  ): Promise<{ subscribers: MailchimpAutomationSubscriber[] }> {
    return await this.makePaginatedRequest(
      `/automations/${workflowId}/emails/${emailId}/queue`,
      "timestamp_signup",
      "DESC"
    );
  }

  // Automation Queue Management
  async getAutomationQueue(
    workflowId: string,
    emailId: string
  ): Promise<{ queue: MailchimpAutomationQueue[] }> {
    return await this.makePaginatedRequest(
      `/automations/${workflowId}/emails/${emailId}/queue`,
      "timestamp_signup",
      "DESC"
    );
  }

  // List Management (for automation recipients)
  async listLists(): Promise<{ lists: MailchimpList[] }> {
    return await this.makePaginatedRequest("/lists", "date_created", "DESC");
  }

  async getList(listId: string): Promise<MailchimpList> {
    return await this.makeRequest(`/lists/${listId}`);
  }

  // Automation Reports
  async getAutomationReport(workflowId: string): Promise<any> {
    return await this.makeRequest(`/automations/${workflowId}/emails`);
  }

  async getAutomationEmailReport(
    workflowId: string,
    emailId: string
  ): Promise<any> {
    return await this.makeRequest(
      `/automations/${workflowId}/emails/${emailId}`
    );
  }

  // Automation Subscriber Activity
  async getSubscriberActivity(
    workflowId: string,
    emailId: string,
    subscriberHash: string
  ): Promise<any> {
    return await this.makeRequest(
      `/automations/${workflowId}/emails/${emailId}/queue/${subscriberHash}/activity`
    );
  }

  // Campaign Management
  async listCampaigns(): Promise<{ campaigns: MailchimpCampaign[] }> {
    return await this.makePaginatedRequest("/campaigns", "create_time", "DESC");
  }

  async getCampaign(campaignId: string): Promise<MailchimpCampaign> {
    return await this.makeRequest(`/campaigns/${campaignId}`);
  }

  // Member Management
  async listMembers(listId: string): Promise<{ members: MailchimpMember[] }> {
    return await this.makePaginatedRequest(
      `/lists/${listId}/members`,
      "timestamp_signup",
      "DESC"
    );
  }

  async getMember(
    listId: string,
    subscriberHash: string
  ): Promise<MailchimpMember> {
    return await this.makeRequest(`/lists/${listId}/members/${subscriberHash}`);
  }

  // Segment Management
  async listSegments(
    listId: string
  ): Promise<{ segments: MailchimpSegment[] }> {
    return await this.makePaginatedRequest(
      `/lists/${listId}/segments`,
      "created_at",
      "DESC"
    );
  }

  async getSegment(
    listId: string,
    segmentId: number
  ): Promise<MailchimpSegment> {
    return await this.makeRequest(`/lists/${listId}/segments/${segmentId}`);
  }

  // Template Management
  async listTemplates(): Promise<{ templates: MailchimpTemplate[] }> {
    return await this.makePaginatedRequest(
      "/templates",
      "date_created",
      "DESC"
    );
  }

  async getTemplate(templateId: number): Promise<MailchimpTemplate> {
    return await this.makeRequest(`/templates/${templateId}`);
  }

  // Campaign Reports
  async listCampaignReports(): Promise<{ reports: MailchimpCampaignReport[] }> {
    return await this.makePaginatedRequest("/reports", "send_time", "DESC");
  }

  async getCampaignReport(
    campaignId: string
  ): Promise<MailchimpCampaignReport> {
    return await this.makeRequest(`/reports/${campaignId}`);
  }

  // Account Information
  async getAccount(): Promise<MailchimpAccount> {
    return await this.makeRequest("/");
  }

  // Folder Management
  async listFolders(): Promise<{ folders: MailchimpFolder[] }> {
    return await this.makePaginatedRequest("/campaign-folders", "name", "ASC");
  }

  async getFolder(folderId: string): Promise<MailchimpFolder> {
    return await this.makeRequest(`/campaign-folders/${folderId}`);
  }

  // File Manager
  async listFiles(): Promise<{ files: MailchimpFile[] }> {
    return await this.makePaginatedRequest(
      "/file-manager/files",
      "created_at",
      "DESC"
    );
  }

  async getFile(fileId: string): Promise<MailchimpFile> {
    return await this.makeRequest(`/file-manager/files/${fileId}`);
  }

  // Landing Pages
  async listLandingPages(): Promise<{ landing_pages: MailchimpLandingPage[] }> {
    return await this.makePaginatedRequest(
      "/landing-pages",
      "created_at",
      "DESC"
    );
  }

  async getLandingPage(pageId: string): Promise<MailchimpLandingPage> {
    return await this.makeRequest(`/landing-pages/${pageId}`);
  }

  // E-commerce Stores
  async listStores(): Promise<{ stores: MailchimpStore[] }> {
    return await this.makePaginatedRequest(
      "/ecommerce/stores",
      "created_at",
      "DESC"
    );
  }

  async getStore(storeId: string): Promise<MailchimpStore> {
    return await this.makeRequest(`/ecommerce/stores/${storeId}`);
  }

  // E-commerce Products
  async listProducts(
    storeId: string
  ): Promise<{ products: MailchimpProduct[] }> {
    return await this.makePaginatedRequest(
      `/ecommerce/stores/${storeId}/products`,
      "created_at",
      "DESC"
    );
  }

  async getProduct(
    storeId: string,
    productId: string
  ): Promise<MailchimpProduct> {
    return await this.makeRequest(
      `/ecommerce/stores/${storeId}/products/${productId}`
    );
  }

  // E-commerce Orders
  async listOrders(storeId: string): Promise<{ orders: MailchimpOrder[] }> {
    return await this.makePaginatedRequest(
      `/ecommerce/stores/${storeId}/orders`,
      "processed_at_foreign",
      "DESC"
    );
  }

  async getOrder(storeId: string, orderId: string): Promise<MailchimpOrder> {
    return await this.makeRequest(
      `/ecommerce/stores/${storeId}/orders/${orderId}`
    );
  }

  // Conversations
  async listConversations(): Promise<{
    conversations: MailchimpConversation[];
  }> {
    return await this.makePaginatedRequest(
      "/conversations",
      "timestamp",
      "DESC"
    );
  }

  async getConversation(
    conversationId: string
  ): Promise<MailchimpConversation> {
    return await this.makeRequest(`/conversations/${conversationId}`);
  }

  // Merge Fields
  async listMergeFields(
    listId: string
  ): Promise<{ merge_fields: MailchimpMergeField[] }> {
    return await this.makePaginatedRequest(
      `/lists/${listId}/merge-fields`,
      "display_order",
      "ASC"
    );
  }

  async getMergeField(
    listId: string,
    mergeFieldId: number
  ): Promise<MailchimpMergeField> {
    return await this.makeRequest(
      `/lists/${listId}/merge-fields/${mergeFieldId}`
    );
  }

  // Interest Categories
  async listInterestCategories(listId: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/lists/${listId}/interest-categories`,
      "display_order",
      "ASC"
    );
  }

  async getInterestCategory(listId: string, categoryId: string): Promise<any> {
    return await this.makeRequest(
      `/lists/${listId}/interest-categories/${categoryId}`
    );
  }

  // Interests
  async listInterests(listId: string, categoryId: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/lists/${listId}/interest-categories/${categoryId}/interests`,
      "display_order",
      "ASC"
    );
  }

  async getInterest(
    listId: string,
    categoryId: string,
    interestId: string
  ): Promise<any> {
    return await this.makeRequest(
      `/lists/${listId}/interest-categories/${categoryId}/interests/${interestId}`
    );
  }

  // Tags
  async listTags(listId: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/lists/${listId}/segments`,
      "created_at",
      "DESC"
    );
  }

  async getTag(listId: string, tagId: number): Promise<any> {
    return await this.makeRequest(`/lists/${listId}/segments/${tagId}`);
  }

  // Webhooks
  async listWebhooks(listId: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/lists/${listId}/webhooks`,
      "created_at",
      "DESC"
    );
  }

  async getWebhook(listId: string, webhookId: string): Promise<any> {
    return await this.makeRequest(`/lists/${listId}/webhooks/${webhookId}`);
  }

  // Growth History
  async getGrowthHistory(listId: string): Promise<any> {
    return await this.makeRequest(`/lists/${listId}/growth-history`);
  }

  // Activity Feed
  async getActivityFeed(listId: string): Promise<any> {
    return await this.makeRequest(`/lists/${listId}/activity`);
  }

  // Client Statistics
  async getClientStats(listId: string): Promise<any> {
    return await this.makeRequest(`/lists/${listId}/clients`);
  }

  // Location Statistics
  async getLocationStats(listId: string): Promise<any> {
    return await this.makeRequest(`/lists/${listId}/locations`);
  }

  // Note Management
  async listMemberNotes(listId: string, subscriberHash: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/lists/${listId}/members/${subscriberHash}/notes`,
      "created_at",
      "DESC"
    );
  }

  async getMemberNote(
    listId: string,
    subscriberHash: string,
    noteId: string
  ): Promise<any> {
    return await this.makeRequest(
      `/lists/${listId}/members/${subscriberHash}/notes/${noteId}`
    );
  }

  // Goal Management
  async listGoals(listId: string, subscriberHash: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/lists/${listId}/members/${subscriberHash}/goals`,
      "created_at",
      "DESC"
    );
  }

  async getGoal(
    listId: string,
    subscriberHash: string,
    goalId: string
  ): Promise<any> {
    return await this.makeRequest(
      `/lists/${listId}/members/${subscriberHash}/goals/${goalId}`
    );
  }

  // Campaign Content
  async getCampaignContent(campaignId: string): Promise<any> {
    return await this.makeRequest(`/campaigns/${campaignId}/content`);
  }

  // Campaign Feedback
  async getCampaignFeedback(campaignId: string): Promise<any> {
    return await this.makeRequest(`/campaigns/${campaignId}/feedback`);
  }

  // Campaign Send Checklist
  async getCampaignSendChecklist(campaignId: string): Promise<any> {
    return await this.makeRequest(`/campaigns/${campaignId}/send-checklist`);
  }

  // Campaign Recipients
  async getCampaignRecipients(campaignId: string): Promise<any> {
    return await this.makeRequest(`/campaigns/${campaignId}/recipients`);
  }

  // Campaign Opens
  async getCampaignOpens(campaignId: string): Promise<any> {
    return await this.makeRequest(`/reports/${campaignId}/opens`);
  }

  // Campaign Clicks
  async getCampaignClicks(campaignId: string): Promise<any> {
    return await this.makeRequest(`/reports/${campaignId}/click-details`);
  }

  // Campaign Unsubscribes
  async getCampaignUnsubscribes(campaignId: string): Promise<any> {
    return await this.makeRequest(`/reports/${campaignId}/unsubscribed`);
  }

  // Campaign Bounces
  async getCampaignBounces(campaignId: string): Promise<any> {
    return await this.makeRequest(`/reports/${campaignId}/bounces`);
  }

  // Campaign Abuse Reports
  async getCampaignAbuseReports(campaignId: string): Promise<any> {
    return await this.makeRequest(`/reports/${campaignId}/abuse-reports`);
  }

  // Campaign Forwards
  async getCampaignForwards(campaignId: string): Promise<any> {
    return await this.makeRequest(`/reports/${campaignId}/forwards`);
  }

  // Campaign Outbound Activity
  async getCampaignOutboundActivity(campaignId: string): Promise<any> {
    return await this.makeRequest(`/reports/${campaignId}/outbound-activity`);
  }

  // Campaign Email Activity
  async getCampaignEmailActivity(campaignId: string): Promise<any> {
    return await this.makeRequest(`/reports/${campaignId}/email-activity`);
  }

  // Campaign Subscriber Activity
  async getCampaignSubscriberActivity(
    campaignId: string,
    subscriberHash: string
  ): Promise<any> {
    return await this.makeRequest(
      `/reports/${campaignId}/email-activity/${subscriberHash}`
    );
  }

  // E-commerce Customers
  async listCustomers(storeId: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/ecommerce/stores/${storeId}/customers`,
      "created_at",
      "DESC"
    );
  }

  async getCustomer(storeId: string, customerId: string): Promise<any> {
    return await this.makeRequest(
      `/ecommerce/stores/${storeId}/customers/${customerId}`
    );
  }

  // E-commerce Product Variants
  async listProductVariants(storeId: string, productId: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/ecommerce/stores/${storeId}/products/${productId}/variants`,
      "created_at",
      "DESC"
    );
  }

  async getProductVariant(
    storeId: string,
    productId: string,
    variantId: string
  ): Promise<any> {
    return await this.makeRequest(
      `/ecommerce/stores/${storeId}/products/${productId}/variants/${variantId}`
    );
  }

  // E-commerce Order Lines
  async getOrderLines(storeId: string, orderId: string): Promise<any> {
    return await this.makeRequest(
      `/ecommerce/stores/${storeId}/orders/${orderId}/lines`
    );
  }

  // E-commerce Carts
  async listCarts(storeId: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/ecommerce/stores/${storeId}/carts`,
      "created_at",
      "DESC"
    );
  }

  async getCart(storeId: string, cartId: string): Promise<any> {
    return await this.makeRequest(
      `/ecommerce/stores/${storeId}/carts/${cartId}`
    );
  }

  // E-commerce Cart Lines
  async getCartLines(storeId: string, cartId: string): Promise<any> {
    return await this.makeRequest(
      `/ecommerce/stores/${storeId}/carts/${cartId}/lines`
    );
  }

  // E-commerce Promo Rules
  async listPromoRules(storeId: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/ecommerce/stores/${storeId}/promo-rules`,
      "created_at",
      "DESC"
    );
  }

  async getPromoRule(storeId: string, promoRuleId: string): Promise<any> {
    return await this.makeRequest(
      `/ecommerce/stores/${storeId}/promo-rules/${promoRuleId}`
    );
  }

  // E-commerce Promo Codes
  async listPromoCodes(storeId: string, promoRuleId: string): Promise<any> {
    return await this.makePaginatedRequest(
      `/ecommerce/stores/${storeId}/promo-rules/${promoRuleId}/promo-codes`,
      "created_at",
      "DESC"
    );
  }

  async getPromoCode(
    storeId: string,
    promoRuleId: string,
    promoCodeId: string
  ): Promise<any> {
    return await this.makeRequest(
      `/ecommerce/stores/${storeId}/promo-rules/${promoRuleId}/promo-codes/${promoCodeId}`
    );
  }
}
