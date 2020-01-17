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


///Map imports
import mapboxToken from '../components/maps'
import ReactMapGL from 'react-map-gl'

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
        width: '50%'
    },
    formElements: {
        width: '75%',
        marginLeft: '15%',
        marginRight: '15%',
        marginBottom: '10px'
    },
}

class park extends Component {
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
            flexibility: '',
            userLocation: '' //Add something to get user location

        }
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
   

    render() {
        const {classes} = this.props
        const {errors} = this.state
        return (
            <Grid container spacing={5} direction='column' alignItems='center'sm>
                <Grid className={classes.title} item container direction="row" justify='center'><Typography variant='h2'>Parking</Typography></Grid>
                <Grid container item sm className={classes.formContainer} direction="row" alignItems='center' justify='center'>
                        <form noValidate className={classes.form} onSubmit={this.handleSubmit} >
                            <Typography className={classes.formElements} variant='subtitle1'>When are you parking?</Typography>
                            <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label=""
                            value={this.state.time}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }} className={classes.formElements}
                            fullWidth
                            />
                            <br />
                            <TextField error={errors.flexibility ? true : false} helperText={errors.flexibility} id='text' name='flexibility' type='text' value ={this.state.flexibility} className={classes.formElements} label= 'Flexibility' onChange={this.handleChange} fullWidth/>
                            <br />
                            <Button variant="contained" type = 'submit' disabled = {this.state.loading} className={classes.formElements}>
                                Submit
                            </Button>
                        </form>
                </Grid>
                <Grid container item direction="row" justify='center'>
                        <ReactMapGL className='map' mapStyle="mapbox://styles/jerikjakobsen/ck5ezw40x06vp1imw51q8dw8t" {...this.state.viewport} mapboxApiAccessToken={mapboxToken} onViewportChange={viewport => this.setState({viewport})} />
                </Grid>
                
            </Grid>

        )
    }
}

export default withStyles(styles)(park)
