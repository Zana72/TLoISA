import React from 'react';
import {Box, Typography} from '@mui/material';
import { DoubleArrow} from '@mui/icons-material';
import SkillAtomPart from './SkillAtomPart';
import { skillAtomStatic } from '../../data/skillAtomStatic';
import ShowProfile from './ShowProfile';

export default function SkillAtom(props) {

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
                        top="54%" left="0%" title={skillAtomStatic.motivations.title}
                        info={skillAtomStatic.motivations.info}
                        points={motivations} addPoint={addPoint("motivations")}
                        addPLaceholder="Add Motivation"
                        icon={skillAtomStatic.motivations.icon}
                    />
                    <DoubleArrow sx={{position: "absolute", top: "47%", left: "7%", transform: "rotate(-90deg)", fontSize: "36px"}}/>
                    <SkillAtomPart 
                        top="18%" left="0%" title={skillAtomStatic.goals.title}
                        info={skillAtomStatic.goals.info}
                        points={goals} addPoint={addPoint("goals")}
                        addPLaceholder="Add Goal"
                        icon={skillAtomStatic.goals.icon}
                    />
                    <DoubleArrow sx={{position: "absolute", top: "16%", left: "23%", transform: "rotate(-16deg)", fontSize: "36px"}}/>
                    <SkillAtomPart 
                        top="0%" left="32%" title={skillAtomStatic.actions.title}
                        info={skillAtomStatic.actions.info}
                        points={actions} addPoint={addPoint("actions")}
                        addPLaceholder="Add Action/Object"
                        icon={skillAtomStatic.actions.icon}
                    />
                    <DoubleArrow sx={{position: "absolute", top: "24%", left: "56%", transform: "rotate(36deg)", fontSize: "36px"}}/>
                    <SkillAtomPart 
                        top="36%" left="64%" title={skillAtomStatic.rules.title}
                        info={skillAtomStatic.rules.info}
                        points={rules} addPoint={addPoint("rules")}
                        addPLaceholder="Add Rule"
                        icon={skillAtomStatic.rules.icon}
                    />
                    <DoubleArrow sx={{position: "absolute", top: "70%", left: "56%", transform: "rotate(146deg)", fontSize: "36px"}}/>
                    <SkillAtomPart 
                        top="72%" left="32%" title={skillAtomStatic.feedback.title}
                        info={skillAtomStatic.feedback.info}
                        points={feedback} addPoint={addPoint("feedback")}
                        addPLaceholder="Add Feedback"
                        icon={skillAtomStatic.feedback.icon}
                    />
                    <DoubleArrow sx={{position: "absolute", top: "79%", left: "23%", transform: "rotate(196deg)", fontSize: "36px"}}/>
                    <SkillAtomPart 
                        top="36%" left="32%" title={skillAtomStatic.challenges.title}
                        info={skillAtomStatic.challenges.info}
                        points={challenges} addPoint={addPoint("challenges")}
                        addPLaceholder="Add Challenge"
                        icon={skillAtomStatic.challenges.icon}
                    />
                </Box>
    
            </Box>
        )
    } else {
        return <Typography>Pick a target activity to proceed first</Typography>
    }
}