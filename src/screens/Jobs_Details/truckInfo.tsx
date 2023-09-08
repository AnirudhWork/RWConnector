import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { globalStyles } from '../../Utils/global-styles'
import { GLOBAL_COLOR } from '../../Utils/global-colors'
import { OnlyNotes } from '../../Components/Notes'

const truckInfo = ( label: string, title: string, notes: string, extraStyles: ViewStyle ) => {
    return (
        <View style={[styles.container, extraStyles]}>
            {label && (
                <Text style={[globalStyles.fontStyleRegular, { color: GLOBAL_COLOR.LABEL }]}>{label}</Text>
            )}
            {title && (
                <Text style={[globalStyles.fontStyleBold, { color: GLOBAL_COLOR.Black }]}>{title}</Text>
            )}
            <OnlyNotes notes={notes} style={{ backgroundColor: 'transparent' }} />
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        flexDirection: 'column',
    }
} )

export default truckInfo