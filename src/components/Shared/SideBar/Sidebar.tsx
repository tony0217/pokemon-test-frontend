import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  styled,
  Hidden,
  IconButton,
  Toolbar,
  Button,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import pokeBall from 'assets/icons/Pokeball.png';
import loveBall from 'assets/icons/love-ball.png';
import profile from 'assets/icons/red.jpeg';
import listUser from 'assets/icons/list-trainers.png';
import { useAuthContext } from '@lib/Context/AuthContext';

const drawerWidth = 240;

const SidebarWrapper = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  },
}));

const AvatarImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  margin: '0 auto',
  marginTop: theme.spacing(2),
}));

const Username = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(1),
}));

const Sidebar = () => {
  const location = useLocation();
  const { userInfo, isAuthenticated } = useAuthContext();

  const menuOptions = [
    { text: 'Lista de Usuarios', path: '/user-list', icon: listUser },
    { text: 'Lista de Pokémon', path: '/pokemon-list', icon: pokeBall },
    { text: 'Mis Pokémon Favoritos', path: '/pokemon-favorites', icon: loveBall },
  ];

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = showSidebar ? 'hidden' : 'auto';
    }
  }, [showSidebar]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (!isAuthenticated || !menuOptions.some((option) => location.pathname === option.path)) {
    return null;
  }

  return (
    <div>
      <Hidden mdUp>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Abrir menú"
            onClick={toggleSidebar}
            edge="start"
            sx={{ marginRight: '10px' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userInfo.fullName}
          </Typography>
        </Toolbar>
      </Hidden>

      <Hidden smDown>
        <SidebarWrapper variant="permanent" open={showSidebar}>
          <AvatarImage src={profile} alt={'profile'} />
          <Username variant="h6">{userInfo.fullName}</Username>
          <List>
            {menuOptions.map((option) => (
              <Link to={option.path} key={option.text} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem button selected={location.pathname === option.path}>
                  <ListItemIcon>
                    <Avatar src={option.icon} alt={option.text} />
                  </ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItem>
              </Link>
            ))}
            <ListItem>
              <Button variant="outlined" onClick={handleLogout} fullWidth>
                Logout
              </Button>
            </ListItem>
          </List>
        </SidebarWrapper>
      </Hidden>
    </div>
  );
};

export default Sidebar;
