import React from "react"
import { ImageStyle, Pressable } from "react-native"
import { Image } from "expo-image"
import { IMAGES } from "app/../assets"

const HIGH_PRIORITY_THRESHOLD = 3

type Props = {
  posterUri: string
  title: string
  onPress: () => void
  index: number
}

export const FeaturedCard = ({ posterUri, title, onPress, index }: Props) => {
  return (
    <Pressable onPress={onPress} accessibilityLabel={`View details for ${title}`}>
      <Image
        contentFit="cover"
        placeholder={IMAGES.GENERIC_IMAGE_PLACEHOLDER}
        placeholderContentFit="cover"
        priority={index < HIGH_PRIORITY_THRESHOLD ? "high" : "low"}
        style={$poster}
        source={{ uri: posterUri }}
      />
    </Pressable>
  )
}

const $poster: ImageStyle = {
  width: 300,
  height: 450,
  borderRadius: 20,
  overflow: "hidden",
}
