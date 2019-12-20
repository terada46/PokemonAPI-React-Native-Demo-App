import { FIREBASE_API, POKE_API } from './constants'

export function NormalizeListURL(endpoint, offset) {
    return FIREBASE_API + `${endpoint}/?offset=${offset}`;
}

export function NormalizePokemonURL(endpoint) {
    return FIREBASE_API + 'pokemon/' + endpoint;
}

export function NormalizeSpeciesURL(endpoint) {
    return FIREBASE_API + 'pokemon-species/' + endpoint;
}

export function getFirebaseURL(url) {
    //Repace url to firebase api because connection to firebase host is faster
    if (url.search(POKE_API) != -1) {
        let r = url.split('/v2/'); 
        let FIREBASE_URL = FIREBASE_API + r[1];
        return FIREBASE_URL;
    } else {
        return url;
    }
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
  