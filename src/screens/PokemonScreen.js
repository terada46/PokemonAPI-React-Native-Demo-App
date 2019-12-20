import React, { Component } from 'react';
import { Text, View, SafeAreaView, Platform } from 'react-native';
import PokemonRenderer from '../components/PokemonRenderer';
import { styles } from '../styles/PokemonScreen.style';
import { titleCase } from '../config/functions';

export default class PokemonScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: titleCase(navigation.state.params.pokemon.name),
      headerTitleStyle: {
        ...Platform.select({
          ios: {
            fontSize: 18,
          },
          android: {
            fontSize: 21
          }
        }),
      }
    };
  }

  state = {
    data: {},
  }

  componentDidMount() {
    this._catchData();
  } 

  _catchData() {
    const { navigation } = this.props;
    const thisPokemon = navigation.getParam('pokemon', 'not exist');
    if (thisPokemon.id) {
      this.setState({
        data: Object.assign({}, thisPokemon)
      }); 
    }
  }

  render() {
    return (
      <SafeAreaView style={ styles.safeAreaStyle }>
        <View style={styles.container}>
          {Object.keys(this.state.data).length > 0 ? (
            <PokemonRenderer data={this.state.data} />
          ) : (<View><Text>Data not loaded</Text></View>)}
        </View>
      </SafeAreaView>
    )
  }
}