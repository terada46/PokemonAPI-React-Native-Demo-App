import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    Image,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import { styles } from '../styles/ListScreen.style';
import { PokemonCall } from '../utils/getData';
import { getFirebaseURL, formatId } from '../config/functions';
import * as Font from 'expo-font';

export default class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            offset: 0,
            refreshing: false
        }
    }
    componentDidMount() {   
        Font.loadAsync({
            'BarlowCondensed-SemiBold': require('../../assets/fonts/BarlowCondensed-SemiBold.ttf'),
            'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf')
        });
        this.isScrolled = false;
        this._fetchPokemonList();
    }

    async _fetchPokemonList() {
        if (!this.state.refreshing) {
            try {
                this.setState({ refreshing: true });
                const LISTS = await PokemonCall.getList('pokemon', this.state.offset.toString()); 
                const { results } = LISTS.data;
                let pokemonData = await this._GetPokemonsAndNormalize(results);
                this.setState({
                    data: this.state.data.concat(pokemonData),
                    offset: this.state.offset + 20,
                    refreshing: false
                });
                //Fix for second onEndReached call when flatlist is onload
                setTimeout(() => {
                    this.isScrolled = true;
                }, 500)
            } catch(error) {
                console.error(error)
            }  
        }
    }

    async _GetPokemonsAndNormalize(lists) {
        let arrays = [];
        await Promise.all(lists.map(async item => {
            let NEW_URL = getFirebaseURL(item.url);
            let pokemon = await PokemonCall.getPokemon(NEW_URL);
            arrays.push(pokemon.data);
            //console.log(`Pokemon( Id:${pokemon.data.id} ) is added to array`)
        }));
        arrays.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1
        });
        return arrays;
    }

    renderFooter = () => {
        return this.state.refreshing ? (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator animating size="large" />
            </View>
        ) : (
            <View style={{ height: 30 }} />
        )
    }

    _keyExtractor = (item) => item.id.toString();

    _renderListItem = ({item, index}) => {
        let customizedStyle = index % 2 === 0 ? { marginRight:5 } : { marginRight:0 };
        let { id, name, sprites } = item;
        id = formatId(id);
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Pokemon', { pokemon: Object.assign({}, item)});   
                }}>
                <View style={[ customizedStyle, styles.Item ]}>
                    <Text style={{ fontWeight:'bold' }}>No.{id}</Text>
                    <Image
                        style={ styles.image_size }
                        source={{ uri: sprites.front_default}}
                    />
                    <Text style={styles.Name}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _onEndReached = () => {
        if (!this.isScrolled) {
            return null;
        } else {
            this._fetchPokemonList();
        }
    }
    
    render() {
        return (
            <SafeAreaView style={styles.safeAreaStyle}>
                <View style={ styles.container }>
                    { this.state.data.length > 0 ? (
                        <FlatList
                            columnWrapperStyle={{ marginBottom:5 }}
                            data={this.state.data}
                            renderItem={this._renderListItem}
                            keyExtractor={this._keyExtractor}
                            numColumns={2}
                            onEndReached={this._onEndReached}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={this.renderFooter}
                            refreshing={this.state.refreshing}
                        />
                    ): (<ActivityIndicator size="large" color="gray" />)}
                </View>
            </SafeAreaView>
        )
    }
}