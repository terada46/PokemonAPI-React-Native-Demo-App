import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PokemonList from './src/screens/ListScreen';
import PokemonScreen from './src/screens/PokemonScreen';

const RootNavigator = createStackNavigator(
  {
    List: {
      screen: PokemonList,
      navigationOptions: () => ({
        title: 'Pokemon List',
        headerBackTitle: 'Back',
      })
    },
    Pokemon: {
      screen: PokemonScreen,
    }
  },
  {
    headerLayoutPreset: "center",
    initialRouteName: 'List',
  },
)

export default createAppContainer(RootNavigator);