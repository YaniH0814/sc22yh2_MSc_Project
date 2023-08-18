/*
    Author: Yani Huang

    The trace and description which explain the sort progress. 
*/

import React from "react";
import dijkstra from "../Animation/ShortestPath/Dijkstra";
import Animation from "../Animation/Animation";

const colors = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    magenta: '#ff00ff',
    cyan: '#00ffff',
    yellow: '#ffff00',
    orange: '#ff8000',
    purple: '#8000ff',
    lightBlue: '#0080ff',
};

 
const initialVertices = [
    { id: 1, number: 1, color: colors.lightBlue, x: 150, y: 25,ifStartEnd:1,visible:false},
    { id: 2, number: 2, color: colors.lightBlue, x: 250, y: 115,visible:false},
    { id: 3, number: 3, color: colors.lightBlue, x: 225, y: 240,visible:false},
    { id: 4, number: 4, color: colors.lightBlue, x: 75, y: 240,visible:false},
    { id: 5, number: 5, color: colors.lightBlue, x: 50, y: 115,visible:false},
];

const initialEdges = [
    { id: 1, startVertexId: 1, endVertexId: 2, color: '#ff8000', weight: 13 },
    { id: 2, startVertexId: 2, endVertexId: 3, color: '#ff8000', weight: 12 },
    { id: 3, startVertexId: 1, endVertexId: 4, color: '#ff8000', weight: 3 },
    { id: 4, startVertexId: 4, endVertexId: 5, color: '#ff8000', weight: 2 },
    { id: 5, startVertexId: 1, endVertexId: 5, color: '#ff8000', weight: 9 },
    { id: 6, startVertexId: 2, endVertexId: 5, color: '#ff8000', weight: 2 },
    { id: 7, startVertexId: 4, endVertexId: 3, color: '#ff8000', weight: 7 },
];

const { verticesTrace, edgeTrace, description } = dijkstra(initialEdges, initialVertices);


export default function IntroBubble() {
    const props = { verticesTrace: verticesTrace, description: description ,edgeTrace: edgeTrace};

    return <Animation {...props} width={490} ifShowInput={false} explanationBoxHeight={6} />;
}
