import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NotesDetailScreen from '../screens/NotesDetailScreen';
import NotesListScreen from '../screens/NotesListScreen';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="NotesList" component={NotesListScreen} />
                <Stack.Screen name="NotesDetail" component={NotesDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
