import { ReservationModel } from 'clients/booking/models';
import { apaleoUIBaseUrl } from 'src/settings';
import { Markup } from './common.blocks';
import { MarkupBuilder } from './markup-builder';

export const reservationNoShowMarkup = (
  reservation: ReservationModel
): Markup => {
  return new MarkupBuilder()
    .addContextBlock(
      ':information_source: Reservation was set to no-show :information_source:\n'
    )
    .addSectionBlock(
      `*<${apaleoUIBaseUrl}/${reservation.property.id}/reservations/${reservation.id}/actions?source=slack|${reservation.id}>*\n` +
        `_${reservation.primaryGuest?.lastName}_\n`
    )
    .addDividerBlock()
    .build();
};
