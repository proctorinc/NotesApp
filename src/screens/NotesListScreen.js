import { useState, useEffect } from 'react'
import { StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native'
import { getFilteredNotes, createNote } from '../db'
import NoteListDrawer from '../components/NoteListDrawer'
import NoteList from '../components/NoteList'

const NotesListScreen = ({ navigation }) => {
    const [notes, setNotes] = useState([])
    const [search, setSearch] = useState('')

    const fetchNotes = () => {
        getFilteredNotes(search)
            .then(notes => {
                setNotes(notes)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleCreateNote = () => {
        createNote()
            .then(id => {
                navigation.navigate('NotesDetail', {note: {id: id, title: '', body: ''}})
            })
            .catch(err => {
                console.log(err)
            })
    }

    const updateSearch = (searchText) => {
        setSearch(searchText)
    }

    useEffect(() => {
        fetchNotes()

        const willFocusSubscription = navigation.addListener('focus', () => fetchNotes());
    
        return willFocusSubscription;
    }, [search])

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#202124"
            />
            {notes
                ? <NoteList filter={search} data={notes} />
                : <ActivityIndicator size="large" />}

            <NoteListDrawer filter={search} updateFilter={updateSearch} onCreateNote={handleCreateNote} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#202124',
    },
})

export default NotesListScreen