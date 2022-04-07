
import { v4 as uuidv4 } from 'uuid';
import activityTargetPair from '../data/Structs/ActivityTargetPair';

const generateActivityPairs = (targetGroups, activities) => {

    let state = [];

    let prio = 0;
    for (let targetGroup of targetGroups) {
        for (let activity of activities) {
        state.push(
            activityTargetPair(uuidv4(), prio, targetGroup, activity)
        )
        prio = prio+1;
        }
    }

    return state;
}

const swapActivityPair = (state, prio1, prio2) => {

    let newState = JSON.parse(JSON.stringify(state));

    // swap entries (for table order)
    newState[prio1] = JSON.parse(JSON.stringify(state[prio2]));
    newState[prio2] = JSON.parse(JSON.stringify(state[prio1]));

    for (let index in newState) {
        newState[index].priority = index;
    }

    return newState;
}

export const atpReducer = (state, action) => {
    switch(action.type) {
        case "SWAP":
            return swapActivityPair(state, action.prio1, action.prio2);
        case "INIT":
            return generateActivityPairs(action.targetGroups, action.activities);
        default:
            return state;
    } 
}