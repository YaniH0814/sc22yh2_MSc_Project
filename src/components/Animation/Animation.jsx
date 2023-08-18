/*
    Author: Yani Huang

    The animation of bars.
    material-ui library is used for UI.
    framer-motion library is used for animation.
*/

import "@fontsource/roboto";
import * as React from "react";
import { useState, useEffect } from "react";
import AnimationSlider from "../ProgressBar/ProgressBar";
import { makeStyles } from "@material-ui/core/styles";
import ProgressBar from "../AnimationControl/AnimationControl";
import ExplanationBox from "../Explanation/Explanation";

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import Edge from './edge';
import verticesPos from './VerticesPos';

import spring from './spring';


const motionDivStyle = {
    position: 'relative',
    left: 0,
    top: 0,
    background: 'inherit',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
};

const edgePre = [
    { id: 1, startVertexId: 1, endVertexId: 2, color: '#ff8000', weight: 13 },
    { id: 2, startVertexId: 2, endVertexId: 3, color: '#ff8000', weight: 12 },
    { id: 3, startVertexId: 1, endVertexId: 4, color: '#ff8000', weight: 3 },
    { id: 4, startVertexId: 4, endVertexId: 5, color: '#ff8000', weight: 2 },
    { id: 5, startVertexId: 1, endVertexId: 5, color: '#ff8000', weight: 9 },
    { id: 6, startVertexId: 2, endVertexId: 5, color: '#ff8000', weight: 2 },
    { id: 7, startVertexId: 4, endVertexId: 3, color: '#ff8000', weight: 7 },
]
export const Animation = (props, ifShowInput) => {
    const { verticesTrace, description, width } = props;

    //The speed of playing the animation
    const [speed, setSpeed] = useState(1);
    // current step
    const [stepCurrent, setStepCurrent] = useState(0);
    // pause
    const [timeIds, setTimeIds] = useState([]);
    //To define animation,  playing or not
    const [ifPlaying, setIfPlaying] = useState(false);
    //Speed menu controler
    const [speedMenu, setSpeedMenu] = useState(null);
    //Set if button of progress bar available
    const [disabled, setDisabled] = useState(false);
    //previous step bnutton
    const [backDisabled, setBackDisabled] = useState(true);

    const [vertices, setVertices] = useState(verticesPos[2]);
    const [edges, setEdges] = useState(edgePre);



    const useStyles = makeStyles({
        root: {
            alignContent: "flex-end",
            justifyContent: "center",
            height: 430,
            marginTop: "0px",
        },
        PathImageStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center'
        },
    });

    const classes = useStyles();

    // Update buttons' disable property when steps are changed
    useEffect(() => {
        stepCurrent === 0
            ? setBackDisabled(true)
            : setBackDisabled(false);
        stepCurrent + 1 === verticesTrace.length
            ? setDisabled(true)
            : setDisabled(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepCurrent]);

    // Use the latest speed to play the animation
    useEffect(() => {
        // if it is playing, replay
        if (ifPlaying) {
            pause();
            resume();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speed]);

    useEffect(() => {
        handleResetClick();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verticesTrace]);

    // It is used to open the speed menu
    const handleClick = (event) => {
        setSpeedMenu(event.currentTarget);
    };

    // It is used to adjust speed, triggered when close the speed menu
    const handleClose = (event) => {
        const value = event.nativeEvent.target.value / 4;
        if (!isNaN(value)) {
            setSpeed(value);
        }
        setSpeedMenu(null);
    };

    const handleSliderChange = (event, newValue) => {
        if (ifPlaying) {
            pause();
        }
        const item = verticesTrace[newValue];
        setStepCurrent(newValue);
        setVertices(item)
    };

    // It is used to clean timeouts to pause the animation
    const clearTimeouts = () => {
        timeIds.forEach((timeoutId) => clearTimeout(timeoutId));
        setTimeIds([]);
    };

    // Main method, used to generate a time line based on the speed
    // change bars after a time interval
    const run = (trace) => {
        // The current bars are the [0] of trace, to make the animation start without delay
        // here we begin the animation from [1] of trace
        // it's also suitable for pause, step forward and backwar
        const subTrace = trace.slice(1);
        const timeoutIds = [];
        // a time interval unit
        const timer = 1200 / speed;

        // Set a timeout for each item in the trace
        subTrace.forEach((item, i) => {
            let timeoutId = setTimeout(
                (item) => {
                    // update the current step
                    setStepCurrent((prevStep) =>
                        i === trace.length - 1 ? prevStep : prevStep + 1
                    );
                    // update bars to be animated
                    setVertices(item);
                    i === subTrace.length - 1
                        ? setIfPlaying(false)
                        : setIfPlaying(true);
                },
                i * timer, //time interval
                item
            );
            timeoutIds.push(timeoutId);
        });

        // Clear timeouts upon completion
        let timeoutId = setTimeout(clearTimeouts, trace.length * timer);
        timeoutIds.push(timeoutId);
        setTimeIds(timeoutIds);
    };

    // To pause the animation
    const pause = () => {
        setIfPlaying(false);
        clearTimeouts();
    };

    // To resume the animation
    const resume = () => {
        setIfPlaying(true);
        const newtrace = verticesTrace.slice(stepCurrent);
        run(newtrace);
    };

    // Go to next step and pause
    const nextStep = () => {
        if (stepCurrent < verticesTrace.length - 1) {
            pause();
            const item = verticesTrace[stepCurrent + 1];
            setStepCurrent((prevStep) => prevStep + 1);
            setVertices(item);
        }
    };

    // Go to the previous step and pause
    const lastStep = () => {
        if (stepCurrent > 0) {
            pause();
            const item = verticesTrace[stepCurrent - 1];
            setStepCurrent((prevStep) => prevStep - 1);
            setVertices(item)
        }
    };

    const handleResetClick = () => {
        pause();
        setStepCurrent(0);
        setVertices(verticesTrace[0]);
    }; 

    const animationProp = {
        handleResetClick,
        nextStep,
        lastStep,
        pause,
        resume,
        ifPlaying,
        disabled,
        backDisabled,
        handleClick,
        handleClose,
        speedMenu,
        speed,
        verticesTrace,
    };

    return (
        <div className={classes.root}>
            <div className={classes.PathImageStyle}>
                <Box position="relative">
                    <Box position="relative" height={330} width={340}>
                        {/* Rendering Edges */}
                        {edges.map((edge) => (
                            <Edge
                                key={edge.id}
                                startX={vertices[edge.startVertexId - 1].x + 20}
                                startY={vertices[edge.startVertexId - 1].y + 20}
                                endX={vertices[edge.endVertexId - 1].x + 20}
                                endY={vertices[edge.endVertexId - 1].y + 20}
                                color={edge.color}
                                weight={edge.weight}
                            />
                        ))}

                        {vertices.map((vertex) => (
                            <div
                                key={vertex.id}
                                style={{
                                    position: 'absolute',
                                    left: vertex.targetX - vertex.x,
                                    top: vertex.targetY - vertex.y,
                                }}
                            >
                                <motion.div
                                    initial={
                                        {
                                            x: vertex.x,
                                            y: vertex.y,
                                        }
                                    }
                                    animate={{
                                        x: vertex.targetX,
                                        y: vertex.targetY,
                                    }}
                                    transition={spring}
                                    style={{
                                        ...motionDivStyle,
                                        left: vertex.targetX - vertex.x, //changes the position of the selected v abit
                                        top: vertex.targetY - vertex.y,
                                        background: vertex.color, // Change to red when selected
                                        border: (vertex.ifStartEnd === 1) ? '2px solid ' + '#29231e' : 'none',
                                    }}
                                >
                                    {vertex.number}
                                </motion.div>
                                {vertex.visible && (
                                    <div
                                        style={{
                                            position: 'relative',
                                            left: (vertex.x < 150) ? -90 : 59,
                                            top: -50,
                                            color: '#000',
                                            fontSize: '13px',
                                            // display: 'inline-block',
                                            textAlign: 'left',
                                            transform: `translateX(${vertex.x}px) translateY(${vertex.y}px) translateZ(0px)`,
                                        }}
                                    >
                                        Dis: {vertex.dis}<br />
                                        Pre V: {vertex.pre}
                                    </div>
                                )}
                            </div>
                        ))}

                    </Box>
                    {ifShowInput && (<Box
                        position="relative"
                        top={0}
                        left={0}
                        zIndex={1}
                        display="flex"
                        alignItems="left"
                    >
                    </Box>)}
                </Box>
            </div>

            <ExplanationBox width={60} height={8.5}>
                {description[stepCurrent]}
            </ExplanationBox>

            <AnimationSlider
                width={width}
                step={1}
                max={verticesTrace.length - 1}
                handleChange={handleSliderChange}
                value={stepCurrent}
                display="none"
            />

            <ProgressBar {...animationProp} />
        </div>
    );
};

export default Animation;
