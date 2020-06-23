import { 
    NormalizeListURL, 
    NormalizePokemonURL, 
    NormalizeSpeciesURL,
} from '../config/functions'
import { BEEDRILL_EVOLUTION_CHAIN } from '../config/constants';
import axios from 'axios';

async function loadJson(url, source) {
    let response;
    try {
        if (source) {
            response = await axios.get(url, { cancelToken: source.token});
        } else {
            response = await axios.get(url);
        }
        return response;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            throw error;
        }
    }
}

export default class PokemonCall {
    static async getList(endpoint, offset) {
        let lists, listURL = NormalizeListURL(endpoint, offset);
        try {
            lists = await loadJson(listURL);
        } catch (err) { 
            if (err instanceof HttpError && err.response.status == 404) {
                alert("No such resource");
            } else {
                console.error(err);
            }
        }
        return lists;
    }

    static async getPokemon(url, source) {
        let pokemon;
        try {
            pokemon = await loadJson(url, source)
        } catch (err) { 
            if (err instanceof HttpError && err.response.status == 404) {
                alert("No such pokemon, please check resource\'s name");
            } else {
                console.error(err);
            }
        }
        return pokemon;
    }

    static async getChain(thisName, front_default, source) {
        let arrays = []; 
        let evolvesTo;
        let SpeciesRes, ChainRes;
        try {
            // fix a small bug that fetching pokemon beedrill's evolution chain 
            // would throw an error in android emulator.
            if (thisName === 'beedrill') {
                try {
                    ChainRes = await loadJson( BEEDRILL_EVOLUTION_CHAIN, source );
                } catch (err) {
                    throw err;
                }
            } else {
                SpeciesRes = await loadJson(NormalizeSpeciesURL(thisName), source);
                ChainRes = await loadJson(SpeciesRes.data.evolution_chain.url, source);
            }
        } catch (err) {
            if (err instanceof HttpError && err.response.status == 404) {
                alert("The species or chain does not exist, please check resource\'s name.");
            } else {
                console.log(err.name);
            }        
        }
        if (ChainRes !== undefined && ChainRes.data.id) {
            const { evolves_to, species } = ChainRes.data.chain;
            if (evolves_to.length === 0) {
                arrays.push({name: thisName, image: front_default})
            } else {
                if (species.name === thisName) {
                    arrays.push({name: thisName, image: front_default})
                } else {
                    try {
                        let pokemon = await this.getPokemon(NormalizePokemonURL(species.name), source);
                        let front_image = pokemon.data.sprites.front_default;
                        arrays.push({name: species.name, image: front_image});
                    } catch (err) {
                        console.log(err.name);
                    }
                }
                evolvesTo = Object.assign({}, evolves_to); 
                
                if (Object.keys(evolvesTo).length === 1) {
                    while (Object.keys(evolvesTo).length > 0) {
                        if (evolvesTo[0].species.name === thisName) {
                            arrays.push({name: thisName, image: front_default})
                        } else {
                            try {
                                let pokemon = await this.getPokemon(NormalizePokemonURL(evolvesTo[0].species.name), source);
                                let front_image = pokemon.data.sprites.front_default;
                                arrays.push({name: evolvesTo[0].species.name, image: front_image});
                            } catch (err) {
                                console.log(err.name);
                            }
                        }
                        evolvesTo = Object.assign({}, evolvesTo[0].evolves_to);
                    }
                } else if (Object.keys(evolvesTo).length > 1) {
                    for (prop in evolvesTo) {
                        if (evolvesTo[prop].species.name === thisName) {
                            arrays.push({name: thisName, image: front_default})
                        } else {
                            try {
                                let pokemon = await this.getPokemon(NormalizePokemonURL(evolvesTo[prop].species.name), source);
                                let front_image = pokemon.data.sprites.front_default;
                                arrays.push({name: evolvesTo[prop].species.name, image: front_image});
                            } catch (err) {
                                console.log(err.name);
                            }
                        }
                    }
                }          
            }
        }
        return arrays;
    }
}

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.config.url}`);
        this.name = 'HttpError';
        this.response = response;
        Error.captureStackTrace(this, this.constructor);
    }
}