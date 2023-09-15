import { useState } from "react";
import { View, ViewStyle, Text, Platform, TouchableOpacity } from "react-native";
import { printLogs } from "../Utils/log-utils";
import { globalColors } from "../Utils/global-colors";


export const Notes: React.FC<{
  notes: string;
  style: ViewStyle;
}> = ( { style, notes } ) => {
  const TAG: string = Notes.name;
  const commonSpace = 15;
  const CONST_LINES_COUNT = 3;
  const [linesToDisplay, setLinesToDisplay] =
    useState<number>( CONST_LINES_COUNT );
  const [occupiedLines, setOccupiedLines] = useState<number>( CONST_LINES_COUNT );
  const [isShowMoreRequired, setIsShowMoreRequired] = useState<boolean>( false );

  return (
    <View
      style={[
        style,
        {
          alignContent: "center",
          flexDirection: "column",
        },
      ]}
    >
      <>
        {!isShowMoreRequired && (
          <Text
            ellipsizeMode={"tail"}
            onTextLayout={( info ) => {
              let lines = info.nativeEvent.lines.length;
              setOccupiedLines( lines );
              setIsShowMoreRequired( lines > CONST_LINES_COUNT );
              printLogs( TAG, " | Text-onTextLayout() | infoLength = ", lines );
            }}
            style={[
              { fontSize: 14 },
              {
                color: globalColors.TRUCK_NOTE_TEXT,
              },
            ]}
          >
            {notes}
          </Text>
        )}

        {isShowMoreRequired && (
          <Text
            ellipsizeMode={"tail"}
            numberOfLines={linesToDisplay}
            style={[
              { fontSize: 14 },
              {
                color: globalColors.TRUCK_NOTE_TEXT,
                maxHeight:
                  Platform.OS == "ios" ? linesToDisplay * 20 : undefined,
              },
            ]}
          >
            {notes}
          </Text>
        )}
        {isShowMoreRequired && (
          <TouchableOpacity
            onPress={() =>
              setLinesToDisplay(
                linesToDisplay == CONST_LINES_COUNT
                  ? occupiedLines
                  : CONST_LINES_COUNT
              )
            }
          >
            <Text
              style={[
                { fontSize: 14 },
                {
                  marginTop: commonSpace,
                  alignSelf: "flex-end",
                  color: "blue",
                },
              ]}
            >
              {linesToDisplay == CONST_LINES_COUNT ? "show more" : "show less"}
            </Text>
          </TouchableOpacity>
        )}
      </>
    </View>
  );
};
