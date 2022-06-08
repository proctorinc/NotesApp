import { useState, useEffect } from 'react'
import { View, StyleSheet, Pressable, StatusBar, TextInput, ScrollView, BackHandler } from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'
import { updateNote, deleteNote } from '../db'
import NoteDetailDrawer from '../components/NoteDetailDrawer'
import { BG_DARK, BG_MEDIUM } from '../consts'

const NotesDetailScreen = ({ route, navigation }) => {
    const { note } = route.params
    const [title, setTitle] = useState(note ? note.title : '')
    const [body, setBody] = useState(note ? note.body : '')
    const [wasEdited, setWasEdited] = useState(false)

    useEffect(() => {
        const backPress = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
            backPress.remove()
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
            <StatusBar
                backgroundColor={BG_DARK}
            />
            <Pressable
                onPress={() => {
                    handleBackPress()
                    navigation.navigate('NotesList')
                }}
                style={styles.backButton}
            >
                <ArrowLeft color={'#7e8291'} size={32} />
            </Pressable>
            <ScrollView style={styles.noteContainer}>
                <View style={styles.noteContent}>
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
            </ScrollView>
            <NoteDetailDrawer id={note.id} title={title} body={body} setBody={setBody} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        // paddingHorizontal: 20,
        backgroundColor: BG_DARK,
        flex: 1,
    },
    noteContainer: {
        paddingHorizontal: 20,
        // marginBottom: 50,
        // paddingBottom: '35%'
    },
    noteContent: {
        paddingBottom: '80%',
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
    backButton: {
        paddingLeft: 15,
        paddingBottom: 5,
    }
  })

export default NotesDetailScreen