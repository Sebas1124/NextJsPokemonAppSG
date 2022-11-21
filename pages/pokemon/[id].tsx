import { useEffect, useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Text, Image, useTheme, Progress } from '@nextui-org/react';

import { Layout } from "../../components/layouts"
import { HeartIcon } from '../../components/ui/icons/HeartIcon';
import { LocalFavorites } from '../../utils';
import { motion } from 'framer-motion';
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import confetti from 'canvas-confetti';

interface Props {
  pokemon: Pokemon;
  image: string;
}

const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ['star'],
  colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
};

const PokemonPage: NextPage<Props> = ({ pokemon, image }) => {

  const formatter = new Intl.NumberFormat();

  const [ isInFavorites, setIsInFavorites ] = useState(false)

  const addFavorites = () => {
    LocalFavorites.toggleFavorite( pokemon.id )
    setIsInFavorites( !isInFavorites );

    if ( isInFavorites ) return;

    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star']
    });
  
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    });
    
  };

  useEffect(() => {
    setIsInFavorites( LocalFavorites.existsInFavorites( pokemon.id ) );
  }, [])
  


  const { isDark } = useTheme();


  return (
    <Layout title={ `Pokemon ${ pokemon.name }` } idPokemon={ pokemon.id }>
      <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
        {/* Pokemon Image Left */}
        <Grid xs={ 12 } sm={ 4 } xl={ 4 }>
          <Card isHoverable css={{ padding: '30px', maxHeight: 330, ds: "none" }}>
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1, y: 20 }}
            transition={{
              default: {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01]
              },
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          >
              <Card.Body>
                  <Card.Image
                    alt={ pokemon.name }
                    src={ image || 'No-Image.png' }
                    width='100%'
                    height={ 200 }
                    />
              </Card.Body>
          </motion.div>
          </Card>
        </Grid>

        {/* Pokemon Info */}
        <Grid xs={ 12 } sm={ 8 }>
            <Card>
              <Card.Header css={{ display: 'flex', justifyContent: 'space-between', marginLeft: 7, flexDirection: 'column' }}>
                <motion.div
                animate={{ rotate: 360 }}
                transition={{ type: 'spring', stiffness: 50 }}
                >
                  <Text 
                    h1 
                    transform='capitalize' 
                    css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    }}>
                    { pokemon.name }
                  </Text>
                </motion.div>
                <Button
                  auto
                  rounded
                  onPress={ addFavorites }
                  ripple={ false }
                  size="xl"
                  icon={<HeartIcon fill="currentColor" filled />}

                  css={{
                    background: ( isInFavorites ? ( !isDark ) ? '#F31260' : '#F31260' : ( !isDark ) ? '#F31260' : '#9A5CDC' ),
                    fontWeight: '$semibold',
                    boxShadow: '$md',
                    position: 'relative',
                    overflow: 'visible',
                    color: isDark ? '$white' : '$red',
                    px: '$18',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      background: isDark ? '$black' : '$white',
                      color: isDark ? '$white' : '$dark',
                      opacity: 1,
                      borderRadius: '$pill',
                      transition: 'all 0.4s ease'
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      '&:after': {
                        transform: 'scaleX(1.5) scaleY(1.6)',
                        opacity: 0
                      }
                    },
                    '&:active': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Text h5>{ (!isInFavorites) ? 'Agregar a Favoritos' : 'Eliminar de favoritos' }</Text>
                </Button>
              </Card.Header>

              <Card.Body css={{ marginLeft:10 }}>
                    <Text h5>Peso: { formatter.format((pokemon.weight * 100)/1000) } Kg</Text>
                    <Text h5>Altura: { pokemon.height } feet</Text>

                    <Text h5>Estadisticas: </Text>
                    <Container display='flex' justify='space-evenly' css={{ marginBottom:10 }}>
                      <motion.div 
                        className="box"
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 0.8, y: 10 }}
                        transition={{
                          default: {
                            duration: 0.3,
                            ease: [0, 0.71, 0.2, 1.01]
                          },
                          scale: {
                            type: "spring",
                            damping: 3,
                            stiffness: 100,
                            restDelta: 0.001
                          }
                        }}
                        style={{ position: 'relative' }}>
                      <Image alt='Pokémon abilities Image' width={ 250 } src={ pokemon.sprites.other?.dream_world.front_default || 'No-Image.png' }/>
                      </motion.div>
                      <div style={{ textAlign: 'center', width: 500 }}>
                      {
                        pokemon.stats.map( ( { stat, base_stat } ) => (
                          <Grid.Container gap={ 1 } key={ stat.name }>
                            <Grid xs={ 6 }>
                              <Progress shadow color={ ( isDark ) ? 'gradient' : 'error' } value={ base_stat } />
                            </Grid>
                            <Grid xs={ 6 } css={{ placeContent: 'center' }}>
                              <Text transform='uppercase'> <strong>{ base_stat }</strong> { stat.name }</Text>
                            </Grid>
                          </Grid.Container>
                        ))
                      }
                      </div>
                    </Container>

                    <Text h5>Movimientos: </Text>
                    <Container display='flex' justify='space-between' css={{ marginBottom:10 }}>
                      {
                        pokemon.moves.map( ( { move } ) => (
                          <Text key={ move.name } >{ move.name }, </Text>
                        ))
                      }
                    </Container>

                    <Text h5>Habilidades: </Text>
                    <Container justify='space-around' display='flex'>
                      { pokemon.abilities.map( ({ ability }) => (
                          <Text key={ ability.name }>{ ability.name }</Text>
                        )) 
                      }
                    </Container>

                    <Text size={ 30 }>Sprites: </Text>
                    <Container direction='row' display='flex' gap={ 1 }>
                      <Image 
                        src={ pokemon.sprites.front_default } 
                        alt={ pokemon.name }
                        width={ 100 }
                        height={ 100 }
                      />
                      <Image 
                        src={ pokemon.sprites.back_default } 
                        alt={ pokemon.name }
                        width={ 100 }
                        height={ 100 }
                      />
                      <Image 
                        src={ pokemon.sprites.front_shiny } 
                        alt={ pokemon.name }
                        width={ 100 }
                        height={ 100 }
                      />
                      <Image 
                        src={ pokemon.sprites.back_shiny } 
                        alt={ pokemon.name }
                        width={ 100 }
                        height={ 100 }
                      />
                    </Container>

              </Card.Body>

            </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map( (value, index) => `${ index + 1 }`);

  return {
    paths: pokemons151.map( id => ({
        params: { id }
      })
    ),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string };

  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ id }`);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`
    
    return {
      props: {
        pokemon: data,
        image
      },
      revalidate: 86400,
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }


}

export default PokemonPage