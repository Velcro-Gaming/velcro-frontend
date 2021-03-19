import React, { useState, useEffect } from 'react';
import Header from '../../components/main/Header';
import {
    colors
} from '../../App.json'
import Button from '../../components/utils/Button';
import LeftPanel from '../../components/auth/LeftPanel';
import FormFields from '../../components/utils/FormFields';

import Breakpoint from '../../components/utils/breakpoints/Base'
import IsDesktop from '../../components/utils/breakpoints/IsDesktop'
import IsTablet from '../../components/utils/breakpoints/IsTablet'
import IsPhone from '../../components/utils/breakpoints/IsPhone'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Redirect } from 'react-router-dom';

import {
    register,
    login
} from '../../redux/actions/AuthActions'

import { PostMan } from '../../Helpers';

function Register(props) {

    // const [] = useState({})

    const [redirect, setRedirect] = useState(null)
    const [HeaderConfig, setHeaderConfig] = useState({
        headerButtons: [
            {
                text: {
                    color: colors.black,
                    value: "Already have an account?",
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
                    value: "Sign In",
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
                linkTo: "/login",
            },
        ],
        headerStyles: {
            backgroundColor: null
        }
    })
    const [PageButtons, setPageButtons] = useState({
        signUp: {
            text: {
                color: colors.white,
                value: "Continue",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '80px 0 60px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AttemptRegister(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
    })

    const [FormData, setFormData] = useState({
        username: {
            element: 'input',
            value: 'anon01',
            label: true,
            labelText: 'Username',
            props: {
                name: 'username_input',
                type: 'text',
                placeholder: 'Enter username',
                required: true,
            }
        },
        emailAddress: {
            element: 'input',
            value: 'itsobaa@gmail.com',
            label: true,
            labelText: 'Email',
            props: {
                name: 'email_input',
                type: 'email',
                placeholder: 'Enter email address',
                required: true,
            }
        },
        phoneNumber: {
            element: 'input',
            value: '+2347081032420',
            label: true,
            labelText: 'Phone number',
            props: {
                name: 'phone_number_input',
                type: 'tel',
                placeholder: 'Enter phone number',
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



    const notify = (status, title, message) => {
        let config_ = {
            showDuration: 300,
            hideDuration: 1000,
            showEasing: "linear",
            hideEasing: "swing",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        }

        let config = {
            showAnimation: "animated slideInRight",
            hideAnimation: "animated slideOutRight"
        }

        switch (status) {
            case 'success':
                this.container.success(message, title, config);
                break;
            case 'error':
                this.container.success(message, title, config);
                break;
            default:
                this.container.info(message, title, config);
                break;
        }
    };


    const AttemptRegister = async () => {
        let payload = {}
        let newPageButtons = PageButtons
        
        // Start Loader
        newPageButtons.signUp.loader.isLoading = true
        await setPageButtons({...newPageButtons})

        // Validate Fields
        for (let formField in FormData) {
            let fieldName = formField
            let fieldData = FormData[formField]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ') {
                    // Toast Error Message
                    toast.error(`${fieldName} field is required!`)
                    return
                }
            }
            // Set in Payload
            payload[fieldName] = fieldData.value
        }

        console.log("payload: ", payload)


        const responseObject = await PostMan('/register', 'post', payload)
        console.log('responseObject: ', responseObject)

        // Stop Loader
        newPageButtons.signUp.loader.isLoading = false
        await setPageButtons({...newPageButtons})


        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            let userData = responseData.data

            // account_status: "active"
            // email_Address: "agbanabolu@gmail.com"
            // phone_number: "+2347081032420"
            // user_id: 16
            // username: "agbana"
            // verification: "unverified"

            console.log("userData: ", userData)

            
            // await this.props.register(user.data)

            await props.login(userData)
         

            return setRedirect("/")
        }
        // else if (responseObject.status === 'unauthorized') {
        //     // Logout
        //     this.props.logout()
        //     setComponentState({
        //         ...ComponentState,
        //         redirect: '/auth/login'
        //     })
        // }
        else if (responseObject.status === 'error') {
            // Toast Error Message
            toast.error(responseObject.data.message)
        }
        else {
            console.log("Error")
        }

        
    }

    const MainContent = (config) => {

        return (
            <div style={styles.panelRight}>
                <ToastContainer />

                <div style={{ ...styles.heading, fontSize: `${config.headingSize}` }}>
                    Welcome to Velcro Gaming!
                </div>

                <div style={styles.subHeading}>
                    Register your account
                </div>

                <div style={{ marginTop: '35px', minWidth: `${config.formMinWidth}` }}>
                    <form>
                        <FormFields
                            formData={FormData}
                            change={(newFormData) => setFormData({...newFormData})}
                        />

                        <Button {...PageButtons.signUp} />

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


    const {
        auth
    } = props    

    useEffect(() => {
        //
        if (auth.loggedIn) {
            setRedirect({
                pathname: '/logout',
                state: {
                    nextUrl: `/login`,
                }
            })
        }

    }, [])

    // Redirect
    if (redirect) {
        return <Redirect to={redirect} />
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
        fontSize: '34px',
        lineHeight: '40px',
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
        register,
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)