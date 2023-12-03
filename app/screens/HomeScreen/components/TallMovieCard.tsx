import React, { FunctionComponent } from "react"
import { Image, View, TextStyle, ImageStyle } from "react-native"
import { Spacings, Text } from "react-native-ui-lib"
import { POSTER_IMAGE_BASE_URL } from "app/services/api/constants"

type Props = {
  item: {
    title: string
    poster_path: string
  }
}

export const TallMovieCard: FunctionComponent<Props> = ({ item: movie }) => {
  return (
    <View>
      <Image
        resizeMode="cover"
        style={$poster}
        source={{ uri: (POSTER_IMAGE_BASE_URL + movie.poster_path).replace("original", "w342") }}
      />
      <Text style={$title}>{movie.title.slice(0, TITLE_MAX_LENGTH)}</Text>
    </View>
  )
}

const TITLE_MAX_LENGTH = 20

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
