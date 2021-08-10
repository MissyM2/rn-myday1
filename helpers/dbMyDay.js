import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mtbl_myday.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS MTBL_MYDAY (id INTEGER PRIMARY KEY NOT NULL, timestamp TEXT not null, timestampMilliSec TEXT NOT NULL, taskstate TEXT NOT NULL, userId INTEGER NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err)=> {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertMyDayTime = (name, ) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO MTBL_MYDAY (timestamp, timestampMilliSec, taskstate, userId) VALUES (?, ?, ?, ?);',
                [timestamp, timestampMilliSec, taskstate, userId],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const fetchAllimeStamps = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM MTBL_MYDAY',
                [],
                (_, result) => {
                    console.log('Results', results.rowsAffected);
                    resolve(result);
                },
                (_, err) => {
                    console.log('Add row to MTBL_MYDAY failed')
                    reject(err);
                }
            );
        });
    });
    return promise;
}