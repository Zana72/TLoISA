import ClusterGroup from "../data/Structs/ClusterGroup";
import { v4 as uuidv4 } from 'uuid';

const initCanvas = (state, activeId) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (activeId) {
        if (!canvasCopy[activeId]) {
            canvasCopy[activeId] = {
                ideas: {},
                groups: {}
            }
        }
    }

    return canvasCopy;
}

const updateIdeas = (state, activeId, ideas) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (canvasCopy[activeId]) {

        for (let idea of ideas) {
            if (!canvasCopy[activeId].ideas[idea.id]) {
                canvasCopy[activeId].ideas[idea.id] = {x: 0, y: 0}
            }
        }
    }

    return canvasCopy;
}

const moveIdea = (state, activeId, ideaId, newPos) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (canvasCopy[activeId]) {
        if (canvasCopy[activeId].ideas[ideaId]) {
            canvasCopy[activeId].ideas[ideaId] = newPos
        }
    }

    return canvasCopy;
}

const addGroup = (state, activeId, groupTitle) => {
    const canvasCopy = JSON.parse(JSON.stringify(state));

    if (canvasCopy[activeId]) {
        let newId = uuidv4();
        canvasCopy[activeId].groups[newId] = ClusterGroup(groupTitle, newId);
    }

    return canvasCopy;
}

const moveGroup = (state, activeId, groupId, newPos) => {
    const canvasCopy = JSON.parse(JSON.stringify(state))

    if (canvasCopy[activeId]) {
        if (canvasCopy[activeId].groups[groupId]) {
            canvasCopy[activeId].groups[groupId] = 
                ClusterGroup(
                    canvasCopy[activeId].groups[groupId].name,
                    groupId, newPos.x, newPos.y) 
        }
    }

    return canvasCopy;
}

export default function canvasReducer(state, action) {
    switch(action.type) {
        case "INIT":
            return initCanvas(state, action.activeId);
        case "MOVE":
            if (action.elem === "group") {
                return moveGroup(state, action.activeId, action.id, action.newPos)
            } else if (action.elem === "idea") {
                return moveIdea(state, action.activeId, action.id, action.newPos)
            } else return state;
        case "UPDATE":
            return updateIdeas(state, action.activeId, action.list)
        case "ADDGROUP":
            return addGroup(state, action.activeId, action.groupTitle);
        default:
            return state;
    }
}