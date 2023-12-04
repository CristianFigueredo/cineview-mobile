import React, { FunctionComponent } from "react"
import { View, Text, ViewStyle, Dimensions, ImageStyle } from "react-native"
import { Image } from "expo-image"
import { IMAGES } from "assets/index"
import { Spacings, Button } from "react-native-ui-lib"

type Props = {
  imageID?: ImageID
  message?: string
  button?: {
    onPress: () => void
    label: string
  }
}

export const EmptyStateFullScreen: FunctionComponent<Props> = ({
  imageID = "empty",
  message = defaultMessage,
  button,
}) => {
  return (
    <View style={$root}>
      <Image style={$image} source={images[imageID]} />
      <Text>{message}</Text>
      {button && <Button style={$button} label={button.label} onPress={button.onPress} />}
    </View>
  )
}

const images = {
  empty: IMAGES.TUMBLEWEED_IN_THE_DESERT,
  not_found: IMAGES.NOT_FOUND,
} as const

type ImageID = keyof typeof images

const defaultMessage = "Nothing to show for now :)"

const { width, height } = Dimensions.get("window")

const $root: ViewStyle = {
  width,
  height: height * 0.6,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $image: ImageStyle = {
  width: 150,
  height: 150,
  marginBottom: Spacings.s3,
}

const $button: ViewStyle = {
  marginTop: Spacings.s5,
}
