import React from 'react'
import { connect } from 'react-redux'
import { Redirect, useRouteMatch } from 'react-router-dom'
import { bindActionCreators } from 'redux'


function ProtectedRoute(props) {
    const match = useRouteMatch()
    const {
        auth,
        children
    } = props

    if (auth.loggedIn) {
        console.log("auth.user: ", auth.user)

        return children
    }

    // Redirect to Login
    return (
        <Redirect to={{
                pathname: '/login',
                state: {
                    nextUrl: match.url
                }
            }}
        />
    )
}


const mapStateToProps = state => {
    console.log("State: ", state)
    const {
        auth
    } = state
    return {
        auth
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (ProtectedRoute)