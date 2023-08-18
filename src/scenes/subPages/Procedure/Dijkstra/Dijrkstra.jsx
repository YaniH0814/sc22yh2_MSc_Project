/*
    Author Name: Yani Huang
    The subpage of Dijkstra's Algorithm.
*/

import React from "react";
import { color } from "../../../mainPages/Procedure";
import SubPage from "../SubPage";
import BubbleIntro from "../../../../components/spOverview/DijkstraOv";
import { BubbleImplementation } from "../../../../components/spCode/Implementation"; 

const introMessage = (
    <div>
        <h1>Dijkstra's Algorithm</h1>
        <p style={{ textAlign: "justify", fontSize: 18, letterSpacing: 0.5, marginTop:"-7px" }}>
        Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a graph with non-negative edge weights. 
        It uses a priority queue or min-heap to select the node with the smallest distance and gradually explores the graph until all nodes have been visited.
        </p>
    </div>
);

const intro = {
    introMessage: introMessage,
    animation: <BubbleIntro />,
};



export default function ProcedureBubble(props) {
    const progress = localStorage.getItem("bubble")
        ? JSON.parse(localStorage.getItem("bubble"))
        : [false, false, false];

    const data = {
        color: color,
        algorithm: "bubble",
        progress: progress,
        history: props.history,
        intro: intro,
        Implementation: <BubbleImplementation />,
    };

    return (
        <div>
            <SubPage {...data} />
        </div>
    );
}
