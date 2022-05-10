import { StyleSheet, View, FlatList, Text } from 'react-native';
import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { SectionList } from 'react-native-web';

export default function FavoriteStock() {

    const [stocks, setStocks] = useState([]);

    const firebaseConfig = {
        apiKey: "AIzaSyCxv_n8vbdA45vWcSgWgrwCWWfZugG4PvY",
        authDomain: "stockthis-1ac5b.firebaseapp.com",
        databaseURL: "https://stockthis-1ac5b-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "stockthis-1ac5b",
        storageBucket: "stockthis-1ac5b.appspot.com",
        messagingSenderId: "873410494393",
        appId: "1:873410494393:web:633155f496b77957248068"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
 
    useEffect(() => {
        const stockRef = ref(database);
        onValue(stockRef, (snapshot) => {
            const data = snapshot.val();
            setStocks(Object.values(data));
        })
    }, []);


    return (
        <View style={styles.container}>
            <FlatList
                data={stocks}
                keyExtractor={item => item.name}
                renderItem={({item}) => 
                <View style={{margin: 10}}>
                    <View style={styles.box}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color:'darkslateblue', marginBottom: 5}}>
                            {item.ticker.map(tickers => <Text>{tickers.name} ({tickers.ticker}) {tickers.day_change}%</Text>)}
                        </Text>
                        <Text style={{color:'darkslateblue', marginBottom: 10}}>{item.ticker.map(tickers => <Text>Price: {tickers.price} {tickers.currency}</Text>)}</Text>
                        <Text style={styles.textStyle}>Day high: {item.ticker.map(tickers => <Text>{tickers.day_high} {tickers.currency}</Text>)}</Text>
                        <Text style={styles.textStyle}>Day low: {item.ticker.map(tickers => <Text>{tickers.day_low} {tickers.currency}</Text>)}</Text>
                        <Text style={styles.textStyle}>Day open: {item.ticker.map(tickers => <Text>{tickers.day_open} {tickers.currency}</Text>)}</Text>
                        <Text style={styles.textStyle}>Previous close: {item.ticker.map(tickers => <Text>{tickers.previous_close_price} {tickers.currency}</Text>)}</Text>
                   
                    </View>
                </View>
                }
            />
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
    textStyle: {
        color: 'darkslateblue',
        marginBottom: 5
    },
    box: {
        backgroundColor: 'lavender',
        color: 'darkslateblue',
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
  });