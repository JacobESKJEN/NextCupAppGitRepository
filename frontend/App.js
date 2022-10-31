import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from './components/Feed';
import Post from './components/Post';
import Details from './components/Details';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={Feed}/>
        <Stack.Screen name="Post" component={Post}/>
        <Stack.Screen name="Details" component={Details}/>
      </Stack.Navigator>
    </View>
  );
}

export default () => {
 return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10
  },
  
});
