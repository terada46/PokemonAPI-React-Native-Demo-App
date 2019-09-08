import { StyleSheet, Platform } from 'react-native';
import { SCREEN_WIDTH, IMAGE_BASIC_SIZE } from '../config/constants';

export const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        backgroundColor: '#FEFEFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        paddingVertical: 3,
    },
    FLEX_ONE:{
        flex: 1
    }, 
    FLEX_TWO: {
        flex: 2
    },
    image_size: {
        height: IMAGE_BASIC_SIZE, 
        width: IMAGE_BASIC_SIZE, 
    },
    firstRow: {
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#f5f0e7',
    },
    ImageView: {
        padding: 1, 
        flex: 1.2, 
        alignSelf:'center', 
        justifyContent:'center', 
        alignItems:'center', 
    },
    typeBadgesView: {
        paddingRight: 4, 
        flexDirection: 'row'
    },
    secondRow: {
        width: '100%',
        flexDirection: 'column',
    },
    textMarginTop: {
        marginTop: 6.2,
    },
    thirdRow: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    evoView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
   
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    badgesView: {
        marginLeft: 10, 
        marginBottom: 3,
        ...Platform.select({
            android: {
                paddingTop: 3,
            }
        }),
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    BADGES_MARGIN: {
        marginRight: 2,
        marginBottom: 4
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 2,
    },
    imageView: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 4, 
        marginBottom: 5,
    },
    chainNameLineheight: {
        lineHeight: 20,
    },
    resizeImage: {
        height: 68,
        width: 90,
        resizeMode: 'cover'
    },
    indicatorView: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    VIEW_PADDING: {
        paddingHorizontal:17, paddingVertical:8
    },
});