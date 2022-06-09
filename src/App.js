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
import { Box } from '@mui/material';
import NavBar from './components/Main/NavBar';
import Research from './components/Research/Research';
import BehaviourChain from './components/Research/BehaviourChain';
import ActivitiesCollect from './components/Strategy/ActivitiesCollect';
import ActivitiesPrioritize from './components/Strategy/ActivitiesPrioritize';
import Profile from './components/Research/Profile';
import GamificationFit from './components/Research/GamificationFit';
import { bcsReducer } from './Reducers/BehaviourChains';
import { synthReducer } from './Reducers/Synthesis';
import SkillAtom from './components/Synthesis/SkillAtom';
import Synthesis from './components/Synthesis/Synthesis';
import Identify from './components/Synthesis/Identify';
import DesignLens from './components/Synthesis/DesignLens';
import Ideation from './components/Ideation/Ideation';
import FocusQuestions from './components/Ideation/FocusQuestions';
import { atpReducer } from './Reducers/ActivityTargetPair';
import UserResearch from './components/Research/UserResearch';
import ideasReducer from './Reducers/IdeasReducer';
import Clustering from './components/Ideation/Clustering';
import canvasReducer from './Reducers/CanvasReducer';

function App() {

  const localGoal = localStorage.getItem("goal");
  const localMetric = localStorage.getItem("metric");
  const localActivities = localStorage.getItem("activities");
  const localTargetGroups = localStorage.getItem("targetGroups");
  const localActiveActivity = localStorage.getItem("activeActivity");
  const localBehaviourChains = localStorage.getItem("behaviourChains");
  const localSynthesis = localStorage.getItem("synthesis");
  const localActivityTargetPairs = localStorage.getItem("activityTargetPairs");
  const localIdeas = localStorage.getItem("ideas");
  const localCanvas = localStorage.getItem("canvas");

  const [goal, setGoal] = useState(localGoal ? localGoal : "Increase number of students that use calendar app regularly");
  const [metric, setMetric] = useState(localMetric ? localMetric : "Number of students using the app for more than 2 weeks");
  const [activities, setActivities] = useState(localActivities ? JSON.parse(localActivities) : ["create appointment"]);
  const [targetGroups, setTargetGroups] = useState(localTargetGroups ? JSON.parse(localTargetGroups) : ["student"]);
  
  const [activeActivity, setActiveActivity] = useState(localActiveActivity ? JSON.parse(localActiveActivity) : {"id":"c984f5dc-ff51-48d8-9f79-af517da6e77e","priority":0,"targetGroup":"student","activity":"create appointment"});
  
  const [behaviourChains, bcsDispatch] = useReducer(bcsReducer, localBehaviourChains ? JSON.parse(localBehaviourChains) : {});
  const [synthesis, synthDispatch] = useReducer(synthReducer, localSynthesis ? JSON.parse(localSynthesis) : {});
  const [activityTargetPairs, atpDispatch] = useReducer(atpReducer, localActivityTargetPairs ? JSON.parse(localActivityTargetPairs) : [{"id":"c984f5dc-ff51-48d8-9f79-af517da6e77e","priority":0,"targetGroup":"student","activity":"create appointment"}]);
  const [ideas, ideasDispatch] = useReducer(ideasReducer, localIdeas ? JSON.parse(localIdeas) : {});
  const [canvas, canvasDispatch] = useReducer(canvasReducer, localCanvas ? JSON.parse(localCanvas) : {});

  // useEffect(() => {
  //   console.log(localStorage);
  // }, []);

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas])

  useEffect(() => {
    updateCanvasElems(activeActivity.id, flattenIdeas(activeActivity.id, ideas), "idea");
  }, [ideas, activeActivity])

  useEffect(() => {
    localStorage.setItem("canvas", JSON.stringify(canvas));
  }, [canvas])

  useEffect(() => {
    localStorage.setItem("behaviourChains", JSON.stringify(behaviourChains));
  }, [behaviourChains])

  useEffect(() => {
    localStorage.setItem("synthesis", JSON.stringify(synthesis));
  }, [synthesis])

  useEffect(() => {
    localStorage.setItem("activityTargetPairs", JSON.stringify(activityTargetPairs));
  }, [activityTargetPairs])

  useEffect(() => {
    addSynthTargetActivity(activeActivity.id);
    initCanvas(activeActivity.id);
    localStorage.setItem("activeActivity", JSON.stringify(activeActivity));
  }, [activeActivity])

  useEffect(() => {
    localStorage.setItem("goal", goal);
  }, [goal])

  useEffect(() => {
    localStorage.setItem("metric", metric);
  }, [metric])

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities])

  useEffect(() => {
    localStorage.setItem("targetGroups", JSON.stringify(targetGroups));
  }, [targetGroups])

  const addChainPart = (name) => {
    bcsDispatch({type: "ADDPART", activeId: activeActivity.id, name: name});
  }

  const removeChainPart = (index) => {
    bcsDispatch({type: "REMOVEPART", activeId: activeActivity.id, index: index});
  }

  const addMotivator = (motivator, prio) => {
    bcsDispatch({type: "ADDMOTIV", activeId: activeActivity.id, motivator: motivator, prio: prio});
  }

  const removeMotivator = (motivIndex, prio) => {
    bcsDispatch({type: "REMOVEMOTIV", activeId: activeActivity.id, index: motivIndex, prio: prio});
  }

  const addHurdle = (hurdle, prio) => {
    bcsDispatch({type: "ADDHURDLE", activeId: activeActivity.id, hurdle: hurdle, prio: prio});
  }

  const removeHurdle = (hurdleIndex, prio) => {
    bcsDispatch({type: "REMOVEHURDLE", activeId: activeActivity.id, index: hurdleIndex, prio: prio});
  }

  const handleBcFit = (prio, fitAnswerItr, value) => {
    bcsDispatch({type: "CHANGEFIT", activeId: activeActivity.id, prio: prio, fitAnswerItr: fitAnswerItr, value: value});
  }
  
  const handleBcSwap = (pos, direction) => {
    const bcLength = behaviourChains[activeActivity.id].length;
    if (direction === "right") {
      if (pos < bcLength - 1) {
        bcsDispatch({type: "SWAP", activeId: activeActivity.id, prio1: pos, prio2: parseInt(pos) + 1});
      } else {
        bcsDispatch({type: "SWAP", activeId: activeActivity.id, prio1: pos, prio2: 0});
      }
    } else {
      if (pos > 0) {
        bcsDispatch({type: "SWAP", activeId: activeActivity.id, prio1: pos, prio2: parseInt(pos) - 1});
      } else {
        bcsDispatch({type: "SWAP", activeId: activeActivity.id, prio1: pos, prio2: bcLength - 1});
      }
    }
  }

  const addSynthTargetActivity = (activityId) => {
    synthDispatch({type: "AddTargetActivity", activeId: activityId})
  }

  const addSynthItem = (attribute, element) => {
    synthDispatch({type: "AddItem", activeId: activeActivity.id, attribute: attribute, element: element})
  }

  const removeSynthItem = (attribute, index) => {
    synthDispatch({type: "RemoveItem", activeId: activeActivity.id, attribute: attribute, index: index})
  }

  const addSynthProblem = (designlens) => {
    synthDispatch({type: "AddProblem", activeId: activeActivity.id, designlens: designlens});
  }

  const removeSynthProblem = (designlens, pos) => {
    synthDispatch({type: "RemoveProblem", activeId: activeActivity.id, designlens: designlens, pos: pos});
  }

  const updateSynthProblem = (designlensId, pos, text) => {
    synthDispatch({type: "UpdateProblem", activeId: activeActivity.id, designlensId: designlensId, pos: pos, text: text});
  }

  const handleSwapAtp = (prio1, prio2) => {
    atpDispatch({type: "SWAP", prio1: prio1, prio2: prio2})
  }

  const handleInitAtp = () => {
    atpDispatch({type: "INIT", targetGroups: targetGroups, activities: activities})
  }

  const addIdea = (designlensId, idea) => {
    ideasDispatch({type: "ADD", activeId: activeActivity.id, dlId: designlensId, idea: idea})
  }

  const removeIdea = (designlensId, pos) => {
    ideasDispatch({type: "REMOVE", activeId: activeActivity.id, dlId: designlensId, pos: pos})
  }

  const initCanvas = (activeId) => {
      canvasDispatch({type: "INIT", activeId: activeId})
  }

  const updateCanvasElems = (activeId, list, elemType="idea") => {
      canvasDispatch({type: "UPDATE", elem: elemType, activeId: activeId, list: list})
  }

  const moveCanvasElems = (id, newPos, elemType="idea") => {
      canvasDispatch({type: "MOVE", elem: elemType, activeId: activeActivity.id, id: id, newPos: newPos})
  }

  const addDot = (id) => {
      canvasDispatch({type: "ADDDOTT", activeId: activeActivity.id, id: id});
  }

  const removeDot = (id) => {
      canvasDispatch({type: "REMOVEDOT", activeId: activeActivity.id, id: id});
  }

  const addGroup = (groupTitle) => {
      canvasDispatch({type: "ADDGROUP", activeId: activeActivity.id, groupTitle: groupTitle})
  }

  const removeGroup = (groupId) => {
    canvasDispatch({type: "REMOVEGROUP", activeId: activeActivity.id, groupId: groupId})
}

  const flattenIdeas = (activeId, ideasUnflattened) => {
    const flattened = [];

    for (let dls in ideasUnflattened[activeId]) {
        for (let idea of ideasUnflattened[activeId][dls]) {
          flattened.push(idea);
        }
    }

    return flattened;
  }

  const addActivity = (activitiy) => {
    setActivities([...activities, activitiy]);
  }

  const removeActivity = (index) => {
      const newActivities = activities.filter((val, ind) => {
        return (ind !== parseInt(index))
      })
      setActivities(newActivities);
  }

  const addTargetGroup = (targetGroup) => {
    setTargetGroups([...targetGroups, targetGroup]);
  }

  const removeTargetGroup = (index) => {
    const newTargetGroups = targetGroups.filter((val, ind) => {
      return (ind !== parseInt(index))
    })
    setTargetGroups(newTargetGroups);
}

  const pickActivity = (activityPair) => {
    setActiveActivity(activityPair);
  }

  const profile = <Profile goal={goal} metric={metric} activity={activeActivity.activity} 
    behaviourChain={behaviourChains[activeActivity.id]} targetGroup={activeActivity.targetGroup}
  />

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
                <GroupAndActivities />} >
                <Route path="collect" element={
                    <ActivitiesCollect activities={activities} targetGroups={targetGroups}
                        addActivity={addActivity} removeActivity={removeActivity} addTargetGroup={addTargetGroup}
                        generateActivityPairs={handleInitAtp} removeTargetGroup={removeTargetGroup}
                        activityTargetPairs={activityTargetPairs}
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
                                      addChainPart={addChainPart} handleSwap={handleBcSwap}
                                      removeChainPart={removeChainPart}
                />} />
                <Route path="users" element={
                      <UserResearch activeActivity={activeActivity} behaviourChain={behaviourChains[activeActivity.id]}
                      addMotivator={addMotivator} addHurdle={addHurdle} addChainPart={addChainPart}
                      removeMotivator={removeMotivator} removeHurdle={removeHurdle}
                />} />
                <Route path="profile" element={profile} />
                <Route path="doesfit" element={
                      <GamificationFit behaviourChain={behaviourChains[activeActivity.id]}
                            targetActivity={activeActivity.activity} targetGroup={activeActivity.targetGroup} handleBcFit={handleBcFit}/>} />
            </Route>
            <Route path="synthesis" element={<Synthesis/>}>
              <Route path="skillatom" element={
                      <SkillAtom synthesis={synthesis[activeActivity.id]} addItem={addSynthItem}
                                  activityPair={activeActivity} profile={profile} removeItem={removeSynthItem}
                      />} />
              <Route path="identify" element={
                      <Identify synthesis={synthesis[activeActivity.id]}
                          targetActivity={activeActivity.activity} addProblem={addSynthProblem}
                          updateProblem={updateSynthProblem} profile={profile}
                          removeProblem={removeSynthProblem}
                      />} />
            </Route>
            <Route path="ideation" element={<Ideation/>}>
                <Route path="focusquestions" element={
                        <FocusQuestions synthesis={synthesis[activeActivity.id]}
                            ideas={ideas} addIdea={addIdea} activityId={activeActivity.id}
                            removeIdea={removeIdea}
                        />} 
                />
                <Route path="clustering" element={
                        <Clustering
                            ideas={ideas[activeActivity.id]}
                            moveElems={moveCanvasElems} activeCanvas={canvas[activeActivity.id]}
                            addGroup={addGroup} addDot={addDot} removeDot={removeDot}
                            removeGroup={removeGroup}
                        />} />
            </Route>
            <Route path="test" element={<DesignLens/> }/>
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
