import { Markup } from './common.blocks';
import { MarkupBuilder } from './markup-builder';

export const helpMarkup = (): Markup => {
  return new MarkupBuilder()
    .addContextBlock(`The list of available commands:`)
    .addAvailableCommandsSectionBlock()
    .build();
};
