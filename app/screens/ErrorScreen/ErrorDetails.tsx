import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "../../components"
import { Colors, Spacings, Button, Text } from "react-native-ui-lib"
import Icon from "@expo/vector-icons/SimpleLineIcons"
import { translate } from "app/i18n"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <Icon icon="ladybug" size={64} />
        <Text style={$heading}>{translate("errorScreen.title")}</Text>
        <Text>{translate("errorScreen.friendlySubtitle")}</Text>
      </View>

      <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
        <Text style={$errorContent}>{`${props.error}`.trim()}</Text>
        <Text selectable style={$errorBacktrace}>
          {`${props.errorInfo?.componentStack ?? ""}`.trim()}
        </Text>
      </ScrollView>

      <Button style={$resetButton} onPress={props.onReset} label="errorScreen.reset" />
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: Spacings.s8,
  paddingTop: Spacings.s10,
  flex: 1,
}

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $heading: TextStyle = {
  color: Colors.$textDanger,
  marginBottom: Spacings.s5,
}

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: Colors.$backgroundNeutralLight,
  marginVertical: Spacings.s5,
  borderRadius: 6,
}

const $errorSectionContentContainer: ViewStyle = {
  padding: Spacings.s5,
}

const $errorContent: TextStyle = {
  color: Colors.$textDanger,
}

const $errorBacktrace: TextStyle = {
  marginTop: Spacings.s5,
  color: Colors.$textDefault,
}

const $resetButton: ViewStyle = {
  backgroundColor: Colors.$textDanger,
  paddingHorizontal: Spacings.s10,
}
