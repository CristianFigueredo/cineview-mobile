import React from "react"
import { ViewStyle, ImageStyle, useWindowDimensions } from "react-native"
import { View, Text, Button, Spacings } from "react-native-ui-lib"
import { Image } from "expo-image"
import { IMAGES } from "assets/index"

type ImageVariant = "empty" | "not_found"

type ButtonProps = {
  label: string
  onPress: () => void
}

type Props = {
  variant?: ImageVariant
  message?: string
  button?: ButtonProps
}

const IMAGE_HEIGHT_RATIO = 0.6

const images: Record<ImageVariant, number> = {
  empty: IMAGES.TUMBLEWEED_IN_THE_DESERT,
  not_found: IMAGES.NOT_FOUND,
}

export const EmptyState = ({
  variant = "empty",
  message = "Nothing to show for now",
  button,
}: Props) => {
  const { height } = useWindowDimensions()

  return (
    <View style={[$root, { height: height * IMAGE_HEIGHT_RATIO }]}>
      <Image style={$image} source={images[variant]} />
      <Text>{message}</Text>
      {button && <Button style={$button} label={button.label} onPress={button.onPress} />}
    </View>
  )
}

const $root: ViewStyle = {
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
