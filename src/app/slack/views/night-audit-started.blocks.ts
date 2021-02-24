import { apaleoUIBaseUrl } from 'src/settings';
import { Markup } from './common.blocks';
import { MarkupBuilder } from './markup-builder';

export const nightAuditStartedMarkup = ({
  accountCode,
  propertyId
}: {
  accountCode: string;
  propertyId: string;
}): Markup => {
  return new MarkupBuilder()
    .addContextBlock(
      ':information_source: Night audit has started :information_source:\n'
    )
    .addSectionBlock(
      `Night audit for property *<${apaleoUIBaseUrl}/${propertyId}/?source=slack|${propertyId}>* in account \`${accountCode}\` has been started...\n`
    )
    .addDividerBlock()
    .build();
};
