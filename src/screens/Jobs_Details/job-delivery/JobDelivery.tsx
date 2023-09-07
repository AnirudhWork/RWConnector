import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IJobDeliveryDetailsProps } from '../../types'
import moment, { unix } from 'moment';
import { JOB_DETAILS_NOTE } from '../job-details-constants';

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
                        <Text>
                            {jobDetailsData['bol-num']}
                        </Text>
                        <View>
                            <Text>
                                {endDate}
                            </Text>
                            <Text>
                                {JOB_DETAILS_NOTE.FIXED}
                            </Text>
                        </View>
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
} )


export default JobDelivery