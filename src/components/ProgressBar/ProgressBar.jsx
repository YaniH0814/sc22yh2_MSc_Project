/*
    Author Name: Yani Huang
   Progress bar of animation.
    material-ui library is used for UI.
*/

import React from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles, withStyles } from "@material-ui/core/styles";


const PSlider = withStyles({
    root: {
        alignContent: "center",
        color: "#52af77",
        height: 4,
       
    },
    thumb: {
        width: 23,
        height: 23,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -7,
        marginLeft: -11,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
      
    },
    valueLabel: {
        left: "calc(-50% + 4px)",
    },
    track: {
        height: 5,
        borderRadius: 2,
    },
    rail: {
        height: 5,
        borderRadius: 2,
    },
    mark: {
        height: 5,
    },
})(Slider);

export default function AnimationSlider(props) {
    const { step, max, handleChange, value, width } = props;

    const useStyles = makeStyles({
        root: {
            position:'relative',
            display: "grid",
            transform: "translate(10%)",
            alignContent: "center",
            width: width,
            marginTop: "10px",
        },
    });

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <PSlider
                value={typeof value === "number" ? value : 0}
                aria-labelledby="Progress"
                valueLabelDisplay="auto"
                step={step}
                marks
                min={0}
                max={max}
                onChange={handleChange}
            />
        </div>
    );
}
