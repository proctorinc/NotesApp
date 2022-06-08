import { Trash, X } from "phosphor-react-native"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { BG_MEDIUM } from "../consts"
import { useGlobalContext } from "../context/GlobalContext"

const Header = ({ filter, data, onDeleteNotes }) => {
    const { isAnyNoteSelected, deleteSelectedNotes, clearSelectedNotes } = useGlobalContext()

    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                {filter.length > 0
                    ? "Search"
                    : isAnyNoteSelected()
                        ? "Selected"
                        : "Notes"}
            </Text>
            {isAnyNoteSelected()
                ? <Pressable
                    style={styles.deleteNotesIcon}
                    onPress={() => {
                        deleteSelectedNotes()
                        onDeleteNotes()
                    }}
                >
                    <Trash size={30} color={'#7e8291'}/>
                </Pressable>
                : null}
            {isAnyNoteSelected()
                ? <Pressable
                    style={styles.cancelDeleteNotesIcon}
                    onPress={clearSelectedNotes}
                >
                    <X size={30} color={'#7e8291'}/>
                </Pressable>
                : null}
            {filter && filter.length > 0
                ? <View style={styles.searchHeader}>
                    <Text style={styles.smallText}>"{filter}"</Text>
                </View>
                : null}
            {data.length == 0 && filter.length == 0
                ? <View style={styles.noNotes}>
                    <Text style={styles.text}>No notes made yet</Text>
                </View>
                : data.length == 0 && filter.length > 0
                    ? <View style={styles.noNotes}>
                        <Text style={styles.text}>No notes match your search</Text>
                    </View>
                    : null}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    headerTitle: {
        textAlign: 'center',
        color: '#f0f1f5',
        fontSize: 30,
    },
    searchHeader: {
        borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#7e8291',
        padding: 5,
        marginVertical: 10,
        backgroundColor: BG_MEDIUM,
        marginHorizontal: 5,
    },
    noNotes: {
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
    },
    deleteNotesIcon: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    cancelDeleteNotesIcon: {
        position: 'absolute',
        left: 20,
        top: 20,
    }
})

export default Header