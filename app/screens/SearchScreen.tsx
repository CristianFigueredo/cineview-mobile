import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "app/components"
import { TabScreenProps } from "app/navigators/RootNavigator"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SearchScreenProps extends TabScreenProps<"Search"> {}

export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="search" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
