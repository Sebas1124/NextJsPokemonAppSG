import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { NavbarUi } from '../ui';

type Props = {
  children: ReactNode,
  title?: string,
  idPokemon?: number
}

export const Layout: FC<Props> = ({ children, title, idPokemon }) => {
  return (
    <>
        <Head>
            <title>{ title || 'PokemonApp' }</title>
            <meta name='author' content='Sebastián Rosero López'/>
            <meta name='description' content='Informacion sobre el pokémon XXXX'/>
            <meta name='keywords' content='XXXX, pokemon, Pokedex'/>

            <meta property="og:title" content={`Informacion sobre ${ title }`} />
            <meta property="og:description" content={`Esta es la pagina sobre el Pokémon ${ title }`} />
            <meta property="og:image" content={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ idPokemon }.png`} />
        </Head>

        <NavbarUi/>

        <main style={{ 
          padding: '0px 20px'
         }}>
            { children }
        </main>
    </>
  )
}
