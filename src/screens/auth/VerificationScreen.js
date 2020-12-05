import React, { useState, useEffect } from 'react';
import Header from '../../components/main/Header';
import {
    colors
} from '../../App.json'
import {
    useLocation,
    Redirect
} from 'react-router-dom'
import {
    register
} from '../../redux/actions/AuthActions'

import Button from '../../components/utils/Button';
import LeftPanel from '../../components/auth/LeftPanel';
import FormField from '../../components/utils/FormField';

import Breakpoint from '../../components/utils/breakpoints/Base'
import IsDesktop from '../../components/utils/breakpoints/IsDesktop'
import IsTablet from '../../components/utils/breakpoints/IsTablet'
import IsPhone from '../../components/utils/breakpoints/IsPhone'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function VerificationScreen(props) {
    const InitialState = {
        redirect: null,
        buttons: {
            signUp: {
                text: {
                    color: colors.black,
                    value: "Sign up",
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
                onClick: () => AttemptSubmit(),
            },
        },
        headerConfig: {
            headerButtons: [
            ],
            headerStyles: {
                backgroundColor: null
            }
        },
        formData: {
            console: {
                element: 'select',
                data: [
                    {
                        value: 0,
                        display: '---'
                    },
                    {
                        value: 1,
                        display: 'PS4'
                    },
                    {
                        value: 2,
                        display: 'Xbox One'
                    },
                    {
                        value: 3,
                        display: 'Nitendo Switch'
                    },
                ],
                value: '',
                label: true,
                labelText: 'Select Console',
                props: {
                    name: 'console_input',
                    type: 'text',
                    placeholder: null,
                    required: true
                }
            },
            referralCode: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Referral Code (Optional)',
                props: {
                    name: 'referral_input',
                    type: 'text',
                    placeholder: 'Enter Referal Code',
                    required: false
                }
            },
            ninNumber: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Upload your NIN Number',
                props: {
                    name: 'nin_input',
                    type: 'text',
                    placeholder: 'Enter NIN number',
                    required: false
                }
            },
        }
    }

    const [ComponentState, setComponentState] = useState(InitialState)
    const {
        state: routerState
    } = useLocation()

    const {
        redirect,
        buttons,
        formData,
        headerConfig
    } = ComponentState


    const AttemptSubmit = async() => {
        let payload = {
            ...routerState.payload
        }

        // Validate Fields
        for (let formField in formData) {
            let fieldName = formField
            let fieldData = formData[formField]
            console.log("required: ", fieldData.props.required)
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ' || fieldData.value == 0) {
                    // Toast Error Message
                    toast.error(`${fieldName} field is required!`)
                    return
                }
            }
            payload[fieldName] = fieldData.value
        }

        await props.register(payload)

        setComponentState({
            ...ComponentState,
            redirect: '/'
        })
    }

    useEffect(() => {
        console.log("\nComponent Did Mount\n")

        if (!routerState) {
            toast.error("Something Went Wrong")
            setTimeout(function() {
                setComponentState({
                    ...ComponentState,
                    redirect: '/'
                })
            }, 2000)
        }
    }, [])

    useEffect(() => {
        console.log("\nComponent Did Update\n")
    })

    const MainContent = (config) => {
        return (
            <div style={styles.panelRight}>

                <ToastContainer />

                <div style={{ ...styles.heading, fontSize: `${config.headingSize}` }}>
                    Welcome to Velcro Gaming!
                </div>

                <div style={{ marginTop: '35px', minWidth: `${config.formMinWidth}` }}>
                    <form>
                        <FormField
                            formData={formData}
                            change={(newFormData) => setComponentState({
                                ...ComponentState,
                                formData: newFormData
                            })}
                            field={{
                                id: 'console',
                                config: formData.console
                            }}
                        />

                        <div style={{ ...styles.comment }}>
                            Your first order is free of Service Charge when you register with a friends referral code
                        </div>

                        <FormField
                            formData={formData}
                            change={(newFormData) => setComponentState({
                                ...ComponentState,
                                formData: newFormData
                            })}
                            field={{
                                id: 'referralCode',
                                config: formData.referralCode
                            }}
                        />

                        <div style={{ ...styles.comment, color: `${colors.primary}` }}>
                            You may skip this step, but You will not have access to all Velcro Gaming features till you do
                        </div>

                        <FormField
                            formData={formData}
                            change={(newFormData) => setComponentState({
                                ...ComponentState,
                                formData: newFormData
                            })}
                            field={{
                                id: 'ninNumber',
                                config: formData.ninNumber
                            }}
                        />

                        <Button {...buttons.signUp} />

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

    // Redirect
    if (redirect) {
        return <Redirect to={redirect} />
    }

    //
    return (
        <div>
            <Header {...props} headerConfig={headerConfig} />

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
                            headingSize: '20px',
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
        overflowX: 'scroll',
    },
    heading: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: '34px',
        lineHeight: '60px',
        color: colors.primary,
    },
    comment: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '24px',
        color: '#656565',
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
        register
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

export default connect(mapStateToProps, mapDispatchToProps) (VerificationScreen)