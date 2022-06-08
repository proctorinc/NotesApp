import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, ToastAndroid, Keyboard } from 'react-native'
import { Trash, Circle, Palette, ListChecks, DotsThreeVertical, Wrench, Sliders } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { deleteNote } from '../db'
import { useGlobalContext } from '../context/GlobalContext'
import { BG_DARK, BG_MEDIUM } from '../consts'

const NoteDetailDrawer = ({closed, id}) => {
    const { keyboardVisible } = useGlobalContext()
    const navigation = useNavigation()
    const [open, setOpen] = useState('')

    useEffect(() => {
        if (closed) {
            setOpen('')
        }
    }, [closed])

    // const colorDrawer = () => (
    //     <View style={styles.colorDrawer}>
    //         <Pressable>
    //             <Square color={'red'} weight={'fill'} size={50}/>
    //         </Pressable>
    //         <Pressable>
    //             <Square color={'orange'} weight={'fill'} size={50}/>
    //         </Pressable>
    //         <Pressable>
    //             <Square color={'yellow'} weight={'fill'} size={50}/>
    //         </Pressable>
    //         <Pressable>
    //             <Square color={'green'} weight={'fill'} size={50}/>
    //         </Pressable>
    //         <Pressable>
    //             <Square color={'blue'} weight={'fill'} size={50}/>
    //         </Pressable>
    //         <Pressable>
    //             <Square color={'purple'} weight={'fill'} size={50}/>
    //         </Pressable>
    //     </View>
    // )

    return (
        <View style={[styles.bottomBar, keyboardVisible ? { minHeight: 0 } : {}]}>
            <View style={styles.iconRow}>
                <Pressable
                        onPress={() => {
                            Keyboard.dismiss()
                            setOpen(open == 'settings' ? '' : open == 'confirmDelete' ? '' : 'settings')
                        }}
                        style={styles.icon}
                    >
                    <Trash color={'#7e8291'} size={30} />
                </Pressable>
                {/* <Pressable
                        onPress={() => {
                            if (body.length > 0) {
                                setBody(body + '\n\u2022')
                            } else {
                                setBody(body + '\u2022')
                            }
                        }}
                        style={styles.icon}
                    >
                    <ListChecks color={'#7e8291'} size={30} />
                </Pressable> */}
                <Pressable
                        onPress={() => ToastAndroid.show("Colors are not implemented", ToastAndroid.SHORT)}
                        style={styles.icon}
                    >
                    <Palette color={'#7e8291'} size={30} />
                </Pressable>
            </View>
            <View>
                {open == 'settings'
                    ? <View style={styles.settingsDrawer}>
                        <Pressable
                            onPress={() => {
                                setOpen('confirmDelete')
                            }}
                            style={styles.button}
                        >
                            {/* <Trash color={'#7e8291'} size={30}/> */}
                            <Text style={styles.text}>Delete Note</Text>
                        </Pressable>
                    </View>
                    : null}
                {open == 'confirmDelete'
                    ? <View style={styles.drawer}>
                        <Text style={styles.text}>Are you sure you want to delete?</Text>
                        <View style={styles.confirmDeleteDrawer}>
                            <Pressable
                                onPress={() => {
                                    deleteNote(id)
                                    navigation.navigate('NotesList')
                                    setOpen('')
                                }}
                                style={[styles.button, { width: '50%' }]}
                            >
                                <Text style={styles.text}>Confirm</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    setOpen('')
                                }}
                                style={[styles.button, { width: '50%' }]}
                            >
                                <Text style={styles.text}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                    : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        paddingHorizontal: 20,
        backgroundColor: BG_DARK,
        flex: 1,
    },
    titleInput: {
        marginTop: 25,
        fontSize: 30,
        color: '#f0f1f5',
        paddingBottom: 20,
    },
    bodyInput: {
        paddingBottom: 25,
        flexGrow: 1,
        color: '#f0f1f5',
        fontSize: 20,
        textAlignVertical: 'top',
    },
    text: {
        // paddingBottom: 20,
        // paddingTop: 10,
        color: '#7e8291',
        fontSize: 20,
        textAlign: 'center',
    },
    bottomBar: {
        // position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: BG_MEDIUM,
        padding: 10,
        minHeight: 70,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
    },
    iconRow: {
        flexDirection: 'row',
    },
    icon: {
        paddingHorizontal: 10,
    },
    drawer: {
        padding: 10,
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
        backgroundColor: BG_DARK,
    },
  })

export default NoteDetailDrawer