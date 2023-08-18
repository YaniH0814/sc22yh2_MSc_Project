/*
    Author: Yuting Jiang, Yijie Lu

    Register routers for procedure subpages
*/

import ProcedureDijkstra from './Dijkstra/Dijrkstra';


const ProcedureRouters = [
    {
       path: '/ProcedureSubPage/Bubble',
       component: ProcedureDijkstra,
     },
     {
       path: '/ProcedureSubPage/Insertion',
       component: ProcedureDijkstra,
     },
      {
        path: '/ProcedureSubPage/Merge',
        component: ProcedureDijkstra,
      },
      {
        path: '/ProcedureSubPage/Heap',
        component: ProcedureDijkstra,
      },
   ]
   
export default ProcedureRouters;