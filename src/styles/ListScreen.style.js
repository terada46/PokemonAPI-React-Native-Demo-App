import { Platform, StyleSheet } from 'react-native';
import { ITEM_WIDTH, IOS_FONT, ANDROID_FONT, IMAGE_BASIC_SIZE } from '../config/constants';

export const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5
    },
    image_size: {
        height: IMAGE_BASIC_SIZE, 
        width: IMAGE_BASIC_SIZE, 
    },
    header: {
        backgroundColor: '#ddd',
        marginBottom: 3,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Item: {
        width: ITEM_WIDTH,
        height:150,
        borderColor: 'orange',
        paddingTop: 8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5f0e7'
    },
    Name: {
        color:'#000',
        fontSize:20, 
        ...Platform.select({
            ios: {
                fontFamily: IOS_FONT,
            },
            android: {
                fontFamily: ANDROID_FONT,
                paddingBottom: 4,
            }
        }),
    }
})