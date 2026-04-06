import React, { Fragment, useCallback, PropsWithChildren } from "react"
import { ViewStyle, ImageStyle, TextStyle, Pressable } from "react-native"
import { LoadingIndicator, EmptyState, Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { getPosterUrl } from "app/services/api/constants"
import { FlashList } from "@shopify/flash-list"
import Icon from "@expo/vector-icons/Octicons"
import { Text, Colors, Spacings, Chip, View, Button } from "react-native-ui-lib"
import { Image, ImageBackground } from "expo-image"
import { useNavigation, useRoute } from "@react-navigation/native"
import { IMovieDetail } from "app/services/api/entities"
import { openLinkInBrowser } from "app/utils/openLinkInBrowser"
import { useStores } from "app/models"
import { IMAGES } from "app/../assets"
import { useMovieDetails } from "app/hooks/useMovieDetails"

type CastMember = IMovieDetail["credits"]["cast"][number]

interface Props extends AppStackScreenProps<"MovieDetails"> {}

export const DetailsScreen = (_: Props) => {
  const route = useRoute()
  // @ts-ignore TODO: fix navigation param types
  const movieID = route.params?.movieID as string

  const { data: movieDetails, isLoading, isError } = useMovieDetails(movieID)
  const cast = movieDetails?.credits.cast.filter((member) => member.profile_path !== null) ?? []

  const {
    watchListStore: { addMovieToWatchList, removeMovieFromWatchList, isMovieInWatchList },
  } = useStores()
  const navigation = useNavigation()

  const showMovieTrailer = useCallback(async () => {
    const videoKey = movieDetails?.videos.results.find((video) => video.type === "Trailer")?.key
    if (!videoKey) return

    openLinkInBrowser("https://www.youtube.com/watch?v=" + videoKey)
  }, [movieDetails])

  const renderCastMemberCard = useCallback(
    ({ item }: { item: CastMember }) => (
      <View marginR-s6>
        <Image
          style={$castPicture}
          placeholder={IMAGES.GENERIC_IMAGE_PLACEHOLDER}
          placeholderContentFit="cover"
          source={{ uri: getPosterUrl(item.profile_path, "w185") }}
        />
        <Text style={$castName} marginT-s1>
          {item.name.slice(0, 13)}
        </Text>
      </View>
    ),
    [],
  )

  if (isLoading) return <LoadingIndicator />
  if (isError || !movieDetails) return <EmptyState message="Could not load movie details." />

  return (
    <Screen statusBarStyle="light" style={$root} preset="scroll">
      <ImageBackground
        style={$movieBackdrop}
        placeholder={IMAGES.MOVIE_BACKDROP_PLACEHOLDER}
        placeholderContentFit="cover"
        source={{ uri: getPosterUrl(movieDetails.backdrop_path, "w342") }}
        blurRadius={1}
      >
        <IconWrapper onPress={navigation.goBack} size="small" style={$closeIconWrapper}>
          <Icon size={25} color="white" name="x" />
        </IconWrapper>
        <IconWrapper size="small" onPress={showMovieTrailer}>
          <Icon name="play" size={25} color="white" />
        </IconWrapper>
      </ImageBackground>

      <View style={$contentContainer}>
        <View style={$directionRow}>
          <Image
            style={$poster}
            placeholder={IMAGES.GENERIC_IMAGE_PLACEHOLDER}
            placeholderContentFit="cover"
            source={{ uri: getPosterUrl(movieDetails.poster_path, "w342") }}
          />
          <View style={$titleAndDetailsContainer}>
            <Text text60M marginB-s3>
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

        {cast.length > 0 && (
          <Fragment>
            <Text text60M marginT-s6 marginB-s3>
              Cast
            </Text>
            <FlashList
              data={cast}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderCastMemberCard}
            />
          </Fragment>
        )}

        <Button
          label={isMovieInWatchList(movieDetails.id) ? "Remove from WatchList" : "Add to WatchList"}
          onPress={() => {
            if (isMovieInWatchList(movieDetails.id)) {
              removeMovieFromWatchList(movieDetails.id)
            } else {
              addMovieToWatchList({ ...movieDetails, genre_ids: [] })
            }
          }}
          marginT-s10
        />
      </View>
    </Screen>
  )
}

type IconWrapperSize = "big" | "small"

type IconWrapperProps = PropsWithChildren<{
  size?: IconWrapperSize
  style?: ViewStyle
  onPress?: () => void
}>

const iconWrapperSizes: Record<IconWrapperSize, ViewStyle> = {
  big: { width: 65, height: 65, borderRadius: 32.5 },
  small: { width: 45, height: 45, borderRadius: 22.5 },
}

const IconWrapper = ({ children, size = "big", style, onPress }: IconWrapperProps) => (
  <Pressable onPress={onPress} style={[$iconWrapper, iconWrapperSizes[size], style]}>
    {children}
  </Pressable>
)

const $root: ViewStyle = { flex: 1, zIndex: 1 }

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

const $directionRow: ViewStyle = { flexDirection: "row" }

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

const $castName: TextStyle = { textAlign: "center", fontSize: 12 }

const $genres: ViewStyle = {
  maxWidth: 200,
  flexDirection: "row",
  flexWrap: "wrap",
}

const $titleAndDetailsContainer: ViewStyle = {
  marginLeft: Spacings.s4,
  marginTop: Spacings.s4,
  maxWidth: 200,
}

const $closeIconWrapper: ViewStyle = {
  position: "absolute",
  top: 50,
  left: 20,
  zIndex: 2,
}

const $iconWrapper: ViewStyle = {
  backgroundColor: "rgba(0,0,0,0.3)",
  justifyContent: "center",
  alignItems: "center",
}
