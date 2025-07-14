// Common interfaces for Mailchimp Automations API responses and requests

export interface MailchimpAutomation {
  id: string;
  name: string;
  status: "save" | "paused" | "sending";
  create_time: string;
  start_time?: string;
  from_name: string;
  from_email: string;
  subject: string;
  reply_to: string;
  to_name: string;
  title: string;
  type:
    | "abandonedCart"
    | "abandonedBrowse"
    | "api"
    | "bestCustomers"
    | "click"
    | "date"
    | "email"
    | "emailSeries"
    | "groupAdd"
    | "groupRemove"
    | "mandrill"
    | "product"
    | "purchase"
    | "signup"
    | "signupFollowUp"
    | "survey"
    | "visit"
    | "welcome";
  template_id?: number;
  delay?: number;
  delay_type?: "now" | "day" | "hour" | "week";
  delay_unit?: "day" | "hour" | "week";
  delay_value?: number;
  delay_direction?: "before" | "after";
  delay_full?: {
    delay_type: string;
    delay_unit: string;
    delay_value: number;
    delay_direction: string;
  };
  trigger_settings?: {
    workflow_type: string;
    workflow_title?: string;
    runtime?: {
      days?: number[];
      hours?: number[];
    };
    one_time?: boolean;
    one_time_date?: string;
  };
  tracking?: {
    opens: boolean;
    html_clicks: boolean;
    text_clicks: boolean;
    goal_tracking: boolean;
    ecomm360: boolean;
    google_analytics: string;
    clicktale: string;
    salesforce?: {
      campaign: boolean;
      notes: boolean;
    };
    capsule?: {
      notes: boolean;
    };
  };
  settings?: {
    title: string;
    from_name: string;
    reply_to: string;
    use_conversation: boolean;
    to_name: string;
    folder_id: string;
    authenticate: boolean;
    auto_footer: boolean;
    inline_css: boolean;
    auto_tweet: boolean;
    fb_comments: boolean;
    timewarp: boolean;
    template_id: number;
    drag_and_drop: boolean;
  };
  social_card?: {
    image_url?: string;
    description?: string;
    title?: string;
  };
  trigger_settings_workflow_type?: string;
  trigger_settings_workflow_title?: string;
  trigger_settings_runtime?: {
    days?: number[];
    hours?: number[];
  };
  trigger_settings_one_time?: boolean;
  trigger_settings_one_time_date?: string;
  report_summary?: {
    opens: number;
    unique_opens: number;
    open_rate: number;
    clicks: number;
    subscriber_clicks: number;
    click_rate: number;
    visits: number;
    unique_visits: number;
    conversion_rate: number;
    subscribes: number;
    ecommerce?: {
      total_revenue: number;
      currency_code: string;
      average_order_revenue: number;
      total_orders: number;
      total_products_sold: number;
    };
  };
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

export interface MailchimpAutomationEmail {
  id: string;
  workflow_id: string;
  position: number;
  status: "draft" | "sending" | "sent";
  emails_sent: number;
  send_time?: string;
  content_type: "template" | "multichannel" | "html" | "url";
  recipients: {
    list_id: string;
    list_is_active: boolean;
    list_name: string;
    segment_text: string;
    recipient_count: number;
    segment_opts?: {
      saved_segment_id?: number;
      match?: string;
      conditions?: Array<{
        condition_type: string;
        op: string;
        field: string;
        value: string;
      }>;
    };
  };
  settings: {
    subject_line: string;
    title: string;
    from_name: string;
    reply_to: string;
    use_conversation: boolean;
    to_name: string;
    folder_id: string;
    authenticate: boolean;
    auto_footer: boolean;
    inline_css: boolean;
    auto_tweet: boolean;
    fb_comments: boolean;
    timewarp: boolean;
    template_id: number;
    drag_and_drop: boolean;
  };
  tracking: {
    opens: boolean;
    html_clicks: boolean;
    text_clicks: boolean;
    goal_tracking: boolean;
    ecomm360: boolean;
    google_analytics: string;
    clicktale: string;
    salesforce?: {
      campaign: boolean;
      notes: boolean;
    };
    capsule?: {
      notes: boolean;
    };
  };
  social_card?: {
    image_url?: string;
    description?: string;
    title?: string;
  };
  delay?: {
    amount: number;
    type: "before" | "after";
    direction: "before" | "after";
    action: string;
    action_description: string;
    full_description: string;
  };
  parent?: {
    type: string;
    id: string;
    workflow_id: string;
    workflow_name: string;
    workflow_title: string;
    workflow_type: string;
  };
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

export interface MailchimpAutomationSubscriber {
  id: string;
  email_address: string;
  unique_email_id: string;
  email_type: string;
  status:
    | "subscribed"
    | "unsubscribed"
    | "cleaned"
    | "pending"
    | "transactional";
  merge_fields: Record<string, any>;
  interests: Record<string, boolean>;
  stats: {
    avg_open_rate: number;
    avg_click_rate: number;
    ecommerce_data?: {
      total_revenue: number;
      number_of_orders: number;
      currency_code: string;
    };
  };
  ip_signup?: string;
  timestamp_signup?: string;
  ip_opt?: string;
  timestamp_opt?: string;
  member_rating: number;
  last_changed: string;
  language?: string;
  vip: boolean;
  email_client?: string;
  location?: {
    latitude: number;
    longitude: number;
    gmtoff: number;
    dstoff: number;
    country_code: string;
    timezone: string;
    region: string;
  };
  source?: string;
  tags_count: number;
  tags: Array<{
    id: number;
    name: string;
  }>;
  list_id: string;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

export interface MailchimpAutomationQueue {
  id: string;
  email_address: string;
  unique_email_id: string;
  email_type: string;
  status:
    | "subscribed"
    | "unsubscribed"
    | "cleaned"
    | "pending"
    | "transactional";
  merge_fields: Record<string, any>;
  interests: Record<string, boolean>;
  stats: {
    avg_open_rate: number;
    avg_click_rate: number;
    ecommerce_data?: {
      total_revenue: number;
      number_of_orders: number;
      currency_code: string;
    };
  };
  ip_signup?: string;
  timestamp_signup?: string;
  ip_opt?: string;
  timestamp_opt?: string;
  member_rating: number;
  last_changed: string;
  language?: string;
  vip: boolean;
  email_client?: string;
  location?: {
    latitude: number;
    longitude: number;
    gmtoff: number;
    dstoff: number;
    country_code: string;
    timezone: string;
    region: string;
  };
  source?: string;
  tags_count: number;
  tags: Array<{
    id: number;
    name: string;
  }>;
  list_id: string;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

export interface MailchimpList {
  id: string;
  name: string;
  contact: {
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  };
  permission_reminder: string;
  use_archive_bar: boolean;
  campaign_defaults: {
    from_name: string;
    from_email: string;
    subject: string;
    language: string;
  };
  notify_on_subscribe: string;
  notify_on_unsubscribe: string;
  date_created: string;
  list_rating: number;
  email_type_option: boolean;
  subscribe_url_short: string;
  subscribe_url_long: string;
  beamer_address: string;
  visibility: string;
  double_optin: boolean;
  marketing_permissions: boolean;
  modules: string[];
  stats: {
    member_count: number;
    unsubscribe_count: number;
    cleaned_count: number;
    member_count_since_send: number;
    unsubscribe_count_since_send: number;
    cleaned_count_since_send: number;
    campaign_count: number;
    campaign_last_sent: string;
    merge_field_count: number;
    avg_sub_rate: number;
    avg_unsub_rate: number;
    target_sub_rate: number;
    open_rate: number;
    click_rate: number;
    last_sub_date: string;
    last_unsub_date: string;
  };
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Campaign interfaces
export interface MailchimpCampaign {
  id: string;
  type: "regular" | "plaintext" | "absplit" | "rss" | "variate";
  status: "save" | "paused" | "schedule" | "sending" | "sent";
  create_time: string;
  send_time?: string;
  archive_url?: string;
  long_archive_url?: string;
  authenticate: boolean;
  ecommerce?: {
    store_id: string;
    product_id: string;
    product_variant_id: string;
    order_id: string;
  };
  auto_tweet: boolean;
  auto_footer: boolean;
  inline_css: boolean;
  auto_tweet_text?: string;
  auto_footer_text?: string;
  auto_footer_link?: string;
  fb_comments: boolean;
  timewarp: boolean;
  template_id?: number;
  drag_and_drop: boolean;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Member interfaces
export interface MailchimpMember {
  id: string;
  email_address: string;
  unique_email_id: string;
  email_type: string;
  status:
    | "subscribed"
    | "unsubscribed"
    | "cleaned"
    | "pending"
    | "transactional";
  merge_fields: Record<string, any>;
  interests: Record<string, boolean>;
  stats: {
    avg_open_rate: number;
    avg_click_rate: number;
    ecommerce_data?: {
      total_revenue: number;
      number_of_orders: number;
      currency_code: string;
    };
  };
  ip_signup?: string;
  timestamp_signup?: string;
  ip_opt?: string;
  timestamp_opt?: string;
  member_rating: number;
  last_changed: string;
  language?: string;
  vip: boolean;
  email_client?: string;
  location?: {
    latitude: number;
    longitude: number;
    gmtoff: number;
    dstoff: number;
    country_code: string;
    timezone: string;
    region: string;
  };
  source?: string;
  tags_count: number;
  tags: Array<{
    id: number;
    name: string;
  }>;
  list_id: string;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Segment interfaces
export interface MailchimpSegment {
  id: number;
  name: string;
  member_count: number;
  type: "saved" | "static" | "fuzzy";
  created_at: string;
  updated_at: string;
  options?: {
    match: "any" | "all";
    conditions: Array<{
      condition_type: string;
      op: string;
      field: string;
      value: string;
    }>;
  };
  list_id: string;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Template interfaces
export interface MailchimpTemplate {
  id: number;
  type: "user" | "base" | "gallery";
  name: string;
  drag_and_drop: boolean;
  responsive: boolean;
  category?: string;
  date_created: string;
  created_by: string;
  active: boolean;
  folder_id?: string;
  thumbnail?: string;
  share_url?: string;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Report interfaces
export interface MailchimpCampaignReport {
  id: string;
  campaign_title: string;
  type: string;
  list_id: string;
  list_is_active: boolean;
  list_name: string;
  subject_line: string;
  preview_text?: string;
  emails_sent: number;
  abuse_reports: number;
  unsubscribed: number;
  send_time: string;
  rss_last_send?: string;
  bounces: {
    hard_bounces: number;
    soft_bounces: number;
    syntax_errors: number;
  };
  forwards: {
    forwards_count: number;
    forwards_opens: number;
  };
  opens: {
    opens_total: number;
    unique_opens: number;
    open_rate: number;
    last_open: string;
  };
  clicks: {
    clicks_total: number;
    unique_clicks: number;
    unique_subscriber_clicks: number;
    click_rate: number;
    last_click: string;
  };
  facebook_likes: {
    recipient_likes: number;
    unique_likes: number;
    facebook_likes: number;
  };
  industry_stats: {
    type: string;
    open_rate: number;
    click_rate: number;
    bounce_rate: number;
    unopen_rate: number;
    unsub_rate: number;
    abuse_rate: number;
  };
  list_stats: {
    sub_rate: number;
    unsub_rate: number;
    open_rate: number;
    click_rate: number;
  };
  ab_split?: {
    a: {
      bounces: number;
      abuse_reports: number;
      unsubs: number;
      recipient_clicks: number;
      forwards: number;
      opens: number;
      last_open: string;
      unique_opens: number;
    };
    b: {
      bounces: number;
      abuse_reports: number;
      unsubs: number;
      recipient_clicks: number;
      forwards: number;
      opens: number;
      last_open: string;
      unique_opens: number;
    };
  };
  timewarp?: Array<{
    gmt_offset: number;
    opens: number;
    last_open: string;
    unique_opens: number;
    clicks: number;
    last_click: string;
    unique_clicks: number;
    bounces: number;
  }>;
  timeseries?: Array<{
    timestamp: string;
    emails_sent: number;
    unique_opens: number;
    recipients_clicks: number;
  }>;
  share_report: {
    share_url: string;
    share_password: string;
  };
  ecommerce?: {
    total_orders: number;
    total_spent: number;
    total_revenue: number;
    currency_code: string;
  };
  delivery_status: {
    enabled: boolean;
    can_cancel: boolean;
    status: string;
    emails_sent: number;
    emails_canceled: number;
  };
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Account interfaces
export interface MailchimpAccount {
  account_id: string;
  account_name: string;
  account_industry: string;
  account_created: string;
  account_updated: string;
  contact: {
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  };
  pro_enabled: boolean;
  last_login: string;
  total_subscribers: number;
  industry_stats: {
    type: string;
    open_rate: number;
    click_rate: number;
    bounce_rate: number;
    unopen_rate: number;
    unsub_rate: number;
    abuse_rate: number;
  };
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Folder interfaces
export interface MailchimpFolder {
  id: string;
  name: string;
  count: number;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// File Manager interfaces
export interface MailchimpFile {
  id: string;
  folder_id: string;
  name: string;
  file_data: string;
  type: string;
  size: number;
  created_at: string;
  created_by: string;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Landing Page interfaces
export interface MailchimpLandingPage {
  id: string;
  name: string;
  title: string;
  description: string;
  store_id?: string;
  list_id?: string;
  type: "signup" | "product";
  template_id: number;
  status: "published" | "unpublished" | "draft";
  created_at: string;
  published_at?: string;
  updated_at: string;
  url: string;
  tracking: {
    opens: boolean;
    ecomm360: boolean;
    clicktale: string;
    salesforce: {
      campaign: boolean;
      notes: boolean;
    };
    capsule: {
      notes: boolean;
    };
  };
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// E-commerce Store interfaces
export interface MailchimpStore {
  id: string;
  list_id: string;
  name: string;
  platform: string;
  domain?: string;
  is_syncing: boolean;
  email_address: string;
  currency_code: string;
  money_format: string;
  primary_locale: string;
  timezone: string;
  phone?: string;
  address?: {
    address1: string;
    address2: string;
    city: string;
    province: string;
    province_code: string;
    postal_code: string;
    country: string;
    country_code: string;
  };
  connected_site?: {
    site_foreign_id: string;
    site_script: {
      url: string;
      fragment: string;
    };
  };
  created_at: string;
  updated_at: string;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Product interfaces
export interface MailchimpProduct {
  id: string;
  title: string;
  handle: string;
  url: string;
  description: string;
  type: string;
  vendor: string;
  image_url?: string;
  variants: Array<{
    id: string;
    title: string;
    url: string;
    sku: string;
    price: number;
    inventory_quantity: number;
    image_url?: string;
    backorders: string;
    visibility: string;
  }>;
  published_at_foreign?: string;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Order interfaces
export interface MailchimpOrder {
  id: string;
  customer: {
    id: string;
    email_address: string;
    opt_in_status: boolean;
    company?: string;
    first_name?: string;
    last_name?: string;
    orders_count: number;
    total_spent: number;
    address?: {
      address1: string;
      address2: string;
      city: string;
      province: string;
      province_code: string;
      postal_code: string;
      country: string;
      country_code: string;
    };
  };
  store_id: string;
  campaign_id?: string;
  landing_site?: string;
  financial_status: string;
  fulfillment_status: string;
  currency_code: string;
  order_total: number;
  order_url?: string;
  discount_total: number;
  tax_total: number;
  shipping_total: number;
  tracking_code?: string;
  processed_at_foreign?: string;
  cancelled_at_foreign?: string;
  updated_at_foreign?: string;
  shipping_address?: {
    name: string;
    address1: string;
    address2: string;
    city: string;
    province: string;
    province_code: string;
    postal_code: string;
    country: string;
    country_code: string;
  };
  billing_address?: {
    name: string;
    address1: string;
    address2: string;
    city: string;
    province: string;
    province_code: string;
    postal_code: string;
    country: string;
    country_code: string;
  };
  lines: Array<{
    id: string;
    product_id: string;
    product_title: string;
    product_variant_id: string;
    product_variant_title: string;
    quantity: number;
    price: number;
  }>;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Conversation interfaces
export interface MailchimpConversation {
  id: string;
  message_id: string;
  list_id: string;
  from_email: string;
  from_label: string;
  subject: string;
  message: string;
  read: boolean;
  timestamp: string;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}

// Merge Field interfaces
export interface MailchimpMergeField {
  id: number;
  name: string;
  type:
    | "text"
    | "number"
    | "address"
    | "phone"
    | "date"
    | "url"
    | "imageurl"
    | "radio"
    | "dropdown"
    | "birthday"
    | "zip";
  required: boolean;
  default_value?: string;
  public: boolean;
  display_order: number;
  options?: {
    default_country?: number;
    phone_format?: string;
    date_format?: string;
    choices?: string[];
    size?: number;
  };
  help_text?: string;
  list_id: string;
  _links?: Array<{
    rel: string;
    href: string;
    method: string;
    targetSchema?: string;
    schema?: string;
  }>;
}
