import React from "react"
import { View, ActivityIndicator, ViewStyle } from "react-native"

export const FullScreenLoader = () => {
  return (
    <View style={$fullScreenLoader}>
      <ActivityIndicator color={"black"} />
    </View>
  )
}

const $fullScreenLoader: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
