import React from 'react'
import { Link } from 'react-router-dom';
import {Box, Drawer, List, ListItem, ListItemButton} from '@mui/material/';
import ListItemText from '@mui/material/ListItemText';

class Layout extends React.Component {
    toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ ...this.state, [anchor]: open });
    };
    render() {
        let menuFlag = this.props.menuFlag;
        let handleClick = this.props.handleClick;
        let changeUrl = this.props.changeUrl;
        return (
          <div>
            <Drawer
                anchor="left"
                open={menuFlag}
                onClose={handleClick}
            >
                <Box
                sx={{ width: 250, height:'100%' }}
                role="presentation"
                onClick={handleClick}
                onKeyDown={handleClick}
                >
                    <List>
                        <Link onClick={changeUrl} to="/">
                            <ListItem disablePadding >
                                <ListItemButton>
                                    <ListItemText primary="Dashboard" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link onClick={changeUrl} to="/files">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="File" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link onClick={changeUrl} to="/indices">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText>Index</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link onClick={changeUrl} to="/video">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText>Video</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link onClick={changeUrl} to="/setting">
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText>Setting</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </Box>
            </Drawer>
            {/* <Grid container
				direction="row"
				justifyContent="flex-start"
				alignItems="flex-start">
                <Slide appear={false} direction="right" in={menuFlag}>
                    <Paper sx={{ width: '100%', maxWidth: '100%', height:700 }}>
                        <nav>
                            <MenuList>
                                <Link to="/">
                                    <MenuItem>
                                        <ListItemText>Dashboard</ListItemText>
                                    </MenuItem>
                                </Link>
                                <Link to="/files">
                                    <MenuItem>
                                        <ListItemText>File</ListItemText>
                                    </MenuItem>
                                </Link>
                                <Link to="/indices">
                                    <MenuItem>
                                        <ListItemText>Index</ListItemText>
                                    </MenuItem>
                                </Link>
                                <Link to="/video">
                                    <MenuItem>
                                        <ListItemText>Video</ListItemText>
                                    </MenuItem>
                                </Link>
                            </MenuList>
                        </nav>
                    </Paper>
                </Slide>
            </Grid> */}
          </div>
        );
    }
}

export default Layout;