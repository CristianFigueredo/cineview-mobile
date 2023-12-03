import React, { FunctionComponent } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ImageBackground, ImageStyle, TextStyle } from "react-native"
import { Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { movieDetails } from "app/data/placeholders"
import { POSTER_IMAGE_BASE_URL } from "app/services/api/constants"
import { FlashList } from "@shopify/flash-list"
import Icon from "@expo/vector-icons/AntDesign"
import { Text, Colors, Spacings, Chip, View } from "react-native-ui-lib"
import { Image } from "expo-image"
import { useRoute } from "@react-navigation/native"

interface Props extends AppStackScreenProps<"MovieDetails"> {}

export const DetailsScreen: FunctionComponent<Props> = observer(function () {
  const route = useRoute()

  React.useEffect(() => {
    // TODO: remove @ts-ignore
    // @ts-ignore
    alert(route.params.movieID)
  }, [])

  return (
    <Screen statusBarStyle="light" style={$root} preset="scroll">
      <ImageBackground
        style={$movieBackdrop}
        source={{ uri: POSTER_IMAGE_BASE_URL + movieDetails.backdrop_path }}
        blurRadius={8}
      >
        <Icon name="left" style={$goBackIcon} size={35} color="white" />
        <Icon name="play" size={35} color="white" />
      </ImageBackground>
      <View style={$contentContainer}>
        <View style={$directionRow}>
          <Image
            style={$poster}
            source={{ uri: POSTER_IMAGE_BASE_URL + movieDetails.poster_path }}
          />
          <View style={{ padding: Spacings.s4 }}>
            <Text text40M marginB-s3>
              {movieDetails.title}
            </Text>
            <View style={$directionRow}>
              {movieDetails.genres.slice(0, 3).map((genre) => (
                <Chip marginR-s2 key={genre.id} label={genre.name} />
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
        <Text text60M marginT-s6 marginB-s3>
          Cast
        </Text>
        <FlashList
          data={movieDetails.credits.cast}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item) => (
            <View marginR-s6>
              <Image
                style={$castPicture}
                source={{ uri: POSTER_IMAGE_BASE_URL + item.item.profile_path }}
              />
              <Text style={$castName} marginT-s1>
                {item.item.name.slice(0, 23)}
              </Text>
            </View>
          )}
          estimatedItemSize={120}
        />
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

const $goBackIcon: ViewStyle = { left: 30, top: 80, position: "absolute" }
