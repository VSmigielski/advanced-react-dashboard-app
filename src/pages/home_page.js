import logo from "../logo.svg"
import React from "react"
 
function HomePage() {
    return (
        <div id="home_page" className="App-page App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
            Hello World from React!
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn React
        </a>
    </div>
    )
}
 
export default HomePage