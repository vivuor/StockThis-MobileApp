import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Profile from '../Pages/Profile';
import HomeScreen from '../Pages/HomeScreen';
import Stocks from '../Pages/Stocks';


export default function Navigation() {

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
    
      if (route.name === 'Home') {
        iconName = 'md-home';
      } else if (route.name === 'Stocks') {
        iconName = 'md-bar-chart';
      } else if (route.name === 'Profile') {
        iconName = 'md-person';
      }
  
      return <Ionicons name={iconName} size={size} color={color} />;
    }
  });

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: 'Home', title: 'StockThis'}} />
        <Tab.Screen name="Stocks" component={Stocks} options={{tabBarLabel: 'Stocks', title: 'Search for stocks'}} />
        <Tab.Screen name="Profile" component={Profile} options={{tabBarLabel: 'Profile', title: 'Your profile and portfolio'}} />
    </Tab.Navigator>
  )
}
