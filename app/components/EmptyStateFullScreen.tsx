import React from "react"
import { View, Text, ViewStyle, Dimensions } from "react-native"

export const EmptyStateFullScreen = () => {
  return (
    <View style={$root}>
      <Text>Nothing to show for now :)</Text>
    </View>
  )
}

const { width, height } = Dimensions.get("window")

const $root: ViewStyle = {
  width,
  height: height * 0.6,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
