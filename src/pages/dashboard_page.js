import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import reviewStore from '../stores/review_store'
import DashboardMenu from "../components/dashboard_menu"
import ReviewsTable from "../components/reviews_table"
import ReviewsPieChart from "../components/reviews_pie_chart"
import ReviewsLineChart from "../components/reviews_line_chart"
 
class DashboardPage extends Component {
    componentDidMount() {
        let dataUrl = "http://localhost:3000/data/reviews_Musical_Instruments_5.json"
        reviewStore.loadData(dataUrl)
    }
 
    render() {
    return (
        <div id="dashboard_page" className="App-page">
           <DashboardMenu />
            <Switch>
            <Route exact path="/dashboard"
                           component={() => "Dashboard Content"}/>
                    <Route path="/dashboard/reviews_table"
                           component={ReviewsTable}/>
                            <Route path="/dashboard/reviews_pie_chart"
                           component={ReviewsPieChart}/>
                           <Route path="/dashboard/reviews_line_chart"
                           component={ReviewsLineChart}/>
            </Switch>
        </div>
    )
}
}
export default DashboardPage