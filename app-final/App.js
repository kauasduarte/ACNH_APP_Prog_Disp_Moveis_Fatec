import React from 'react';
import { StyleSheet , Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './src/Pages/Home/index';
import Villagers from './src/Pages/villagers/index';
import Fish from './src/Pages/fish';
import Critter from './src/Pages/critters/index';
import Bugs from './src/Pages/bugs/index';
import ProfileForm from './src/Form/index';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const icons = {
  Home: {
    name: 'island',
  },
  Villagers: {
    name: 'paw',
  },
  Peixes: {
    name: 'fish',
  },
  Mergulho: {
    name: 'jellyfish',
  },
  Insetos: {
    name: 'butterfly',
  },
};

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" headerMode="none">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="ProfileForm" component={ProfileForm} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerStyle: {
        backgroundColor: '#74e0aa', // Cor de fundo do cabeçalho
      },
      headerTintColor: 'green', // Cor do texto do cabeçalho
      headerTitleAlign: 'center', // Centraliza o texto do cabeçalho
      
          tabBarIcon: ({ color, size }) => {
            const { name } = icons[route.name];
            return <MaterialCommunityIcons name={name} size={32} color={color} />;
          },
        })}
        tabBarOptions={{
          activeBackgroundColor: '#74e0aa',
          activeTintColor: 'green',
          inactiveBackgroundColor: '#D7EEFF',
          inactiveTintColor: 'green',
        }}
      >
        <Tab.Screen name='Mergulho' component={Critter} />
        <Tab.Screen name='Villagers' component={Villagers} />
        <Tab.Screen name='Home' component={HomeStack} />
        <Tab.Screen name='Peixes' component={Fish} />
        <Tab.Screen name='Insetos' component={Bugs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // 
});
