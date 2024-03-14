import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AnimeDetailsScreen from './AnimeDetailsScreen';
import ErrorScreen from './ErrorScreen';
import SearchScreen from './SearchScreen';
import { Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
               <Feather name="search" size={25} color="black" onPress={() => navigation.navigate('Search')} />
            ),
          })}
        />
        <Stack.Screen name="Details" component={AnimeDetailsScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        {/* Add your Search screen in the stack navigator */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
