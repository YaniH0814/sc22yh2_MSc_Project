const COLORS = {
    unVisited: "#FFD700", // 
    visited: "#008000", // 
    current: "#FF0000", // 
    origin: '#0080ff',
    neighbor: '#00b3ff',
    edgeHighlight:'#db6009',
    edgeOrigin:'#ff8000',
}

export default function dijkstra(edges, vertices) {

    const edgeTrace = [hardcopy(edges)];
    const verticesTrace = [hardcopy(vertices)];
    const description = ['Dijkstra Algorithm'];
    const blocknums = [1];

    const inifinity = 'INF';

    //mark the distance as infinity and previous vertex as null
    vertices.forEach((vertex) => {
        vertex.dis = inifinity;
        vertex.pre = 'null';
        vertex.visible = true;
    })

    //1.update trace and description (initialize dis and pre V)
    //update vertices, edge keep same, update description
    verticesTrace.push(hardcopy(vertices));
    edgeTrace.push(hardcopy(edges));
    description.push('Firstly,Mark distance as infinity and previous v as null for all vertex.');
    blocknums.push(1);

    //let the distance of start vertex as 0
    vertices[0].dis = '0';
    vertices[0].pre = '';

    //2.update trace and description (set start vertex distance as 0)
    //update vertices, edge keep same, update description
    verticesTrace.push(hardcopy(vertices));
    edgeTrace.push(hardcopy(edges));
    description.push('As start vertex, distance of vertex 1 = 0.');
    blocknums.push(2);

    //3.update trace and description
    //update vertices, edge keep same, update description
    verticesTrace.push(hardcopy(vertices));
    edgeTrace.push(hardcopy(edges));
    description.push('Visit the unvisited V with the smallest known Distance from the start Vertex.');
    blocknums.push(4);

    //4.update trace and description (start vertex)
    //update vertices, edge keep same, update description
    vertices[0].color = COLORS.current;
    verticesTrace.push(hardcopy(vertices));
    edgeTrace.push(hardcopy(edges));
    description.push('First time around, this is the start vertex itself, Vertex 1.');
    blocknums.push(5);
    //get neighbor of start vertex;
    let neighbors = findNeighbour(edges, vertices, vertices[0].id);

    //5.update trace and description (start vertex)
    //update vertices, edge keep same, update description
    //show neighbours TODO:change edge color
    const neibourID = [];
    vertices.forEach((vertex) => {
        neighbors.forEach((neighbor) => {
            if (vertex.id === neighbor.vertex.id) {
                vertex.color = COLORS.neighbor;
                neibourID.push(neighbor.vertex.id);
            }
        })
    })

    verticesTrace.push(hardcopy(vertices));
    edgeTrace.push(hardcopy(edges));
    description.push('For the current vertex, examine its unvisited neighbours ' + neibourID +'.');
    blocknums.push(6);

    //6.update trace and description (start vertex)
    //calculate new distance
    vertices[0].color = COLORS.current;
    verticesTrace.push(hardcopy(vertices));
    edgeTrace.push(hardcopy(edges));
    description.push('Calculate the distance of the unvisited neighbours from the start vertex.');
    blocknums.push(6);

    //7.calculate distance and comprare
    verticesTrace.push(hardcopy(vertices));
    edgeTrace.push(hardcopy(edges));
    description.push('If the calculated distance is less than known distance, update the Distance.');
    blocknums.push(6);

    //8.
    vertices.forEach((vertex) => {
        neighbors.forEach((neighbor) => {
            if (vertex.id === neighbor.vertex.id && vertex.dis === inifinity) {

                verticesTrace.push(hardcopy(vertices));
                edgeTrace.push(hardcopy(edges));
                description.push('The calculated distance of vertex'
                    + vertex.id
                    + ' is ' +
                    vertices[0].dis +
                    ' + ' +
                    neighbor.edge.weight +
                    ' = ' +
                    parseInt((parseInt(vertices[0].dis) + parseInt(neighbor.edge.weight)))
                );
                blocknums.push(7);

                vertex.dis = parseInt((parseInt(vertices[0].dis) + parseInt(neighbor.edge.weight)));
                vertex.pre = vertices[0].id;
                verticesTrace.push(hardcopy(vertices));
                edgeTrace.push(hardcopy(edges));
                description.push('Since the new distance of vertex ' +
                    vertex.id +
                    ' is less than INF, update its distance and previous vertex.'
                );
                blocknums.push(9);
            }
        });
    })

    //9.remake the color of vertices
    vertices.forEach((vertex) => {
        if (vertex.color === COLORS.current) {
            vertex.color = COLORS.visited;
        } else if (vertex.color === COLORS.neighbor) {
            vertex.color = COLORS.origin;
        }
    })

    verticesTrace.push(hardcopy(vertices));
    edgeTrace.push(hardcopy(edges));
    description.push('Do the same process for the rest of the vertices, chosing the unvisited vertex with smallest distance');
    blocknums.push(3);

    //10. RECURSION
    console.log(vertices.length - 1)
    for (let i = 0; i < vertices.length - 1; i++) {
        let smallestDistance = '1001';
        let smallestDisVID = 1;

        vertices.forEach((vertex) => {
            if (vertex.color !== COLORS.visited) {
                //finding the unvisited vertex with smallest distance
                if (vertex.dis !== inifinity) {
                    if (parseInt(vertex.dis) < parseInt(smallestDistance)) {
                        smallestDistance = vertex.dis;
                        smallestDisVID = vertex.id;
                    }
                }
            }
        })
        //10.
        vertices[smallestDisVID - 1].color = COLORS.current;
        verticesTrace.push(hardcopy(vertices));
        edgeTrace.push(hardcopy(edges));
        description.push('The unvisited vertex with smallest distance is vertex ' + smallestDisVID);
        blocknums.push(4);

        neighbors = findNeighbour(edges, vertices, smallestDisVID);
        let neibourID = [];

        vertices.forEach((vertex) => {
            neighbors.forEach((neighbor) => {
                if (vertex.id === neighbor.vertex.id && vertex.color !== COLORS.visited) {
                    vertex.color = COLORS.neighbor;
                    neibourID.push(neighbor.vertex.id);
                }
            })
        })

        verticesTrace.push(hardcopy(vertices));
        edgeTrace.push(hardcopy(edges));
        description.push('For the current vertex' + smallestDisVID + ', examine its unvisited neighbours ' + neibourID +'.');
        blocknums.push(6);

        verticesTrace.push(hardcopy(vertices));
        edgeTrace.push(hardcopy(edges));
        description.push('Calculate the distance of the unvisited neighbours from the start neighbour.');
        blocknums.push(7);

        vertices.forEach((vertex) => {
            neighbors.forEach((neighbor) => {
                if (vertex.id === neighbor.vertex.id && vertex.color !== COLORS.visited) {

                    verticesTrace.push(hardcopy(vertices));
                    edgeTrace.push(hardcopy(edges));
                    description.push('The calculated distance of vertex '
                        + vertex.id
                        + ' is ' +
                        vertices[smallestDisVID - 1].dis +
                        ' + ' +
                        neighbor.edge.weight +
                        ' = ' +
                        parseInt((parseInt(vertices[smallestDisVID - 1].dis) + parseInt(neighbor.edge.weight)))
                    );
                    blocknums.push(7);

                    // if (vertex.dis !== inifinity) {
                    const newDistance = parseInt(vertices[smallestDisVID - 1].dis) + parseInt(neighbor.edge.weight);

                    if (newDistance < parseInt(vertex.dis) || vertex.dis === inifinity) {
                        vertex.dis = newDistance;
                        vertex.pre = vertices[smallestDisVID - 1].id;
                        verticesTrace.push(hardcopy(vertices));
                        edgeTrace.push(hardcopy(edges));
                        description.push('Since the new distance ' + newDistance + ' of vertex ' +
                            vertex.id +
                            ' is less than its current distance ' + vertex.dis + ', update its distance and previous vertex.'
                        );
                        blocknums.push(9);
                    } else {
                        verticesTrace.push(hardcopy(vertices));
                        edgeTrace.push(hardcopy(edges));
                        description.push('Since the new distance ' + newDistance + ' of vertex ' +
                            vertex.id +
                            ' is larger than its current distance ' + vertex.dis + '. No changes are made.'
                        );
                        blocknums.push(8);
                    }
                    // }

                }
            });
        })

        //remake the color of vertices
        vertices.forEach((vertex) => {
            if (vertex.color === COLORS.current) {
                vertex.color = COLORS.visited;
            } else if (vertex.color === COLORS.neighbor) {
                vertex.color = COLORS.origin;
            }
        })

        console.log(i)
        if (i !== vertices.length - 2) {
            verticesTrace.push(hardcopy(vertices));
            edgeTrace.push(hardcopy(edges));
            description.push('Do the same process for the rest of the vertices, chosing the unvisited vertex with smallest distance');
            blocknums.push(3);
        }else{
            verticesTrace.push(hardcopy(vertices));
            edgeTrace.push(hardcopy(edges));
            description.push('Since there is no neighbour vertex unvisited, mark it as visited!');
            blocknums.push(3);
            verticesTrace.push(hardcopy(vertices));
            edgeTrace.push(hardcopy(edges));
            description.push('There are no unvisited vertex so the Dijkstra algorithm completes!');
            blocknums.push(10);
        }


    }



    return { verticesTrace: verticesTrace, edgeTrace: edgeTrace, description: description, blocknums:blocknums};
}

//function for finding neighbours of vertices
function findNeighbour(edges, vertices, vertexID) {
    const neighbors = [];

    // Find edges that connect the current vertex to unvisited neighbors
    const neighborEdges = edges.filter(edge =>
        (edge.startVertexId === vertexID) ||
        (edge.endVertexId === vertexID)
    );

    neighborEdges.forEach(edge => {
        let neighborId;
        if (edge.startVertexId === vertexID) {
            neighborId = edge.endVertexId;
        } else {
            neighborId = edge.startVertexId;
        }

        const neighborVertex = vertices.find(vertex => vertex.id === neighborId);
        neighbors.push({
            vertex: neighborVertex,
            edge: edge
        });
    });

    return neighbors;
}

function hardcopy(patchedList) {
    return JSON.parse(
        JSON.stringify(patchedList)
    );
}
