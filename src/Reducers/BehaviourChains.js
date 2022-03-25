import { v4 as uuidv4 } from 'uuid';
import BehaviourPart from '../data/Structs/BehaviourPart';

const addMotivatorToBC = (state, activeId, motivator, uid) => {
    const bcCopy = JSON.parse(JSON.stringify(state));
    bcCopy[activeId][uid].motivations.push(motivator);

    return bcCopy;
}

const addHurdleToBC = (state, activeId, hurdle, uid) => {
    const bcCopy = JSON.parse(JSON.stringify(state));
    bcCopy[activeId][uid].hurdles.push(hurdle);

    return bcCopy;
}

const handleBcFit = (state, activeId, id, fitAnswerItr, value) => {
    const bcCopy = JSON.parse(JSON.stringify(state));
    bcCopy[activeId][id].fitAnswers[fitAnswerItr] = value;

    return bcCopy;
}

const addChainPartToBehaviourChain = (state, activeId, name) => {

    const bcCopy = JSON.parse(JSON.stringify(state));

    const uid = uuidv4();

    if (!bcCopy[activeId]) {
      bcCopy[activeId] = {[uid]: BehaviourPart(uid, name, 0)}
    } else {
      const lastIterator = Object.keys(bcCopy[activeId]).length
      bcCopy[activeId][uid] = BehaviourPart(uid, name, lastIterator)
    }
    return bcCopy;
  }

export const bcsReducer = (state, action) => {
    switch(action.type) {
        case "ADDMOTIV":
        return addMotivatorToBC(state, action.activeId, action.motivator, action.uid);
        case "ADDHURDLE":
        return addHurdleToBC(state, action.activeId, action.hurdle, action.uid);
        case "CHANGEFIT":
        return handleBcFit(state, action.activeId, action.id, action.fitAnswerItr, action.value)
        case "ADDPART":
        return addChainPartToBehaviourChain(state, action.activeId, action.name);
        default:
        return state;
    } 
}