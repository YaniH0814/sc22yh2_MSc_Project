/*
    Author Name: Yani Huang
    
    This code is for the Pseudocode of algorithms (Dijkstra).
*/

import "../../fonts/fonts.css";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    Dij: {
        fontSize: 16,
        marginTop: -4,
        letterSpacing: -0.5,
        fontFamily: "Space Mono",
        
    },
    commonBackground: {
        marginTop: -6,
        fontSize: "12px",
        borderRadius: 5,
        paddingLeft: "5px",
        lineHeight: "22px",
        letterSpacing: 0.5,
        fontFamily: "Space Mono",
        backgroundColor: "#cfd9e7",
    },
    highlightedBackground: {
        marginTop: -6,
        fontSize: "12px",
        lineHeight: "21px",
        paddingLeft: "5px",
        letterSpacing: 0.5,
        fontFamily: "Space Mono",
    },



}));

const Dij = (props) => {
    const classes = useStyles();
    const { blockNum: blockMark } = props;
    
    const DijCode = (
        <div>
            <pre className={classes.Dij}>
                {`Algorithm: Dijkstra(graph, startVertex(1)):`}
            </pre>
            <pre
                className={
                    blockMark === 1 ? classes.commonBackground : classes.highlightedBackground}
            >
                {`  for each vertex v in Graph:\n     dist[v] := infinity \n     previous[v] := undefined`}
            </pre>
            <pre
                className={blockMark === 2 ? classes.commonBackground : classes.highlightedBackground}
            >
                {`  dist[startVertex] := 0 \n  Q := the set of all nodes in Graph`}
            </pre>
            <pre
                className={blockMark === 3 ? classes.commonBackground : classes.highlightedBackground}
            >
                {`  while Q is not empty:`}
            </pre>
            <pre
                className={blockMark === 4 ? classes.commonBackground : classes.highlightedBackground}
            >
                {`     u := node in Q with smallest dist[ ]`}
            </pre>
            <pre
                className={blockMark === 5 ? classes.commonBackground : classes.highlightedBackground}
            >
                {`     remove u from Q`}
            </pre>
            <pre
                className={blockMark === 6 ? classes.commonBackground : classes.highlightedBackground}
            >
                {`     for each neighbor v of u:`}
            </pre>
            <pre
                className={blockMark === 7 ? classes.commonBackground : classes.highlightedBackground}
            >
                {`        alt := dist[u] + dist_between(u, v)`}
            </pre>
            <pre
                className={
                    blockMark === 8 ? classes.commonBackground : classes.highlightedBackground
                }
            >
                {`        if alt < dist[v]`}
            </pre>
            <pre
                className={blockMark === 9 ? classes.commonBackground : classes.highlightedBackground}
            >
                {`           dist[v] := alt\n           previous[v] := u`}
            </pre>
            <pre
                className={blockMark === 10 ? classes.commonBackground : classes.highlightedBackground}
            >
                {`return previous, dist`}
            </pre>
        </div>
    );

    return DijCode;
};

export { Dij};
