import React, { Component } from 'react';
import Header from '../../components/main/Header';
import {
    colors
} from '../../App.json'
import Button from '../../components/utils/Button';
import LeftPanel from '../../components/auth/LeftPanel';
import FormFields from '../../components/utils/FormFields';


export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            buttons: {
                signIn: {
                    text: {
                        color: colors.black,
                        value: "Sign in",
                    },
                    styles: {
                        height: '50px',
                        width: '100%',
                        margin: '80px 0 40px 0',
                        backgroundColor: colors.primary,
                        border: {
                            width: "1px",
                            style: "solid",
                            color: colors.white,
                            radius: "3px",
                        },
                        color: colors.white
                    },
                    linkTo: "/",
                },
                forgotPassword: {
                    text: {
                        color: colors.white,
                        value: "Forgot Your Password?",
                    },
                    styles: {
                        height: '50px',
                        width: '200px',
                        margin: '0 0 0 300px',
                        backgroundColor: null,
                        border: {
                            width: null,
                            style: null,
                            color: null,
                            radius: null,
                        },
                        color: colors.primary
                    },
                    linkTo: '/auth/forgot-password'
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
                        placeholder: 'Enter username or email'
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
                        placeholder: 'Password(minimum of 8 characters)'
                    }
                },
            }
        }
    }


    render() {

        return (
            <div>
                <Header {...this.props} headerConfig={this.state.headerConfig} />

                <div style={styles.container}>
                    <LeftPanel />

                    <div style={styles.panelRigth}>

                        <div style={styles.header}>
                            Welcome back!
                        </div>
                        <div style={styles.subHeader}>
                            Sign in to  your account
                        </div>

                        <div style={{ margin: '35px 0', maxWidth: '500px' }}>
                            <form>
                                <FormFields
                                    formData={this.state.formData}
                                    change={(newState) => this.setState(newState)}
                                />

                                <Button {...this.state.buttons.signIn} />

                            </form>

                            {/* <div> */}
                                {/* <Button {...this.state.buttons.forgotPassword} /> */}
                            {/* </div> */}

                            <Button {...this.state.buttons.forgotPassword} />
                        </div>

                        <div style={{ ...styles.dottedSquare }}>
                            <img src={require('../../assets/icons/dotted-square-colored.png')} />
                        </div>
                    </div>
                </div>

                
            </div>
        )
    }
}


const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
    },
    panelRigth: {
        height: '100%',
        width: '100%',

        padding: '150px 100px',
    },

    header: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: '34px',
        lineHeight: '60px',
        color: colors.primary,
    },
    subHeader: {
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