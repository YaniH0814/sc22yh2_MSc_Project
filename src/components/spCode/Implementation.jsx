/*
     Author Name: Yani Huang

    Export corresponding implementation for sorting algorithms.
*/

import ImplementationAnimation from "./ImplementationAnimation";
import { Dij } from "./PseudoCode";

const BubbleImplementation = () => {
    const Code = Dij;
    const title = "Dijkstra's Algorithm";

    const props = {
        title,
        Code,
    };

    return <ImplementationAnimation {...props} />;
};

export {
    BubbleImplementation
};
