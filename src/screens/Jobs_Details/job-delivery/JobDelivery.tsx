import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IJobDeliveryDetailsProps } from '../../types'
import moment, { unix } from 'moment';
import { JOB_DETAILS_LABEL, JOB_DETAILS_NOTE } from '../job-details-constants';
import truckInfo from '../truckInfo';
import { globalStyles } from '../../../Utils/global-styles';

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

                    {truckInfo( JOB_DETAILS_LABEL.TRUCK_DETAILS, jobDetailsData['pu-name'], jobDetailsData['pu-note'], { backgroundColor: '#F5F5F5', ...globalStyles.commonPadding } )}
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
} )


export default JobDelivery