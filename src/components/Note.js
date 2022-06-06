import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

const Note = ({ title, body, onPress }) => {
    
    return (
      <View style={styles.noteContainer}>
        <TouchableOpacity
            style={styles.note}
            onPress={onPress}
        >
        {title.length > 0
            ? <Text
                style={styles.title}
                numberOfLines={2}
            >
                {title}
            </Text>
            : null}
        {body.length > 0
            ? <Text
                style={styles.body}
                numberOfLines={15}
            >
                    {body}
            </Text>
            : null}
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    noteContainer: {
        paddingLeft: 5,
        paddingBottom: 5,
        backgroundColor: '#202124',
        // width: '100%',
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
        paddingBottom: 2,
        flex: 1,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 15,
        color: '#f0f1f5',
        flex: 1,
    },
})

export default Note