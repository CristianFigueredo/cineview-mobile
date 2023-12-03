import React from "react"
import { ViewStyle } from "react-native"
import { TextField, Card, Spacings, Colors } from "react-native-ui-lib"
import { SimpleLineIcons } from "@expo/vector-icons"

export const SearchBar = () => {
  return (
    <Card containerStyle={$container}>
      <SimpleLineIcons style={$icon} name="magnifier" size={20} color="black" />
      <TextField
        placeholderTextColor={Colors.$textNeutral}
        placeholder="Search"
        hideUnderline
        containerStyle={$textField}
      />
    </Card>
  )
}

const $container: ViewStyle = {
  padding: Spacings.s4,
  marginBottom: Spacings.s8,
  flexDirection: "row",
}

const $textField: ViewStyle = {
  width: "100%",
}

const $icon: ViewStyle = {
  marginRight: Spacings.s4,
}
