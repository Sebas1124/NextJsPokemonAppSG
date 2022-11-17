import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { NavbarUi } from '../ui';

type Props = {
  children: ReactNode,
  title?: string
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{ title || 'PokemonApp' }</title>
            <meta name='author' content='Sebastián Rosero López'/>
            <meta name='description' content='Informacion sobre el pokémon XXXX'/>
            <meta name='keywords' content='XXXX, pokemon, Pokedex'/>
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
