/*
     Author Name: Yani Huang

    Animation with pesudocode explaination for shrotest path algorithms
    UI Lib:material-ui. 
    Animation Lib: framer-motion.
*/

import { makeStyles } from "@material-ui/core/styles";
import "@fontsource/roboto";
import * as React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AnimationSlider from "../ProgressBar/ProgressBar";
import ProgressBar from "../AnimationControl/AnimationControl";
import ExplanationBox from "../Explanation/Explanation";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputBar from "../InputBar/InputBar";
import verticesPos from "../Animation/VerticesPos";
import Edge from "../Animation/edge";
import dijkstra from "../Animation/ShortestPath/Dijkstra";

// a framer motion transition attributes
const spring = {
    type: "spring", // a framer motion type that simulates spring
    damping: 15, //Strength of opposing force. If set to 0, spring will oscillate indefinitely
    stiffness: 100, //Stiffness of the spring. Higher values will create more sudden movement. Set to 100 by default.
    mass: 0.5, // Mass of the moving object. Higher values will result in more lethargic movement
};

const colors = {
    red: '#ff0000',
    blue: '#0000ff',
    green: '#00ff00',
    cyan: '#00ffff',
    yellow: '#ffff00',
    orange: '#ff8000',
    purple: '#8000ff',
    magenta: '#ff00ff',
    lightBlue: '#0080ff',
};

const motionDivStyle = {
    top: 0,
    left: 0,
    color: '#fff',
    width: '38px',
    height: '38px',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    position: 'absolute',
    background: 'inherit',
    justifyContent: 'center',
    
};


