import React from 'react';
import { Text, Platform } from 'react-native';
import { IOS_FONT, ANDROID_FONT } from '../config/constants'

function toTitleCase(str) {
    return str.toString().replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export const MyText = ({ children, style }) => (
    <Text style={[{
        ...Platform.select({
            ios: {
                fontFamily: IOS_FONT,
            },
            android: {
                fontFamily: ANDROID_FONT,
            },
        }),
        fontSize: 18,
        fontWeight: '600',
        lineHeight:27,
    }, style]}>{toTitleCase(children)}</Text>  
);