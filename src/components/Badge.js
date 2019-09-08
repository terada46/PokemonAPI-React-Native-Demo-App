import React from 'react';
import { Text, Platform } from 'react-native';
import { ARIAL_ROUND_FONT, ANDROID_FONT } from '../config/constants';

export const Badge = (props) => (
    <Text style={[ {
        ...Platform.select({
            ios: {
                fontFamily: ARIAL_ROUND_FONT,
                lineHeight: 15,
                fontSize:15,
            },
            android: {
                fontFamily: ANDROID_FONT,
                lineHeight: 19,
                fontSize: 18,
            }
        }),
        fontWeight:'600',
        color:'white',
        paddingLeft: 7,
        paddingRight: 6,
        paddingVertical: 4,
        letterSpacing:2,
        backgroundColor:'#e56540',
        borderRadius:11,
        borderWidth:1,
        borderColor:'#fff',
        overflow:'hidden'
      }, props.style]}>{props.children}</Text>
);