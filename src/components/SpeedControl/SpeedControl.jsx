/*
     Author Name: Yani Huang

*/
import React from "react";
import Menu from "@material-ui/core/Menu";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import MuiMenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";

// A redefined menu Item is created
const MenuItem = withStyles({
    root: {
        fontSize: "9px",
        fontWeight: "590",
        justifyContent: "center",
        fontFamily: "inherit",
    },
})(MuiMenuItem);

export default function SpeedControlMenu(props) {
    const { handleClick, handleShutDown, anchorEl, speed } = props;

    // define styles
    const useStyles = makeStyles({
        root: {
            display: "inline-block",
            width: "10px",
        },
        ToolClass: {
            fontFamily: "inherit",
            fontSize: "1.2em",
            fontWeight: "700",
            paddingTop: "5px",
            paddingBottom: "6px",
            letterSpacing: "1px",
            marginTop: "3px"
        },
        buttonClass: {
            width: "10px",
            paddingLeft: "0px",
            paddingRight: "0px",
            fontSize: "12px",
            fontWeight: "600",
            fontFamily: "inherit",
        },
        menuSpeed: {
            width: "80px",
        },
    });
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Tooltip
                arrow
                title='Speed'
                leaveDelay={200}
                enterDelay={500}
                TransitionComponent={Zoom}
                classes={{ tooltip: classes.ToolClass }}
            >
                <Button
                    onClick={handleClick}
                    aria-haspopup='true'
                    aria-controls='simple-menu'
                    style={{ minWidth: "39px" }}
                    className={classes.buttonClass}
                >
                    {speed}
                </Button>
            </Tooltip>
            {/* speed menu */}
            <Menu
                keepMounted
                id='simple-menu'
                anchorEl={anchorEl}
                onClose={handleShutDown}
                open={Boolean(anchorEl)}
                getContentAnchorEl={null}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                className={classes.menuSpeed}
            >
                <MenuItem  onClick={handleShutDown} value={"1"}>
                    0.25x
                </MenuItem>
                <MenuItem onClick={handleShutDown} value={"2"} >
                    0.5x
                </MenuItem>
                <MenuItem  onClick={handleShutDown} value={"4"}>
                    1x
                </MenuItem>
                <MenuItem value={"8"} onClick={handleShutDown}>
                    2x
                </MenuItem>
                <MenuItem onClick={handleShutDown} value={"16"} >
                    4x
                </MenuItem>
            </Menu>
        </div>
    );
}
