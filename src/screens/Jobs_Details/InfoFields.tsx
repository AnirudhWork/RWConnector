import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { globalColors } from '../../Utils/global-colors'
import { globalStyles } from '../../Utils/global-styles'

const InfoFields = (
    text1: string, text2: string, text3: string, text4: string, extraStyles: ViewStyle
) => {
    return (
        <View
            style={[
                styles.container,
                extraStyles
            ]}>
            <Text
                style={[
                    globalStyles.fontStyleRegular,
                    {
                        color: globalColors.label
                    }]}>
                {text1}
            </Text>
            {text2 && (
                <Text
                    style={[
                        globalStyles.fontStyleBold,
                        {
                            color: globalColors.black
                        }]}>
                    {text2}
                </Text>
            )}
            {text3 && (
                <Text
                    style={[
                        globalStyles.fontStyleRegular,
                        {
                            color: globalColors.black
                        }
                    ]}>{text3}</Text>
            )}
            {text4 && (
                <Text
                    style={[
                        globalStyles.fontStyleRegular,
                        {
                            color: globalColors.black
                        }
                    ]}>{text4}</Text>
            )}
        </View>
    )
}


const styles = StyleSheet.create( {
    container: {
        flex: 1,
        flexDirection: 'column',
    },
} )

export default InfoFields