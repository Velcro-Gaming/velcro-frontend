import React, { useState } from 'react'
import {
    colors
} from '../../App.json';
import {
    logout
} from '../../redux/actions/AuthActions';
import Button from '../../components/utils/Button';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import 


function LogoutScreen(props) {
    const history = useHistory()
    const { state: locationProps } = useLocation()
    const [ComponentState, setComponentState] = useState({
        redirect: null,
        buttons: {
            goBack: {
                text: {
                    color: colors.black,
                    value: "Go Back",
                },
                styles: {
                    height: '50px',
                    width: '150px',
                    margin: '0 20px',
                    backgroundColor: colors.primary,
                    border: {
                        width: "1px",
                        style: "solid",
                        color: colors.white,
                        radius: "3px",
                    },
                    color: colors.white
                },
                onClick: () => history.goBack()
            },
            signOut: {
                text: {
                    color: colors.black,
                    value: "Sign Out",
                },
                styles: {
                    height: '50px',
                    width: '150px',
                    margin: '0 20px',
                    backgroundColor: colors.primary,
                    border: {
                        width: "1px",
                        style: "solid",
                        color: colors.white,
                        radius: "3px",
                    },
                    color: colors.white
                },
                onClick: () => AttemptSignOut()
            },
        }
    })

    const AttemptSignOut = () => {
        // Logout
        props.logout()
        
        // Redirect
        if (typeof locationProps !== 'undefined') {
            if (locationProps.nextUrl) {
                window.location = window.location.origin + locationProps.nextUrl
            }
        } else {
            window.location = window.location.origin + '/login'
        }

    }

    
    console.log("history: ", history)


    const {
        redirect
    } = ComponentState

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <div style={styles.container}>
            <div style={styles.heading}>
                You're already logged in as 
                <span style={{ fontWeight: 'bolder', fontStyle: 'italic' }}>
                    {" " + props.auth.user.username}
                </span>. Logout?
            </div>

            <div style={styles.actionButtons}>
                <Button {...ComponentState.buttons.goBack} />
                <Button {...ComponentState.buttons.signOut} />
            </div>
            
        </div>
    )
}

const styles = {
    container: {
        height: '100vh',
        backgroundColor: colors.black,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column', 
    },
    heading: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '25px',
        lineHeight: '40px',
        color: colors.primary,
    },
    actionButtons: {
        display: 'flex',
        padding: '70px'
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen)