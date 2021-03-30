import './App.css';
import React, { Component } from "react";
import HomePage from "./pages/home_page"
import NavBar from "./components/nav_bar" 
import AboutPage from './pages/about_page'
import DashboardPage from './pages/dashboard_page'
import { Switch, Route } from "react-router-dom"

export default class App extends Component {
  render() {
  return (
    <div className="App">
      <NavBar />
      <main>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/home' component={HomePage} />
                        <Route path='/dashboard' component={DashboardPage} />
                        <Route path='/about' component={AboutPage} />
                    </Switch>
                </main>
    </div>
  );
}
}

