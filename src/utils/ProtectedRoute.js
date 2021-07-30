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
        // Check User has default console.
        if (auth.user && auth.user.consoles.length === 0) {
            console.log("No Default Console")
            return <Redirect to={"/register/extra-information"} />
        }

        return children
    }

    // Check User is verified
    if (auth.user && auth.user.verification.status === "unverified") {
        console.log("unverified")
        return <Redirect to={"/phone-verification"} />
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