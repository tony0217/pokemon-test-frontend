import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Badge,
  Grid,
  Container,
  styled,
  Stack,
  Box,
} from '@mui/material';
import { headerTextStyle } from '@styles/theme';
import { userService } from 'api/users';
import PokeLoading from '@components/Shared/PokeLoading';

interface UserData {
  id: number;
  fullName: string;
  email: string;
  isActive: boolean;
  roles: string[];
}

const RoleBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'isAdmin',
})<{ isAdmin: boolean }>(({ theme, isAdmin }) => ({
  backgroundColor: !isAdmin ? theme.palette.primary.main : theme.palette.secondary.main,
  color: 'white',
  marginLeft: 4,
}));

const LoadingContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '500px',
}));

function UserList() {
  const [userList, setUserList] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await userService.getAllUser()
        setUserList(users);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar la lista de usuarios:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ ...headerTextStyle }} align="center" gutterBottom top={0} marginBottom={10}>
        Lista de Usuarios
      </Typography>
      {isLoading ? (
        <LoadingContainer>
           <PokeLoading />
        </LoadingContainer>
      ) : (
        <div style={{ overflowY: 'auto', maxHeight: '550px' }}>
          <Grid container spacing={3}>
            {userList.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.email}>
                <Card style={{ height: '100%' }}>
                  <CardHeader
                    avatar={
                      <Avatar>
                        {user.fullName[0].toUpperCase()}
                      </Avatar>
                    }
                    title={user.fullName}
                    subheader={user.email}
                  />
                  <CardContent style={{ paddingBottom: '16px', display: 'flex', flexDirection: 'column' }}>
                    {user.isActive ? (
                      <Stack direction="row" flexDirection='row' alignItems="center">
                        <Typography color="textSecondary" fontWeight="bold" >Estado:</Typography>
                        <Badge sx={{ ml: 4 }} color="success" badgeContent="Activo" />
                      </Stack>
                    ) : (
                      <Stack direction="row" flexDirection='row' alignItems="center">
                        <Typography color="textSecondary" fontWeight="bold">Estado:  </Typography>
                        <Badge sx={{ ml: 4 }} color="error" badgeContent="Inactivo" />
                      </Stack>
                    )}
                    <div style={{ flex: 1 }}></div>
                    <Stack direction="row" flexDirection='row' alignItems="center">
                      <Typography color="textSecondary" fontWeight="bold">Roles</Typography>
                      <RoleBadge
                        color={`${!user.roles.includes('admin') ? 'primary' : 'secondary'}`}
                        badgeContent={user.roles.join(', ')}
                        isAdmin={user.roles.includes('admin')}
                        sx={{ ml: 4 }}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
}

export default UserList;
