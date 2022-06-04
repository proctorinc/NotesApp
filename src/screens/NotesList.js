import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list'
import { PlusCircle } from 'phosphor-react-native'

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const notes = [
  {id: '1', title: 'New Note', date: '6/3/22', body: lorem},
  {id: '2', title: 'Testing Note Stuff', date: '6/3/22', body: 'Ok Wow. This is very cool. Oh my goodness this is a big note thingy. Cool wow how do you do it?'},
  {id: '3', title: 'Cool Note', date: '6/2/22', body: 'This is a body! Look how cool it is oh my goodness!'},
  {id: '4', title: 'What a note thingy!', date: '6/2/22', body: lorem},
  {id: '5', title: 'TEsting TestinG', date: '6/2/22', body: lorem},
  {id: '6', title: 'First Note', date: '6/1/22', body: 'This is the body'},
  {id: '7', title: 'New Note', date: '6/3/22', body: lorem},
  {id: '8', title: 'Testing Note Stuff', date: '6/3/22', body: 'Ok Wow. This is very cool. Oh my goodness this is a big note thingy. Cool wow how do you do it?'},
  {id: '9', title: 'Cool Note', date: '6/2/22', body: 'This is a body! Look how cool it is oh my goodness!'},
  {id: '10', title: 'What a note thingy!', date: '6/2/22', body: lorem},
  {id: '11', title: 'TEsting TestinG', date: '6/2/22', body: lorem},
  {id: '12', title: 'First Note', date: '6/1/22', body: 'This is the body'},
  {id: '13', title: 'New Note', date: '6/3/22', body: lorem},
  {id: '14', title: 'Testing Note Stuff', date: '6/3/22', body: 'Ok Wow. This is very cool. Oh my goodness this is a big note thingy. Cool wow how do you do it?'},
  {id: '15', title: 'Cool Note', date: '6/2/22', body: 'This is a body! Look how cool it is oh my goodness!'},
  {id: '16', title: 'What a note thingy!', date: '6/2/22', body: lorem},
  {id: '17', title: 'TEsting TestinG', date: '6/2/22', body: lorem},
  {id: '18', title: 'First Note', date: '6/1/22', body: 'This is the body'},
  {id: '19', title: 'New Note', date: '6/3/22', body: lorem},
  {id: '20', title: 'Testing Note Stuff', date: '6/3/22', body: 'Ok Wow. This is very cool. Oh my goodness this is a big note thingy. Cool wow how do you do it?'},
  {id: '21', title: 'Cool Note', date: '6/2/22', body: 'This is a body! Look how cool it is oh my goodness!'},
  {id: '22', title: 'What a note thingy!', date: '6/2/22', body: lorem},
  {id: '23', title: 'TEsting TestinG', date: '6/2/22', body: lorem},
  {id: '24', title: 'First Note', date: '6/1/22', body: 'This is the body'},
]

const NotesList = ({ navigation }) => {
  const headerComponent = (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Notes App</Text>
    </View>
  )

  const renderNote = ({ item }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.note}
          onPress={() => navigation.navigate('NotesDetail')}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.body}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{ flexDirection: 'row' }}>
        <StatusBar
            backgroundColor="#202124"
        />
        <MasonryList
            style={styles.masonryList}
            data={notes}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={renderNote}
            numColumns={2}
            ListHeaderComponent={headerComponent}
        />
        <TouchableOpacity
            onPress={() => navigation.navigate('NotesDetail')}
            style={styles.addNote}
        >
            <PlusCircle color={'#f0f1f5'} size={64}/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    masonryList: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 25,
        backgroundColor: '#202124',
    },
    header: {
        paddingTop: 25,
        paddingBottom: 10,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#202124',
    },
    headerTitle: {
        textAlign: 'center',
        color: '#f0f1f5',
        fontSize: 30,
    },
    container: {
        paddingHorizontal: 5,
        paddingBottom: 5,
        backgroundColor: '#202124',
    },
    note: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#6c7080',
    },
    title: {
        fontSize: 20,
        color: '#f0f1f5',
        paddingBottom: 5,
    },
    text: {
        fontSize: 15,
        color: '#f0f1f5',
    },
    addNote: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#202124',
        borderRadius: 100,
    },
})

export default NotesList