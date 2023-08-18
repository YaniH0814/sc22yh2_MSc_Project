/*
     Author Name: Yani Huang

    The area to hold explaination of the process
    material-ui library is used for UI.
*/

import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";



const Explanation = withStyles({
    root: {
        fontSize: "16px",
        fontWeight: "700",
        display: "flex",
        fontFamily: "inherit",
        letterSpacing: "1px",
        
        borderRadius: "12px",
        marginTop: "4px",
        marginBottom: "3px",
        textAlign: "center",
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
    },
})(Paper);

export default function ExplanationBox(props) {
    const { width, height, children } = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "grid",
            "& > *": {
                height: theme.spacing(height * 1),
                width: theme.spacing(width * 1),
                border: "3px solid white",
            },
            alignContent: "center",
            justifyContent: "center",
            verticalAlign: "center",
        },
    }));
    const classes = useStyles();

    return (
    <div className={classes.root}>
            <Explanation variant="outlined">{children}</Explanation>
        </div>
    );
}
