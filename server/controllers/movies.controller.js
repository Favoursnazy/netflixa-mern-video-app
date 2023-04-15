import Movies from "../models/movies.model.js";
import asyncHandler from "express-async-handler";
import { MoviesData } from "../Datas/moviesData.js";

//***************PUBLIC CONTROLLER **************** */
//@Desc import movies
//@route POST /api/movies/import
//@access Public
export const importMovies = asyncHandler(async (req, res) => {
  //first we make sure our movies table is empty by deleting all documents
  await Movies.deleteMany({});
  //then we insert all movies from our moviedata
  const movies = await Movies.insertMany(MoviesData);
  res.status(200).json(movies);
});

//@desc get all movies
//@routes  GET /api/movies
//@access Public
export const getMovies = asyncHandler(async (req, res) => {
  try {
    //filter movies by category, time, language, rate, year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category: { $regex: category, $options: "i" } }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { title: { $regex: search, $options: "i" } }),
    };

    //load more movies functionality
    const page = Number(req.query.pageNumber) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    //find movies by query, skip and limit
    const movies = await Movies.find(query)
      // .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //get total number of movies
    const count = await Movies.countDocuments(query);

    //send response with movies and total number of movies
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit),
      totalMovies: count,
    });
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
});

//@desc get movie by id
//@routes  GET /api/movies/:id
//@access Public
export const getMovieById = asyncHandler(async (req, res) => {
  try {
    //find movie by id in database
    const movie = await Movies.findById(req.params.id);
    //if the movie is found then send the movie to client
    if (movie) {
      res.status(200).json(movie);
    }
    // ifmovie was not found then send an error message to client
    else {
      res.status(404);
      throw new Error("Movie not Found");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//@desc Get top rated movies
//@routes  GET /api/movies/rated/top
//@access Public
export const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    //find top rated movies
    const topRated = await Movies.find({}).sort({ rate: -1 });
    //send top rated movies to the client
    res.status(200).json(topRated);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//@desc Get random movies
//@routes  GET /api/movies/random/all
//@access Public
export const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    // find random movies
    const randomMovies = await Movies.aggregate([{ $sample: { size: 8 } }]);
    // send random movies to client
    res.status(200).json(randomMovies);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//********************* PRIVATE CONTROLLERS ************************/

//@desc create movie review
//@routes  GET /api/movies/:id/review
//@access Private

export const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    //find movie by id in database
    const movie = await Movies.findById(req.params.id);
    //if the movie is found then send the movie to client
    if (movie) {
      //check if the user already reviewed the movie
      const alreadyReviewedMovie = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      //if the user already reviwed
      if (alreadyReviewedMovie) {
        res.status(400);
        throw new Error("You already reviwed this movie");
      }

      const reviewData = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };
      // push the new review to the reviews array
      movie.reviews.push(reviewData);
      //increment the number of reviews
      movie.numberOfReviews = movie.reviews.length;

      //calculate the new rate
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      //save movie to database
      await movie.save();
      res.status(200).json({
        message: "Review added successfully!",
      });
    }
    // ifmovie was not found then send an error message to client
    else {
      res.status(404);
      throw new Error("Movie not Found");
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

//****************** ADMIN CONTROLLER ************************ */
//@Desc   Update movie
//@router PUT /api/movies/:id
//@access Private/Admin
export const updateMovie = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    //find movie in DB
    const movie = await Movies.findById(req.params.id);

    if (movie) {
      //update movie data
      movie.title = title || movie.title;
      movie.desc = desc || movie.desc;
      movie.image = image || movie.image;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.category = category || movie.category;
      movie.time = time || movie.time;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;

      //save movie data  in database
      const updatedMovie = await movie.save();
      //send the updated movie to the client
      res.status(200).json(updatedMovie);
    } else {
      //send the error message TO client
      res.status(400);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//@Desc   Delete movie
//@router PUT /api/movies/:id
//@access Private/Admin
export const deleteMovie = asyncHandler(async (req, res) => {
  try {
    //find movie in database
    const movie = await Movies.findById(req.params.id);

    //if movie was found please delete it
    if (movie) {
      await Movies.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Movie deleted successfully" });
    } else {
      //send error message to client if movie was not found
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//@Desc   Delete all movies
//@router PUT /api/movies
//@access Private/Admin
export const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    //delete all movies
    await Movies.deleteMany({});
    res.status(200).json({ message: "All movies deleted!" });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//@Desc   Create movie
//@router PUT /api/movies/create
//@access Private/Admin
export const createMovie = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // Create a new movie
    const movie = new Movies({
      title,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
      userId: req.user_id,
    });

    //save the movie in database
    if (movie) {
      const createMovie = await movie.save();
      res.status(200).json(createMovie);
    } else {
      res.status(400);
      throw new Error("Invalid movie data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
