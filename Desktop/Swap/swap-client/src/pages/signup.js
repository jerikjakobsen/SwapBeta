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

class signup extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            manufacturer: '',
            model: '',
            year: '',
            license: '',
            color: '',
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
        const {email, password, confirmPassword, firstName, lastName, manufacturer, model, year, license, color} = this.state
        const newUserData = {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            manufacturer,
            model,
            year,
            license,
            color

        }
        axios.post('/signup', newUserData)
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
                <Typography className={classes.heading} variant = "h2">Create an Account</Typography>
            
                    <Grid container item sm className={classes.formContainer} direction="row" alignItems='center' justify='center'>
                        <form noValidate className={classes.form} onSubmit={this.handleSubmit} >
                            <TextField error={errors.email ? true : false} helperText={errors.email} id='email' name='email' type='email' value ={this.state.email} className={classes.formElements} label= 'Email' onChange={this.handleChange} fullWidth/>
                            <br />
                            <TextField error={errors.password ? true : false} helperText={errors.password} id='password' name='password' type='password' value ={this.state.password} className={classes.formElements}label= 'Password' onChange={this.handleChange} fullWidth/>
                            <br />
                            <TextField error={errors.confirmPassword ? true : false} helperText={errors.confirmPassword} id='confirmPassword' name='confirmPassword' type='password' value ={this.state.confirmPassword} className={classes.formElements} label= 'Confirm Password' onChange={this.handleChange} fullWidth/>
                            <br />
                            <TextField error={errors.firstName ? true : false} helperText={errors.firstName} id='firstName' name='firstName' type='text' value ={this.state.firstName} className={classes.formElements} label= 'First Name' onChange={this.handleChange} fullWidth/>
                            <br />
                            <TextField error={errors.lastName ? true : false} helperText={errors.lastName} id='lastName' name='lastName' type='text' value ={this.state.lastName} className={classes.formElements} label= 'Last Name' onChange={this.handleChange} fullWidth/>
                            <br />
                            <TextField error={errors.manufacturer ? true : false} helperText={errors.manufacturer} id='manufacturer' name='manufacturer' type='text' value ={this.state.manufacturer} className={classes.formElements} label= 'Manufacturer' onChange={this.handleChange} fullWidth/>
                            <br />
                            <TextField error={errors.model ? true : false} helperText={errors.model} id='model' name='model' type='text' value ={this.state.model} className={classes.formElements} label= 'Model' onChange={this.handleChange} fullWidth/>
                            <br />
                            <TextField error={errors.year ? true : false} helperText={errors.year} id='year' name='year' type='text' value ={this.state.year} className={classes.formElements} label= 'Year' onChange={this.handleChange} fullWidth/>
                            <br />
                            <TextField error={errors.license ? true : false} helperText={errors.license} id='license' name='license' type='text' value ={this.state.license} className={classes.formElements} label= 'License Plate' onChange={this.handleChange} fullWidth/>
                            <br />
                            <TextField error={errors.color ? true : false} helperText={errors.color} id='color' name='color' type='text' value ={this.state.color} className={classes.formElements} label= 'Color' onChange={this.handleChange} fullWidth/>
                            <br />
                            <Button variant="contained" type = 'submit' disabled = {this.state.loading} className={classes.formElements}>
                                Create Account
                            </Button>
                            <br />
                            <small className={classes.formElements}>Have an account? <Link to = '/login'>login here</Link></small>
                        </form>
                </Grid>
            </Grid>

        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup)
