import { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Keyboard, TextInput } from 'react-native'
import { Gear, MagnifyingGlass, PlusCircle, XCircle, X, Tag, ToggleLeft, ToggleRight, Plus, MinusCircle } from 'phosphor-react-native'
import { useGlobalContext } from '../context/GlobalContext'
import { BG_DARK, BG_MEDIUM, DARK_THEME } from '../consts'

const NoteListDrawer = ({ onCreateNote, filter, updateFilter}) => {
    const [open, setOpen] = useState('')
    const { theme, layout, toggleTheme, toggleLayout } = useGlobalContext()
    
    return (
        <View>
            <View style={styles.floatingContainer}>
                <Pressable
                    onPress={onCreateNote}
                    style={styles.createNote}
                >
                    <PlusCircle color={ open == 'X' ? BG_MEDIUM : '#7e8291' } size={64} weight={'thin'} />
                </Pressable>
            </View>
            <View style={styles.bottomBar}>
                <View style={styles.iconRow}>
                    <Pressable
                            onPress={() => {
                                setOpen(open == 'settings' ? '' : 'settings')
                                updateFilter('')
                            }}
                            
                            style={[styles.icon, {backgroundColor: open == 'settings' ? '#7e8291' : 'transparent'}]}
                        >
                        <Gear color={ open == 'settings' ? BG_DARK : '#7e8291' } size={30} />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            Keyboard.dismiss()
                            setOpen(open == 'search' ? '' : 'search')
                            updateFilter('')
                        }}
                            style={[styles.icon, {backgroundColor: open == 'search' ? '#7e8291' : 'transparent'}]}
                        >
                        <MagnifyingGlass color={ open == 'search' ? BG_DARK : '#7e8291' } size={30} />
                    </Pressable>
                    {/* <Pressable
                            onPress={() => {
                                setOpen(open == 'filter' ? '' : 'filter')
                                updateFilter('')
                            }}
                            style={[styles.icon, {backgroundColor: open == 'filter' ? '#7e8291' : 'transparent'}]}
                        >
                        <Tag color={ open == 'filter' ? BG_MEDIUM : '#7e8291' } size={30} />
                    </Pressable> */}
                    {open.length > 0
                        ? <Pressable
                            onPress={() => {
                                setOpen('')
                                updateFilter('')
                            }}
                            style={[styles.icon, { position: 'absolute', right: 0 }]}
                        >
                            <X color={'#7e8291'} size={30} />
                        </Pressable>
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
                            <Pressable
                                onPress={() => {
                                    updateFilter('')
                                }}
                                style={styles.clearSearchIcon}
                            >
                                <XCircle color={BG_MEDIUM} size={30} />
                            </Pressable>
                        </View>
                        : null}
                    {open == 'settings'
                        ? <View style={styles.settingsDrawer}>
                            <View style={styles.settingRow}>
                                <Pressable
                                    onPress={() => {
                                        // setOpen('confirmDelete')
                                        toggleTheme()
                                    }}
                                    style={styles.settingsIcon}
                                >
                                    {theme == DARK_THEME
                                        ? <ToggleLeft color={'#7e8291'} size={50} weight={'thin'}/>
                                        : <ToggleRight color={'#7e8291'} size={50} weight={'thin'}/>}
                                </Pressable>
                                <Text style={styles.text}>Theme: </Text>
                                <Text style={[styles.text, styles.button]}>{theme}</Text>
                            </View>
                            <View style={styles.settingRow}>
                                <Pressable
                                    onPress={() => {
                                        // setOpen('confirmDelete')
                                        toggleLayout()
                                    }}
                                    style={styles.settingsIcon}
                                >
                                    {layout == 1
                                        ? <ToggleLeft color={'#7e8291'} size={50} weight={'thin'}/>
                                        : <ToggleRight color={'#7e8291'} size={50} weight={'thin'}/>}  
                                </Pressable>
                                <Text style={styles.text}>Layout: </Text>
                                <Text style={[styles.text, styles.button]}>{layout == 2 ? 'One Column' : 'Two Columns'}</Text>
                            </View>
                            {/* <Pressable
                                onPress={() => {
                                    // setOpen('confirmDelete')
                                }}
                                style={styles.settingsIcon}
                            >
                                <MinusCircle color={ open == 'X' ? BG_MEDIUM : '#7e8291' } size={30} weight={'thin'}/>
                                <Text style={styles.text}>TextSize</Text>
                                <PlusCircle color={ open == 'X' ? BG_MEDIUM : '#7e8291' } size={30} weight={'thin'}/>
                            </Pressable> */}
                        </View>
                        : null}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 0,
    },
    createNote: {
        bottom: 70,
        right: 5,
        // backgroundColor: BG_MEDIUM,
        borderRadius: 100,
    },
    searchInput: {
        fontSize: 20,
        color: 'white',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: BG_DARK,
        borderRadius: 10,
        marginBottom: 5,
    },
    clearSearchIcon: {
        marginLeft: -50,
        paddingTop: 10,
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
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
        backgroundColor: BG_MEDIUM,
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
        // flexDirection: 'row',
        paddingRight: 10,
    },
    drawer: {
        padding: 10,
    },
    searchDrawer: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 25,
        alignContent: 'center',
    },
    settingsDrawer: {
        paddingVertical: 15,
        // margin: 5,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: BG_DARK,
        borderRadius: 10,
        marginBottom: 5,
    },
    confirmDeleteDrawer: {
        flexDirection: 'row',
    },
    colorDrawer: {
        padding: 20,
        flexDirection: 'row',
    },
    button: {
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: BG_DARK,
    },
  })

export default NoteListDrawer