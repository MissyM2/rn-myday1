export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const RESET_TIMER = 'RESET_TIMER'
export const TICK = 'TICK';

export const startTimer = () => {
    console.log('timer-actions: startTimer');
    return { 
        type: START_TIMER,
        baseTime: baseTime,
        now: new Date().getTime()
    }
};

export const stopTimer = () => {
    console.log('timer-actions: stopTimer');
    return { 
        type: STOP_TIMER,
        now: new Date().getTime()
    };
};

export const resetTimer = () => {
    console.log('timer-actions: resetTimer');
    return { 
        type: RESET_TIMER,
        now: new Date().getTime()
    }
};

export const tick = payload => {
    console.log('timer-actions: tick');
    return { 
        type: TICK
    }
};
