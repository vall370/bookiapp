import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
} from 'react-native';
import { Divider, Menu } from 'react-native-paper';

export default function SearchDropDown(props) {
    console.log(props.dataSource)
    const { dataSource } = props
    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'white'
            }}>
            {
                dataSource.length ?
                    dataSource.map(item => {
                        return (
                            <>
                                <Menu.Item style={{ backgroundColor: 'white' }} onPress={props.onPress} title={item} />
                                <Divider />
                            </>
                        )
                    })
                    :
                    <View
                        style={styles.noResultView}>
                        <Text style={styles.noResultText}>No search items matched</Text>
                    </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        zIndex: 20,
        marginTop: '10%',
        position: 'absolute',
        top: '6.2%',
        left: 0, right: 0, bottom: 0,

    },
    subContainer: {

        backgroundColor: '#84DCC6',
        paddingTop: 10,
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',

        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemView: {
        // marginHorizontal: '10%',
        backgroundColor: 'white',
        height: 30,
        width: '90%',
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
    },
    noResultView: {
        alignSelf: 'center',
        // margin: 20,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },

});