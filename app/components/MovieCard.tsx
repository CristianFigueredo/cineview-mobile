import React from "react"
import { ViewStyle, ImageStyle, TextStyle } from "react-native"
import { Card, Text, View, Spacings, Colors } from "react-native-ui-lib"
import { Image } from "expo-image"
import { IMAGES } from "../../assets"

const HIGH_PRIORITY_THRESHOLD = 4
const POSTER_TOP_OFFSET = -(Spacings.s10 * 1.1)

type Props = {
  posterUri: string
  title: string
  voteAverage: number
  overview?: string
  onPress?: () => void
  index: number
}

export const MovieCard = ({ posterUri, title, voteAverage, overview, onPress, index }: Props) => {
  return (
    <Card onPress={onPress} style={$container}>
      <Image
        priority={index < HIGH_PRIORITY_THRESHOLD ? "high" : "low"}
        source={{ uri: posterUri }}
        placeholder={IMAGES.GENERIC_IMAGE_PLACEHOLDER}
        placeholderContentFit="cover"
        style={$posterImage}
      />
      <View style={$middleContainer}>
        <Text style={$titleLabel} text50M numberOfLines={1}>
          {title}
        </Text>
        <Text style={$overview} numberOfLines={3}>
          {overview}
        </Text>
      </View>
      <Text style={$voteAverageLabel}>{voteAverage.toFixed(1)}</Text>
    </Card>
  )
}

const $container: ViewStyle = {
  width: "100%",
  height: 168,
  flexDirection: "row",
  justifyContent: "space-between",
  padding: Spacings.s6,
  overflow: "visible",
  marginBottom: Spacings.s8,
}

const $posterImage: ImageStyle = {
  width: 110,
  height: 170,
  borderRadius: 10,
  top: POSTER_TOP_OFFSET,
}

const $voteAverageLabel: TextStyle = {
  color: Colors.$textPrimary,
  fontWeight: "800",
  fontSize: 20,
}

const $titleLabel: TextStyle = {
  color: Colors.$textPrimary,
  marginBottom: Spacings.s1,
  textAlign: "center",
}

const $overview: TextStyle = {
  fontWeight: "400",
  fontSize: 12,
  color: Colors.$textNeutral,
  textAlign: "center",
  marginTop: Spacings.s1,
}

const $middleContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: Spacings.s3,
}
