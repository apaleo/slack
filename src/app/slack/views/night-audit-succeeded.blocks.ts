import { apaleoUIBaseUrl } from 'src/settings';
import { Markup } from './common.blocks';
import { MarkupBuilder } from './markup-builder';

export const nightAuditSucceededMarkup = ({
  accountCode,
  propertyId
}: {
  accountCode: string;
  propertyId: string;
}): Markup => {
  return new MarkupBuilder()
    .addContextBlock(
      ':white_check_mark: Night audit has completed :white_check_mark:\n'
    )
    .addSectionBlock(
      `Night audit for property *<${apaleoUIBaseUrl}/${propertyId}/?source=slack|${propertyId}>* in account \`${accountCode}\` has completed successfully.\n`
    )
    .addDividerBlock()
    .build();
};
