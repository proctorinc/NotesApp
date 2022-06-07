import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MasonryList from '@react-native-seoul/masonry-list'
import Header from './Header'
import Note from './Note'
import { ONE_COLUMN, TWO_COLUMN } from '../consts';

const NoteList = ({ filter, data }) => {
    const navigation = useNavigation()
    const listType = TWO_COLUMN

    const renderNote = ({ item }) => {
        return (
            <Note
                title={item.title}
                body={item.body}
                onPress={() =>  {
                    navigation.navigate('NotesDetail', {
                        note: item
                    })
                }}
            />
        )
    }

    return (
        <View style={styles.container}>
            {listType == ONE_COLUMN
                ? <FlatList
                    style={styles.flatList}
                    data={data}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderNote}
                    ListHeaderComponent={<Header data={data} filter={filter} />}
                />
                : <MasonryList
                    style={styles.masonryList}
                    data={data}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderNote}
                    numColumns={2}
                    ListHeaderComponent={<Header data={data} filter={filter} />}
                />}
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
        backgroundColor: '#202124',
        paddingRight: 5,
        width: '100%',
        marginBottom: 70,
    },
})

export default NoteList