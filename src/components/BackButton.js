import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { normalize } from '../core/size';
import Icon from 'react-native-vector-icons/Ionicons';

const BackButton = (props) => (
    <TouchableOpacity onPress={props.goBack} style={styles.container}>
        <Icon
            name={'arrow-back'}
            color={props.iconColor}
            size={26}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 50,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: 'center',
        top: normalize(10),
        left: normalize(10),

    },
});

export default memo(BackButton);
