import { useState, useEffect } from 'react';

import { Layout } from '../../components/layouts/Layout';
import { NoFavorites } from './../../components/ui';
import { LocalFavorites } from '../../utils';
import { Card, Grid } from '@nextui-org/react';
import { PokeFavorite } from '../../components/pokemon/PokeFavorite';

const FavoritesPage = () => {

  const [ favoritePokemons, setFavoritePokemons ] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( LocalFavorites.pokemons() );
  }, [])
  

  return (
    <Layout title='Pokemons - Favoritos'>

      {
        favoritePokemons.length === 0
        ? <NoFavorites/>
        : <PokeFavorite pokemons={ favoritePokemons }/>
      }
        

    </Layout>
  )
}

export default FavoritesPage