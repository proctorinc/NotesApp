import { createContext, useContext, useState, useEffect } from 'react';
import { DARK_THEME, LIGHT_THEME, ONE_COLUMN, TWO_COLUMN } from '../consts';
import { createTables, getSettings, updateLayoutSetting, updateThemeSetting } from '../db';

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export const GlobalContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('')
    const [layout, setLayout] = useState('')

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

    useEffect(() => {
        fetchSettings()

        // return () => {
        //     unsubscribe();
        // };
    }, []);

    const contextData = {
        theme,
        layout,
        toggleTheme,
        toggleLayout,
    };

    return (
        <GlobalContext.Provider value={contextData}>
            {children}
        </GlobalContext.Provider>
    );
}