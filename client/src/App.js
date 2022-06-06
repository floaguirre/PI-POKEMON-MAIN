import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import NewPokemon from "./components/NewPokemon";
import DetailPokemon from "./components/DetailPokemon";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Provider} from 'react-redux';
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/pokemons/new' element={<NewPokemon/>}/>
          <Route path='/pokemons/detail/:id' element={<DetailPokemon />}/>
        </Routes>

      </Provider>
    </BrowserRouter>
  );
}

export default App;
