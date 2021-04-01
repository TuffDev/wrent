import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import WrentLogo from './wrentLogo';
import { useState, useEffect } from 'react'
import AfterReturnCode from './AfterReturnCode';
import ImageUploader from 'react-images-upload';
import { getUser } from '../helpers/UserController';
import Authorization from './Authorization';
import { postLocation } from '../helpers/LocationController';
import { postItem } from '../helpers/ItemController';
import { postImage } from '../helpers/ImageController';
import { postTag } from '../helpers/TagController';
import { postTagItem } from '../helpers/TagItemController';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "80%",
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(6),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    description: {
        width: '50%',
        marginTop: theme.spacing(3),
    },
    imageContainer: {
        width: '50%',
        maxHeight: '300px',
        marginTop: theme.spacing(3),
    },
    image: {
        maxHeight: '300px'
    },
    ownerData: {
        maxHeight: '300px',
        width: '50%'
    },
    rentButton: {
        width: '12%',
        height: '50px'
    },
    leftCol: {
        maxHeight: '300px',
        width: '50%'
    },
    rightCol: {
        width: '50%',
        maxHeight: '300px',
    },
    reviwplaceholder: {
        width: '50%',
        height: '300px',
    },
}));


export default function AddItem() {

    const classes = useStyles();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");

    var id = null;
    var url = null;

    useEffect(async () => {
        const res = await getUser();
        setUser(res['id']);
    }, [])

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !description) {
            alert('One of the required fields is empty');
        } else {
            geocode().then(
                async (res) => {
                    if (res != "NO_POST") {
                        await postImage(user, image).then(
                            async (res) => {
                                await postItem(id, user, name, description, res, 1).then((res) => {
                                    if (res['statusCode'] != 201) {
                                        alert("Unable to post item.")
                                    }
                                    return res
                                }).then(async (res) => { await postTags(res) })
                            })
                    }
                })
        }
    }

    const postTags = async (item) => {
        tags.map((tag, i) => {
            postTag(tag.name).then(async (res) => { await postTagItem(item.data, res.data) })
        })
    }

    const geocode = async () => {
        const res = await postLocation(location);
        if (res != "ZERO_RESULTS") {
            id = res;
            return "OK"
        } else {
            alert("Location does not exist.");
            return "NO_POST"
        }
    }

    return (
        <Authorization>
            <Grid Container component="main" direction="row" alignContent="center" alignItems="center" justify="center">
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Post Item for Rent
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField onChange={handleNameChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField onChange={handleDescriptionChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="description"
                            autoFocus
                        />
                        <TextField onChange={handleLocationChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="location"
                            label="Location"
                            name="location"
                            autoComplete="location"
                            autoFocus
                        />
                        <br />
                        <br />
                        <div>
                            <TextField onChange={(event) => { setTag(event.target.value) }} />
                        &nbsp;
                        &nbsp;
                        <Button onClick={() => {
                                setTags([...tags, { 'name': tag }])
                            }}>Add Tag</Button>
                        </div>
                        <br />
                        <br />
                        <div>
                            {tags.map((tag, i) => (
                                <div>
                                    <text value={tag.id}>
                                        {tag.name}
                                    </text>
                                    &nbsp;
                                    &nbsp;
                                    <Button onClick={() => { setTags(tags.filter((t) => t.name !== tag.name)) }} size="small" color="secondary">Delete</Button>
                                    <br />
                                </div>
                            ))}
                        </div>
                        <br />
                        <br />
                        <input type="file" style={{ fontSize: '24px', marginLeft: '525px', marginRight: '10px', }}
                            name="file"
                            placeholder="Upload an image"
                            onChange={handleImageChange} />
                        <br />
                        <br />
                        <div style={{ marginLeft: '625px' }}>
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                minWidth="50%"
                                center

                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Post
                    </Button>
                        </div>
                    </form>
                </Paper>
            </Grid>
        </Authorization >
    );
}