import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IJobPickupDetailsProps } from '../../types'

const JobPickup: React.FC<IJobPickupDetailsProps> = ( { jobDetailsData } ) => {
    return (
        <View style={styles.container}>
            <Text>{jobDetailsData?.['del-city']}</Text>
        </View>
    )
}

export default JobPickup

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
} )