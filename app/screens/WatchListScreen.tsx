import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "app/components"
import { TabScreenProps } from "app/navigators/RootNavigator"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface WatchListScreenProps extends TabScreenProps<"WatchList"> {}

export const WatchListScreen: FC<WatchListScreenProps> = observer(function WatchListScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="watchList" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