export default function ImplementationAnimation(props) {
    const { title, Code } = props;

    // The vertices trace
    const [verticesTrace, setVerticesTrace] = useState([]);
    // The description trace
    const [description, setDescription] = useState(['Please Edit the graph']
    );
    // The block numbers of code trace
    const [blockNums, setBlockNums] = useState([]);

    // The speed of playing the animation
    const [speed, setSpeed] = useState(1);


    // It is used to clean timeouts to pause
    const [timeIds, setTimeIds] = useState([]);
    // The state of the animation, whether is playing
    const [ifPlaying, setIfPlaying] = useState(false);
    // It is used to control the speed menu
    const [speedMenu, setSpeedMenu] = useState(null);
    // The state of play button and next step button, whether is disabled
    const [disabled, setDisabled] = useState(false);
    // the State of previous step bnutton
    const [backDisabled, setBackDisabled] = useState(true);
    // The current step among traces
    const [stepCurrent, setStepCurrent] = useState(0);

    //These are for changing the number of vertices
    const [edges, setEdges] = useState([]);
    const [ifAdd, setIfAdd] = useState(true);
    const [edgeWeight, setEdgeWeight] = useState(1);
    const [numVertices, setNumVertices] = useState(3);
    const [isAnimating, setIsAnimating] = useState(false);
    const [ifUnderEdit, setIfUnderEdit] = useState(false);
    const [selectedVertices, setSelectedVertices] = useState([]); // State to hold selected vertices
    const [clickableVertices, setClickableVertices] = useState(false); // State to control clickable vertices

    const [vertices, setVertices] = useState(verticesPos[0]);

    //These are for handling input
    // The user input
    const [str, setStr] = useState("1");
    // The bool value which represent whether user input is valid or not
    const [isValid, setIsValid] = useState(true);
    // The wrong message
    const [wrongMsg, setWrongMsg] = useState(" ");

    // Function to toggle clickable vertices
    const toggleClickableVertices = () => {
        setClickableVertices((prevClickable) => !prevClickable);
        setIfUnderEdit(!ifUnderEdit);
    };

    const toggleVertexSelection = (vertexId) => {
        // console.log('number of v:' + selectedVertices.length + 'ifadd:' + ifAdd);
        //check if two vs are selected and set the color of add button
        if (selectedVertices.includes(vertexId)) {
            setSelectedVertices((prevSelected) => prevSelected.filter((id) => id !== vertexId)); // Deselect if already selected
        } else if (selectedVertices.length < 2) {
            setSelectedVertices((prevSelected) => [...prevSelected, vertexId]); // Select if less than two selected
        }
    };

    const handleNumVerticesChange = (selectedValue) => {
        setIsAnimating(true);

        // Clear edges when changing the number of vertices
        setEdges([]);
        setTimeout(() => {
            console.log(selectedValue)
            console.log(verticesPos[selectedValue - 3])

            setVertices(verticesPos[selectedValue - 3]);
            setNumVertices(selectedValue);
            setIsAnimating(false);
        }, 500);
    };

    const handleEdgeWeightChange = (event) => {
        const value = event.target.value;
        setStr(value);
        if (isValid) {
            setEdgeWeight(value);
        }

    };

    function isNewEdge(startVertexId, endVertexId, edges) {
        return edges.every((edge) => {
            return (
                (edge.startVertexId !== startVertexId || edge.endVertexId !== endVertexId) &&
                (edge.startVertexId !== endVertexId || edge.endVertexId !== startVertexId)
            );
        });
    }

    const handleAddEdge = () => {
        //check if vertices are selected && input valid
        if (selectedVertices.length === 2 && isValid) {
            const [startVertexId, endVertexId] = selectedVertices;
            //if edge does not exist
            if (isNewEdge(startVertexId, endVertexId, edges)) {
                const newEdge = {
                    id: edges.length + 1,
                    startVertexId,
                    endVertexId,
                    color: colors.orange,
                    weight: edgeWeight,
                };
                // Update the edges state with the new edge
                edges.push(newEdge);
                // Inside the PathImage component or any relevant function
                console.log('Current edges state:', edges);
            } else {
                setDescription(['Can not add duplicate edge. It you like to change the weight please double click the edge to delete it first.'])
            }

            // Clear the selected vertices and reset edge weight
            setSelectedVertices([]);
            setEdgeWeight(1);

            // Update the component's state to trigger a re-render and show the new edge
            setVertices([...vertices]);
        } else {
            // Handle error: Select exactly two vertices for an edge
            // Clear the selected vertices and reset edge weight
            setSelectedVertices([]);
            setEdgeWeight(1);
            // Inside the PathImage component or any relevant function
            setDescription(['wrong edge weight!'])

            // Update the component's state to trigger a re-render and show the new edge
            setVertices([...vertices]);

            //TODO: add a prompt here to alert the existing edge can not be added.

        }

    };

    const handleDeleteEdge = (edgeId) => {
        console.log('Before deletion - edges:', edges);
        setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId));
        console.log('After deletion - edges:', edges);
    };

    const isConnectedToStart = (vertexId, visitedVertices) => {
        if (visitedVertices.includes(vertexId)) {
            return; // Vertex already visited
        }
        visitedVertices.push(vertexId); // Mark vertex as visited

        // Find all edges connected to the current vertex
        const connectedEdges = edges.filter(
            (edge) => edge.startVertexId === vertexId || edge.endVertexId === vertexId
        );

        // Recursively perform DFS for all connected vertices
        connectedEdges.forEach((edge) => {
            if (edge.startVertexId === vertexId) {
                isConnectedToStart(edge.endVertexId, visitedVertices);
            } else {
                isConnectedToStart(edge.startVertexId, visitedVertices);
            }
        });
    };

    const handleCheckEdgeLegal = () => {
        const allVerticesConnected = vertices.every((vertex) => {
            const visitedVertices = [];
            isConnectedToStart(vertex.id, visitedVertices);
            return visitedVertices.length === vertices.length;
        });

        if (allVerticesConnected) {
            //TODO
            console.log("All vertices are connected to vertex1.");
            const { verticesTrace, edgeTrace, description, blocknums: blocknumsGenerated } = dijkstra(edges, vertices);
            setVerticesTrace(verticesTrace);
            setDescription(description);
            setBlockNums(blocknumsGenerated);
            // console.log('bl ini'+blockNums)
            // console.log('bl gen'+blocknumsGenerated)
        } else {
            console.log("Not all vertices are connected to vertex1.");
            setDescription(['Can not start algorithm: Not all vertices are connected'])
        }
    }

    useEffect(() => {
        // Check if numVertices is greater than 0 and isAnimating is false
        if (numVertices > 0 && !isAnimating) {
            // Set isAnimating to true to indicate that the animation is starting
            setIsAnimating(true);
            // Get the new vertices for the selected number of vertices
            const newVertices = verticesPos[numVertices - 3];
            // Update the vertexColors state to animate the vertices to their new positions
            setVertices((prevColors) =>
                prevColors.map((vertex) => {
                    // Find the corresponding new vertex data based on its ID
                    const newVertex = newVertices.find((v) => v.id === vertex.id);
                    // If a corresponding new vertex is found, update the targetX and targetY properties
                    if (newVertex) {
                        return {
                            ...vertex,
                            targetX: newVertex.x,
                            targetY: newVertex.y,
                        };
                    }
                    // If no corresponding new vertex is found, return the original vertex data
                    return vertex;
                })
            );

            // Use setTimeout to set isAnimating back to false after the animation duration
            setTimeout(() => {
                setIsAnimating(false);
            }, 500);
        }
    }, [numVertices, isAnimating, vertices]);

    useEffect(() => {
        setDescription(['Please Edit the Graph']);
        setVerticesTrace([]);
    }, [numVertices]);

    useEffect(() => {
        setIfAdd(ifUnderEdit);
        if (/^[0-9]+$/.test(str)) {
            const intValue = parseInt(str, 10);
            if (intValue >= 0 && intValue <= 1000) {
                if (selectedVertices.length === 2) {
                    const [startVertexId, endVertexId] = selectedVertices;
                    //if edge does not exist
                    if (!isNewEdge(startVertexId, endVertexId, edges)) {
                        setIfAdd(false);
                    }
                } else if (selectedVertices.length < 2) {
                    setIfAdd(false);
                    setDescription(['Please do not select more than 2 vertices at the same time.'])
                } else {
                    setIsValid(true);
                    setIfAdd(true);
                    setWrongMsg("");
                }

            } else {
                setIsValid(false);
                setIfAdd(false);
                setWrongMsg("Value must be between 0 and 1000");
                setDescription(['wrong edge weight!'])
            }
        } else {
            setIsValid(false);
            setIfAdd(false);
            setWrongMsg("Please enter a valid integer");
            setDescription(['edge weight in valid!'])
        }
    }, [selectedVertices, str])

    // styles for this page
    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            width: 1020,
            "& > *": {
                margin: theme.spacing(3),
            },
        },
        aniRoot: {
            height: 452,
            marginTop: "0px",
            display: "grid",
            justifyContent: "center",
            alignContent: "flex-end",
            
        },
        edges: { 
            margin: 0,
            padding: 0,
            marginLeft: 80,
            marginBottom: 50,
            display: "flex",
            listStyle: "none",
            position: "absolute",
            flexWrap: "wrap-reverse",
        },

        vertexStyle: {
            top: 0,
            left: 100,
            color: '#fff',
            width: '40px',
            height: '40px',
            display: 'flex',
            borderRadius: '50%',
            background: 'inherit',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'center',
            
        },
        cardOne: {
            height: 520,
            width: "45%",
            marginTop: 80,
            background: "#F0F0F0",
        },
        cardTwo: {
            width: "55%",
            height: 520,
            marginTop: 80,
            background: "#F0F0F0",
        },
        title: {
            marginTop: -6,
            fontSize: "20px",
            display: "flex",
            marginBottom: 10,
            fontWeight: "700",
            fontFamily: "inherit",
            justifyContent: "center",
            
        },
        inputBar: {
            marginTop: 30,
            marginLeft: -75,
        },
        button: {
            width: 200,
            bottom: 60,      
            marginLeft: 95,
            position: "fixed",
        },
        
    }));

    const classes = useStyles();

    // Update buttons' disable property when steps are changed
    useEffect(() => {
        stepCurrent === 0
            ? setBackDisabled(true)
            : setBackDisabled(false);
        stepCurrent + 1 === verticesTrace.length
            ? setDisabled(true)
            : setDisabled(false);
        // eslint-disable-next-line
    }, [stepCurrent]);

    // Use the latest speed to play the animation
    useEffect(() => {
        // if it is playing, replay
        if (ifPlaying) {
            pause();
            resume();
        }
        // eslint-disable-next-line
    }, [speed]);

    useEffect(() => {
        handleResetClick();
        // eslint-disable-next-line
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

    // Control slider's change
    const handleSliderChange = (event, newValue) => {
        if (ifPlaying) {
            pause();
        }
        const item = verticesTrace[newValue];
        setStepCurrent(newValue);
        setVertices(item)
    };

    // It is used to clean timeouts to pause the animation
    const resetTime = () => {
        timeIds.forEach((timeoutId) => clearTimeout(timeoutId));
        setTimeIds([]);
    };


    // change colors of v
    const play = (vTrace) => {
        const sliceTrace = vTrace.slice(1);
        const timeID = [];
        // a time interval unit
        const clock = 1200 / speed;

        // Set a timeout for each item in the trace
        sliceTrace.forEach((vItem, i) => {
            let timeoutId = setTimeout(
                (item) => {
                    // update the number of current step
                    setStepCurrent((prevStep) => i === vTrace.length - 1 ? prevStep : prevStep + 1);
                    // update the vertices.
                    setVertices(item);
                    i === sliceTrace.length - 1
                        ? setIfPlaying(false)
                        : setIfPlaying(true);
                },
                i * clock,
                vItem
            );
            timeID.push(timeoutId);
        });

        // Clear timeouts upon completion
        let timeoutId = setTimeout(resetTime, vTrace.length * clock);
        timeID.push(timeoutId);
        setTimeIds(timeID);
    };

    // To pause the animation
    const pause = () => {
        setIfPlaying(false);
        resetTime();
    };

    // To resume the animation
    const resume = () => {
        setIfPlaying(true);
        const newtrace = verticesTrace.slice(stepCurrent);
        play(newtrace);
        const his = localStorage.getItem("history");
        console.log(his);
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

    // Reset the animation progress
    const handleResetClick = () => {
        pause();
        setStepCurrent(0);
    };

    // Functions for AnimationControl
    const animationProps = {
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
            <Card className={classes.cardOne}>
                <CardContent>
                    <div className={classes.title}>{title}</div>
                    <div>
                        <Code blockNum={blockNums[stepCurrent]} />
                    </div>

                </CardContent>
            </Card>
            <Card className={classes.cardTwo}>
                <div className={classes.inputBar}>
                    <InputBar
                        numVertices={numVertices}
                        handleAddEdge={handleAddEdge}
                        handleNumVerticesChange={handleNumVerticesChange}
                        toggleClickableVertices={toggleClickableVertices}
                        handleEdgeWeightChange={handleEdgeWeightChange}
                        handleCheckEdgeLegal={handleCheckEdgeLegal}
                        isValid={isValid}
                        wrongMsg={wrongMsg}
                        inputString={str}
                        ifUnderEdit={ifUnderEdit}
                        ifAdd={ifAdd}
                    />
                </div>
                <div className={classes.aniRoot}>
                    <div className={classes.edges}>
                        {edges.map((edge) => (
                            <Edge
                                key={edge.id}
                                startX={vertices[edge.startVertexId - 1].x + 20}
                                startY={vertices[edge.startVertexId - 1].y + 20}
                                endX={vertices[edge.endVertexId - 1].x + 20}
                                endY={vertices[edge.endVertexId - 1].y + 20}
                                color={edge.color}
                                weight={edge.weight}
                                onDelete={() => handleDeleteEdge(edge.id)} // Ensure onDelete is set up correctly
                            />
                        ))}
                        {vertices.map((vertex) => (
                            <div
                                key={vertex.id}
                                onClick={() => {
                                    if (clickableVertices) {
                                        toggleVertexSelection(vertex.id); // Toggle vertex selection
                                    }
                                }}
                                style={{
                                    position: 'absolute',
                                    left: vertex.targetX - vertex.x,
                                    top: vertex.targetY - vertex.y,
                                    cursor: clickableVertices ? 'pointer' : 'default', // Change cursor based on clickable state
                                }}
                            >
                                <motion.div
                                    key={vertex.id}
                                    transition={spring}
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
                                    style={{
                                        ...motionDivStyle,
                                        left: selectedVertices.includes(vertex.id) ? vertex.targetX - vertex.x + 1 : vertex.targetX - vertex.x, //changes the position of the selected v abit
                                        top: selectedVertices.includes(vertex.id) ? vertex.targetY - vertex.y + 1 : vertex.targetY - vertex.y,
                                        background: selectedVertices.includes(vertex.id) ? colors.purple : vertex.color, // Change to red when selected
                                        border: (vertex.ifStartEnd === 1) ? '2px solid ' + '#000000' : 'none',
                                    }}
                                >
                                    {vertex.number}
                                </motion.div>
                                {vertex.visible && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: (vertex.x < 150) ? -90 : 69,
                                            top: -20,
                                            color: '#000',
                                            fontSize: '10px',
                                            textAlign: 'left',
                                            transform: `translateX(${vertex.x}px) translateY(${vertex.y}px) translateZ(0px)`,
                                        }}
                                    >
                                        Dis: {vertex.dis}<br />
                                        PreV:{vertex.pre}
                                    </div>
                                )}
                            </div>
                        )

                        )}

                    </div>
                    <ExplanationBox width={50} height={6}>
                        {description[stepCurrent]}
                    </ExplanationBox>
                    <AnimationSlider
                        width={350}
                        step={1}
                        max={verticesTrace.length - 1}
                        handleChange={handleSliderChange}
                        value={stepCurrent}
                        display="none"
                    />
                    <ProgressBar {...animationProps} />
                </div>
            </Card>
        </div>
    );
}