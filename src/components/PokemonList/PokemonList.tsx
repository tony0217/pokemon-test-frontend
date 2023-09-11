import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Container,
  styled,
  Grid,
  Alert,
  Box, // Importa Box para contenedor de carga
} from '@mui/material';
import ReactCardFlip from 'react-card-flip';
import { headerTextStyle } from '@styles/theme';
import pokemonImage from 'assets/icons/pokemon.svg';
import loveBall from 'assets/icons/love-ball.png';
import { getTypeColor } from '@lib/utils/get-color-type';
import { PokemonData } from '@lib/interfaces/pokemon.interfece';
import { pokemonService } from 'api/pokemon';
import { useAuthContext } from '@lib/Context/AuthContext';
import { userService } from 'api/users';
import PokeLoading from '@components/Shared/PokeLoading';

const LargerAvatar = styled(Avatar)(() => ({
  width: '100px',
  height: '100px',
}));

const LoadingContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '500px',
}));

const ScrollableContainer = styled(Box)({
  overflowY: 'scroll',
  maxHeight: '500px',
});

function PokemonList() {
  const { userInfo } = useAuthContext();
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFlip = (index: number) => {
    const newIsFlipped = [...isFlipped];
    newIsFlipped[index] = !newIsFlipped[index];
    setIsFlipped(newIsFlipped);
  };

  const addFavorite = (pokemon: PokemonData, index: number) => {
    const { id } = userInfo;
    const userId = id as string;
    const pkFavorites = [pokemon];

    userService
      .addFavorite({ userId, pokemon: pkFavorites })
      .then(() => {
        setSuccessMessage(`¡Pokémon ${pokemon.name} agregado a favoritos con éxito!`);
        setErrorMessage(null);
      })
      .catch((err) => {
        setErrorMessage(err.response?.data?.message || 'Error al Pokemon agregar a favoritos');
        setSuccessMessage(null);
      })
      .finally(() => {
        handleFlip(index);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemons: PokemonData[] = await pokemonService.getAllPokemon();
        setPokemonList(pokemons);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar la lista de Pokémon:', error);
        setIsLoading(false);
      }
    };
  
    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);
  

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ ...headerTextStyle }} align="center" gutterBottom top={0} marginBottom={10}>
        <img src={pokemonImage} alt="Pokémon" style={{ margin: '0px 10px', width: 300, height: 100, marginTop: 10 }} />
      </Typography>
      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}
      <ScrollableContainer>
        {isLoading ? (
          <LoadingContainer>
            <PokeLoading />
          </LoadingContainer>
        ) : (
          <Grid container spacing={2}>
            {pokemonList.map((pokemon, index) => (
              <Grid item xs={12} sm={6} md={4} key={pokemon.name}>
                <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
                  <div onClick={() => handleFlip(index)}>
                    <Card style={{ height: '100%', cursor: 'alias' }}>
                      <CardHeader
                        avatar={<LargerAvatar src={pokemon.image} alt={pokemon.name} />}
                        title={pokemon.name}
                        subheader={`Nº ${pokemon.number}`}
                      />
                      <CardContent style={{ paddingBottom: '12px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-10%' }}>
                          {pokemon.types.map((type) => (
                            <div
                              key={type}
                              style={{
                                backgroundColor: getTypeColor(type),
                                color: 'white',
                                borderRadius: '15px',
                                padding: '5px 10px',
                                margin: '0px 5px',
                                textTransform: 'capitalize',
                              }}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div onClick={() => addFavorite(pokemon, index)}>
                    <Card style={{ height: '100%', cursor: 'pointer' }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={loveBall} alt="Loveball" style={{ width: '40px', height: '40px' }} />
                        <Typography variant="subtitle1">Add Favorite</Typography>
                      </CardContent>
                    </Card>
                  </div>
                </ReactCardFlip>
              </Grid>
            ))}
          </Grid>
        )}
      </ScrollableContainer>
    </Container>
  );
}

export default PokemonList;
