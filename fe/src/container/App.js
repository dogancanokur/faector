import React, {Component} from 'react';
import LanguageSelector from "../components/LanguageSelector";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import UserSignUpPage from "../pages/UserSignUpPage";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import TopBar from "../components/TopBar";
import {connect} from "react-redux";

class App extends Component {

    render() {
        const {isLoggedIn} = this.props;
        return (<div>
            <Router>
                <TopBar/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    {!isLoggedIn && <Route path="/login" component={(props) => {
                        return <LoginPage {...props}></LoginPage>
                    }}/>}
                    {!isLoggedIn && <Route path="/signup" component={UserSignUpPage}/>}
                    <Route path="/user/:username" component={(props) => {
                        return <UserPage {...props}></UserPage>
                    }}/>
                    <Redirect to="/"/>
                </Switch>
            </Router>
            <LanguageSelector/>
        </div>);
    }
}

const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn
    }
}
export default connect(mapStateToProps)(App);