import { StyleSheet, View } from 'react-native';
import React from 'react';
import FetchApi from '../components/FetchApi';

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <FetchApi />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});