import * as React from 'react';
import { Image, View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import ToolsScreen from './screens/ToolsScreen';
import StepsScreen from './screens/StepsScreen';

const Stack = createStackNavigator();

function LogoTitle() {
return (
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
<Image
style={{ width: 30, height: 30, marginRight: 10 }}
source={require('./assets/logo.png')}
/>
<Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
Receitas Incríveis
</Text>
</View>
);
}

export default function App() {
return (
<NavigationContainer>
<Stack.Navigator
screenOptions={{
headerStyle: { backgroundColor: 'black' },
headerTintColor: '#fff',
// AJUSTE CRUCIAL: Remove a trava de altura no navegador
cardStyle: { flex: 1, backgroundColor: '#fff', overflow: Platform.OS === 'web' ? 'visible' : 'hidden' }
}}
>
<Stack.Screen
name="Home"
component={HomeScreen}
options={{ headerTitle: props => <LogoTitle {...props} /> }}
/>
<Stack.Screen name="Ingredientes" component={IngredientsScreen} />
<Stack.Screen name="Utensílios" component={ToolsScreen} />
<Stack.Screen name="Passo a Passo" component={StepsScreen} />
</Stack.Navigator>
</NavigationContainer>
);
}