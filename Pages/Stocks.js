import { StyleSheet, View } from 'react-native';
import React from 'react';
import SearchFromApi from '../components/SearchFromApi';

export default function Stocks() {

    return (
            <View style={styles.container}>
                <SearchFromApi />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});