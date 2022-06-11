import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import NewPokemon from "./components/NewPokemon";
import DetailPokemon from "./components/DetailPokemon";
import LandingPage from "./components/LandingPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Provider} from 'react-redux';
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>

        <Header/>
        <Routes>
          <Route exact path='/' element={<LandingPage/>} />
          <Route path='/home' element={<Home />}/>
          <Route path='/create/pokemon' element={<NewPokemon/>}/>
          <Route path='/pokemons/detail/:id' element={<DetailPokemon />}/>
        </Routes>

      </Provider>
    </BrowserRouter>
  );
}

export default App;
