export enum TAB_NAVIGATOR_SCREEN {
  PICKUP = 'PICKUP',
  DELIVERY = 'DELIVERY',
}

export enum JOB_DETAILS_NOTE {
  FIXED = 'MC 555925 USDOT 1471933',
}

export const enum JOB_DETAILS_LABEL {
  TRUCK_DETAILS = 'Truck Details / Notes',
  DELIVERY_DETAILS = 'Delivery Details',
  PICKUP_DETAILS = 'Pickup Details',
  CONTACT_DETAILS = 'Contact Details',
  BILL_DETAILS = 'Bill Details',
  DRIVER_NOTE = 'Driver Note',
  SPECIAL_INFO = 'Special Instructions',
  EMPTY = '',
}

export const ValidateAndReturnEmpty = (input: string) => {
  return input ?? JOB_DETAILS_LABEL.EMPTY;
};

export const ValidateWithCommaAndReturnEmpty = (input: string) => {
  return input ? `${input},` : JOB_DETAILS_LABEL.EMPTY;
};

export enum IS_JOB_LOCKED_BY_CURRENT_USER {
  YES = 1,
  NO = 0,
}

export enum JOB_DETAILS_JOB_TYPE {
  PICKUP = 1,
  DELIVERY = 2,
}
