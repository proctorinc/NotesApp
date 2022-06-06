import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.notesapp')

/**
 * Checks to make sure the table exists. Creates database table if not.
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
                console.log('Error creating table: ' + error.message)
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
    createTables()
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

export const getFilteredNotes = (filter) => {
    createTables()
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