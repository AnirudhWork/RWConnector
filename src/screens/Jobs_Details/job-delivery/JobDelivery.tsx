import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IJobDeliveryDetailsProps } from '../../types'

const JobDelivery: React.FC<IJobDeliveryDetailsProps> = ( { jobDetailsData } ) => {
    return (
        <View style={styles.container}>
            <Text>{jobDetailsData?.['del-note']}</Text>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
} )


export default JobDelivery