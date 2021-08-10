import Timer from "../../components/Timer";
import { 
    START_TIMER, 
    STOP_TIMER, 
    RESET_TIMER,
    TICK  
} from "../actions/timer-actions";

const initialState = {
    timerIsOn: false,
    startedAt: undefined,
    stoppedAt: undefined,
    baseTime: undefined
};

export default (state = initialState, action) => {
    console.log('inside before switch: action.type', action);
    switch (action.type) {
        case RESET_TIMER:
            return {
                ...state,
                baseTime: 0,
                startedAt: state.startedAt ? action.now : undefined,
                stoppedAt: state.stoppedAt ? action.now : undefined
            }
        case START_TIMER:
            return {
                ...state,
                baseTime: action.baseTime,
                startedAt: action.now,
                stoppedAt: undefined
            };
        case STOP_TIMER:
            return {
                ...state,
                stoppedAt: action.now
            };
        case TICK:
            return {
                ...state,
                time: state.time + (action.time = tate.offset),
                offset: action.time
            };
        default:
            return state;
    }
};

export function getElapsedTime(baseTime, startedAt, stoppedAt = new Date().getTime()) {
    if (!startedAt) {
        return 0;
    } else {
        return stoppedAt - startedAt + baseTime;
    }
};