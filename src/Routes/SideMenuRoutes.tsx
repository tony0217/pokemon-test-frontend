import React from 'react'
import { Route, Routes } from 'react-router-dom'

import FavoriteUsers from '@components/FavoritePokemon/FavoritePokemon'
import PokemonList from '@components/PokemonList/PokemonList'
import UserList from '@components/UserList/UserList'
import Login from './../Pages/Login'

export const SideMenuRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/pokemon-list" element={<PokemonList />} />
        <Route path="/pokemon-favorites" element={<FavoriteUsers />} />
        <Route path="/user-list" element={<UserList />} />
      </Routes>
    </>
  )
}
