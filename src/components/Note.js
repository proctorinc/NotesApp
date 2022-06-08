import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from "react-native"
import { BG_DARK, ONE_COLUMN } from "../consts"
import { useGlobalContext } from '../context/GlobalContext'

const Note = ({ id, title, body, onPress, layout }) => {
    const { isNoteSelected, selectNote, deselectNote, isAnyNoteSelected } = useGlobalContext()

    const handlePress = () => {
        if (isNoteSelected(id)) {
            deselectNote(id)
        } else if (isAnyNoteSelected() && !isNoteSelected(id)) {
            selectNote(id)
        } else {
            onPress()
        }
    }
    
    return (
      <View style={[styles.noteContainer, layout == ONE_COLUMN ? { paddingRight: 5 } : {} ]}>
        <Pressable
            style={[styles.note, isNoteSelected(id) ? styles.selected : styles.notSelected]}
            onPress={handlePress}
            onLongPress={() => {
                selectNote(id)
            }}
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
        </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
    noteContainer: {
        paddingLeft: 7,
        paddingBottom: 5,
        backgroundColor: BG_DARK,
    },
    selected: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    notSelected: {
        borderWidth: 1,
        borderColor: '#6c7080',
    },
    note: {
        padding: 10,
        width: '100%',
        borderRadius: 10,
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