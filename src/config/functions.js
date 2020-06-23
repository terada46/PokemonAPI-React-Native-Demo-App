import { POKE_API } from './constants'

export function NormalizeListURL(endpoint, offset) {
    return POKE_API + `${endpoint}/?limit=20&offset=${offset}`;
}

export function NormalizePokemonURL(endpoint) {
    return POKE_API + 'pokemon/' + endpoint;
}

export function NormalizeSpeciesURL(endpoint) {
    return POKE_API + 'pokemon-species/' + endpoint;
}

export function filterMoves(moves) {
    let results = [];
    for (let i = 0; i < moves.length; i++) {
        if(results.length > 6) {
            return results;
        }
        const found = moves[i].version_group_details.find(element => {
            return (element.level_learned_at === 0 && element.version_group.name === "omega-ruby-alpha-sapphire");
        })
        if(found) {
            results.push(moves[i]);
        }
    }
    return results;
}

export function formatId(id) {
    if (id >= 10 && id < 100) {
        return "0" + id;
    } else if (id < 10) {
        return "00" + id;
    } else return id;
}

export function titleCase(str) {
    return str.toString().replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}