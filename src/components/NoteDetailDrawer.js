import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Keyboard } from 'react-native'
import { Trash, Circle, Palette, ListChecks, DotsThreeVertical } from 'phosphor-react-native'
import { deleteNote } from '../db'

const NoteDetailDrawer = ({closed, id, onComplete, body, setBody}) => {
    const [open, setOpen] = useState('')

    useEffect(() => {
        if (closed) {
            setOpen('')
        }
    }, [closed])

    // const colorDrawer = () => (
    //     <View style={styles.colorDrawer}>
    //         <TouchableOpacity>
    //             <Square color={'red'} weight={'fill'} size={50}/>
    //         </TouchableOpacity>
    //         <TouchableOpacity>
    //             <Square color={'orange'} weight={'fill'} size={50}/>
    //         </TouchableOpacity>
    //         <TouchableOpacity>
    //             <Square color={'yellow'} weight={'fill'} size={50}/>
    //         </TouchableOpacity>
    //         <TouchableOpacity>
    //             <Square color={'green'} weight={'fill'} size={50}/>
    //         </TouchableOpacity>
    //         <TouchableOpacity>
    //             <Square color={'blue'} weight={'fill'} size={50}/>
    //         </TouchableOpacity>
    //         <TouchableOpacity>
    //             <Square color={'purple'} weight={'fill'} size={50}/>
    //         </TouchableOpacity>
    //     </View>
    // )

    return (
        <View style={styles.bottomBar}>
            <View style={styles.iconRow}>
                <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss()
                            setOpen(open == 'settings' ? '' : 'settings')
                        }}
                        style={styles.icon}
                    >
                    <DotsThreeVertical color={'#7e8291'} size={30} />
                </TouchableOpacity>
                <TouchableOpacity
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
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={() => ToastAndroid.show("Colors are not implemented", ToastAndroid.SHORT)}
                        style={styles.icon}
                    >
                    <Palette color={'#7e8291'} size={30} />
                </TouchableOpacity>
            </View>
            <View>
                {open == 'settings'
                    ? <View style={styles.settingsDrawer}>
                        <TouchableOpacity
                            onPress={() => {
                                setOpen('confirmDelete')
                            }}
                            style={styles.button}
                        >
                            <Trash color={'#7e8291'} size={30}/>
                            <Text style={styles.text}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // setOpen('confirmDelete')
                            }}
                            style={styles.button}
                        >
                            {/* <Trash color={'#7e8291'} size={30}/> */}
                            <Text style={styles.text}>Setting #2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // setOpen('confirmDelete')
                            }}
                            style={styles.button}
                        >
                            {/* <Trash color={'#7e8291'} size={30}/> */}
                            <Text style={styles.text}>Setting #3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // setOpen('confirmDelete')
                            }}
                            style={styles.button}
                        >
                            {/* <Trash color={'#7e8291'} size={30}/> */}
                            <Text style={styles.text}>Setting #4</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
                {open == 'confirmDelete'
                    ? <View style={styles.drawer}>
                        <Text style={styles.text}>Are you sure you want to delete?</Text>
                        <View style={styles.confirmDeleteDrawer}>
                            <TouchableOpacity
                                onPress={() => {
                                    deleteNote(id)
                                    onComplete()
                                    setOpen('')
                                }}
                                style={[styles.button, { width: '50%' }]}
                            >
                                <Text style={styles.text}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpen('')
                                }}
                                style={[styles.button, { width: '50%' }]}
                            >
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity>
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
        backgroundColor: '#202124',
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
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#2f313b',
        padding: 10,
        minHeight: 70,
        borderRadius: 10,
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
        backgroundColor: '#202124',
    },
  })

export default NoteDetailDrawer