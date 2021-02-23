import { Context, NextFn } from '@slack/bolt';
import { WebClient } from '@slack/web-api';

export async function addLocaleContext({
  userId,
  client,
  context,
  next
}: {
  userId: string;
  client: WebClient;
  context: Context;
  next?: NextFn;
}) {
  const user = await client.users.info({
    user: userId,
    include_locale: true
  });

  context.locale = user.locale;

  if (next) {
    await next();
  }
}
