import React from 'react';
import {AppBar, Button, Menu, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
                edge="start"
                color='inherit'
                aria-label="menu"
                onClick={handleClick}
            >
              <MenuIcon/>
              <Menu open={open} />
            </IconButton>
            <Typography variant='h5'>
              Todolist
            </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>

      </>
  );
};

export default Header;