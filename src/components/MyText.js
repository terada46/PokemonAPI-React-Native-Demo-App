import React from 'react';
import { Text, Platform } from 'react-native';
import { IOS_FONT, ANDROID_FONT } from '../config/constants';
import { titleCase } from '../config/functions';

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
        fontSize: 20,
        fontWeight: '600',
        lineHeight:27,
    }, style]}>{titleCase(children)}</Text>  
);