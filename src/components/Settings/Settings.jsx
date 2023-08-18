/*
   Author Name: Yani Huang

*/
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Collapse from "@material-ui/core/Collapse";
import DeleteIcon from "@material-ui/icons/Delete";
import Accordion from "@material-ui/core/Accordion";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";



const useStyles = makeStyles((theme) => ({
    list: {
        width: 400,
    },
    fullList: {
        width: "auto",
    },
    link: {
        "&:hover": {
            fontWeight: 400,
            backgroundColor: "white",
            color: "#1564b2",
            cursor: "pointer",
        },

        color: "#4ba6ff",
        fontSize: "2em",
        borderWidth: "0px",
        backgroundColor: "white",
        textDecoration: "none",
    },

    warning: {
        marginLeft: "15px",
        marginRight: "5px",
        textAlign: "lefter",
        fontSize: "14px",
        fontWeight: "600",
    },
    confirm: {
        backgroundColor: "#FF8C00",
        color: "white",
        opacity: 0.8,
        marginLeft: "92px",
        marginTop: "12px",
        "&:hover": {
            backgroundColor: "#FF8C00",
            opacity: 1,
            color: "white",
        },
    },
    content: {
        color: "#6e767b",
    },
}));

export default function Set() {
    const classes = useStyles();
    //drawer state
    const [state, setState] = React.useState({
        left: false,
    });
    //alert state
    // eslint-disable-next-line
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setState(false);
        localStorage.clear();
        localStorage.setItem("snack", JSON.stringify(1));
    };

    //set event: when click outside drawer, drawer will close
    const DrawerControl = (anch, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [anch]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {[classes.fullList]: anchor === "top" || anchor === "bottom",})}
            role="presentation"
            onKeyDown={DrawerControl(anchor, false)}
        >
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1a-header"
                >
                    <DeleteIcon />
                    &nbsp;&nbsp;
                    <ListItemText primary="Clear Current History" />
                </AccordionSummary>
                <AccordionDetails>
                    <Paper elevation={0}>
                        <Collapse in={open}>
                            <Alert severity="warning">
                                <div className={classes.warning}>
                                    Do you want to clear the viewing history?
                                </div>
                                <Link
                                    to="/ProcedureMainPage"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        size="small"
                                        variant="contained"
                                        onClick={handleClick}
                                        className={classes.confirm}>
                                        CONFIRM
                                    </Button>
                                </Link>
                            </Alert>
                        </Collapse>
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </div>
    );

    return (
        <div>
            <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onOpen={DrawerControl("left", true)}
                onClose={DrawerControl("left", false)}
            >
                {list("left")}
            </SwipeableDrawer>
            <Tooltip title="Setting" placement="bottom" arrow>
                <IconButton
                    aria-label="Setting"
                    onClick={DrawerControl("left", true)}
                >
                    {" "}
                    <SettingsOutlinedIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
}
