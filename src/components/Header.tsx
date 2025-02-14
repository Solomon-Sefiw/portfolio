import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Fab, // Floating Action Button for mobile
  Tooltip
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  AccountCircle, // Profile Icon
  Work,          // Projects Icon
  Phone,
  PinDropRounded,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { toggleDarkMode } from '../features/themeSlice';

const Header: React.FC = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();

  const menuItems = [
    { label: 'About Me', href: '#about', icon: <AccountCircle /> },
    { label: 'Skills', href: '#skills', icon: <Work /> },
    { label: 'Projects', href: '#projects', icon: <PinDropRounded /> },
    { label: 'Contact', href: '#contact', icon: <Phone /> },
  ];

  return (
    <>
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

          {/* Mobile Profile Icon (Instead of the Hamburger Menu) */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Floating Action Buttons */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: { xs: 'block', md: 'none' }, // Only for mobile
          zIndex: 1000, // To ensure buttons stay on top
          width: '100%',
          textAlign: 'center',
        }}
      >
        {menuItems.map((item) => (
          <Tooltip key={item.label} title={`Go to ${item.label}`} arrow>
            <Fab
              color="primary"
              size="small"
              sx={{
                position: 'relative',
                margin: '0 10px',
                bottom: 10,
                display: 'inline-block',
              }}
              component="a"
              href={item.href}
            >
              {item.icon}
            </Fab>
          </Tooltip>
        ))}
      </Box>
    </>
  );
};

export default Header;
