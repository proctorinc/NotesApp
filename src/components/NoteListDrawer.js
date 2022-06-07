import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TextInput } from 'react-native'
import { Gear, MagnifyingGlass, PlusCircle, XCircle, X, Tag, ToggleLeft, ToggleRight, Plus, MinusCircle } from 'phosphor-react-native'
import { useGlobalContext } from '../context/GlobalContext'

const NoteListDrawer = ({ onCreateNote, filter, updateFilter}) => {
    const [open, setOpen] = useState('')
    const { theme, layout, toggleTheme, toggleLayout } = useGlobalContext()
    
    console.log(theme, layout)
    return (
        <View style={styles.bottomBar}>
            <View style={styles.iconRow}>
                <TouchableOpacity
                        onPress={() => {
                            setOpen(open == 'settings' ? '' : 'settings')
                            updateFilter('')
                        }}
                        
                        style={[styles.icon, {backgroundColor: open == 'settings' ? '#7e8291' : 'transparent'}]}
                    >
                    <Gear color={ open == 'settings' ? '#2f313b' : '#7e8291' } size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss()
                        setOpen(open == 'search' ? '' : 'search')
                        updateFilter('')
                    }}
                        style={[styles.icon, {backgroundColor: open == 'search' ? '#7e8291' : 'transparent'}]}
                    >
                    <MagnifyingGlass color={ open == 'search' ? '#2f313b' : '#7e8291' } size={30} />
                </TouchableOpacity>
                {/* <TouchableOpacity
                        onPress={() => {
                            setOpen(open == 'filter' ? '' : 'filter')
                            updateFilter('')
                        }}
                        style={[styles.icon, {backgroundColor: open == 'filter' ? '#7e8291' : 'transparent'}]}
                    >
                    <Tag color={ open == 'filter' ? '#2f313b' : '#7e8291' } size={30} />
                </TouchableOpacity> */}
                {open.length > 0
                    ? <TouchableOpacity
                        onPress={() => {
                            setOpen('')
                            updateFilter('')
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
                                updateFilter(text)
                            }}
                            value={filter}
                            style={styles.searchInput}
                            placeholder={'Search...'}
                            placeholderTextColor={'#7e8291'}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                updateFilter('')
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
                                toggleTheme()
                            }}
                            style={styles.settingsIcon}
                        >
                            {theme == 'dark'
                                ? <ToggleLeft color={'#7e8291'} size={50} weight={'thin'}/>
                                : <ToggleRight color={'#7e8291'} size={50} weight={'thin'}/>}
                        </TouchableOpacity>
                        <Text style={styles.text}>Theme: {theme}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                // setOpen('confirmDelete')
                                toggleLayout()
                            }}
                            style={styles.settingsIcon}
                        >
                            {layout == 1
                                ? <ToggleLeft color={'#7e8291'} size={50} weight={'thin'}/>
                                : <ToggleRight color={'#7e8291'} size={50} weight={'thin'}/>}  
                        </TouchableOpacity>
                        <Text style={styles.text}>Layout: {layout == 1 ? 'One Column' : 'Two Columns'}{layout}</Text>
                        {/* <TouchableOpacity
                            onPress={() => {
                                // setOpen('confirmDelete')
                            }}
                            style={styles.settingsIcon}
                        >
                            <MinusCircle color={ open == 'X' ? '#2f313b' : '#7e8291' } size={30} weight={'thin'}/>
                            <Text style={styles.text}>TextSize</Text>
                            <PlusCircle color={ open == 'X' ? '#2f313b' : '#7e8291' } size={30} weight={'thin'}/>
                        </TouchableOpacity> */}
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
    settingsIcon: {
        flexDirection: 'row',
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