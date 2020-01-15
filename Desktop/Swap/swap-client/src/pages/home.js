import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../App.css'

//MUI
import Grid from '@material-ui/core/Grid'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
    buttonContainer: {
        margin: "80px auto 60px auto",
        color: "rgba(190, 172, 105, 0.42)"
    },
    pageContainer: {
        margin: "60px auto auto auto"
    }

}

class home extends Component {


    render() {
        const {classes} = this.props
        return (
            <Grid container className = {classes.pageContainer} direction ="row" justify="center" alignItems="center">
                <Typography variant="h2">Welcome to Swap!</Typography>

                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
                > 
                <Grid container justify="center" className={classes.buttonContainer}>
                    <ButtonGroup orientation = "horizontal" aria-label="vertical primary button group">
                    <Link to = '/park'><Button fullWidth = {true} variant = 'contained'><Typography variant = "h5">Find Parking</Typography></Button></Link>
                    <Link to = '/leave'><Button fullWidth = {true} variant = 'contained'><Typography variant = "h5">Leaving Spot</Typography></Button></Link>
                    </ButtonGroup>
                </Grid>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Typography variant="h6"><Link to = '/login'>Login</Link></Typography>
                    <Typography variant="h6"><Link to = '/signup'>Create an Account</Link></Typography>
                </Grid>

            </Grid>
        )
    }
}

home.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(home)
