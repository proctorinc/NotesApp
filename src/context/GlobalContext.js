import { createContext, useContext, useState, useEffect } from 'react';
import { Keyboard } from 'react-native'
import { DARK_THEME, LIGHT_THEME, ONE_COLUMN, TWO_COLUMN } from '../consts';
import { createTables, deleteNote, getSettings, updateLayoutSetting, updateThemeSetting } from '../db';

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export const GlobalContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('')
    const [layout, setLayout] = useState('')
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [selectedNotes, setSelectedNotes] = useState([])

    const fetchSettings = () => {
        createTables()
        getSettings()
            .then(({ theme, layout }) => {
                setTheme(theme)
                setLayout(layout)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const toggleTheme = () => {
        const newTheme = theme == DARK_THEME ? LIGHT_THEME : DARK_THEME
        setTheme(newTheme)
        updateThemeSetting(newTheme)
    }

    const toggleLayout = () => {
        const newLayout = layout == TWO_COLUMN ? ONE_COLUMN : TWO_COLUMN
        setLayout(newLayout)
        updateLayoutSetting(newLayout)
    }

    const selectNote = (id) => {
        setSelectedNotes([...selectedNotes, id])
    }

    const deselectNote = (id) => {
        setSelectedNotes(selectedNotes.filter(noteId => noteId != id))
    }

    const isNoteSelected = (id) => {
        return selectedNotes.includes(id)
    }

    const isAnyNoteSelected = () => {
        return selectedNotes.length > 0
    }

    const deleteSelectedNotes = () => {
        console.log(selectedNotes)
        selectedNotes.forEach(noteId => {
            deleteNote(noteId)
        })
        setSelectedNotes([])
    }
    
    const clearSelectedNotes = () => {
        setSelectedNotes([])
    }

    useEffect(() => {
        fetchSettings()
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { setKeyboardVisible(true) })
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { setKeyboardVisible(false) })
        return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }
    }, [])

    const contextData = {
        theme,
        layout,
        toggleTheme,
        toggleLayout,
        keyboardVisible,
        selectNote,
        deselectNote,
        isNoteSelected,
        isAnyNoteSelected,
        deleteSelectedNotes,
        clearSelectedNotes,
    };

    return (
        <GlobalContext.Provider value={contextData}>
            {children}
        </GlobalContext.Provider>
    );
}