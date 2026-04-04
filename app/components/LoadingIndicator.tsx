import React from "react"
import { View, ViewStyle } from "react-native"
import { Bounce } from "react-native-animated-spinkit"
import { Colors } from "react-native-ui-lib"

const SPINNER_SIZE = 33

export const LoadingIndicator = () => {
  return (
    <View style={$container} accessibilityLabel="Loading" accessibilityRole="progressbar">
      <Bounce size={SPINNER_SIZE} color={Colors.$backgroundPrimaryHeavy} />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
