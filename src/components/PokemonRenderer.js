import React, { Component } from 'react';
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from '../styles/PokemonRenderer.style';
import { MyText } from './MyText';
import { Badge } from './Badge';
import { filterMoves } from '../config/functions';
import { PokemonCall } from '../utils/getData';
import axios from 'axios';

export default class PokemonRender extends Component {
    state = {
        chain: []
    }
    
    componentDidMount() {
        this._fetchChain();
    }

    componentWillUnmount() {
        if (typeof this._source != typeof undefined) {
            this._source.cancel('Operation canceld due to unmount.');
            this.isCancelled = true;
        }      
    }

    async _fetchChain() {
        if (typeof this._source != typeof undefined) {
            this._source.cancel('Operation canceled due to new request.')
        }
        this._source = axios.CancelToken.source();
        const { name, sprites } = this.props.data;
        try {
            const results = await PokemonCall.getChain(name, sprites.front_default, this._source);
            !this.isCancelled && this.setState({
                chain: this.state.chain.concat(results)
            });
        } catch(error) {
            console.log(error);
        }
    }

    render() {
      const { id, sprites, name, types, abilities, stats, base_experience, height, weight, moves } = this.props.data;
      stats[0].stat.name === "speed" && stats.reverse();
      const filteredMoves = filterMoves(moves);
      return (
        <View style={ styles.FLEX_ONE }>
        <ScrollView contentContainerStyle={ styles.container }>
            <View style={styles.firstRow}>
                <View  style={styles.ImageView}>
                    <Image style={ styles.image_size } source={{ uri: sprites.front_default }} />
                </View>
                <View style={[styles.FLEX_TWO, styles.VIEW_PADDING]}>
                    <View style={styles.textRow}><MyText>Id</MyText><MyText>{id}</MyText></View>
                    <View style={styles.textRow}><MyText>Name</MyText><MyText>{name}</MyText></View>
                    <View style={styles.textRow}><MyText>Types</MyText>
                        <View style={ styles.typeBadgesView }>
                            {types.map(item => (
                                <Badge key={item.type.name}>{item.type.name}</Badge>
                            ))}
                        </View>
                    </View>
                    <View style={styles.textRow}><MyText>Height</MyText><MyText>{height}</MyText></View>
                    <View style={styles.textRow}><MyText>Weight</MyText><MyText>{weight}</MyText></View>
                    <View style={styles.textRow}><MyText>Base Experience</MyText><MyText>{base_experience}</MyText></View>
                </View>
            </View>

            <View style={[styles.secondRow, styles.VIEW_PADDING ]}>
                {stats.map(item => 
                    <View key={item.stat.name} style={styles.textRow}>
                        <MyText>{item.stat.name}</MyText><MyText>{item.base_stat}</MyText>
                    </View>
                )}
                <View style={ styles.textMarginTop }><MyText>Abilities</MyText></View>
                <View style={styles.badgesView}>
                    {abilities.map(item => 
                        <Badge key={item.ability.name} style={styles.BADGES_MARGIN}>
                            {item.ability.name}
                        </Badge>
                    )}
                </View>
                <View style={ styles.textMarginTop }><MyText>Moves (learned at level 0)</MyText></View>
                <View style={styles.badgesView}>
                    {filteredMoves.map(item => 
                        <Badge key={item.move.name} style={styles.BADGES_MARGIN}>
                            {item.move.name}
                        </Badge>
                    )}
                </View>
            </View>
                        
            <View style={[styles.thirdRow, styles.VIEW_PADDING]}>
                <View><MyText>Evolution Chain</MyText></View>
                <View style={ styles.evoView }>
                    {this.state.chain.length > 0 ? this.state.chain.map(item => 
                        <View style={styles.imageView}
                            key={item.name}>
                            <Image style={ styles.resizeImage } source={{uri: item.image}} />
                            <MyText style={ styles.chainNameLineheight }>{item.name}</MyText>
                        </View>
                    ) : <View style={ styles.indicatorView }>
                            <ActivityIndicator size="large" style={{ marginTop: 20}} />
                        </View>}
                </View>
            </View>
        </ScrollView>
        </View>
      )
    }
}