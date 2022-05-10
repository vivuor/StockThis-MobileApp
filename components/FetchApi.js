import { Alert, FlatList, StyleSheet, Text, View, Linking } from 'react-native';
import React, { useState, useEffect } from "react";
import { Button, Divider } from 'react-native-paper';

export default function FetchApi() {

  const [repos, setRepos] = useState([]);
  const [repoNews, setRepoNews] = useState([]);

  useEffect(() => {
      fetch("https://api.stockdata.org/v1/data/quote?symbols=AAPL,TSLA,AMZN&api_token=2nmUMn3G3ygPKKw3nSum4HonpTnIIkkFzWOzVSDc")
        .then(response => response.json())
        .then(data => setRepos(data.data))
        .catch(error => {
          Alert.alert(error)
        });
  }, []);

  useEffect(() => {
    fetch("https://api.stockdata.org/v1/news/all?symbols=AAPL,TSLA,AMZN&filter_entities=true&language=en&api_token=2nmUMn3G3ygPKKw3nSum4HonpTnIIkkFzWOzVSDc")
      .then(response => response.json())
      .then(data => setRepoNews(data.data))
      .catch(error => {
        Alert.alert(error)
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hottest stocks in the market right now!</Text>
      <FlatList
        data={repos}
        keyExtractor={item => item.ticker}
        renderItem={({item}) => 
          <View style={{margin: 10, flex: 1}}>
            <Text style={styles.titleText}>{item.name} ({item.ticker}) {item.day_change}%</Text>
            <Text style={{color: 'white'}}>Price: {item.price} {item.currency}</Text>
          </View>
        }
      />
      <FlatList 
        data={repoNews}
        keyExtractor={item => item.title}
        renderItem={({item}) => 
          <View style={{margin: 10, flex: 2}}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={{color: 'white', marginBottom: 10}}>{item.description}</Text>
            <Button mode='text' color='white' icon='book-open-variant' onPress={ ()=>{ Linking.openURL(`${item.url}`)}}>Read more</Button>
            <Divider/>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkslateblue',
    alignItems: 'center',
  },
  header: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color:'darkslateblue',
    marginBottom: 10, 
    marginTop: 10, 
    textTransform: 'uppercase',
    textAlign: 'center',
    backgroundColor: 'lavender',
    padding: 5,
    borderRadius: 15
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});