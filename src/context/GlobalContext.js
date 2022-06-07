import { createContext, useContext, useState, useEffect } from 'react';
import { createTables, getSettings } from '../db';

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export const GlobalContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('')
    const [layout, setLayout] = useState('')
    // const [textSize, setTextSize] = useState(1)

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
        setTheme(theme == 'dark' ? 'light' : 'dark')
    }

    const toggleLayout = () => {
        setLayout(layout == '1' ? '2' : '1')
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