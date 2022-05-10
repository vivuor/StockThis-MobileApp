import { Alert, StyleSheet, View, FlatList, Text, TextInput } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import React, { useState } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref } from 'firebase/database';

export default function SearchFromApi() {

    const [repos, setRepos] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible)

    const onDismissSnackBar = () => setVisible(false)

    const fetchData = () => {
        if (keyword == "") {
            Alert.alert("Kirjoita hakukentään osakkeen tunnus jota haluat hakea!")
        }

        else if (keyword != null) {
            fetch(`https://api.stockdata.org/v1/data/quote?symbols=${keyword}&api_token=2nmUMn3G3ygPKKw3nSum4HonpTnIIkkFzWOzVSDc`)
                .then(response => response.json())
                .then(data => setRepos(data.data))
                .catch(err => Alert.alert('Virhe', 'Virhe tapahtui'))
        }
    }

    // Your web app's Firebase configuration
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

    const saveStock = () => {
        push(
            ref(database),
            { 'ticker' : repos })
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={repos}
                keyExtractor={item => item.ticker}
                renderItem={({item}) => 
                <View style={{margin: 20, flex: 2}}>
                    <View style={styles.box}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color:'darkslateblue', marginBottom: 5}}>{item.name} ({item.ticker}) {item.day_change}%</Text>
                        <Text style={{color:'darkslateblue', marginBottom: 10}}>Price: {item.price} {item.currency}</Text>
                        <Button mode='text' icon='heart' color='red' onPress={() => { saveStock(); onToggleSnackBar(); }}>Add to your portfolio</Button>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.textStyle}>Day high: {item.day_high} {item.currency}</Text>
                        <Text style={styles.textStyle}>Day low: {item.day_low} {item.currency}</Text>
                        <Text style={styles.textStyle}>Open: {item.day_open} {item.currency}</Text>
                        <Text style={styles.textStyle}>Previous close: {item.previous_close_price} {item.currency}</Text>
                    </View>
                </View>
                }
            />
            <Text style={{color: 'white'}}>Ticker name examples: AAPL, GOOG, TLRY, TSLA</Text>
            <View style={{flex: 5}}>
                <TextInput
                style={{width: 250, borderColor: 'grey', borderWidth: 1, backgroundColor: 'white', marginBottom: 10, marginTop: 10, height: 45, color: 'black'}}
                placeholder='Search by ticker name'
                onChangeText={ text => setKeyword(text)}
                />
                <Button mode='contained' color='lavender' icon='magnify' onPress={fetchData}>
                    Search
                </Button>
            </View>
            <Snackbar  
                visible={visible}
                onDismiss={onDismissSnackBar}
            >
            Stock added to your portfolio!
            </Snackbar>
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
        marginBottom: 10
    }
  });