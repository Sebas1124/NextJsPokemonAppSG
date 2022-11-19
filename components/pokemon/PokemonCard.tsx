import { Button, Card, Col, Row, Text, useTheme } from '@nextui-org/react';
import { FC } from "react"
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'

interface Props {
  id: number,
  name: String,
  img: string
}

export const PokemonCard: FC<Props> = ({ id, name, img }) => {

  const { isDark } = useTheme();

  const router = useRouter();

  const onClick = () => {
      router.push(`/pokemon/${ id }`)
  }

  return (
    <motion.div
    >
      <Card 
        onPress={ onClick }
        isHoverable 
        isPressable 
        css={{ w: "100%", h: "400px", ds: "none" }}>
      <Card.Header 
        css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text 
            size={12} weight="bold" transform="uppercase" color={ ( isDark ) ? '#ffffffAA' : '#000' }>
            Pokémon
          </Text>
          <Text h4 color={ ( isDark ) ? '#FFF' : '#000' } style={{ textTransform: 'uppercase' }}>
            { name }
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 1 }}>
      <Card.Image
          src={ img }
          width="100%"
          height={ 440 }
          objectFit='contain'
          alt="Card Image"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: ( isDark ) ? '#2C2A29' : '#ffffff66' ,
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.4)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color={ ( isDark ) ? '#ffffffAA' : '#000' } size={12}>
              Pokémon Id
            </Text>
            <Text color={ ( isDark ) ? '#ffffffAA' : '#000' } size={18}>
              { id }
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button onPress={ onClick } flat auto rounded color="secondary">
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  Ver más
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
      </Card>
    </motion.div>
  )
}
