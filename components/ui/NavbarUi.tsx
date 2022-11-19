import { Link, Spacer, Switch, Text, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import NextLink from 'next/link'

import { SunIcon, MoonIcon } from './icons';

import Image from 'next/image';

export const NavbarUi = () => {

    const { isDark, type } = useTheme();
    const { setTheme } = useNextTheme();


  return (
    <div style={{ 
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'start',
        padding: '0px 20px',
        backgroundColor: ( isDark ) ? '#16181A' : '#FFF' 
     }}>


       <NextLink href='/' passHref legacyBehavior>
          <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer' }}>
            <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png"
                alt='Logo'
                width={ 70 }
                height={ 70 }
                priority
            />
            <Text color={ (isDark) ? 'white' : 'black' } h2>P</Text>
            <Text color={ (isDark) ? 'white' : 'black' } h3>okémon</Text>
          </div>
       </NextLink>
       
       <Spacer css={{ flex: 1 }}/>
       
      <NextLink href='/favorites' passHref legacyBehavior>
          <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', cursor: 'pointer' }}>
            <Text color={ (isDark) ? 'white' : 'black' } h3>Favoritos</Text>
          </div>
      </NextLink>

       <span style={{ marginLeft: 20, marginRight: 10 }}>Tema: { type === 'dark' ? 'Oscuro' : 'Claro' } </span>
       <Switch
        iconOn={<SunIcon filled />}
        iconOff={<MoonIcon filled />}
        color='secondary'
        checked={ isDark }
        onChange={ (e) => setTheme( e.target.checked ? 'dark' : 'light' ) }
      />
    
    </div>
  )
}
