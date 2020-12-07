import React, { Component } from 'react';
import Header from '../../../components/main/Header';
import {
    colors
} from '../../../App.json'
import Button from '../../../components/utils/Button';
import LeftPanel from '../../../components/auth/LeftPanel';
import FormField from '../../../components/utils/FormField';

import Breakpoint from '../../../components/utils/breakpoints/Base';
import IsDesktop from '../../../components/utils/breakpoints/IsDesktop';
import IsTablet from '../../../components/utils/breakpoints/IsTablet';
import IsPhone from '../../../components/utils/breakpoints/IsPhone';


export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            buttons: {
                resetPassword: {
                    text: {
                        color: colors.black,
                        value: "Reset Password",
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
                    linkTo: "/password-reset/sent",
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
                email: {
                    element: 'input',
                    value: '',
                    label: false,
                    labelText: 'Email',
                    props: {
                        name: 'username_input',
                        type: 'text',
                        placeholder: 'Enter username or email',
                        disabled: true,
                    }
                },
            }
        }
    }

    mainContent = (config) => {
        const {
            buttons,
            formData
        } = this.state

        return (
            <div style={styles.panelRight}>

                <div style={{ ...styles.heading, fontSize: `${config.headingSize}` }}>
                    Reset Your Password
                </div>

                {/* <div style={styles.subHeading}>
                    Sign in to  your account
                </div> */}

                <div style={{ marginTop: '35px', minWidth: `${config.formMinWidth}` }}>
                    <form>
                        <FormField
                            formData={formData}
                            change={(newFormData) => this.setState({
                                formData: newFormData
                            })}
                            field={{
                                id: 'email',
                                config: formData.email
                            }}
                        />

                        <Button {...buttons.resetPassword} />

                    </form>
                </div>

                <Breakpoint name="notPhone">
                    <div style={{ ...styles.dottedSquare }}>
                        <img src={require('../../../assets/icons/dotted-square-colored.png')} />
                    </div>
                </Breakpoint>
            </div>
        )
    }


    render() {

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
                                headingSize: '24px',
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