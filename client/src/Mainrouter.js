
import React from "react";
import { Router, Route, Switch, Link, Redirect } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
// import createHistory from 'history/createBrowserHistory'
import history from './history';
import Ingredients from "./components/Ingredients";
import Recipes from "./components/Recipes";
import Admin from "./components/admin";
import { Container } from 'reactstrap';
import NavBar from "./components/NavBar";
import JumbotronComponent from "./components/Jumbotron";
import Smoothie from "./components/Smoothie";
import Login from "./components/login";
import Profile from "./components/profile";
import Imguploader from "./components/uploadimg";
import Contact from "./components/contact";
import StickyFooter from 'react-sticky-footer';


const App = () =>
    <div class="w-screen mt-4">
        <Router history={history}>
            <div>
                <JumbotronComponent />

                <NavBar />
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Smoothie} />
                <Route exact path="/ingredients" component={Ingredients} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/recipes" component={Recipes} />
                <Route path="/admin" component={Admin} />      
                <Route path="/profile" component={Profile} />
                <Route path="/image" component={Imguploader} /> 

                </div>
        </Router>

        <StickyFooter
            bottomThreshold={50}
            normalStyles={{
                backgroundColor: "silver",
                padding: "2rem"
            }}
            stickyStyles={{
                backgroundColor: "rgba(255,255,255,.8)",
                padding: "2rem"
            }}
        >
            2200 Colorado Ave
 Santa Monica, CA 90404; email@email.com
        </StickyFooter>

    </div>

export default App;