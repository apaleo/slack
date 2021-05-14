import { ReservationModel } from 'clients/booking/models';
import { isEmpty } from 'lodash';
import { apaleoUIBaseUrl } from 'src/settings';
import { Markup } from './common.blocks';
import { MarkupBuilder } from './markup-builder';

export const reservationCreatedMarkup = (
  reservation: ReservationModel
): Markup => {
  let builder = new MarkupBuilder();
  if (!isEmpty(reservation.validationMessages)) {
    builder = builder
      .addContextBlock(
        ':warning: Reservation was created with validation messages :warning:\n'
      )
      .addSectionBlock(
        (reservation?.validationMessages || []).reduce((result, msg) => {
          result += `_*${msg.message}*_\n`;

          return result;
        }, '')
      );
  } else {
    builder = builder.addContextBlock(
      ':information_source: Reservation was created :information_source:\n'
    );
  }

  return builder
    .addSectionBlock(
      `*<${apaleoUIBaseUrl}/${reservation.property.id}/reservations/${reservation.id}/actions?source=slack|${reservation.id}>*\n` +
        `_${reservation.primaryGuest?.lastName}_\n`
    )
    .addDividerBlock()
    .build();
};
