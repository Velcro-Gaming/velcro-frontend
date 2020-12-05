import React, { Component } from 'react';
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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Redirect } from 'react-router-dom';

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: null,
            buttons: {
                signUp: {
                    text: {
                        color: colors.black,
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
                    onClick: () => this.AttemptRegister()
                },
            },
            headerConfig: {
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
            },
            formData: {
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
                email: {
                    element: 'input',
                    value: 'anon@email.com',
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
                    value: '2347081234567',
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
            }
        }

    }

    notify = (status, title, message) => {
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


    AttemptRegister = () => {
        let payload = {}
        const {
            formData
        } = this.state

        // Validate Fields
        for (let formField in formData) {
            let fieldName = formField
            let fieldData = formData[formField]
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

        this.setState({
            ...this.state,
            redirect: {
                pathname: '/register/verification',
                state: {
                    payload: payload
                }
            }
        })
    }

    mainContent = (config) => {

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
                            formData={this.state.formData}
                            change={(newState) => this.setState(newState)}
                        />

                        <Button {...this.state.buttons.signUp} />

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
            redirect,
            headerConfig
        } = this.state

        // Redirect
        if (redirect) {
            return <Redirect to={redirect} />
        }

        return (
            <div>
                <Header {...this.props} headerConfig={headerConfig} />

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
                                headingSize: '20px',
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
        fontSize: '34px',
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