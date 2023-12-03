import React, { FunctionComponent } from "react"
import { TextStyle, ImageStyle, Pressable } from "react-native"
import { Spacings, Text, View } from "react-native-ui-lib"
import { POSTER_IMAGE_BASE_URL } from "app/services/api/constants"
import { Image } from "expo-image"
import { IMovie } from "app/services/api"

type Props = {
  information: IMovie
  onPress: (movieID: number) => void
}

export const TallMovieCard: FunctionComponent<Props> = ({ information: movie, onPress }) => {
  return (
    <Pressable onPress={() => onPress(movie.id)}>
      <View>
        <Image
          contentFit="cover"
          style={$poster}
          source={{ uri: (POSTER_IMAGE_BASE_URL + movie.poster_path).replace("original", "w342") }}
        />
        <Text style={$title}>{movie.title.slice(0, TITLE_MAX_LENGTH)}</Text>
      </View>
    </Pressable>
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
