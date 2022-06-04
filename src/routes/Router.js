import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NotesDetail from '../screens/NotesDetail';
import NotesList from '../screens/NotesList';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="NotesList" component={NotesList} />
                <Stack.Screen name="NotesDetail" component={NotesDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
