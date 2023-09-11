export enum TAB_NAVIGATOR_SCREEN {
    PICKUP = 'PICKUP',
    DELIVERY = 'DELIVERY',
}

export enum JOB_DETAILS_NOTE {
    FIXED = 'MC 555925 USDOT 1471933'
}

export const enum JOB_DETAILS_LABEL {
    TRUCK_DETAILS = 'Truck Details / Notes',
    DELIVERY_DETAILS = 'Delivery Details',
    NOTAVAILABLE = 'Not available',
    EMPTY = '',
}

export const ValidateAndReturnNA = ( input: string ) => {
    return input ?? JOB_DETAILS_LABEL.NOTAVAILABLE;
}

export const ValidateAndReturnEmpty = ( input: string ) => {
    return input ?? JOB_DETAILS_LABEL.EMPTY;
}