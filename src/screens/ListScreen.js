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
import PokemonCall from '../utils/getData';
import { formatId } from '../config/functions';
import * as Font from 'expo-font';

export default class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            data: [],
            offset: 0,
            loading: true,
            refreshing: false,
        }
    }
    componentDidMount() {   
        Font.loadAsync({
            'BarlowCondensed-SemiBold': require('../../assets/fonts/BarlowCondensed-SemiBold.ttf'),
            'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf')
        });
        this.fetchPokemonList();
    }

    fetchPokemonList = async () => {
        try {
            this.setState({refreshing: true});
            let LISTS = await PokemonCall.getList('pokemon', this.state.offset.toString()); 
            let { results } = LISTS.data;
            let pokemonData = await this.fetchPokemons(results);
            this.setState((state) => {
                return {
                    data: [...state.data, ...pokemonData],
                    refreshing: false,
                    loading: state.loading ? false : null,
                }
            });
        } catch(error) {
            console.error(error)
        }  
    }

    fetchPokemons = async (lists) => {
        let arrays = [];
        await Promise.all(lists.map(async item => {
            let pokemon = await PokemonCall.getPokemon(item.url);
            arrays.push(pokemon.data);
        }));
        arrays.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1
        });
        return arrays;
    }

    fetchMorePokemons = () => {
        this.setState((state) => {
                return {offset: state.offset + 20}
            },
            () => {
                this.fetchPokemonList()
            },
        )
    }

    renderFooter = () => {
        try {
            if (this.state.refreshing) {
                return  (
                    <View style={{paddingVertical: 20}}>
                        <ActivityIndicator animating size="large" />
                    </View>
                )
            }
            else {
                return <View style={{height: 30}} />
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    _keyExtractor = (item) => item.id.toString();

    _renderListItem = ({item, index}) => {
        let customizedStyle = index % 2 === 0 ? {marginRight:5} : {marginRight:0};
        let { id, name, sprites } = item;
        id = formatId(id);
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Pokemon', {pokemon: Object.assign({}, item)});   
                }}>
                <View style={[customizedStyle, styles.Item]}>
                    <Text style={{fontWeight:'bold'}}>No.{id}</Text>
                    <Image
                        style={styles.image_size}
                        source={{uri: sprites.front_default}}
                    />
                    <Text style={styles.Name}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _onEndReached = () => {
        if(!this.onEndReachedCalledDuringMomentum){
            this.fetchMorePokemons();
            this.onEndReachedCalledDuringMomentum = true;
        }
    }
    
    render() {
        return (
            <SafeAreaView style={styles.safeAreaStyle}>
                <View style={styles.container}>
                    {!this.state.loading ? (
                        <FlatList
                            columnWrapperStyle={{marginBottom:5}}
                            data={this.state.data}
                            extraData={this.state.data}
                            renderItem={this._renderListItem}
                            keyExtractor={this._keyExtractor}
                            numColumns={2}
                            onEndReached={this._onEndReached}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={this.renderFooter}
                            refreshing={this.state.refreshing}
                            onMomentumScrollBegin={() => {this.onEndReachedCalledDuringMomentum = false;}}
                        />
                    ): (<ActivityIndicator size="large" color="gray" />)}
                </View>
            </SafeAreaView>
        )
    }
}