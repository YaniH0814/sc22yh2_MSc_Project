/*
     Author Name: Yani Huang

    Click to enter an algorithm learning process.
    material-ui library is used for UI.
*/

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import "@fontsource/roboto";
import "../../fonts/fonts.css";

export default function ClickableModule(props) {
    const { width, height, color, preOne, image, onClick } = props;
    const borderWidth = preOne ? "3px" : "0px";
    const presentHeight = preOne ? height - 3 : height;

    // make styles
    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: 5,
            marginBottom: 0,
            flexWrap: "wrap",
            display: "flex",
            minHeight: 185,
            minWidth: 205,
            width: width,
            borderColor: color,
            borderStyle: "solid",
            borderWidth: borderWidth,
            borderBottomWidth: "0px",
            height: presentHeight,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
        },
        image: {
            width: "100%",
            position: "relative",
            height: presentHeight,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            "&:hover, &$focusVisible": {
                zIndex: 1,
                "& $Backdrop": {
                    backgroundColor: "",
                    opacity: 0,
                    transition: "opacity 0.3s",
                },
                "& $Title": {
                    opacity: 0,
                },
            },
        },
        Button: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            color: theme.palette.common.white,
        },
        Src: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundImage: `url(${image.gif})`,
        },
        Backdrop: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 1,
            position: "absolute",
            backgroundColor: "#d5d5d5",
            transition: "opacity 0.3s",
            borderTopLeftRadius: 17,
            borderTopRightRadius: 17,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 40%",
            backgroundImage: `url(${props.image.static})`,
        },
        Title: {
            right: 0,
            bottom: 0,
            paddingBottom: 5,
            paddingRight: 10,
            fontSize: 20,
            color: "white",
            fontWeight: "700",
            position: "absolute",
            fontFamily: "QuickSand",
        },
    }));

    const useRippleStyles = makeStyles(() => ({
        child: {
            backgroundColor: "grey",
        },
    }));

    const classes = useStyles();
    const rClasses = useRippleStyles();

    return (
        <div className={classes.root}>
            <ButtonBase
                focusRipple
                key={image.title}
                onClick={onClick}
                className={classes.image}
                TouchRippleProps={{ classes: rClasses }}
                focusVisibleClassName={classes.focusVisible}
            >
                {/* background of the button */}
                <span
                    style={{
                        backgroundColor: "#d5d5d5",
                    }}
                    className={classes.Src}

                />

                <span className={classes.Backdrop} />

                <span className={classes.Button}>
                    <Typography    
                        color="inherit"
                        component="span"
                        variant="subtitle1"
                        className={classes.Title}
                    >
                        {image.title}
                    </Typography>
                </span>
            </ButtonBase>
        </div>
    );
}
