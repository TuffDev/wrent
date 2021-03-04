import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WrentLogo from './wrentLogo';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    div: {
        margin: '10%',
    },
}));

export default function AfterReturnCode() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <WrentLogo />


                <form className={classes.form} noValidate>
                    <Typography component="h1" variant="h5">
                        Password Assistance Return Code
        </Typography>
                    <Typography component="h1" variant="h5">

                    </Typography>
                    <div>&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;</div>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="VerificationCode"
                            label="Verification Code"
                            type="password"
                            id="verificationncode"
                            autoComplete="verification-code"
                        />
                    </Grid>
                    <div>&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;</div>
                    <Typography component="h1" variant="h5">
                        Password Return Here:
        </Typography>
                    <div>&nbsp;&nbsp;</div>
                    <span>Section: </span>
                    <div>&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;</div>

                    <div>&nbsp;&nbsp;</div>
                    <Grid item xs>
                        <Button
                            href="/login"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Back To sign In
          </Button>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}