import React, {useEffect, useReducer, useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Strategy from './components/Strategy/Strategy';
import GoalsAndMetrics from './components/Strategy/GoalsAndMetrics';
import Home from './components/Home';
import GroupAndActivities from './components/Strategy/GroupAndActivities';
import { activityTargetPair } from './data/Structs/ActivityTargetPair';
import { Box } from '@mui/material';
import NavBar from './components/Main/NavBar';
import Research from './components/Research/Research';
import BehaviourChain from './components/Research/BehaviourChain';
import ActivitiesCollect from './components/Strategy/ActivitiesCollect';
import ActivitiesPrioritize from './components/Strategy/ActivitiesPrioritize';
import { v4 as uuidv4 } from 'uuid';
import Profile from './components/Research/Profile';
import GamificationFit from './components/Research/GamificationFit';
import { bcsReducer } from './components/Reducers/BehaviourChains';
import { synthReducer } from './components/Reducers/Synthesis';
import SkillAtom from './components/Synthesis/SkillAtom';
import Synthesis from './components/Synthesis/Synthesis';
import Identify from './components/Synthesis/Identify';
import DesignLens from './components/Synthesis/DesignLens';

function App() {

  const [goal, setGoal] = useState("");
  const [metric, setMetric] = useState("");
  const [activities, setActivities] = useState([]);
  const [targetGroups, setTargetGroups] = useState([]);
  const [contexts, setContexts] = useState([]);
  const [requirements, setRequirements] = useState([]);
  
  const [activeActivity, setActiveActivity] = useState({});
  
  const [behaviourChains, bcsDispatch] = useReducer(bcsReducer, {});
  const [synthesis, synthDispatch] = useReducer(synthReducer, {});

  const addChainPart = (name) => {
    bcsDispatch({type: "ADDPART", activeId: activeActivity.id, name: name});
  }

  const addMotivator = (motivator, uid) => {
    bcsDispatch({type: "ADDMOTIV", activeId: activeActivity.id, motivator: motivator, uid: uid});
  }

  const addHurdle = (hurdle, uid) => {
    bcsDispatch({type: "ADDHURDLE", activeId: activeActivity.id, hurdle: hurdle, uid: uid});
  }

  const handleBcFit = (id, fitAnswerItr, value) => {
    bcsDispatch({type: "CHANGEFIT", activeId: activeActivity.id, id: id, fitAnswerItr: fitAnswerItr, value: value});
  }

  const addSynthTargetActivity = (activityId) => {
    synthDispatch({type: "AddTargetActivity", activeId: activityId})
  }

  const addSynthItem = (attribute, element) => {
    synthDispatch({type: "AddItem", activeId: activeActivity.id, attribute: attribute, element: element})
  }

  const addSynthProblem = (designlens) => {
    synthDispatch({type: "AddProblem", activeId: activeActivity.id, designlens: designlens});
  }

  const updateSynthProblem = (designlensId, pos, text) => {
    synthDispatch({type: "UpdateProblem", activeId: activeActivity.id, designlensId: designlensId, pos: pos, text: text});
  }

  useEffect(() => {
    addSynthTargetActivity(activeActivity.id);
  }, [activeActivity])

  const generateActivityPairs = () => {

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
    console.log(newState);
    console.log(state);

    // swap entries (for table order)
    newState[prio1] = JSON.parse(JSON.stringify(state[prio2]));
    newState[prio2] = JSON.parse(JSON.stringify(state[prio1]));

    for (let index in newState) {
      newState[index].priority = index;
    }

    return newState;
  }

  const atpReducer = (state, action) => {
    switch(action.type) {
      case "SWAP":
        return swapActivityPair(state, action.prio1, action.prio2);
      case "INIT":
        return generateActivityPairs();
      default:
        return state;
    } 
  }
  
  const [activityTargetPairs, atpDispatch] = useReducer(atpReducer, []);

  const handleSwapAtp = (prio1, prio2) => {
    atpDispatch({type: "SWAP", prio1: prio1, prio2: prio2})
  }

  const handleInitAtp = () => {
    atpDispatch({type: "INIT"})
  }

  const addActivity = (activitiy) => {
    setActivities([...activities, activitiy]);
  }

  const addTargetGroup = (targetGroup) => {
    setTargetGroups([...targetGroups, targetGroup]);
  }

  const pickActivity = (activityPair) => {
    setActiveActivity(activityPair);
  }

  return (
    <BrowserRouter>
      <Box sx={{display: "flex"}}>
        <NavBar />
        <Box sx={{width: "100%"}}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="strategy" element={<Strategy goal={goal} metric={metric}/>}>
              <Route path="goal" element={
                <GoalsAndMetrics 
                  goal={goal} setGoal={setGoal} 
                  metric={metric} setMetric={setMetric}
              />} />
              <Route path="activities" element={
                <GroupAndActivities 
                  activities={activities} setActivities={setActivities} 
                  targetGroups={targetGroups} setTargetGroups={setTargetGroups}
                  addActivity={addActivity} addTargetGroup={addTargetGroup}
                  activityTargetPairs={activityTargetPairs}
                  generateActivityPairs={handleInitAtp}
                  swapActivityPair={handleSwapAtp} pickActivity={pickActivity}
              />} >
                <Route path="collect" element={
                    <ActivitiesCollect activities={activities} targetGroups={targetGroups}
                        addActivity={addActivity} addTargetGroup={addTargetGroup}
                        generateActivityPairs={handleInitAtp}
                />}/>
                <Route path="prioritize" element={
                    <ActivitiesPrioritize 
                      activityTargetPairs={activityTargetPairs} activeActivityId={activeActivity.id}
                      swapActivityPair={handleSwapAtp} pickActivity={pickActivity}
                  />
                }/>
              </Route>
            </Route>
            <Route path="research" element={<Research/>}>
                <Route path="behaviourchain" element={
                      <BehaviourChain activeActivity={activeActivity} behaviourChain={behaviourChains[activeActivity.id]}
                      addMotivator={addMotivator} addHurdle={addHurdle} addChainPart={addChainPart}
                />} />
                <Route path="profile" element={
                      <Profile goal={goal} metric={metric} activity={activeActivity.activity} 
                                behaviourChain={behaviourChains[activeActivity.id]} targetGroup={activeActivity.targetGroup}
                      />} />
                <Route path="doesfit" element={
                      <GamificationFit behaviourChain={behaviourChains[activeActivity.id]}
                            targetActivity={activeActivity.activity} handleBcFit={handleBcFit}/>} />
            </Route>
            <Route path="synthesis" element={<Synthesis/>}>
              <Route path="skillatom" element={
                      <SkillAtom synthesis={synthesis[activeActivity.id]} addItem={addSynthItem}
                                  activityPair={activeActivity} 
                      />} />
              <Route path="identify" element={
                      <Identify synthesis={synthesis[activeActivity.id]}
                          targetActivity={activeActivity.activity} addProblem={addSynthProblem}
                          updateProblem={updateSynthProblem}
                      />} />
            </Route>
            <Route path="test" element={<DesignLens/>}/>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Box>
      </Box>

    </BrowserRouter>
  )

  
}

export default App;
