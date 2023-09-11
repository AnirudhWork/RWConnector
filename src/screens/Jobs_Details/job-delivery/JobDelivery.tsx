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
                            <Text style={styles.date}>
                                {endDate}
                            </Text>
                            <Text style={styles.fixedNote}>
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
                            `${ValidateAndReturnEmpty( jobDetailsData['del-city'] )}, ${ValidateAndReturnEmpty( jobDetailsData['del-state'] )}, ${ValidateAndReturnEmpty( jobDetailsData['del-zip'] )}`,
                            {
                                backgroundColor: globalColors.JOB_DETAIL_BG_2,
                                ...globalStyles.commonPadding,
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
        color: '#858C91',
    },
    fixedNote: {
        flex: 1,
        fontSize: 14,
        color: '#858C91',
        textAlign: 'right'
    },
    delInfo: {
        flexDirection: 'row',
        marginTop: 3,
    },
} )


export default JobDelivery