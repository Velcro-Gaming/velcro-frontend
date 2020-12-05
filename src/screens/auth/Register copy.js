import React, { Component } from 'react';
import Header from '../../components/main/Header';
import {
    colors
} from '../../App.json';
import Button from '../../components/utils/Button';
import LeftPanel from '../../components/auth/LeftPanel';
import FormFields from '../../components/utils/FormFields';


export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            buttons: {
                signUp: {
                    text: {
                        color: colors.black,
                        value: "Sign up",
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
                    value: 'mike8761',
                    label: true,
                    labelText: 'Username',
                    config: {
                        name: 'username_input',
                        type: 'text',
                        placeholder: 'Enter username'
                    }
                },
                email: {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'Email',
                    props: {
                        name: 'email_input',
                        type: 'email',
                        placeholder: 'Enter email address'
                    }
                },
                phoneNumber: {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'Phone number',
                    props: {
                        name: 'phone_number_input',
                        type: 'tel',
                        placeholder: 'Enter phone number'
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

    updateForm = (newFormData) => {
        this.setState({
            formData: newFormData
        })
    };

    render() {
        // console.log("Register Props: ", this.props)

        return (
            <div>
                <Header {...this.props} headerConfig={this.state.headerConfig} />

                <div style={styles.container}>
                    <LeftPanel />

                    <div style={styles.panelRigth}>

                        <div style={styles.header}>
                            Welcome to Velcro Gaming!
                        </div>
                        <div style={styles.subHeader}>
                            Register your account
                        </div>

                        <form style={{ margin: '35px 0', maxWidth: '500px' }}>

                            <FormFields 
                                formData={this.state.formData}
                                // change={(newFormData) => this.updateForm(newFormData)}
                                change={(newState) => this.setState(newState)}
                            />

                            <Button {...this.state.buttons.signUp} />
                            
                        </form>

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