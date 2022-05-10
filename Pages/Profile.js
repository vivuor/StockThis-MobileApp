import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import FavoriteStock from '../components/FavoriteStocks';

export default function Profile() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{color: 'darkslateblue', marginTop: 20, marginLeft: 20, fontSize: 20}}>
                    Hello User
                </Text>
                <Text style={{color: 'darkslateblue', marginTop: 20, marginLeft: 20,}}>
                    testiosoite@osoite.fi
                </Text>
            </View>
            <View style={styles.feed}>
                <Text style={{color: 'white', marginTop: 20, textTransform: 'uppercase', fontSize: 16}}>
                    Your portfolio
                </Text>
                <Text style={{color: 'white', marginTop: 10, marginBottom: 10}}>
                    Your favorite stocks are listed below
                </Text>
                <FavoriteStock />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'darkslateblue',
    alignItems: 'center',
    justifyContent: 'center',
},
header: {
    flex: 1,
    width: '100%',
    backgroundColor: 'lavender',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
},
feed: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center'
},
});