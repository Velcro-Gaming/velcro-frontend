import React, { useEffect, useState } from 'react'

import FormField from './FormField'
import {
    withRouter,
    useRouteMatch,
    useLocation,
    Link,
    Redirect
} from 'react-router-dom'
import {
    logout
} from '../redux/actions/AuthActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';



function Middleware(props) {
    const location = useLocation()
    const [redirect, setRedirect] = useState(null)

    
    const {
        auth
    } = props

    console.log("auth: ", auth)

    // if (auth.user && auth.user.verification.status === "unverified") {
    //     return <Redirect to={"/phone-verification"} />
    // }

    // const OnBoard = async() => {
    //     if (auth.user && auth.user.verification.status === "unverified") {
    //         console.log("unverified")
    //         if (location.pathname !== "/phone-verification") {
    //             setRedirect("/phone-verification")
    //         }
    //     }
    // }

    // if (auth.user && auth.user.verification.status === "unverified" && location.pathname !== "/phone-verification") {
    //     console.log("unverified")

    //     setRedirect("/phone-verification")

    //     // if (location.pathname !== "/phone-verification") {
    //     //     setRedirect("/phone-verification")
    //     // }
    // }

    
    // useEffect(() => {

    //     // console.log("user: ", auth.user)
    //     // console.log("location: ", location)
    //     // console.log("props: ", props)

    //     OnBoard()
        
        
    // })

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <div>
            { props.children }
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logout
    }, dispatch)
}

const mapStateToProps = state => {
    const {
        auth
    } = state
    return {
        auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter((Middleware)))
