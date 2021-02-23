import { apaleoUIBaseUrl } from 'src/settings';
import { Markup } from './common.blocks';
import { MarkupBuilder } from './markup-builder';

export const nightAuditFailedMarkup = ({
  accountCode,
  propertyId
}: {
  accountCode: string;
  propertyId: string;
}): Markup => {
  return new MarkupBuilder()
    .addContextBlock(':bangbang: Night audit has failed! :bangbang:\n')
    .addSectionBlock(
      `Night audit for property *<${apaleoUIBaseUrl}/${propertyId}/?source=slack|${propertyId}>* in account \`${accountCode}\` has failed!`
    )
    .addDividerBlock()
    .build();
};
