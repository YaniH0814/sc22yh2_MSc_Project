/*
    Author: Yani Huang

*/

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { isUndefined } from "lodash";

import Settings from "../../components/Settings/Settings";

import Module from "../../components/Module/Module";
import FirstPrompt from "../../components/FirstPropmt/FirstPropmt";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// - import algorithm selection cover
import img_bubble from "../../resource/D.JPG";
import img_selection from "../../resource/BF.JPG";
import img_insertion from "../../resource/FW.JPG";
import img_quick from "../../resource/AS.JPG";
// - import algorithm selction hover gif
import gif_bubble from "../../resource/D.gif";
import gif_selection from "../../resource/BF.gif";
import gif_insertion from "../../resource/FW.gif";
import gif_quick from "../../resource/AS.gif";


//set css
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: "10px",
        "& > *": {
            marginLeft: 89,
        },
        marginLeft: -66,
    },
    button: {
        width: 230,
        fontFamily: "Quicksand",
        fontWeight: 1000,
    },
    grid: {
        width: 900,
        height: 600,

    },
    div: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        height: 700,
        width: 1050,
        paddingTop: 80,
    },
    buttonSet: {
        display: "flex",
        marginTop: 60,
    },
}));


//Set theme color
const color = "#533DFF";

//function to set learning progress of each algorithm
function setProgress(algorithm) {
    const progressArray = localStorage.getItem(algorithm)
        ? JSON.parse(localStorage.getItem(algorithm))
        : 0;
    return calculateProgress(progressArray);
}

//function to calculateProgress
function calculateProgress(progressArray) {
    let value = 0;
    let count = 0;
    for (var i = 0; i < progressArray.length; i++) {
        if (progressArray[i] === true) {
            value += 30;
            count++;
        }
    }
    if (count === progressArray.length) value = 100;
    return value;
}

//Return a grid contains six modules that represent six sorting algorithms，set and help buttons，and the choice menu
//Click the modules to jump to the corresponding algorithm learning page
//The progress bar under each module represents the learning progress of the algorithm
export default function HomePage(props) {
    const classes = useStyles();

    const localPre = localStorage.getItem("pre")
        ? JSON.parse(localStorage.getItem("pre"))
        : null;

    localStorage.getItem("first")
        ? JSON.parse(localStorage.getItem("first"))
        : localStorage.setItem("first", JSON.stringify(true));

    const firstIn = JSON.parse(localStorage.getItem("first"));

    localStorage.getItem("snack")
        ? JSON.parse(localStorage.getItem("snack"))
        : localStorage.setItem("snack", JSON.stringify(0));


    const handleClick = (title) => () => {
        //store previous visited algorithm
        localStorage.setItem("pre", JSON.stringify(title));
    };

    const handlePre = (title) => {
        //set previous visited algorithm
        const preOne = title === localPre ? true : false;
        return preOne;
    };

    //create array of images of each selection
    const images = [
        {
            static: img_bubble,
            gif: gif_bubble,
            title: "Dijkstra's",
            width: "20%",
        },
        {
            static: img_selection,
            gif: gif_selection,
            title: "Bellman-Ford",
            width: "20%",
        },
        {
            static: img_insertion,
            gif: gif_insertion,
            title: "Floyd-Warshall",
            width: "20%",
        },

        {
            static: img_quick,
            gif: gif_quick,
            title: "A* Search",
            width: "20%",
        },
    ];

    const dijkstraProps = {
        image: images[0],
        width: 200,
        height: 200,
        onClick: handleClick(images[0].title),
        progress: setProgress("bubble"),
        color: color,
        preOne: handlePre(images[0].title),
    };

    const bfProps = {
        image: images[1],
        width: 200,
        height: 200,
        onClick: handleClick(images[1].title),
        progress: setProgress("selection"),
        color: color,
        preOne: handlePre(images[1].title),
    };

    const fwProps = {
        image: images[2],
        width: 200,
        height: 200,
        onClick: handleClick(images[2].title),
        progress: setProgress("insertion"),
        color: color,
        preOne: handlePre(images[2].title),
    };

    const asProps = {
        image: images[3],
        width: 200,
        height: 200,
        progress: setProgress("merge"),
        onClick: handleClick(images[3].title),

        color: color,
        preOne: handlePre(images[3].title),
    };

    const handleInner = () => {
        if (isUndefined(props.location.state)) {
            return "-100vw";
        } else {
            const lastPage = props.location.state.id;
            const inner = lastPage === "tutorial" ? "100vw" : "-100vw";
            return inner;
        }
    };

    return (
        <div>
            <motion.div
                className={classes.div}
                initial={{ opacity: 0.2, x: handleInner() }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    x: "0vw",
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 25,
                }}
                exit={{ opacity: 0.2, scale: 0, x: "-100vw" }}
            >
                <div className={classes.grid}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={3}>
                            <Link to="/ProcedureSubpage/Bubble">
                                <Module {...dijkstraProps} />
                            </Link>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Link to="/ProcedureSubpage/Heap">
                                <Module {...bfProps} />
                            </Link>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Link to="/ProcedureSubpage/Insertion">
                                <Module {...fwProps} />
                            </Link>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Link to="/ProcedureSubpage/Merge">
                                <Module {...asProps} />
                            </Link>
                        </Grid>

                        <Grid item xs={12}>
                            <div className={classes.buttonSet}>
                                <Settings />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{ marginLeft: -8, marginTop: 20 }}>
                                <ProcedureChoiceMenu />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {firstIn === true ? <FirstPrompt /> : <div />}
            </motion.div>


        </div>
    );
}

//Return three button, which are 'Tutorial', 'Procedure', and 'Correctness'
//The Procedure button is theme color without jump function
export function ProcedureChoiceMenu() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                disableElevation
                className={classes.button}
                style={{ color: "white", backgroundColor: color }}
            >
                AlgoWizard
            </Button>
        </div>
    );
}

export { color };
