import { v4 as uuidv4 } from 'uuid';
import BehaviourPart from '../data/Structs/BehaviourPart';

const addMotivatorToBC = (state, activeId, motivator, prio) => {
    const bcCopy = JSON.parse(JSON.stringify(state));
    bcCopy[activeId][prio].motivations.push(motivator);

    return bcCopy;
}

const addHurdleToBC = (state, activeId, hurdle, prio) => {
    const bcCopy = JSON.parse(JSON.stringify(state));
    bcCopy[activeId][prio].hurdles.push(hurdle);

    return bcCopy;
}

const handleBcFit = (state, activeId, prio, fitAnswerItr, value) => {
    const bcCopy = JSON.parse(JSON.stringify(state));
    bcCopy[activeId][prio].fitAnswers[fitAnswerItr] = value;

    return bcCopy;
}

const addChainPartToBehaviourChain = (state, activeId, name) => {

    const bcCopy = JSON.parse(JSON.stringify(state));

    const uid = uuidv4();

    if (!bcCopy[activeId]) {
      bcCopy[activeId] = [BehaviourPart(uid, name, 0)]
    } else {
      const lastIterator = Object.keys(bcCopy[activeId]).length
      bcCopy[activeId].push(BehaviourPart(uid, name, lastIterator))
    }
    return bcCopy;
}

const swapBehaviourParts = (state, activeId, prio1, prio2) => {

  let newState = JSON.parse(JSON.stringify(state));

  // swap entries in array additionally to object priority-attribute
  newState[activeId][prio1] = JSON.parse(JSON.stringify(state[activeId][prio2]));
  newState[activeId][prio2] = JSON.parse(JSON.stringify(state[activeId][prio1]));

  for (let index in newState[activeId]) {
      newState[activeId][index].priority = parseInt(index);
  }

  return newState;
}

export const bcsReducer = (state, action) => {
    switch(action.type) {
        case "ADDMOTIV":
          return addMotivatorToBC(state, action.activeId, action.motivator, action.prio);
        case "ADDHURDLE":
          return addHurdleToBC(state, action.activeId, action.hurdle, action.prio);
        case "CHANGEFIT":
          return handleBcFit(state, action.activeId, action.prio, action.fitAnswerItr, action.value)
        case "ADDPART":
          return addChainPartToBehaviourChain(state, action.activeId, action.name);
        case "SWAP":
          return swapBehaviourParts(state, action.activeId, action.prio1, action.prio2)
        default:
          return state;
    } 
}