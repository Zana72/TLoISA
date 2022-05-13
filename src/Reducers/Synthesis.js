import { SynthProblems } from "../data/Structs/SynthProblems";

const addTargetActivity = (state, activeId) => {
    if (activeId && !state[activeId]) {
        const stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy[activeId] = {
            motivations: [],
            goals: [],
            actions: [],
            rules: [],
            feedback: [],
            challenges: [],
            problems: {}
        }
        return stateCopy;
    } else return state;
}

const addItem = (state, activeId, attribute, element) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    stateCopy[activeId][attribute].push(element);
    return stateCopy;
}

const removeItem = (state, activeId, attribute, index) => {

    const stateCopy = JSON.parse(JSON.stringify(state));
    stateCopy[activeId][attribute] = state[activeId][attribute].filter((val, ind) => {
        return parseInt(index) !== parseInt(ind)
    });
    return stateCopy;
}

const addProblem = (state, activeId, designlens) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    if (!stateCopy[activeId].problems[designlens.title]) {
        stateCopy[activeId].problems[designlens.title] = SynthProblems(designlens, [""]);
    } else {
        stateCopy[activeId].problems[designlens.title].problems.push("")
    }
    return stateCopy;
}

const removeProblem = (state, activeId, designlensId, pos) => {

    const stateCopy = JSON.parse(JSON.stringify(state));
    if (state[activeId].problems[designlensId].problems.length <= 1) {
        delete stateCopy[activeId].problems[designlensId]
    } else {
        stateCopy[activeId].problems[designlensId].problems = state[activeId].problems[designlensId].problems.filter((val, ind) => {
            return parseInt(pos) !== parseInt(ind)
        });
    }
    return stateCopy;
}

const updateProblem = (state, activeId, designlensId, pos, text) => {
    const stateCopy = JSON.parse(JSON.stringify(state));
    stateCopy[activeId].problems[designlensId].problems[pos] = text;
    return stateCopy;
}

export const synthReducer = (state, action) => {
    switch(action.type) {
        case "AddTargetActivity":
            return addTargetActivity(state, action.activeId);
        case "AddItem":
            return addItem(state, action.activeId, action.attribute, action.element);
        case "RemoveItem":
            return removeItem(state, action.activeId, action.attribute, action.index)
        case "AddProblem":
            return addProblem(state, action.activeId, action.designlens);
        case "RemoveProblem":
            return removeProblem(state, action.activeId, action.designlens, action.pos);
        case "UpdateProblem":
            return updateProblem(state, action.activeId, action.designlensId, action.pos, action.text);
        default:
            return state;
    } 
}