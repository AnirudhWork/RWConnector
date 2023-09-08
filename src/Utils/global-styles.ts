import { StyleSheet } from 'react-native';
import { FONT_FAMILY } from './global-enums';

export const globalStyles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    fontStyleRegular: {
        fontSize: 14,
        fontFamily: FONT_FAMILY.INTER_REGULAR,
    },
    fontStyleBold: {
        fontSize: 14,
        fontFamily: FONT_FAMILY.INTER_BOLD,
    },
    fontStyleSmall: {
        fontSize: 12,
        fontFamily: FONT_FAMILY.INTER_REGULAR,
    },
    fontStyleBoldLarge: {
        fontSize: 16,
        fontFamily: FONT_FAMILY.INTER_BOLD,
    },
    absoluteStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    alignCenterStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    shadowStyle: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    commonPadding: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 15,
    },
} ) 