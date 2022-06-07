import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, StatusBar, TextInput, ToastAndroid, BackHandler } from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'
import { updateNote, deleteNote } from '../db'
import NoteDetailDrawer from '../components/NoteDetailDrawer'

const NotesDetailScreen = ({ route, navigation }) => {
    const { note } = route.params
    const [title, setTitle] = useState(note ? note.title : '')
    const [body, setBody] = useState(note ? note.body : '')
    const [wasEdited, setWasEdited] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
        }
    }, [title, body])

    const handleBackPress = () => {
        if (body.length == 0 && title.length == 0) {
            deleteNote(note.id)
        } else if (wasEdited) {
            updateNote(note.id, title, body)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.noteContainer}>
                <StatusBar
                    backgroundColor="#202124"
                />
                <TouchableOpacity
                    onPress={() => {
                        handleBackPress()
                        navigation.navigate('NotesList')
                    }}
                >
                    <ArrowLeft color={'#7e8291'} size={32} />
                </TouchableOpacity>
                <TextInput
                    multiline={true}
                    autoCapitalize="words"
                    onChangeText={text => {
                        setTitle(text)
                        if (!wasEdited) {
                            setWasEdited(true)
                        }
                    }}
                    value={title}
                    style={styles.titleInput}
                    placeholder={'Title'}
                    placeholderTextColor={'#7e8291'}
                />
                <TextInput
                    multiline={true}
                    onChangeText={text => {
                        setBody(text)
                        if (!wasEdited) {
                            setWasEdited(true)
                        }
                    }}
                    value={body}
                    style={styles.bodyInput}
                    placeholder={'Note'}
                    placeholderTextColor={'#7e8291'}
                />
            </View>
            <NoteDetailDrawer id={note.id} title={title} body={body} setBody={setBody} onComplete={() => navigation.navigate('NotesList')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        // paddingHorizontal: 20,
        backgroundColor: '#202124',
        flex: 1,
    },
    noteContainer: {
        paddingHorizontal: 20,
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
        fontSize: 20,
        textAlignVertical: 'top',
    },
    addNote: {
        position: 'absolute',
        bottom: 35,
        right: 10,
        backgroundColor: '#2f313b',
        borderRadius: 100,
    },
    bottomBar: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        backgroundColor: '#2f313b',
        padding: 10,
    },
    barIcon: {
        paddingHorizontal: 10,
    },
    drawerContent: {
        padding: 10,
    },
    colorDrawer: {
        padding: 20,
        flexDirection: 'row',
    }
  })

export default NotesDetailScreen