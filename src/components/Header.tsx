import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { toggleDarkMode } from '../features/themeSlice';

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer state
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();

  const handleToggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: 'About Me', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <AppBar position="sticky" sx={{ background: darkMode ? '#333' : '#1976d2' }}>
      <Toolbar>
        {/* Dark Mode Toggle */}
        <IconButton color="inherit" onClick={() => dispatch(toggleDarkMode())} sx={{ mr: 2 }}>
          {darkMode ? <Brightness4 /> : <Brightness7 />}
        </IconButton>

        {/* Header Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Solomon Sefiw
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {menuItems.map((item) => (
            <Button key={item.label} color="inherit" href={item.href} sx={{ fontWeight: 'bold' }}>
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Mobile Hamburger Menu */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton color="inherit" onClick={() => handleToggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => handleToggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => handleToggleDrawer(false)}
          onKeyDown={() => handleToggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component="a" href={item.href}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
