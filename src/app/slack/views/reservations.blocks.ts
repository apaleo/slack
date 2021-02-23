import { ReservationListModel } from 'clients/booking/models';
import { apaleoUIBaseUrl } from 'src/settings';
import { formatDate } from 'src/utils/date-helpers';
import { Markup } from './common.blocks';
import { MarkupBuilder } from './markup-builder';

export const reservationsMarkup = (
  items: ReservationListModel,
  locale: string
): Markup => {
  const markup = new MarkupBuilder().addContextBlock('Reservations');

  if (items && items.reservations) {
    items.reservations.map(x => {
      markup
        .addSectionBlock(
          `*<${apaleoUIBaseUrl}/${x.property.id}/reservations/${x.id}/actions?source=slack|${x.id}>*\n` +
            `_${x.primaryGuest?.lastName}_\n` +
            `_${formatDate(x.arrival, locale)}_ - _${formatDate(
              x.departure,
              locale
            )}_`
        )
        .addDividerBlock();
    });
  } else {
    markup.addSectionBlock('No reservations found.');
  }

  return markup.build();
};
