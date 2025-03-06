import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  AccountCircle,
  Work,
  Phone,
  Edit,
  Logout,
  DownhillSkiing,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { toggleDarkMode } from '../features/themeSlice';

const Header: React.FC = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const menuItems = [
    { label: 'About Me', href: '#about', icon: <AccountCircle /> },
    { label: 'Skills', href: '#skills', icon: <DownhillSkiing /> },
    { label: 'Projects', href: '#projects', icon: <Work /> },
    { label: 'Contact', href: '#contact', icon: <Phone /> },
  ];

  const handleProfileToggle = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <>
      {/* Top App Bar */}
      <AppBar position="sticky" sx={{ background: darkMode ? '#333' : '#1976d2' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => dispatch(toggleDarkMode())} sx={{ mr: 2 }}>
            {darkMode ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Solomon Sefiw
          </Typography>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {menuItems.map((item) => (
              <Button key={item.label} color="inherit" href={item.href} sx={{ fontWeight: 'bold' }}>
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Profile Icon */}
          <IconButton color="inherit" onClick={handleProfileToggle}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Bottom Navigation for Mobile only */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          showLabels
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: darkMode ? '#333' : '#fff',
            boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
          }}
        >
          {menuItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
              sx={{
                color: darkMode ? '#fff' : '#1976d2',
                '&.Mui-selected': {
                  color: darkMode ? '#90caf9' : '#0d47a1', // Highlight selected item
                  fontWeight: 'bold',
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Box>

      {/* Right Sidebar for Profile */}
      <Drawer anchor="right" open={isProfileOpen} onClose={handleProfileToggle}>
        <List sx={{ width: 250 }}>
          <ListItemButton disableRipple>
            <Typography variant="h6" fontWeight="bold">
              Profile Settings
            </Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
