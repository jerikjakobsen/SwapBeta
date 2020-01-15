import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

//MUI Imports
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
    formContainer: {
        backgroundColor: '#f1f1f5',
        borderRadius: '15px',
        boxShadow: '0px 0px 50px 3px rgba(0,0,0, 1)',
        width: '50%',

    },
    heading: {
        paddingTop: '50px',
        paddingBottom: '50px'
    },
    formElements: {
        width: '75%',
        marginLeft: '15%',
        marginRight: '15%',
        marginBottom: '10px'
    },
    form: {
        width: '100%',
        justify: 'center',
        alignItems: 'center'
    }
}

class login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({loading: true})
        const {email, password} = this.state
        const userData = {
            email,
            password
        }
        axios.post('/login', userData)
        .then(res => {
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            this.setState({loading: false})
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })
    }

    render() {
        const {classes} = this.props
        const {errors} = this.state
        return (
            <Grid container spacing = {4} className={classes.pageContainer} direction="column" alignItems='center'>
                <Typography className={classes.heading} variant = "h2">Login</Typography>
            
                    <Grid container item sm className={classes.formContainer} direction="row" alignItems='center' justify='center'>
                        <form noValidate className={classes.form} onSubmit={this.handleSubmit} >
                            <TextField error={errors.email ? true : false} helperText={errors.email} id='email' name='email' type='email' value ={this.state.email} className={classes.formElements} label= 'Email' onChange={this.handleChange} fullWidth/>
                            <br />
                            <TextField error={errors.password ? true : false} helperText={errors.password} id='password' name='password' type='password' value ={this.state.password} className={classes.formElements}label= 'Password' onChange={this.handleChange} fullWidth/>
                            <br />
                            <Button variant="contained" type = 'submit' disabled = {this.state.loading} className={classes.formElements}>
                                Login
                            </Button>
                            <br />
                            <small className={classes.formElements}>Don't have an account? <Link to = '/signup'>Create one here</Link></small>
                        </form>
                </Grid>
            </Grid>

        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
