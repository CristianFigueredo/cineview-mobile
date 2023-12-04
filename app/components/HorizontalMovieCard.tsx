import React, { FunctionComponent } from "react"
import { ViewStyle, ImageStyle, TextStyle } from "react-native"
import { Card, Text, View, Spacings, Colors } from "react-native-ui-lib"
import { Image } from "expo-image"
import { IMAGES } from "app/../assets"
import truncate from "lodash.truncate"

type Props = {
  posterURL: string
  title: string
  voteAverage: number
  overview: string
  onPress?: () => void
  index: number
}

export const HorizontalMovieCard: FunctionComponent<Props> = ({
  posterURL,
  title,
  voteAverage,
  overview,
  onPress,
  index,
}) => {
  return (
    <Card onPress={onPress} key={1} style={$container}>
      <Image
        priority={index < 4 ? "high" : "low"}
        source={{ uri: posterURL.replace("original", "w342") }}
        placeholder={IMAGES.GENERIC_IMAGE_PLACEHOLDER}
        placeholderContentFit="cover"
        style={$posterImage}
      />
      <View style={$middleContainer}>
        <Text style={$titleLabel} text50M>
          {truncate(title, { length: 25 })}
        </Text>
        <Text style={$overview}>{overview?.slice(0, 90)}...</Text>
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
  top: -Spacings.s10 * 1.1,
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
