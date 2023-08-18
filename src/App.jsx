import React from "react";
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import HomePage from './scenes/mainPages/Procedure';
import ProcedureRouters from './scenes/subPages/Procedure/ProcedureRouters';

//Return routes
function Routers() {
    return(
        <Router >
            <div>
            <Switch>
            <Route path="/ProcedureMainPage" component={HomePage} />
           
            <Route path="/ProcedureSubPage"
                render={() => {
                    return(
                        <Switch>
                            {ProcedureRouters.map((route, algorithm) => (
                                <Route
                                key={algorithm}
	                        	path={route.path}
	                        	component={route.component}
                                />
                            ))}
                        </Switch>
                    );
                }}
            ></Route>
            <Route path="/" component={HomePage}/>
            </Switch>
            </div>
        </Router>
    );
}


export default function App() {
    return(<Routers/>);
}




