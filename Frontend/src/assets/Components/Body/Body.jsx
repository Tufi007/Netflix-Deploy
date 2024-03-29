import Bodyitem from "./Bodyitem";
import "./Body.module.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
const env= import.meta.env;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesAction } from "../../Store/Mainstore";

function Body() {
  let movies = useLoaderData();
  const { fetched, fetching, searchdata,error } = useSelector(
    (store) => store.movies
  );
  const { loggedin, token } = useSelector((store) => store.user);
    // console.log(loggedin,token,"heloouser");
    // localStorage.setItem('token',JSON.stringify(token));
    // console.log(localStorage.getItem('token'));
  if (searchdata) {
    const data = searchdata;
    movies = data;
  }
  return (
    <>
      <div className="movie_container">
        {error ? 
          <h1>{error}</h1>: fetching ?
          <h1>loading................</h1>
         : (
          movies.data.map((movie) => (
            <Bodyitem key={movie._id} movie={movie}></Bodyitem>
          ))
        )}
      </div>
    </>
  );
}
export const loadInitialData = async () => {
  const data = await axios.get(`${env.VITE_BASE_URL}`);
  const movies = await data.data;
  console.log(movies);
  return movies;
};
export default Body;
