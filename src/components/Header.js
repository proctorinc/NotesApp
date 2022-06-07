import { View, Text, StyleSheet } from "react-native"

const Header = ({ filter, data }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Notes</Text>
            {filter && filter.length > 0
                ? <View style={styles.searchHeader}>
                    <Text style={styles.smallText}>Search: "{filter}"</Text>
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
        backgroundColor: '#202124',
        // flexDirection: 'row',
        justifyContent: 'center',
    },
    headerTitle: {
        textAlign: 'center',
        color: '#f0f1f5',
        fontSize: 30,
    },
    searchHeader: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#7e8291',
        padding: 5,
        marginBottom: 10,
        backgroundColor: '#2f313b',
        marginHorizontal: 5,
    },
    noNotes: {
        // flexGrow: 1,
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
    // headerButtonSelected: {
    //     backgroundColor: '#2f313b',
    //     paddingHorizontal: 10,
    //     paddingVertical: 5,
    //     borderRadius: 10,
    //     marginRight: 5,
    // },
    // headerButton: {
    //     paddingHorizontal: 10,
    //     paddingVertical: 5,
    //     borderRadius: 10,
    //     borderColor: '#6c7080',
    //     borderWidth: 1,
    //     marginRight: 5,
    // },
    // headerButtonText: {
    //     color: '#7e8291',
    //     fontSize: 18,
    // },
})

export default Header