import React, { FunctionComponent } from "react"
import { ViewStyle, ImageStyle, Pressable } from "react-native"
import { Spacings, View } from "react-native-ui-lib"
import { POSTER_IMAGE_BASE_URL } from "app/services/api/constants"
import { Image } from "expo-image"
import { IMovie } from "app/services/api"
import { IMAGES } from "app/../assets"

type Props = {
  information: IMovie
  onPress: () => void
  index: number
}

export const BigMovieCard: FunctionComponent<Props> = ({ information: movie, onPress, index }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={$posterContainer}>
        <Image
          contentFit="cover"
          placeholder={IMAGES.GENERIC_IMAGE_PLACEHOLDER}
          placeholderContentFit="cover"
          priority={index < 3 ? "high" : "low"}
          style={$poster}
          source={{ uri: (POSTER_IMAGE_BASE_URL + movie.poster_path).replace("original", "w500") }}
        />
      </View>
    </Pressable>
  )
}

const $poster: ImageStyle = {
  width: 300,
  height: 450,
  borderRadius: 20,
  overflow: "hidden",
}

const $posterContainer: ViewStyle = {
  justifyContent: "center",
  marginTop: Spacings.s4,
  height: 520,
}
