import React from "react"
import { TextStyle, ImageStyle, Pressable } from "react-native"
import { Spacings, Text } from "react-native-ui-lib"
import { Image } from "expo-image"
import { IMAGES } from "app/../assets"

const HIGH_PRIORITY_THRESHOLD = 3

type Props = {
  posterUri: string
  title: string
  onPress: () => void
  index: number
}

export const PosterCard = ({ posterUri, title, onPress, index }: Props) => {
  return (
    <Pressable onPress={onPress} accessibilityLabel={`View details for ${title}`}>
      <Image
        contentFit="cover"
        style={$poster}
        placeholder={IMAGES.GENERIC_IMAGE_PLACEHOLDER}
        placeholderContentFit="cover"
        priority={index < HIGH_PRIORITY_THRESHOLD ? "high" : "low"}
        source={{ uri: posterUri }}
      />
      <Text style={$title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </Pressable>
  )
}

const $poster: ImageStyle = {
  width: 150,
  height: 220,
  borderRadius: 10,
  overflow: "hidden",
  marginLeft: Spacings.s3,
  marginVertical: Spacings.s4,
}

const $title: TextStyle = {
  alignSelf: "center",
}
