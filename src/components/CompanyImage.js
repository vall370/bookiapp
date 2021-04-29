import React, { useState, useEffect, useRef } from 'react';
import { Image, View } from 'react-native';

export const CompanyImage = props => {
    switch (props.value) {
        case 'Lulebo':
            return (
                <View style={styles.buttonContainer}>
                    <Image
                        style={{ height: 100, width: '100%', resizeMode: 'contain' }}
                        source={{
                            uri: 'http://167.99.133.22:8080/uploads/foretag/lulebo.png',
                        }}
                    />
                </View>
            );
        case 'Lindbäcks Fastigheter':
            return (
                <View elevation={25}>
                    <Image
                        style={{ height: 100, width: '100%', resizeMode: 'contain' }}
                        source={{
                            uri: 'http://192.168.0.49:8081/uploads/foretag/lindb%C3%A4cks_logo.png',
                        }}
                    />
                </View>
            );
        case 'Diös Fastigheter':
            return (
                <View elevation={25}>
                    <Image source={require('../../assets/dios_logo_vit.png')} style={{ height: 100, width: '100%', resizeMode: 'contain' }}
                    />
                </View>
            );
        case 'Heimstaden':
            return <Text>You are a Manager.</Text>;
        case 'Demo Fastigheter':
            return (
                <Image
                    style={{ height: 100, width: '100%', resizeMode: 'contain' }}
                    source={{
                        uri: 'http://192.168.0.49:8081/uploads/foretag/cebola.png',
                    }}
                />
            );
        default:
            return (
                <Image
                    style={{ height: 100, width: '100%', resizeMode: 'contain' }}
                    source={{
                        uri: 'http://192.168.0.49:8081/uploads/foretag/cebola.png',
                    }}
                />
            );
    }
};