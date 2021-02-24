export interface AccountViewState {
  accountCode: string;
  value: string;
}

export interface AccountDetailsModel {
  code: string;
  name: string;
  isSubscribed?: boolean;
}

export interface SubscriptionDetailsModel {
  accountCodes: string[];
  channelId: string;
  channelName: string;
}

export type WebhookEventTopic = 'Reservation' | 'NightAudit';
export type WebhookReservationEventType = 'created' | 'set-to-no-show';
export type WebhookNightAuditEventType = 'started' | 'succeeded' | 'failed';

export interface GenericWebhookEvent {
  topic: WebhookEventTopic;
  accountId: string;
  propertyId: string;
}

export interface WebhookReservationEventModel extends GenericWebhookEvent {
  topic: 'Reservation';
  type: WebhookReservationEventType;
  data: { entityId: string };
}

export interface WebhookNightAuditEventModel extends GenericWebhookEvent {
  topic: 'NightAudit';
  type: WebhookNightAuditEventType;
}

export type WebhookEventModel =
  | WebhookReservationEventModel
  | WebhookNightAuditEventModel;
