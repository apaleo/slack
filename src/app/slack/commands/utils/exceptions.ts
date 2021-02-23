type SlashCommandExceptionType =
  | 'NotConfigured'
  | 'AlreadySubscribed'
  | 'NotSubscribedToChannel'
  | 'NoSubscriptionsFound'
  | 'Other';

export class SlashCommandException {
  public type: SlashCommandExceptionType = 'Other';
}

export class NotConfiguredSlashException extends SlashCommandException {
  constructor() {
    super();
    this.type = 'NotConfigured';
  }
}

export class AlreadySubscribedSlashException extends SlashCommandException {
  constructor(
    public readonly accountCode: string,
    public readonly channelName: string
  ) {
    super();
    this.type = 'AlreadySubscribed';
  }
}

export class NotSubscribedToChannelSlashException extends SlashCommandException {
  constructor(public readonly channelName: string) {
    super();
    this.type = 'NotSubscribedToChannel';
  }
}

export class NoSubscriptionsFoundSlashException extends SlashCommandException {
  constructor() {
    super();
    this.type = 'NoSubscriptionsFound';
  }
}
