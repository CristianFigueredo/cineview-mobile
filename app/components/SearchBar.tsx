import React from "react"
import { ViewStyle } from "react-native"
import { TextField, Card, Spacings } from "react-native-ui-lib"
import { SimpleLineIcons } from "@expo/vector-icons"

export const SearchBar = () => {
  return (
    <Card style={$container}>
      <SimpleLineIcons style={$icon} name="magnifier" size={20} color="black" />
      <TextField placeholder="Search" hideUnderline containerStyle={$textField} />
    </Card>
  )
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: Spacings.s4,
  marginBottom: Spacings.s8,
  flexDirection: "row",
  paddingLeft: Spacings.s9,
}

const $textField: ViewStyle = {
  width: "100%",
}

const $icon: ViewStyle = {
  marginRight: Spacings.s4,
}
