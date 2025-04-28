import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

import Heading from "./Heading";
import Home from "./Home";
import AboutMe from "./AboutMe";
import RecommendedBooks from "./RecommendedBooks";
import ReadList from "./ReadList";
import Feedbacks from "./Feedbacks";

function App(){
    return (
        <BrowserRouter>
          <Heading />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bookList" element={<RecommendedBooks />} />
            <Route path="/readList" element={<ReadList />} />
            <Route path="/feedbacks" element={<Feedbacks/> } />
            <Route path="/aboutMe" element={<AboutMe />} />
            

          </Routes>
            {/*<Footer />*/}
        </BrowserRouter>
      ); 
}

export default App;