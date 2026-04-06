// we always make sure 'react-native' gets included first
import * as ReactNative from "react-native"
import mockFile from "./mockFile"

// libraries to mock
jest.doMock("react-native", () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile), // eslint-disable-line @typescript-eslint/no-unused-vars
        getSize: jest.fn(
          (
            uri: string, // eslint-disable-line @typescript-eslint/no-unused-vars
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void, // eslint-disable-line @typescript-eslint/no-unused-vars
          ) => success(100, 100),
        ),
      },
    },
    ReactNative,
  )
})

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

jest.mock("i18n-js", () => ({
  currentLocale: () => "en",
  t: (key: string, params: Record<string, string>) => {
    return `${key} ${JSON.stringify(params)}`
  },
}))

// Mock expo-image — replaces <Image> with a plain RN Image to avoid native module issues
jest.mock("expo-image", () => {
  const { Image } = require("react-native")
  return { Image }
})

// Mock @expo/vector-icons — returns a simple View so icon components render without native fonts
jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native")
  const iconFactory = () => View
  return new Proxy(
    {},
    {
      get: (_target, _prop) => iconFactory(),
    },
  )
})

// Mock react-native-ui-lib — forward to plain RN primitives so RNTL can introspect host components
jest.mock("react-native-ui-lib", () => {
  const React = require("react")
  const { View, Text, TextInput, TouchableOpacity } = require("react-native")

  function UIView({ children, style, containerStyle, testID }: any) {
    return React.createElement(View, { style: style ?? containerStyle, testID }, children)
  }

  function UIText({ children, style, testID }: any) {
    return React.createElement(Text, { style, testID }, children)
  }

  function UICard({ children, onPress, style, containerStyle, testID }: any) {
    return React.createElement(
      TouchableOpacity,
      { onPress, style: style ?? containerStyle, testID },
      children,
    )
  }

  function UIButton({ label, onPress, testID }: any) {
    return React.createElement(
      TouchableOpacity,
      { onPress, testID },
      React.createElement(Text, null, label),
    )
  }

  function UITextField({ onChangeText, placeholder, accessibilityLabel, testID }: any) {
    return React.createElement(TextInput, { onChangeText, placeholder, accessibilityLabel, testID })
  }

  return {
    View: UIView,
    Text: UIText,
    Card: UICard,
    Button: UIButton,
    TextField: UITextField,
    Spacings: new Proxy({}, { get: () => 8 }),
    Colors: new Proxy({}, { get: () => "#000" }),
    Typography: {},
  }
})

jest.useFakeTimers()
declare global {
  let __TEST__: boolean
}
