import { store } from '@risingstack/react-easy-state'
 
async function parseJson(response) {
    const jsonData = []
    const rawData = await response.text()
    rawData.split("\n")
        .forEach((jsonString) => {
            if ( (jsonString.length > 0) ) {
                try {
                    jsonData.push(JSON.parse(jsonString))
                } catch (error) {
                    console.error(error)
                }
            }
        })
 
    return jsonData
}

function getTimeInfo(reviewTime) {
    const rawTimeInfo = reviewTime.toString()
    let timeInfo, reviewYear, reviewMonth, reviewDay
    if ( rawTimeInfo.length > 0 ) {
        timeInfo = rawTimeInfo.split(', ')
        reviewYear = timeInfo[1].toString()
        timeInfo = timeInfo[0].toString().split(' ')
        reviewMonth = timeInfo[0].toString()
        reviewDay = timeInfo[1].toString()
        return [ reviewYear, reviewMonth, reviewDay ]
 
    } else {
        return [ 'UNKNOWN_YEAR', 'UNKNOWN_MONTH', 'UNKNOWN_DAY' ]
    }
}
 
const reviewStore = store({
    reviews: [],
    async loadData(jsonUrl) {
        const response = await fetch(jsonUrl)
        const jsonData = await parseJson(response)
        reviewStore.reviews = jsonData
    },

    getReviewCountByMonth() {
        // Define data object for counting reviews
        const reviewCountByMonth = {}
 
        // Loop through reviews to count for each month
        reviewStore.reviews.forEach((review)=> {
            // Define month and year from reviewTime property of review
            // Convert to string to use as a lookup key
            const [ year, month, ] = getTimeInfo(review.reviewTime)
 
            // Check for existing key for this year
            if ( !Object.keys(reviewCountByMonth).includes(year) ) {
                // If none exists, create new key with empty object
                reviewCountByMonth[year] = {}
            }
 
            // Check for existing key for this month and year
            if ( !Object.keys(reviewCountByMonth[year]).includes(month) ) {
                // If none exists, create new key with count 0
                reviewCountByMonth[year][month] = 0
            }
 
            // Add one to the review count for this year and month
            reviewCountByMonth[year][month] += 1
        })
 
        // Return data object with review counts
        return reviewCountByMonth;
    },
 
    getReviewCountByScore() {
        // Define data object for counting reviews
        const reviewCountByScore = {}
 
        // Loop through reviews to count for each score
        reviewStore.reviews.forEach((review)=> {
            // Define score variable from overall property of review
            // Convert to string to use as a lookup key
            const score = review.overall.toString()
 
            // Check for existing key for this score
            if ( !Object.keys(reviewCountByScore).includes(score) ) {
                // If none exists, create new key with count of 0
                reviewCountByScore[score] = 0
            }
 
            // Add one to the review count for this score
            reviewCountByScore[score] += 1
        })
 
        // Return data object with review counts
        return reviewCountByScore;
    }
})
 
export default reviewStore