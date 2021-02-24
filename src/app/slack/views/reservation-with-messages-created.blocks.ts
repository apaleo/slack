import { ReservationModel } from 'clients/booking/models';
import { apaleoUIBaseUrl } from 'src/settings';
import { Markup } from './common.blocks';
import { MarkupBuilder } from './markup-builder';

export const reservationWithMessagesCreatedMarkup = (
  reservation: ReservationModel
): Markup => {
  return new MarkupBuilder()
    .addContextBlock(
      ':warning: Reservation was created with validation messages :warning:\n'
    )
    .addSectionBlock(
      (reservation?.validationMessages || []).reduce((result, msg) => {
        result += `_*${msg.message}*_\n`;

        return result;
      }, '')
    )
    .addSectionBlock(
      `*<${apaleoUIBaseUrl}/${reservation.property.id}/reservations/${reservation.id}/actions?source=slack|${reservation.id}>*\n` +
        `_${reservation.primaryGuest?.lastName}_\n`
    )
    .addDividerBlock()
    .build();
};
