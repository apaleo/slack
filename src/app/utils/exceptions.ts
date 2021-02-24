import { HttpResponse } from '@azure/core-http';

type BusinessLogicExceptionType =
  | 'AuthRequestNotFound'
  | 'MultipleAccountTokensAvailable'
  | 'AccountTokenNotFound'
  | 'ChannelSubscriptionNotFound'
  | 'AccountAlreadySubscribedToChannel'
  | 'InvalidArgument';

export class AuthRequestNotFoundException {
  public type: BusinessLogicExceptionType = 'AuthRequestNotFound';
}

export class MultipleAccountTokensAvailableException {
  public type: BusinessLogicExceptionType = 'MultipleAccountTokensAvailable';
}

export class AccountTokenNotFoundException {
  public type: BusinessLogicExceptionType = 'AccountTokenNotFound';
}

export class ChannelSubscriptionNotFoundException {
  public type: BusinessLogicExceptionType = 'ChannelSubscriptionNotFound';
}

export class AccountAlreadySubscribedToChannelException {
  public type: BusinessLogicExceptionType = 'AccountAlreadySubscribedToChannel';
  constructor(public readonly accountCode: string) {}
}

export class InvalidArgumentException {
  public type: BusinessLogicExceptionType = 'InvalidArgument';
  constructor(public readonly name: string, public readonly value: string) {}
}

export class ApaleoApiException {
  constructor(public readonly response: HttpResponse) {}
}

export class ApaleoRefreshTokenFailedException {
  constructor(public readonly innerException: unknown) {}
}
