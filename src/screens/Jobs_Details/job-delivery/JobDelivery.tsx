import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IJobDeliveryDetailsProps } from '../../types'
import moment, { unix } from 'moment';
import { JOB_DETAILS_LABEL, JOB_DETAILS_NOTE, ValidateAndReturnEmpty, ValidateAndReturnNA } from '../job-details-constants';
import truckInfo from '../truckInfo';
import { globalStyles } from '../../../Utils/global-styles';
import InfoFields from '../InfoFields';
import { globalColors } from '../../../Utils/global-colors';

const JobDelivery: React.FC<IJobDeliveryDetailsProps> = ( { jobDetailsData } ) => {

    const [endDate, setEndDate] = useState<string>();
    const deliveryDate = jobDetailsData?.['del-date'];

    useEffect( () => {
        setEndDate(
            deliveryDate
                ? moment( unix( deliveryDate ) ).format( 'DD-MMM-YYYY' )
                : '',
        );
    }, [] )
    return (
        <View style={styles.container}>
            {jobDetailsData && (
                <ScrollView automaticallyAdjustKeyboardInsets={true}>
                    {/* Date section */}
                    <View style={styles.numberInfoContainer}>
                        <Text style={styles.truckNumber}>
                            {jobDetailsData['bol-num']}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.date, { color: globalColors.JOB_DETAILS_DATE }]}>
                                {endDate}
                            </Text>
                            <Text style={[styles.fixedNote, { color: globalColors.JOB_DETAILS_DATE }]}>
                                {JOB_DETAILS_NOTE.FIXED}
                            </Text>
                        </View>
                    </View>

                    {truckInfo( JOB_DETAILS_LABEL.TRUCK_DETAILS, jobDetailsData['pu-name'], jobDetailsData['pu-note'], { backgroundColor: globalColors.JOB_DETAIL_BG_1, ...globalStyles.commonPadding } )}

                    <View style={styles.delInfo}>
                        {InfoFields(
                            JOB_DETAILS_LABEL.DELIVERY_DETAILS,
                            ValidateAndReturnNA( jobDetailsData['del-name'] ),
                            ValidateAndReturnNA( jobDetailsData['del-addr'] ),
                            `${ValidateAndReturnEmpty( jobDetailsData['del-city'] )}, ${ValidateAndReturnEmpty( jobDetailsData['del-state'] )} ${ValidateAndReturnEmpty( jobDetailsData['del-zip'] )}`,
                            {
                                backgroundColor: globalColors.JOB_DETAIL_BG_2,
                                ...globalStyles.commonPadding,
                            }
                        )}
                        {InfoFields(
                            JOB_DETAILS_LABEL.CONTACT_DETAILS,
                            ValidateAndReturnNA( jobDetailsData['del-name'] ),
                            `Tel: ${ValidateAndReturnEmpty( jobDetailsData['del-phone'] )}`,
                            `Email: ${ValidateAndReturnEmpty( jobDetailsData['del-email'] )}`,
                            {
                                backgroundColor: globalColors.JOB_DETAIL_BG_1,
                                ...globalStyles.commonPadding,
                            }
                        )}
                    </View>
                    <View style={styles.delInfo}>
                        {InfoFields(
                            JOB_DETAILS_LABEL.BILL_DETAILS,
                            ValidateAndReturnNA( jobDetailsData['cust-name'] ),
                            ValidateAndReturnEmpty( jobDetailsData['cust-addr'] ),
                            `${ValidateAndReturnEmpty( jobDetailsData['cust-city'] )}, ${ValidateAndReturnEmpty( jobDetailsData['cust-state'] )} ${ValidateAndReturnEmpty( jobDetailsData['cust-zip'] )}`,
                            {
                                backgroundColor: globalColors.JOB_DETAIL_BG_2,
                                marginTop: 3,
                                padding: 15,
                            }
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    numberInfoContainer: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        padding: 15,
    },
    truckNumber: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
    },
    date: {
        fontSize: 14,
    },
    fixedNote: {
        flex: 1,
        fontSize: 14,
        textAlign: 'right'
    },
    delInfo: {
        flexDirection: 'column',
        marginTop: 3,
    },
} )


export default JobDelivery