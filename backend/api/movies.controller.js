import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
    static async apiGetMovies(req, res, next){
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0

        let filter = {}
        if(req.query.rated){
            filter.rated = req.query.rated
        }
        else if(req.query.title){
            filter.title = req.query.title
        }
        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({filter, page, moviesPerPage})
        
        let response = {
            movies: moviesList,
            page: page,
            filter: filter,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        res.json(response)
    }

    //for apiGetMovieById method in movies.route.js file
    static async apiGetMovieById(req, res, next){
        try {
            let id = req.params.id || {}
            let movie = await MoviesDAO.getMovieById(id)
            if(!movie){
                res.status(404).json({error: "not found"})
                return
            }
            res.json(movie)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
    //for apiGetMovieById method in movies.route.js file
    static async apiGetRatings(req, res, next){
        try {
            let propertyType = await MoviesDAO.getRatings()
            res.json(propertyType)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
}