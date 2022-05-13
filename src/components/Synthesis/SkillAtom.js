import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import { DoubleArrow} from '@mui/icons-material';
import SkillAtomPart from './SkillAtomPart';
import { skillAtomStatic } from '../../data/skillAtomStatic';
import ShowProfile from './ShowProfile';

export default function SkillAtom(props) {

    const [activePart, setActivePart] = useState("Motivation");

    if (props.synthesis && Object.keys(props.synthesis).length > 0) {
        const motivations = props.synthesis.motivations;
        const goals = props.synthesis.goals;
        const actions = props.synthesis.actions;
        const rules = props.synthesis.rules;
        const feedback = props.synthesis.feedback;
        const challenges = props.synthesis.challenges;
    
        const addPoint = (attribute) => (newPoint) => {
            props.addItem(attribute, newPoint);
        }

        const removePoint = (attribute) => (index) => {
            props.removeItem(attribute, index);
        }
    
        return(
            <Box>
                <Typography variant="h2">Skill Atom</Typography>
                <Typography variant="h3">Target Activity: {props.activityPair.activity} / {props.activityPair.targetGroup}</Typography>
                <ShowProfile top="1rem" right="2rem" profile={props.profile}/>
                <Box
                    sx={{
                        position: "relative", m: 5,
                        height: "50rem"
                    }}
                >
                    <SkillAtomPart 
                        isActive={activePart===skillAtomStatic.motivations.title}
                        top="54%" left="0%" title={skillAtomStatic.motivations.title}
                        info={skillAtomStatic.motivations.info}
                        points={motivations} addPoint={addPoint("motivations")}
                        removePoint={removePoint("motivations")}
                        addPLaceholder="Add Motivation"
                        icon={skillAtomStatic.motivations.icon}
                        onClick={() => setActivePart("Motivation")}
                    />
                    <DoubleArrow sx={{position: "absolute", top: "47%", left: "7%", transform: "rotate(-90deg)", fontSize: "36px"}}/>
                    <SkillAtomPart 
                        isActive={activePart===skillAtomStatic.goals.title}   
                        top="18%" left="0%" title={skillAtomStatic.goals.title}
                        info={skillAtomStatic.goals.info}
                        points={goals} addPoint={addPoint("goals")}
                        removePoint={removePoint("goals")}
                        addPLaceholder="Add Goal"
                        icon={skillAtomStatic.goals.icon}
                        onClick={() => setActivePart("Goal")}
                    />
                    <DoubleArrow sx={{position: "absolute", top: "16%", left: "23%", transform: "rotate(-16deg)", fontSize: "36px"}}/>
                    <SkillAtomPart 
                        isActive={activePart===skillAtomStatic.actions.title}
                        top="0%" left="32%" title={skillAtomStatic.actions.title}
                        info={skillAtomStatic.actions.info}
                        points={actions} addPoint={addPoint("actions")}
                        removePoint={removePoint("actions")}
                        addPLaceholder="Add Action/Object"
                        icon={skillAtomStatic.actions.icon}
                        onClick={() => setActivePart("Actions & Objects")}
                    />
                    <DoubleArrow sx={{position: "absolute", top: "24%", left: "56%", transform: "rotate(36deg)", fontSize: "36px"}}/>
                    <SkillAtomPart 
                        isActive={activePart===skillAtomStatic.rules.title}
                        top="36%" left="64%" title={skillAtomStatic.rules.title}
                        info={skillAtomStatic.rules.info}
                        points={rules} addPoint={addPoint("rules")}
                        removePoint={removePoint("rules")}
                        addPLaceholder="Add Rule"
                        icon={skillAtomStatic.rules.icon}
                        onClick={() => setActivePart("Rules")}
                    />
                    <DoubleArrow sx={{position: "absolute", top: "70%", left: "56%", transform: "rotate(146deg)", fontSize: "36px"}}/>
                    <SkillAtomPart 
                        isActive={activePart===skillAtomStatic.feedback.title}
                        top="72%" left="32%" title={skillAtomStatic.feedback.title}
                        info={skillAtomStatic.feedback.info}
                        points={feedback} addPoint={addPoint("feedback")}
                        removePoint={removePoint("feedback")}
                        addPLaceholder="Add Feedback"
                        icon={skillAtomStatic.feedback.icon}
                        onClick={() => setActivePart("Feedback")}
                    />
                    <DoubleArrow sx={{position: "absolute", top: "79%", left: "23%", transform: "rotate(196deg)", fontSize: "36px"}}/>
                    <SkillAtomPart 
                        isActive={activePart===skillAtomStatic.challenges.title}
                        top="36%" left="32%" title={skillAtomStatic.challenges.title}
                        info={skillAtomStatic.challenges.info}
                        points={challenges} addPoint={addPoint("challenges")}
                        removePoint={removePoint("challenges")}
                        addPLaceholder="Add Challenge"
                        icon={skillAtomStatic.challenges.icon}
                        onClick={() => setActivePart("Challenge")}
                    />
                </Box>
    
            </Box>
        )
    } else {
        return <Typography>Pick a target activity to proceed first</Typography>
    }
}