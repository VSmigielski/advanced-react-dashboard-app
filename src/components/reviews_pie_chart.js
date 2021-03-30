import React, { Component } from 'react'
import { PieChart } from 'react-d3-components'

import { view } from '@risingstack/react-easy-state'
import reviewStore from '../stores/review_store'

var data = {
    label: 'Review Count by Score (Demo)',
    values: [{x: '5 stars', y: 34}, {x: '4 stars', y: 21}, {x: '3 stars', y: 13}, {x: '2 stars', y: 8}, {x: '1 star', y: 5} ]
};
 
var sort = null; // d3.ascending, d3.descending, func(a,b) { return a - b; }, etc...

class ReviewsPieChart extends Component {
    state = { data: data }
 
    componentDidMount() {
        // Update component state when it mounts to use review data
        if ( reviewStore.reviews.length > 0 ) {
            const pieChartData = this.getPieChartData()
            this.setState({ data: pieChartData })
        }
    }
 
    // This method formats raw review count data for the pie chart
    // This helps avoid mixing pie chart details specific to this component with source data (helps reuse code)
    getPieChartData() {
        const pieChartData = {
            label: 'Review Count by Score (from JSON)',
            values: []
        }
        const reviewCountByScore = reviewStore.getReviewCountByScore()
 
        Object.keys(reviewCountByScore).forEach((score) => {
            // X value: Use first value if score is 1, otherwise use second value
            const xValue = ( score === "1" ) ? `${score} star` : `${score} stars`
 
            // Y valaue: Count calculated in store
            const yValue = reviewCountByScore[score]
 
            // Add data values formatted for pie chart
            pieChartData.values.push({ x: xValue, y: yValue })
        })
 
        return pieChartData
    }
 
    render(){
        const { data } = this.state
        return (
            <div>
                <h2>{data.label}</h2>
                <PieChart
                    data={data}
                    width={600}
                    height={400}
                    margin={{top: 10, bottom: 10, left: 100, right: 100}}
                    sort={sort}
                />
            </div>
        )
    }
}
 
export default view(ReviewsPieChart)