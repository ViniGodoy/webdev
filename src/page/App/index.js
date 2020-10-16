import React from 'react';
import axios from 'axios';
import './App.css';
import PostList from "../PostList";
import PostForm from "../PostForm";
import {HashRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import LoginForm from "../LoginForm";
import {auth} from '../../firebase';

function loggedIn() {
    return localStorage.reactBlogUid;
}

const PrivateRoute = ({ component: Component, render = null, children = null, ...rest }) => {
    let renderMethod = render || children;

    return (
        <Route {...rest} render={(props) => (
            loggedIn() ?
                (renderMethod ? renderMethod(props) : <Component {...props} />)
                : <Redirect to='/login'/>)}
        />
    )
}

class App extends React.Component {
    setupAxios() {
        axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
        axios.defaults.headers.post["Content-Type"] = 'application/json';
    }

    constructor(props) {
        super(props);
        this.setupAxios();
        auth.onAuthStateChanged((user) => {
            console.log("STATE CHANGED:"  + JSON.stringify(user));
            if (user == null || user.emailVerified === false) {
                localStorage.removeItem("reactBlogUid");
                localStorage.removeItem("reactBlogUDisplayName");
                localStorage.removeItem("reactBlobUEmail");
                return;
            }

            localStorage.reactBlogUid = user.uid;
            localStorage.reactBlogUDisplayName = user.displayName;
            localStorage.reactBlobUEmail = user.email;
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Menu} />
                        <PrivateRoute exact path="/posts/:id" component={PostForm} />
                        <Route exact path="/posts" component={PostList}/>
                        <Route exact path="/login" component={LoginForm} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function Menu(props) {
    return (
        <p>
            <p><Link to="/posts">Post list</Link></p>
            <p><Link to="/posts/new">Write a new post</Link></p>
        </p>
    );
}

export default App;
