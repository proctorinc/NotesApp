import { View, FlatList, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MasonryList from '@react-native-seoul/masonry-list'
import Header from './Header'
import Note from './Note'
import { BG_DARK, ONE_COLUMN } from '../consts';
import { useGlobalContext } from '../context/GlobalContext';

const NoteList = ({ filter, data, onDeleteNotes }) => {
    const navigation = useNavigation()
    const { layout } = useGlobalContext()

    const renderNote = ({ item }) => {
        return (
            <Note
                id={item.id}
                title={item.title}
                body={item.body}
                onPress={() =>  {
                    navigation.navigate('NotesDetail', {
                        note: item
                    })
                }}
                layout={layout}
            />
        )
    }

    return (
        <View style={styles.container}>
            {layout == ONE_COLUMN
                ? <FlatList
                    style={styles.flatList}
                    data={data}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderNote}
                    ListHeaderComponent={<Header data={data} filter={filter} onDeleteNotes={onDeleteNotes} />}
                />
                : <MasonryList
                    style={styles.masonryList}
                    data={data}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderNote}
                    numColumns={2}
                    ListHeaderComponent={<Header data={data} filter={filter} onDeleteNotes={onDeleteNotes} />}
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: BG_DARK,
    },
    masonryList: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 10,
        backgroundColor: BG_DARK,
        paddingRight: 7,
    },
    flatList: {
        backgroundColor: BG_DARK,
        // paddingHoriztonal: 10,
        width: '100%',
        height: '0%',
    },
})

export default NoteList