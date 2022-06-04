import { View, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft } from 'phosphor-react-native'

const NotesDetail = ({ navigation }) => {
    const [title, setTitle] = useState('This is a cool title')
    const [body, setBody] = useState('This is the cool body thing. This is where the body text goes!')

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#202124"
            />
            <TouchableOpacity
                onPress={navigation.goBack}
            >
                <ArrowLeft color={'#f0f1f5'} size={32} />
            </TouchableOpacity>
            <TextInput
                multiline={true}
                autoCapitalize="words"
                onChangeText={text => setTitle(text)}
                value={title}
                style={styles.titleInput}
            />
            <TextInput
                multiline={true}
                onChangeText={text => setBody(text)}
                value={body}
                style={styles.bodyInput}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        paddingHorizontal: 20,
        backgroundColor: '#202124',
        flex: 1,
    },
    titleInput: {
        marginTop: 25,
        fontSize: 30,
        color: '#f0f1f5',
        paddingBottom: 20,
    },
    bodyInput: {
        paddingBottom: 25,
        flexGrow: 1,
        color: '#f0f1f5',
        fontSize: 15,
        textAlignVertical: 'top',
        paddingHorizontal: 5,
    },
  })

export default NotesDetail