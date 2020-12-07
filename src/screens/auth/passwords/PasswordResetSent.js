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
                next: {
                    text: {
                        color: colors.black,
                        value: "Next",
                    },
                    styles: {
                        height: '50px',
                        width: '100%',
                        margin: '20px 0 10px 0',
                        backgroundColor: colors.primary,
                        border: {
                            width: "1px",
                            style: "solid",
                            color: colors.white,
                            radius: "3px",
                        },
                        color: colors.white
                    },
                    linkTo: "/password-reset",
                },
                resendLink: {
                    text: {
                        color: colors.primary,
                        value: "Resend Link",
                    },
                    styles: {
                        height: '50px',
                        width: '100%',
                        margin: '10px 0 10px 0',
                        backgroundColor: null,
                        border: {
                            width: "1px",
                            style: "solid",
                            color: colors.white,
                            radius: "3px",
                        },
                        color: colors.primary
                    },
                    onClick: () => window.location.reload(),
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
                passwordConfirm: {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'Password Confirmation',
                    props: {
                        name: 'password_confirm_input',
                        type: 'password',
                        placeholder: 'Password confirmation'
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
            <div style={{...styles.panelRight, padding: `${config.containerPadding}`,}}>

                <div
                    className="d-flex justify-content-center" 
                    style={{ ...styles.heading, fontSize: `${config.headingSize}` }}
                >
                    Check Your Mail
                </div>

                <div className="d-flex flex-column align-items-center justify-content-center" style={styles.subHeading} >
                    <span>A Link has been sent to your Email address.</span>
                    <span>Follow it to reset your password</span>
                </div>

                <div className="d-flex justify-content-center" style={{  }}>
                    <img src={require('../../../assets/icons/done.png')} />
                </div>

                <div style={{ marginTop: '35px', minWidth: `${config.formMinWidth}` }}>
                    <form>
                        
                        <Button {...buttons.next} />
                        <Button {...buttons.resendLink} />

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
                                    containerPadding: '200px 50px 0',
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
                                headingSize: '24px',
                                containerPadding: '150px 50px 0',
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
                                containerPadding: '100px 50px 0',
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
        // padding: '200px 50px 0',
        height: '100%',
    },
    heading: {
        // fontFamily: 'Raleway',
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '28px',
        color: colors.black,
    },
    subHeading: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        // lineHeight: '24px',
        color: 'rgba(45, 58, 48, 0.5)',

        margin: '20px 0'
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