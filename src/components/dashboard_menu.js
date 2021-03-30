import React from "react"
import { Link } from "react-router-dom"
 
function DashboardMenu (){
    return (
        <div id="dashboard_menu" className="App-menu">
            <ul>
                <li><Link to='/dashboard/reviews_table'>
                    Reviews Table
                </Link></li>
                <li><Link to='/dashboard/reviews_pie_chart'>
                    Review Count by Score
                </Link></li>
                <li><Link to='/dashboard/reviews_line_chart'>
                    Review Count by Month
                </Link></li>
            </ul>
        </div>
    )
}
 
export default DashboardMenu