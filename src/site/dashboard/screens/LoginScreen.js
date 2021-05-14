import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
    colors
} from '../../../App.json'
import { PostMan, isMobileDevice } from '../../../Helpers';
import {
    login,
} from '../../../redux/actions/AuthActions'

import Header from '../components/Header'

import Button from '../../../utils/Button';
import FormFields from '../../../utils/FormFields';

import Breakpoint from '../../../utils/breakpoints/Base';
import IsDesktop from '../../../utils/breakpoints/IsDesktop';
import IsTablet from '../../../utils/breakpoints/IsTablet';
import IsPhone from '../../../utils/breakpoints/IsPhone';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
                margin: '30px 0',
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

    const [FormData, setFormData] = useState({
        username_email: {
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
                placeholder: 'Password',
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

        const responseObject = await PostMan('login/', 'post', payload)

        console.log("responseObject: ", responseObject)

        // Stop Loader
        newPageButtons.signIn.loader.isLoading = false
        await setPageButtons({...newPageButtons})

        if (responseObject.status === 'success') {
            let authResponseData = responseObject.data
            console.log("authResponseData: ", authResponseData)

            const { user } = authResponseData
            if (user.is_staff || user.is_admin) {
                await props.login(authResponseData)
                return setRedirect("/")
            } else {
                // unAuthorized
                toast.error("Restricted Zone")
            }
        } 
        else if (responseObject.status === 'bad_request') {
            let responseData = responseObject.data
            for (let key in responseData) {
                if (key === "message") {
                    toast.error(responseData[key])
                } else {
                    let fieldErrors = responseData[key]
                    fieldErrors.map(errorMessage => {
                        // Toast Error Message
                        toast.error(errorMessage)
                    })
                }
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
            <div style={{ ...styles.container }}>

                <div style={styles.headerWrapper}>
                    <Header />
                </div>
                            
                <div style={styles.wrapper}>
                    <ToastContainer />

                    <div style={styles.innerWrapper}>
                        <div style={{ ...styles.heading, fontSize: `${config.headingSize}` }}>
                            Dashboard
                        </div>

                        <div style={styles.subHeading}>
                            Velcro gaming
                        </div>

                        <div style={{ marginTop: '35px', minWidth: `${config.formMinWidth}` }}>
                            <form>

                                <FormFields
                                    formData={FormData}
                                    change={(newFormData) => setFormData({ ...newFormData })}
                                />

                                <Button {...PageButtons.forgotPassword} style={{}} />

                                <Button {...PageButtons.signIn} />

                            </form>
                        </div>
                    </div>
                </div>



                <Breakpoint name="notPhone">
                    <div style={{ ...styles.dottedSquare }}>
                        <img src={require('../../../assets/icons/dotted-square-colored.png')} />
                    </div>
                </Breakpoint>
            </div>
        )
    }

    return (
        <div>
            <IsDesktop>
                {
                    MainContent({
                        formMinWidth: '450px',
                        headingSize: '34px',
                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        formMinWidth: '350px',
                        headingSize: '34px',
                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        formMinWidth: '300px',
                        headingSize: '30px',
                    })
                }
            </IsPhone>
        </div>
    )
}


const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "column"
    },
    wrapper: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerWrapper: {
        padding: "20px 0",
    },
    heading: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 800,
        color: colors.primary,
    },
    subHeading: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        color: colors.secondary,
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