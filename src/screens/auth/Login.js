import React, { useEffect, useState } from 'react';
import Header from '../../components/main/Header';
import {
    colors
} from '../../App.json'
import {
    login,
    partialLogin
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

import { PostMan } from '../../Helpers';



function LoginScreen(props) {
    const {
        auth,
        login: reduxLogin
    } = props
    
    // const [NonFieldErrors, setNonFieldErrors] = useState([])

    const [redirect, setRedirect] = useState(null)
    const [PageButtons, setPageButtons] = useState({
        signIn: {
            text: {
                color: colors.white,
                value: "Sign in",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '30px 0 60px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AttemptSignIn(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
        forgotPassword: {
            text: {
                color: colors.primary,
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
            linkTo: '/password-reset/request',
        },
    })

    const [HeaderConfig, setHeaderConfig] = useState({
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
    })
    
    const [FormData, setFormData] = useState({
        // usernameEmail: {
        //     element: 'input',
        //     value: '',
        //     label: true,
        //     labelText: 'Username or email',
        //     props: {
        //         name: 'username_input',
        //         type: 'text',
        //         placeholder: 'Enter username or email',
        //         required: true,
        //     }
        // },
        username: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Username',
            props: {
                name: 'username_input',
                type: 'text',
                placeholder: 'Enter username',
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
    })


    const AttemptSignIn = async() => {
        let payload = {}
        let newPageButtons = PageButtons
        
        // Start Loader
        newPageButtons.signIn.loader.isLoading = true
        await setPageButtons({...newPageButtons})
        
        for (let formField in FormData) {
            let fieldName = formField
            let fieldData = FormData[formField]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ' || fieldData.value == 0) {
                    // Toast Error Message
                    toast.error(`${fieldName} field is required!`)
                    return
                }
            }
            payload[fieldName] = fieldData.value
        }

        console.log("payload: ", payload)

        const responseObject = await PostMan('/login', 'post', payload)

        // Stop Loader
        newPageButtons.signIn.loader.isLoading = false
        await setPageButtons({...newPageButtons})

        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            let userData = responseData.data
            console.log("responseData: ", responseData)
            if (userData.verification === "unverified") {
                console.log("unverified")
                await props.partialLogin(userData)
                return setRedirect("/phone-verification")
            } else {
                await props.login(userData)
                return setRedirect("/")
            }
        } 

        else if (responseObject.status === 'error') {
            // Toast Error Message
            toast.error(responseObject.data.message)
        }

    }


    const AttemptLogout = () => {
        // Go to Logout Screen
        setRedirect({
            pathname: '/logout',
            state: {
                nextUrl: `/login`,
            }
        })
    }

    useEffect(() => {
        // If already Logged in.
        if (auth.loggedIn) {            
            AttemptLogout()
        }
    }, [])


    if (redirect) {
        return <Redirect to={redirect} />
    }


    const MainContent = (config) => {
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
                        {/* <FormFields
                            formData={ComponentState.formData}
                            change={(newFormData) => setComponentState({
                                ...ComponentState,
                                formData: newFormData
                            })}
                        /> */}

                        <FormFields
                            formData={FormData}
                            change={(newFormData) => setFormData({...newFormData})}
                        />

                        <Button {...PageButtons.forgotPassword} style={{}} />

                        <Button {...PageButtons.signIn} />

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

    return (
        <div>
            <Header {...props} headerConfig={HeaderConfig} />

            <IsDesktop>
                <div style={styles.container.desktop}>
                    <LeftPanel />

                    <div style={{ padding: '0 50px', height: '100%' }}>
                        {
                            MainContent({
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
                        MainContent({
                            formMinWidth: null,
                            headingSize: '34px',
                        })
                    }
                </div>
            </IsTablet>

            <IsPhone>
                <div style={styles.container.phone}>
                    {
                        MainContent({
                            formMinWidth: '200px',
                            headingSize: '30px',
                        })
                    }
                </div>
            </IsPhone>

        </div>
    )
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
        login,
        partialLogin
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