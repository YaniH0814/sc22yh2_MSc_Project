import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@mui/material";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "730px",
        display: "flex",
        justifyContent: "center",
        alignContent: "flex-end",
        height: 38,
    },
    select: {
        marginRight: "20px",
        minWidth: 130,
        "& label.Mui-focused": {
            color: "grey",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "green",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "grey",
                borderRadius: 12,
            },
            "&:hover fieldset": {
                borderColor: "grey",
            },
            "&.Mui-focused fieldset": {
                borderColor: "green",
            },
        },
    },
    focusVisible: {},
    buttonEditEdgesUnClickable: {
        width:'20px',
        lineHeight:'13px',
        backgroundColor: "#97adac",
        fontSize:'5px',
        color: "white",
        marginTop: "0px",
        borderRadius: 10,
        "&:hover, &$focusVisible": { backgroundColor: "#97adac" },
        marginLeft: "5px",
        marginRight: '15px',
        // marginBottom:'10pxaz  /
    },
    buttonEditEdgesClickable: {
        width:'20px',
        lineHeight:'13px',
        backgroundColor: "#007bff",
        fontSize:'5px',
        color: "white",
        marginTop: "0px",
        borderRadius: 10,
        "&:hover, &$focusVisible": { backgroundColor: "#007bff" },
        marginLeft: "5px",
        marginRight: '15px',
        // marginBottom:'10pxaz  /
    },
    buttonAdd: {
        fontSize:'5px',
        width:'20px',
        lineHeight:'13px',
        backgroundColor: "#30cf21",
        color: "white",
        marginTop: "0px",
        borderRadius: 10,
        "&:hover, &$focusVisible": { backgroundColor: "#30cf21" },
        marginLeft: "10px",
        // marginBottom:'10px'
    },
    buttonAddError: {
        fontSize:'5px',
        width:'20px',
        lineHeight:'13px',
        backgroundColor: "#dc3545",
        color: "white",
        marginTop: "0px",
        borderRadius: 10,
        "&:hover, &$focusVisible": { backgroundColor: "#dc3545" },
        marginLeft: "10px",
        // marginBottom:'10px'
    },
    buttonSave: {
        backgroundColor: "#97adac",
        color: "white",
        marginTop: "0px",
        borderRadius: 10,
        "&:hover, &$focusVisible": { backgroundColor: "#97adac" },
        marginLeft: "10px",
        // marginBottom:'10px'
    },
}));

const CssTextField = withStyles({
    
    root: {
        "& label": {
            color: "grey",
            fontSize: "10px",
        },
        "& label.Mui-focused": {
            color: "grey",
            fontSize: "8px",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "green",
            
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "grey",
                borderRadius: 12
            },
            "&:hover fieldset": {
                borderColor: "grey",
            },
            "&.Mui-focused fieldset": {
                borderColor: "green",
            },
        },
    },
})(TextField);

export default function InputBar(props) {
    const {
        isValid,
        wrongMsg,
        handleChange,
        inputString,
        numVertices,
        handleNumVerticesChange,
        toggleClickableVertices,
        handleEdgeWeightChange,
        handleAddEdge,
        handleCheckEdgeLegal,
        ifUnderEdit,
        ifAdd
    } = props;

    const classes = useStyles();

    const error = isValid ? false : true;
    const label = isValid
    ? "Enter integers [0,1000]"
    : "Invalid Input";
    const helper = isValid ? " " : wrongMsg;

    return (
        <div className={classes.root}>
            <div style={{ width: "550px", display: "flex" }}>
                <Select
                    className={classes.select}
                    // Other props
                    onChange={(event) => handleNumVerticesChange(event.target.value)}
                    label='select num of v'
                    value={numVertices}
                // Other props
                >
                    <MenuItem value={3}>3 vertices</MenuItem>
                    <MenuItem value={4}>4 vertices</MenuItem>
                    <MenuItem value={5}>5 vertices</MenuItem>
                    <MenuItem value={6}>6 vertices</MenuItem>
                    <MenuItem value={7}>7 vertices</MenuItem>
                    <MenuItem value={8}>8 vertices</MenuItem>
                    <MenuItem value={9}>9 vertices</MenuItem>
                </Select>

                <Button
                    variant="contained"
                    disableElevation
                    onClick={(event) =>toggleClickableVertices()}
                    className={ifUnderEdit? classes.buttonEditEdgesClickable : classes.buttonEditEdgesUnClickable}
                >
                    Edit Edges
                </Button>
                <CssTextField
                    error={error}
                    label={label}
                    type="search"
                    helperText={helper}
                    variant="outlined"
                    onChange={handleEdgeWeightChange}
                    onFocus={handleChange}
                    value={inputString}
                    className={classes.text}
                    size="small"
                    style={{
                        width: '90px',
                    }}
                />

                <Button
                    variant="contained"
                    disableElevation
                    onClick={(event) =>handleAddEdge()}
                    className={ifAdd? classes.buttonAdd : classes.buttonAddError}
                >
                    Add Edge
                </Button>
                <Button
                    variant="contained"
                    disableElevation
                    onClick={(event) => handleCheckEdgeLegal()}
                    className={classes.buttonSave}
                >
                   Save
                </Button>
            </div>
        </div>
    );
}
