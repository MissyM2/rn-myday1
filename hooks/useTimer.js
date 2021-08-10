import { useState, useRef } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mtbl_myday.db');


const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timestamp, setTimeStamp] = useState(null);
  const [taskstate, setTaskstate] = useState("");
  const [userId, setUserId] = useState(6);

  const countRef = useRef(null)

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000);

    setTimeStamp(Date.now());
    console.log('timeStamp after start', timestamp);
    setTaskstate('startState');
    console.log('taskstate is', taskstate);

    db.transaction(function (txn) {
      txn.executeSql('DROP TABLE IF EXISTS MTBL_MYDAY', []);
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS MTBL_MYDAY (id INTEGER PRIMARY KEY NOT NULL, timestamp INTEGER not null, taskstate TEXT NOT NULL, userId INTEGER NOT NULL);',
          []);
      txn.executeSql(
        'INSERT INTO MTBL_MYDAY (timestamp, taskstate, userId) VALUES (?,?,?)',
        [timestamp, taskstate, userId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('You added one row to MTBL_MYDAY');
          } else console.log('Add row to MTBL_MYDAY failed');
        }
      );
      txn.executeSql(
        'SELECT * FROM MTBL_MYDAY;',
          [],
          (txn, results) => {
            console.log('results', results);
          });
    });
  }

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
    setTimeStamp(Date.now());
    console.log('timeStamp after start', timestamp);
    setTaskstate('pausedState');
    console.log('taskstate is', taskstate);

    db.transaction(function (txn) {
      txn.executeSql(
        'INSERT INTO MTBL_MYDAY (timestamp, taskstate, userId) VALUES (?,?,?)',
        [timestamp, taskstate, userId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('You added one row to MTBL_MYDAY');
          } else console.log('Add row to MTBL_MYDAY failed');
        }
      );

      txn.executeSql(
        'SELECT * FROM MTBL_MYDAY;',
          [],
          (txn, results) => {
            console.log('results after handlePause', results);
          }
      );
    });

    
  }

  const handleResume = () => {
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000);

    setTimeStamp(Date.now());
    console.log('timeStamp after start', timestamp);
    setTaskstate('resumeState');
    console.log('taskstate is', taskstate);

    db.transaction(function (txn) {

        txn.executeSql(
          'INSERT INTO MTBL_MYDAY (timestamp, taskstate, userId) VALUES (?,?,?)',
          [timestamp, taskstate, userId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('You added one row to MTBL_MYDAY');
            } else console.log('Add row to MTBL_MYDAY failed');
          }
        );

        txn.executeSql(
          'SELECT * FROM MTBL_MYDAY;',
            [],
            (txn, results) => {
              console.log('results after handleResume', results);
            }
        );
    });

  }

  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset };
}

export default useTimer;