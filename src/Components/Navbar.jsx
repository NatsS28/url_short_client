import React, { useState } from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GitHubIcon from "@material-ui/icons/GitHub";
import '../Styles/Navbar.css';
function Navbar() {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
  return (
      <div className='nav_root'>
          <AppBar position="static" style={{ background: '#FF0000' }}>
              <Toolbar>
                  <Typography variant='h6' className='title'>
                      Shortner
                  </Typography>
                  <Tooltip title="Source Code">
                      <IconButton
                          aria-label="view source code"
                          aria-controls="open source code menu"
                          aria-haspopup="true"
                          onClick={handleClick}
                          color="inherit"
                      >
                          <CodeIcon />
                      </IconButton>
                  </Tooltip>
                  <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                  >
                      <Link
                          href=""
                          target="_blank"
                          rel="noreferrer"
                          className='link'
                          color="inherit"
                      >
                          <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                  <GitHubIcon />
                              </ListItemIcon>
                              <ListItemText primary="Frontend" />
                          </MenuItem>
                      </Link>
                      <Link
                          href=""
                          target="_blank"
                          rel="noreferrer"
                          className="link"
                          color="inherit"
                      >
                          <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                  <GitHubIcon />
                              </ListItemIcon>
                              <ListItemText primary="Backend" />
                          </MenuItem>
                      </Link>
                </Menu>
              </Toolbar>

          </AppBar>
    </div>
  )
}

export default Navbar