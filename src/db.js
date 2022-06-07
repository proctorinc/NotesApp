import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.notesapp')

/**
 * Checks to make sure the notes and settings tables exist. Creates database tables if not.
 */
export const createTables = () => {
    db.transaction(txn => {
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100), body VARCHAR(1000))`,
            null,
            (sqlTxn, res) => {
                // console.log('Successfully created Table!')
            },
            error => {
                console.log('Error creating notes table: ' + error.message)
            }
        )
    })
    db.transaction(txn => {
        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS settings (name VARCHAR(20) PRIMARY KEY, value VARCHAR(20))`,
            null,
            (sqlTxn, res) => {
                // console.log('Successfully created Table!')
            },
            error => {
                console.log('Error creating settings table: ' + error.message)
            }
        )
    })
}

/**
 * Creates a new Note with a title and a body.
 * 
 * @param {*} title 
 * @param {*} body 
 */
export const createNote = (title, body) => {
    return new Promise(async (resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO notes (title, body) VALUES (?, ?)`,
                [title, body],
                (sqlTxn, res) => {
                    // console.log('Added note to db')
                    resolve(res.insertId)
                },
                error => {
                    console.log('Error adding note to db: ' + error.message)
                }
            )
        })
    })
}

/**
 * Get all notes from database. Make sure table is created before retrieving data.
 * 
 * @param {*} title 
 * @param {*} body 
 * @param {*} id 
 */
export const updateNote = (id, title, body) => {
    db.transaction(txn => {
        txn.executeSql(
            `UPDATE notes SET title = ?, body = ? WHERE id = ?`,
            [title, body, id],
            (sqlTxn, res) => {
                // console.log('Added note to db')
            },
            error => {
                console.log('Error adding note to db: ' + error.message)
            }
        )
    })
}

/**
 *  Get all notes from database. Make sure table is created before querying 
 */
export const getNotes = () => {
    return new Promise(async (resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM notes ORDER BY id DESC`,
                null,
                (sqlTxn, { rows: { _array } }) => {
                    // console.log('Successfully fetched notes!')
                    resolve(_array)
                },
                error => {
                    console.log('Error fetching notes: ' + error.message)
                    reject(error.message)
                }
            )
        })
    })
}

/**
 * Delete note from database
 * 
 * @param {*} id
 */
export const deleteNote = (id) => {
    db.transaction(txn => {
        txn.executeSql(
            `DELETE FROM notes WHERE id = ?`,
            [id],
            (sqlTxn, res) => {
                // console.log('Successfully deleted note!')
            },
            error => {
                console.log('Error deleting note: ' + error.message)
            }
        )
    })
}

/**
 * Gets notes from database checking for title or body containing filter text
 * 
 * @param {*} filter 
 * @returns 
 */
export const getFilteredNotes = (filter) => {
    return new Promise(async (resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM notes WHERE title LIKE ? OR body LIKE ? ORDER BY id DESC`,
                [`%${filter}%`, `%${filter}%`],
                (sqlTxn, { rows: { _array } }) => {
                    // console.log('Successfully fetched notes!')
                    resolve(_array)
                },
                error => {
                    console.log('Error fetching notes: ')
                    console.log(error)
                    reject(error.message)
                }
            )
        })
    })
}

const initializeSettings = () => {
    db.transaction(txn => {
        txn.executeSql(
            `INSERT INTO settings (name, value) VALUES ('theme', 'dark')`,
            [],
            (sqlTxn, res) => {
                // console.log('Added note to db')
            },
            (sqlTxn, err) => {
                console.log('Error adding settings to db: ')
                console.log(err)
            }
        )
    })
    db.transaction(txn => {
        txn.executeSql(
            `INSERT INTO settings (name, value) VALUES ('layout', '1')`,
            [],
            (sqlTxn, res) => {
                // console.log('Added note to db')
            },
            (sqlTxn, err) => {
                console.log('Error adding settings to db: ')
                console.log(err)
            }
        )
    })
}

export const getSettings = () => {
    return new Promise(async (resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM settings`,
                null,
                (sqlTxn, { rows: { _array } }) => {
                    // console.log('Successfully fetched notes!')
                    console.log('Should be [theme, layout]:')
                    console.log(_array)
                    if (_array.length < 2) {
                        console.log('Missing Settings!')
                        initializeSettings()
                        resolve({ theme: 'dark', layout: '1' })
                    }
                    resolve({ theme: 'dark', layout: '1' })
                    // resolve(_array)
                },
                error => {
                    console.log('Error fetching notes: ')
                    console.log(error)
                    reject(error.message)
                }
            )
        })
    })
}

const updateSettings = () => {

}
