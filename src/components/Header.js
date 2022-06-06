import { View, Text, StyleSheet } from "react-native"

const Header = () => {

    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Notes</Text>
            {/* <CaretCircleDown color={'#7e8291'} weight={'thin'} size={38} />
            <ScrollView horizontal={true}>
                <TouchableOpacity style={styles.headerButtonSelected}>
                    <Text style={styles.headerButtonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Personal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Code Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Todo Lists</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Random</Text>
                </TouchableOpacity>
            </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#202124',
        flexDirection: 'row',

        justifyContent: 'center',
    },
    headerTitle: {
        textAlign: 'center',
        color: '#f0f1f5',
        fontSize: 30,
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