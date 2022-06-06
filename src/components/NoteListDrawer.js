import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Keyboard, TextInput } from 'react-native'
// import { Trash, Circle, Palette, ListChecks, DotsThreeVertical } from 'phosphor-react-native'
import { Gear, Trash, MagnifyingGlass, Funnel, SquaresFour, PlusCircle, XCircle, X, Tag } from 'phosphor-react-native'
import { deleteNote } from '../db'

const NoteListDrawer = ({ onCreateNote, search, setSearch}) => {
    const [open, setOpen] = useState('')

    // useEffect(() => {
    //     if (closed) {
    //         setOpen('')
    //     }
    // }, [closed])

    return (
        <View style={styles.bottomBar}>
            <View style={styles.iconRow}>
                <TouchableOpacity
                        onPress={() => {
                            setOpen(open == 'settings' ? '' : 'settings')
                            setSearch('')
                        }}
                        
                        style={[styles.icon, {backgroundColor: open == 'settings' ? '#7e8291' : 'transparent'}]}
                    >
                    <Gear color={ open == 'settings' ? '#2f313b' : '#7e8291' } size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss()
                        setOpen(open == 'search' ? '' : 'search')
                        setSearch('')
                    }}
                        style={[styles.icon, {backgroundColor: open == 'search' ? '#7e8291' : 'transparent'}]}
                    >
                    <MagnifyingGlass color={ open == 'search' ? '#2f313b' : '#7e8291' } size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={() => {
                            setOpen(open == 'filter' ? '' : 'filter')
                            setSearch('')
                        }}
                        style={[styles.icon, {backgroundColor: open == 'filter' ? '#7e8291' : 'transparent'}]}
                    >
                    <Tag color={ open == 'filter' ? '#2f313b' : '#7e8291' } size={30} />
                </TouchableOpacity>
                {/* <TouchableOpacity
                        onPress={() => {
                            setOpen(open == 'categories' ? '' : 'categories')
                            setSearch('')
                        }}
                        style={[styles.icon, {backgroundColor: open == 'categories' ? '#7e8291' : 'transparent'}]}
                    >
                    <SquaresFour color={ open == 'categories' ? '#2f313b' : '#7e8291' } size={30} />
                </TouchableOpacity> */}
                {open.length > 0
                    ? <TouchableOpacity
                        onPress={() => {
                            setOpen('')
                            setSearch('')
                        }}
                        style={[styles.icon, { position: 'absolute', right: 0 }]}
                    >
                        <X color={'#7e8291'} size={30} />
                    </TouchableOpacity>
                    : null}
            </View>
            <View>
                {open == 'search'
                    ? <View style={styles.searchDrawer}>
                        <TextInput
                            maxLength={35}
                            onChangeText={text => {
                                setSearch(text)
                            }}
                            value={search}
                            style={styles.searchInput}
                            placeholder={'Search...'}
                            placeholderTextColor={'#7e8291'}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setSearch('')
                            }}
                            style={styles.clearSearchIcon}
                        >
                            <XCircle color={ open == 'X' ? '#2f313b' : '#7e8291' } size={30} />
                        </TouchableOpacity>
                    </View>
                    : null}
                {open == 'settings'
                    ? <View style={styles.settingsDrawer}>
                        <TouchableOpacity
                            onPress={() => {
                                // setOpen('confirmDelete')
                            }}
                            style={styles.button}
                        >
                            {/* <Trash color={ open == 'X' ? '#2f313b' : '#7e8291' } size={30}/> */}
                            <Text style={styles.text}>Setting #1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // setOpen('confirmDelete')
                            }}
                            style={styles.button}
                        >
                            {/* <Trash color={ open == 'X' ? '#2f313b' : '#7e8291' } size={30}/> */}
                            <Text style={styles.text}>Setting #2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // setOpen('confirmDelete')
                            }}
                            style={styles.button}
                        >
                            {/* <Trash color={ open == 'X' ? '#2f313b' : '#7e8291' } size={30}/> */}
                            <Text style={styles.text}>Setting #3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // setOpen('confirmDelete')
                            }}
                            style={styles.button}
                        >
                            {/* <Trash color={ open == 'X' ? '#2f313b' : '#7e8291' } size={30}/> */}
                            <Text style={styles.text}>Setting #4</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
            </View>
            <View>
                <TouchableOpacity
                    onPress={onCreateNote}
                    style={styles.createNote}
                >
                    <PlusCircle color={ open == 'X' ? '#2f313b' : '#7e8291' } size={64} weight={'thin'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        paddingHorizontal: 20,
        backgroundColor: '#202124',
        flex: 1,
    },
    createNote: {
        position: 'absolute',
        bottom: 35,
        right: 10,
        backgroundColor: '#2f313b',
        borderRadius: 100,
    },
    searchInput: {
        fontSize: 18,
        color: '#f0f1f5',
        backgroundColor: '#202124',
        borderRadius: 10,
        paddingVertical: 5,
        paddingLeft: 15,
        paddingRight: 50,
        width: '100%',
        // textAlign: 'center',
    },
    clearSearchIcon: {
        marginLeft: -50,
        paddingTop: 5,
        paddingHorizontal: 10,
    },
    // bodyInput: {
    //     paddingBottom: 25,
    //     flexGrow: 1,
    //     color: '#f0f1f5',
    //     fontSize: 20,
    //     textAlignVertical: 'top',
    // },
    text: {
        color: '#7e8291',
        fontSize: 20,
        textAlign: 'center',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#2f313b',
        padding: 10,
        borderRadius: 10,
        minHeight: 70,
    },
    iconRow: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 100,
    },
    drawer: {
        padding: 10,
    },
    searchDrawer: {
        flexDirection: 'row',
        paddingVertical: 20,
        alignContent: 'center',
    },
    settingsDrawer: {
        paddingVertical: 20,
    },
    confirmDeleteDrawer: {
        flexDirection: 'row',
    },
    colorDrawer: {
        padding: 20,
        flexDirection: 'row',
    },
    button: {
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: '#7e8291',
        marginBottom: 5,
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#202124',
    },
  })

export default NoteListDrawer