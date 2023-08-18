/*
    Author Name: Yani Huang

    Show the learning progress of an algorithm. 
    material-ui library is used for UI.
*/

import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";


export default function Progress(props) {
    const { width, color, progress, preOne } = props;
    const presentingWidth = preOne ? width + 6 : width;
    const presentingColor = progress === 100 ? color : color;

    // modify the default styles of linear progress bar
    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 10,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 2,
            borderBottomLeftRadius: 2,
        },
        colorPrimary: {
            backgroundColor:
                theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
        },
        bar: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 2,
            borderBottomLeftRadius: 2,
            backgroundColor: presentingColor,
        },
    }))(LinearProgress);

    // control the width of the progress bar
    const useStyles = makeStyles({
        root: {
            flexGrow: 1,
            width: presentingWidth,
            minWidth: 200,
        },
    });

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <BorderLinearProgress variant="determinate" value={progress} />
        </div>
    );
}
