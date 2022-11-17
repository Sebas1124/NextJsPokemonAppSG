import { NextPage, GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';
import { motion } from 'framer-motion'

import { pokeApi } from './../api';
import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon/PokemonCard';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <motion.div
    animate={{ y: [0, 100, 0], opacity: 1 }}
    initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    >
      <Layout title='Listado de Pokémons'>

          <Grid.Container gap={ 2 } justify='flex-start'>
            {
              pokemons.map( ({ id, name, img }) => (
                <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 2 } key={ id }>
                  <motion.div
                  initial={{ opacity: 0.6 }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: .4 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  whileInView={{ opacity: 1 }}
                  >
                    <PokemonCard id={ id } name={ name } img={ img }/>
                  </motion.div>
                </Grid>
              ))
            }
          </Grid.Container>
        
      </Layout>
    </motion.div>

  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map( (poke, i)  => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ i + 1 }.png`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
