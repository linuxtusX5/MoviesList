import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews){
            return
        }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
        } catch (e) {
            console.error(`unable to establish connection handle in reviewDAO: ${e}`)
        }
    }
    static async addReview(movieId, review, user, date){
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_Id: ObjectId(movieId)
            }
            return await reviews.insertOne(reviewDoc)
            console.log(addReview)
        } catch (e) {
            console.error(`unable to post review: ${e}`)
            return {error: e}
        }
    }
    static async updateReview( reviewId, userId, review, date){
        try {
            const updateResponse = await reviews.updateOne(
                {_id: userId, _id: ObjectId(reviewId)},
                {$set: {review: review, date: date}}
            )
            return updateResponse
        } catch (e) {
            console.error(`unable to update review: ${e}`)
            return {error: e}
        }
    }
    static async deleteReview(reviewId, userId){
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId
            })
            return deleteResponse
        } catch (e) {
            console.error(`unable to delete review: ${e}`)
            return {error: e}
        }
    }
}