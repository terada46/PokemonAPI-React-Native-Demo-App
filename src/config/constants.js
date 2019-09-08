import { Dimensions } from 'react-native' ;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = (SCREEN_WIDTH - 5 ) / 2 - 8;
export const IMAGE_BASIC_SIZE = 96;

export const IOS_FONT = 'KannadaSangamMN-Bold';
export const ANDROID_FONT = 'Roboto';
export const ARIAL_ROUND_FONT = 'ArialRoundedMTBold';

//Firebase hosting (fastest)
export const FIREBASE_API = 'https://pokeapi-215911.firebaseapp.com/api/v2/';

//Salestock hosting (keep it just in case)
export const SALESTOCK_API = 'http://pokeapi.salestock.net/api/v2/';

//Cloudflare hosting 
export const POKE_API = 'https://pokeapi.co/api/v2/';


export const BEEDRILL_EVOLUTION_CHAIN = 'https://pokeapi-215911.firebaseapp.com/api/v2/evolution-chain/5';
