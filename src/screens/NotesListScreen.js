import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list'
import { getFilteredNotes, createNote } from '../db'
import Header from '../components/Header'
import Note from '../components/Note'
import NoteListDrawer from '../components/NoteListDrawer'

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

    const handleCreateNewNote = () => {
        createNote()
            .then(id => {
                navigation.navigate('NotesDetail', {note: {id: id, title: '', body: ''}})
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchNotes()

        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchNotes()
        });
    
        return willFocusSubscription;
    }, [search])

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#202124"
            />
            {notes && notes.length == 0 && search.length == 0
            ? <View style={styles.noNotes}>
                <Text style={styles.text}>No notes made yet</Text>
            </View>
            : notes && notes.length == 0 && search.length > 0
            ? <View style={styles.noNotes}>
                <Text style={styles.text}>No notes match your search</Text>
            </View>
            : notes
            ?
            // <FlatList
            //     style={styles.flatList}
            //     data={notes}
            //     keyExtractor={item => item.id}
            //     showsVerticalScrollIndicator={false}
            //     renderItem={({item}) =>
            //         <Note
            //             title={item.title}
            //             body={item.body}
            //             onPress={() =>  {
            //                 navigation.navigate('NotesDetail', {
            //                     note: item
            //                 })
            //             }}
            //         />}
            // />
            <MasonryList
                style={styles.masonryList}
                data={notes}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                    <Note
                        title={item.title}
                        body={item.body}
                        onPress={() =>  {
                            navigation.navigate('NotesDetail', {
                                note: item
                            })
                        }}
                    />}
                numColumns={2}
                ListHeaderComponent={
                    <View>
                        <Header />
                        {search.length > 0
                        ? <View style={styles.searchHeader}>
                            <Text style={styles.smallText}>Search: "{search}"</Text>
                        </View>
                        : null}
                    </View>
                }
            />
            : <ActivityIndicator size="large" />}

            <NoteListDrawer onCreateNote={() => handleCreateNewNote()} search={search} setSearch={setSearch} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#202124',
    },
    masonryList: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 70,
        backgroundColor: '#202124',
        paddingRight: 5,
    },
    flatList: {
        // alignContent: 'center',
        // justifyContent: 'center',
        // textAlign: 'center',
        backgroundColor: '#202124',
        paddingRight: 5,
        width: '100%',
        marginBottom: 70,
        // flex: 1,
    },
    noNotes: {
        flexGrow: 1,
        width: '100%',
        justifyContent: 'center',
        paddingBottom: '25%',
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        color: '#7e8291',
    },
    smallText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#7e8291',
        // paddingBottom: 10,
    },
    searchHeader: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#7e8291',
        padding: 5,
        marginBottom: 10,
        backgroundColor: '#2f313b',
        marginHorizontal: 5,
    }
})

export default NotesListScreen