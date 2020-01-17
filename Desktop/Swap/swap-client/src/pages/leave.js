import React, { Component } from 'react'
import '../App.css'

//MUI Imports 
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import 'date-fns'
import {KeyboardTimePicker} from '@material-ui/pickers'
import Slider from '@material-ui/core/Slider';


///Map imports
import mapboxToken from '../components/maps'
import ReactMapGL, {Marker} from 'react-map-gl'

const marks = [
    {
        value: 0,
        label: 'No Flexibility'
    },
    {
        value: 5,
        label: '5 Minutes'
    },
    {
        value: 10,
        label: '10 Minutes'
    },
    {
        value: 15,
        label: '15 Minutes'
    }

]

const styles = {
    title: {
        marginTop: '5%',
        marginBottom: '10%'
    },
    form: {
        width: '100%',
        justify: 'center',
        alignItems: 'center'
    },
    formContainer: {
        backgroundColor: '#f1f1f5',
        borderRadius: '15px',
        boxShadow: '0px 0px 50px 3px rgba(0,0,0, 1)',
        width: '50%',
        marginBottom: '10%'
    },
    formElements: {
        width: '75%',
        marginBottom: '5%'
    },
    formButton: {
        width: '75%',
        marginBottom: '10px',
        marginTop: '15%'
    },
    mapElement : {
        marginBottom: '5%'
    },
    
}

class leave extends Component {
    constructor() {
        super()
        this.state = {
            viewport: {
                width: 400,
                height: 400,
                latitude: 40.818090964234095,
                longitude: -73.95121144190593,
                zoom: 15,
            },
            errors: {},
            loading: '',
            time: null,
            flexibility: [0,15],
            userLocation: '' //Add something to get user location

        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState(prevState => {
                const coords = {...prevState.viewport};
                coords.latitude = position.coords.latitude;
                coords.longitude = position.coords.longitude
                return { viewport: coords }
            })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('Submit!')
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDateChange = (time) => {
        this.setState({
            time
        })
    }

    valueLabelFormat = value => {
        return marks.findIndex(mark => mark.value ===value) + 1;
    }

    valueText = value => {
        return `${value} Minutes`
    }
   

    render() {
        const {classes} = this.props
        const {errors} = this.state
        return (
            <Grid container spacing={5} direction='column' justify='center' alignItems='center'sm>
                <Grid className={classes.title} item container direction="row" justify='center'><Typography variant='h2'>Leaving</Typography></Grid>
                <Grid container  item sm className={classes.formContainer} alignItems='center' justify='center'>
                        <form noValidate className={classes.form} onSubmit={this.handleSubmit} >
                            <Grid container item justify='center' alignItems='center'>
                            <Typography variant='h6'>When are you leaving?</Typography>
                            <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label=""
                            value={this.state.time}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }} className={classes.formElements}
                            />
                            <Grid container item justify='center' className={classes.formElements} >
                                <Typography className={classes.mapElement} variant='h6' >Whats your flexibility?</Typography>
                                <Slider
                                    defaultValue={5}
                                    getAriaValueText={this.valueText}
                                    valueLabelDisplay="auto"
                                    step={5}
                                    marks
                                    min={0}
                                    max={15}
                                />
                            </Grid>
                                <Typography className={classes.mapElement} variant='h6'>Where are you parked?</Typography>
                                <ReactMapGL className='map' mapStyle="mapbox://styles/jerikjakobsen/ck5ezw40x06vp1imw51q8dw8t" {...this.state.viewport} mapboxApiAccessToken={mapboxToken} onViewportChange={viewport => this.setState({viewport})}> 
                                    <Marker latitude={this.state.viewport.latitude} longitude={this.state.viewport.longitude}>
                                        <img className = 'mapBoxMarker' src = 'mapBoxMarker.jpg' alt = 'Marker'/>
                                    </Marker>
                                </ReactMapGL>
                            <Button variant="contained" type = 'submit' disabled = {this.state.loading} className={classes.formButton}>
                                Submit
                            </Button>
                            </Grid>
                        </form>
                </Grid>

                
            </Grid>

        )
    }
}

export default withStyles(styles)(leave)
