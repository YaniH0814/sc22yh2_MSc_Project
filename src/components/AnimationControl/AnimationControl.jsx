/*
    Author Name: Yani Huang
   The control bar(progress bar) of the animation
*/


import * as React from "react";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import ReplayIcon from "@material-ui/icons/Replay";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SpeedControlMenu from "../SpeedControl/SpeedControl";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";


export default function ProgressBar(props) {

    const useStyles = makeStyles({
        customTooltip: {
            marginTop: "3px",
            fontSize: "0.5em",
            fontWeight: "700",
            paddingTop: "8px",
            fontFamily: "inherit",
            letterSpacing: "1px",
            paddingBottom: "10px"
        },
    });

    const classes = useStyles();

    const { handleResetClick, nextStep, lastStep, pause, resume, ifPlaying, disabled, backDisabled, handleClick, handleClose, speedMenu, speed } = props;

    return (
        <div
            style={{
                position: "relative",
                left: "50%",
                transform: "translate(-50%)",
                width: "240px",
            }}
        >
            {/* reset button */}
            <Tooltip
                title='Reset'
                TransitionComponent={Zoom}
                enterDelay={300}
                leaveDelay={200}
                className={classes.customTooltip}
                arrow
            >
                <span>
                    <IconButton
                        // pause the animation and reset
                        onClick={handleResetClick}
                        disabled={false}
                    >
                        <ReplayIcon
                            // color may need to follow the theme color
                            style={{ color: "grey" }}
                            fontSize='small'
                        />
                    </IconButton>
                </span>
            </Tooltip>

            {/* previous step button */}
            <IconButton
                onClick={() => {
                    lastStep();
                }}
                disabled={backDisabled}
            >
                <SkipPreviousIcon
                    // color may need to follow the theme color
                    style={{ color: "grey" }}
                    fontSize='small'
                />
            </IconButton>

            {/* play button */}
            <IconButton
                // function using depends on isPlaying
                onClick={() => {
                    ifPlaying ? pause() : resume();
                }}
                disabled={disabled}
            >
                {/* button appearence depends on isPlaying */}
                {ifPlaying ? (
                    <PauseCircleFilledIcon fontSize='large' />
                ) : (
                    <PlayCircleFilledIcon fontSize='large' />
                )}
            </IconButton>

            {/* next step button */}
            <IconButton
                onClick={() => {
                    nextStep();
                }}
                disabled={disabled}
            >
                <SkipNextIcon
                    // color may need to follow the theme color
                    style={{ color: "grey" }}
                    fontSize='small'
                />
            </IconButton>

            {/* the speed choosing menu */}
            <SpeedControlMenu
                handleClick={handleClick}
                handleShutDown={handleClose}
                anchorEl={speedMenu}
                speed={speed + "x"}
            />
        </div>
    );
}
