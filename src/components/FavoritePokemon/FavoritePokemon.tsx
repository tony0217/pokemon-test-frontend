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
  Box,
  Button,
} from '@mui/material';
import { headerTextStyle } from '@styles/theme';
import { getTypeColor } from '@lib/utils/get-color-type';
import { PokemonData } from '@lib/interfaces/pokemon.interfece';
import pokemonImage from './../../assets/icons/pokemon.svg';
import { useAuthContext } from '@lib/Context/AuthContext';
import { userService } from '@api/users';
import PokeLoading from '@components/Shared/PokeLoading';

const LargerAvatar = styled(Avatar)(() => ({
  width: '100px',
  height: '100px',
  marginRight: '20px',
}));

const RemoveButton = styled(Button)<any>(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: theme.palette.error.main,
  color: 'white',
  zIndex: 1,
}));

const TypeBadge = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '15px',
  textTransform: 'capitalize',
  maxWidth: 'fit-content',
  padding: '5px 10px',
  margin: '0px 5px',
}));

const ScrollableContainer = styled(Box)(() => ({
  overflowY: 'auto',
  maxHeight: '500px',
}));

const LoadingContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '500px', // Altura mínima para centrar verticalmente
}));

function FavoritesPokemon() {
  const { userInfo } = useAuthContext();
  const [favoriteUsers, setFavoriteUsers] = useState<PokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const removeFavorite = (pokemon: PokemonData) => {
    const numberPokemon = pokemon.number.toString()
    userService
      .removeFavorite(userInfo.id, numberPokemon)
      .then(() => {
        setSuccessMessage(`¡Pokémon ${pokemon.name} removido de favoritos`);
        setErrorMessage(null);

        setFavoriteUsers((prevFavoriteUsers) =>
          prevFavoriteUsers.filter((favPokemon) => favPokemon.number !== pokemon.number)
        );
      }).catch(err => {
        setErrorMessage(err.response?.data?.message || 'Error al Pokemon agregar a favoritos');
        setSuccessMessage(null);
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { pokemon: pkFavorites } = await userService.getFavoriteByUser()
        setFavoriteUsers(pkFavorites);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar la lista de Pokémon:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userInfo.id]);

  return (
    <Container maxWidth="md">
      {favoriteUsers.length > 0 &&
        <Typography variant="h4" sx={{ ...headerTextStyle }} align="center" gutterBottom top={0} marginBottom={10}>
          <img src={pokemonImage} alt="Pokémon" style={{ margin: '0px 10px', width: 300, height: 100, marginTop: 10 }} /> Favoritos
        </Typography>}
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
      {isLoading ? (
        <LoadingContainer>
          <PokeLoading />
        </LoadingContainer>
      ) : (
        <ScrollableContainer>
          <Grid container spacing={2}>
            {favoriteUsers.length > 0 ?
              (favoriteUsers.map((pokemon) => (
                <Grid item xs={12} key={pokemon.number}>
                  <Card style={{ display: 'flex', alignItems: 'center', padding: '20px', position: 'relative' }}>
                    <LargerAvatar src={pokemon.image} alt={pokemon.name} />
                    <CardContent style={{ flex: 1 }}>
                      <CardHeader
                        title={pokemon.name}
                        subheader={`Nº ${pokemon.number}`}
                      />
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {pokemon.types.map((type) => (
                          <TypeBadge key={type} style={{ backgroundColor: getTypeColor(type) }}>{type}</TypeBadge>
                        ))}
                      </div>
                    </CardContent>
                    <RemoveButton
                      aria-label="Remover"
                      size="small"
                      onClick={() => removeFavorite(pokemon)}
                    >
                      Eliminar
                    </RemoveButton>
                  </Card>
                </Grid>
              ))) : (
                <Typography variant="h4" sx={{ ...headerTextStyle, marginLeft: 10, marginTop: 10 }} textAlign="center" align="center" gutterBottom top={0} marginBottom={10}>
                  No tiene <img src={pokemonImage} alt="Pokémon" style={{ margin: '0px 10px', width: 300, height: 100, marginTop: 10 }} /> favoritos
                </Typography>
              )}
          </Grid>
        </ScrollableContainer>
      )}
    </Container>
  );
}

export default FavoritesPokemon;
