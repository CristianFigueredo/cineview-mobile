import React, { FunctionComponent, useState, useEffect, Fragment, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ImageStyle, TextStyle, Alert } from "react-native"
import { FullScreenLoader, Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { POSTER_IMAGE_BASE_URL } from "app/services/api/constants"
import { FlashList } from "@shopify/flash-list"
import Icon from "@expo/vector-icons/AntDesign"
import { Text, Colors, Spacings, Chip, View } from "react-native-ui-lib"
import { Image, ImageBackground } from "expo-image"
import { useRoute } from "@react-navigation/native"
import { api } from "app/services/api"
import { IMovieDetail } from "app/services/api/entities"
import { openLinkInBrowser } from "app/utils/openLinkInBrowser"
import { TouchableOpacity } from "react-native-gesture-handler"

interface Props extends AppStackScreenProps<"MovieDetails"> {}

export const DetailsScreen: FunctionComponent<Props> = observer(function () {
  const [movieDetails, setMovieDetails] = useState<IMovieDetail>()
  const [cast, setCast] = useState<IMovieDetail["credits"]["cast"]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const route = useRoute()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      // TODO: remove ts-ignore
      // @ts-ignore
      const details = await api.movies.getDetailsWith(route.params?.movieID)
      console.tron.log(details.credits.cast)
      setMovieDetails(details)
      setCast(details.credits.cast.filter((cast) => cast.profile_path !== null))
      setIsLoading(false)
    }
    fetchMovieDetails().catch(() => Alert.alert("Something went wrong"))
  }, [])

  const showMovieTrailer = useCallback(async () => {
    const videoKey = movieDetails?.videos.results.find((video) => video.type === "Trailer")?.key
    if (!videoKey) return Alert.alert("No trailer found :(")

    openLinkInBrowser("https://www.youtube.com/watch?v=" + videoKey)
  }, [movieDetails])

  if (isLoading) return <FullScreenLoader />
  if (!movieDetails) return null

  return (
    <Screen statusBarStyle="light" style={$root} preset="scroll">
      <ImageBackground
        style={$movieBackdrop}
        source={{
          uri: (POSTER_IMAGE_BASE_URL + movieDetails.backdrop_path).replace("original", "w300"),
        }}
        blurRadius={1}
      >
        <TouchableOpacity onPress={showMovieTrailer}>
          <Icon name="play" size={35} color="white" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={$contentContainer}>
        <View style={$directionRow}>
          <Image
            style={$poster}
            source={{
              uri: (POSTER_IMAGE_BASE_URL + movieDetails.poster_path).replace("original", "w342"),
            }}
          />
          <View style={{ padding: Spacings.s4 }}>
            <Text text40M marginB-s3>
              {movieDetails.title}
            </Text>
            <View style={$genres}>
              {movieDetails.genres.map((genre) => (
                <Chip size={20} marginB-s1 marginR-s2 key={genre.id} label={genre.name} />
              ))}
            </View>
            <Text text80 marginT-s2>
              {movieDetails.runtime} min
            </Text>
          </View>
        </View>
        <Text text60M marginB-s2>
          Introduction
        </Text>
        <Text marginB-s4>{movieDetails.overview}</Text>
        {!!cast && (
          <Fragment>
            <Text text60M marginT-s6 marginB-s3>
              Cast
            </Text>
            <FlashList
              data={movieDetails.credits.cast}
              horizontal
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={100}
              renderItem={(item) => (
                <View marginR-s6>
                  <Image
                    style={$castPicture}
                    source={{
                      uri: (POSTER_IMAGE_BASE_URL + item.item.profile_path).replace(
                        "original",
                        "w185",
                      ),
                    }}
                  />
                  <Text style={$castName} marginT-s1>
                    {item.item.name.slice(0, 23)}
                  </Text>
                </View>
              )}
            />
          </Fragment>
        )}
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $movieBackdrop: ViewStyle = {
  width: "100%",
  height: 400,
  justifyContent: "center",
  alignItems: "center",
}

const $contentContainer: ViewStyle = {
  borderRadius: 20,
  backgroundColor: Colors.$backgroundNeutralLight,
  top: -35,
  padding: Spacings.s6,
}

const $directionRow: ViewStyle = {
  flexDirection: "row",
}

const $poster: ImageStyle = {
  width: 170,
  height: 250,
  borderRadius: 10,
  top: -75,
}

const $castPicture: ImageStyle = {
  width: 80,
  height: 80,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 40,
  borderWidth: 1,
}

const $castName: TextStyle = {
  textAlign: "center",
  fontSize: 12,
}

const $genres: ViewStyle = {
  maxWidth: 200,
  flexDirection: "row",
  flexWrap: "wrap",
}

const $fullScreenLoader: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
