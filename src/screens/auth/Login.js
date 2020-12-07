import React, { Component } from 'react';
import Header from '../../components/main/Header';
import {
    colors
} from '../../App.json'
import {
    login
} from '../../redux/actions/AuthActions'
import Button from '../../components/utils/Button';
import LeftPanel from '../../components/auth/LeftPanel';
import FormFields from '../../components/utils/FormFields';

import Breakpoint from '../../components/utils/breakpoints/Base';
import IsDesktop from '../../components/utils/breakpoints/IsDesktop';
import IsTablet from '../../components/utils/breakpoints/IsTablet';
import IsPhone from '../../components/utils/breakpoints/IsPhone';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';


class LoginScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: null,
            buttons: {
                signIn: {
                    text: {
                        color: colors.black,
                        value: "Sign in",
                    },
                    styles: {
                        height: '50px',
                        width: '100%',
                        margin: '60px 0 60px 0',
                        backgroundColor: colors.primary,
                        border: {
                            width: "1px",
                            style: "solid",
                            color: colors.white,
                            radius: "3px",
                        },
                        color: colors.white
                    },
                    onClick: () => this.AttemptSignIn()
                },
                forgotPassword: {
                    text: {
                        color: colors.white,
                        value: "Forgot Your Password?",
                    },
                    styles: {
                        height: '50px',
                        width: '200px',
                        margin: null,
                        backgroundColor: null,
                        border: {
                            width: null,
                            style: null,
                            color: null,
                            radius: null,
                        },
                        color: colors.primary
                    },
                    linkTo: '/password-reset/request'
                },
            },
            headerConfig: {
                headerStyles: {
                    backgroundColor: null
                },
                headerButtons: [
                    {
                        text: {
                            color: colors.black,
                            value: "Need an account?",
                        },
                        styles: {
                            height: null,
                            width: null,
                            margin: '0 15px',
                            backgroundColor: null,
                            border: {
                                width: null,
                                style: null,
                                color: null,
                                radius: null,
                            },
                            color: colors.black
                        },
                        isProtected: false,
                    },
                    {
                        text: {
                            color: colors.white,
                            value: "Sign Up",
                        },
                        styles: {
                            height: null,
                            width: null,
                            margin: '0 15px',
                            backgroundColor: colors.primary,
                            border: {
                                width: null,
                                style: null,
                                color: null,
                                radius: null,
                            },
                            color: colors.white
                        },
                        isProtected: false,
                        linkTo: "/register",
                    },
                ],
            },
            formData: {
                usernameEmail: {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'Username or email',
                    props: {
                        name: 'username_input',
                        type: 'text',
                        placeholder: 'Enter username or email',
                        required: true,
                    }
                },
                password: {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'Password',
                    props: {
                        name: 'password_input',
                        type: 'password',
                        placeholder: 'Password(minimum of 8 characters)',
                        required: true,
                    }
                },
            }
        }
    }

    AttemptSignIn = async() => {
        let payload = {}
        
        const {
            formData
        } = this.state

        const {
            auth,
            login: reduxLogin
        } = this.props
        
        for (let formField in formData) {
            let fieldName = formField
            let fieldData = formData[formField]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ' || fieldData.value == 0) {
                    // Toast Error Message
                    toast.error(`${fieldName} field is required!`)
                    return
                }
            }
            payload[fieldName] = fieldData.value
        }

        // Attempt Authentication
        let usernameEmail = payload.usernameEmail
        let password = payload.password
        if (auth.user) {
            if (usernameEmail == auth.user.username || usernameEmail == auth.user.email) {
                // Check Password
                if (password == auth.user.password) {
                    await reduxLogin()
                    //
                    this.setState({
                        ...this.state,
                        redirect: '/'
                    })
                } else {
                    toast.error(`Invalid credentials`)
                }
            }
        } else {
            toast.error(`This user doesn't exist`)
        }
    }

    mainContent = (config) => {

        return (
            <div style={styles.panelRight}>
                <ToastContainer />

                <div style={{ ...styles.heading, fontSize: `${config.headingSize}` }}>
                    Welcome back!
                </div>

                <div style={styles.subHeading}>
                    Sign in to  your account
                </div>

                <div style={{ marginTop: '35px', minWidth: `${config.formMinWidth}` }}>
                    <form>
                        <FormFields
                            formData={this.state.formData}
                            change={(newState) => this.setState(newState)}
                        />

                        <Button {...this.state.buttons.forgotPassword} style={{}} />

                        <Button {...this.state.buttons.signIn} />

                    </form>
                </div>

                <Breakpoint name="notPhone">
                    <div style={{ ...styles.dottedSquare }}>
                        <img src={require('../../assets/icons/dotted-square-colored.png')} />
                    </div>
                </Breakpoint>
            </div>
        )
    }


    render() {

        const {
            auth
        } = this.props

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        console.log("auth: ", auth)

        if (auth.loggedIn) {            
            this.setState({
                redirect: {
                    pathname: '/logout',
                    state: {
                        loggedIn: true,
                        nextUrl: `/login`,
                    }
                }
            })
        }

        return (
            <div>
                <Header {...this.props} headerConfig={this.state.headerConfig} />

                <IsDesktop>
                    <div style={styles.container.desktop}>
                        <LeftPanel />

                        <div style={{ padding: '0 50px', height: '100%' }}>
                            {
                                this.mainContent({
                                    formMinWidth: '450px',
                                    headingSize: '34px',
                                })
                            }
                        </div>

                    </div>                    
                </IsDesktop>

                <IsTablet>
                    <div style={styles.container.tablet}>
                        {
                            this.mainContent({
                                formMinWidth: null,
                                headingSize: '34px',
                            })
                        }
                    </div>
                </IsTablet>

                <IsPhone>
                    <div style={styles.container.phone}>
                        {
                            this.mainContent({
                                formMinWidth: '200px',
                                headingSize: '30px',
                            })
                        }
                    </div>
                </IsPhone>

            </div>
        )
    }
}


const styles = {
    container: {
        desktop: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
        },
        tablet: {
            display: 'flex',
            flexDirection: 'column',
            padding: '0 50px',
        },
        phone: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    panelRight: {
        padding: '120px 50px 0',
        height: '100%',
    },
    heading: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 800,
        lineHeight: '60px',
        color: colors.primary,
    },
    subHeading: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        color: colors.secondary,

        margin: '10px 0'
    },

    formLabel: {
        fontFamily: 'Source Sans Pro',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
    },
    dottedSquare: {
        position: 'fixed',
        right: '50px',
        bottom: '50px',
    },
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        login
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)