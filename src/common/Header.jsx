import React, { Component } from 'react';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    menuButton: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    account: {
        marginRight: theme.spacing(1),
    }
})
class Header extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.props.checkout}
                <Grid container>
                    <div className={classes.root}>
                        <AppBar position="relative" style={{ background: '#263238' }} >
                            <Toolbar>
                                <Grid>
                                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                        <FastfoodRoundedIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item >
                                    <IconButton edge="end" className={classes.menuButton} aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                                        <AccountCircle className={classes.account} />
                                        <Typography className={classes.title} variant="subtitle1" noWrap>
                                            Harika
                                        </Typography>
                                    </IconButton>

                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </div>
                </Grid>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(Header)