import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({component: Component, authenticated, route, ...rest }) => (
    <Route
    {...rest}
    render={(props) => authenticated === true ? <Redirect to = {`/${route}`} /> : <Component {...props} />}
    />
)

export default AuthRoute