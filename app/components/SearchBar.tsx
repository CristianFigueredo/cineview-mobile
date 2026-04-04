import React from "react"
import { ViewStyle } from "react-native"
import { TextField, Card, Spacings, Colors } from "react-native-ui-lib"
import { SimpleLineIcons } from "@expo/vector-icons"

const ICON_SIZE = 20

type Props = {
  onQueryChange?: (query: string) => void
}

export const SearchBar = ({ onQueryChange }: Props) => {
  return (
    <Card containerStyle={$container}>
      <SimpleLineIcons
        style={$icon}
        name="magnifier"
        size={ICON_SIZE}
        color={Colors.$textNeutral}
      />
      <TextField
        accessibilityLabel="Search movies"
        placeholderTextColor={Colors.$textNeutral}
        placeholder="Search"
        hideUnderline
        onChangeText={onQueryChange}
        containerStyle={$textField}
      />
    </Card>
  )
}

const $container: ViewStyle = {
  padding: Spacings.s4,
  marginBottom: Spacings.s2,
  flexDirection: "row",
}

const $textField: ViewStyle = {
  flex: 1,
}

const $icon: ViewStyle = {
  marginRight: Spacings.s4,
}
