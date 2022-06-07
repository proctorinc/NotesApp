import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MasonryList from '@react-native-seoul/masonry-list'
import Header from './Header'
import Note from './Note'
import { ONE_COLUMN, TWO_COLUMN } from '../consts';
import { useGlobalContext } from '../context/GlobalContext';

const NoteList = ({ filter, data }) => {
    const navigation = useNavigation()
    const { layout } = useGlobalContext()

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
        flexGrow: 1,
        backgroundColor: '#202124',
    },
    masonryList: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 10,
        backgroundColor: '#202124',
        paddingRight: 5,
    },
    flatList: {
        backgroundColor: '#202124',
        paddingHoriztonal: 5,
        width: '100%',
        height: '0%',
    },
})

export default NoteList