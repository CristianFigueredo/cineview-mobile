import React, { FunctionComponent } from "react"
import { Image, View, ViewStyle, ImageStyle } from "react-native"
import { Spacings } from "react-native-ui-lib"
import { POSTER_IMAGE_BASE_URL } from "app/services/api/constants"

type Props = {
  item: {
    poster_path: string
  }
}

export const BigMovieCard: FunctionComponent<Props> = ({ item: movie }) => {
  return (
    <View style={$posterContainer}>
      <Image
        resizeMode="cover"
        style={$poster}
        source={{ uri: POSTER_IMAGE_BASE_URL + movie.poster_path }}
      />
    </View>
  )
}

const $poster: ImageStyle = {
  width: 300,
  height: 450,
  borderRadius: 20,
  borderWidth: 2,
  overflow: "hidden",
}

const $posterContainer: ViewStyle = {
  justifyContent: "center",
  marginTop: Spacings.s4,
  height: 520,
}
