import React, { useEffect, useState } from 'react';
import Header from '../../components/main/Header';
import {
    colors
} from '../../../../App.json'
import { PostMan } from '../../../../Helpers';
import {
    login
} from '../../../../redux/actions/AuthActions'
import Button from '../../../../utils/Button';
import LeftPanel from '../../components/auth/LeftPanel';
import FormField from '../../../../utils/FormField';

import Breakpoint from '../../../../utils/breakpoints/Base';
import IsDesktop from '../../../../utils/breakpoints/IsDesktop';
import IsTablet from '../../../../utils/breakpoints/IsTablet';
import IsPhone from '../../../../utils/breakpoints/IsPhone';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';


function PhoneVerificationScreen(props) {
    const {
        auth,
        login: reduxLogin
    } = props

    const [redirect, setRedirect] = useState(null)
    const [PageButtons, setPageButtons] = useState({
        submit: {
            text: {
                color: colors.white,
                value: "Submit",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '60px 0 10px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AttemptPhoneVerification(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
        resendCode: {
            text: {
                color: colors.primary,
                value: "Resend Code",
            },
            styles: {
                height: '50px',
                width: '100%',
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
            onClick: () => AttemptResendOTP(),
            loader: null
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
        isVisible: false
    })


    const [FormData, setFormData] = useState({
        inputA: {
            element: 'input',
            value: '',
            label: false,
            labelText: '',
            props: {
                id: 'input_a',
                name: 'input_a',
                type: 'text',
                placeholder: '',
                required: true,
            },
            styles: {
                height: "36px",
                width: "36px",
                fontSize: "15px",
                textAlign: "center",
                backgroundColor: colors.info,
                border: "1px solid #DEDFDF"
            },
            wrapperProps: {
                style: {
                    margin: "10px",
                }
            }
        },
        inputB: {
            element: 'input',
            value: '',
            label: false,
            labelText: '',
            props: {
                id: 'input_b',
                name: 'input_b',
                type: 'text',
                placeholder: '',
                required: true,
                style: {margin: "0 5px"}
            },
            styles: {
                height: "36px",
                width: "36px",
                fontSize: "15px",
                textAlign: "center",
                backgroundColor: colors.info,
                border: "1px solid #DEDFDF"
            },
            wrapperProps: {
                style: {
                    margin: "10px",
                }
            }
        },
        inputC: {
            element: 'input',
            value: '',
            label: false,
            labelText: '',
            props: {
                id: 'input_c',
                name: 'input_c',
                type: 'text',
                placeholder: '',
                required: true,
                style: {margin: "0 5px"}
            },
            styles: {
                height: "36px",
                width: "36px",
                fontSize: "15px",
                textAlign: "center",
                backgroundColor: colors.info,
                border: "1px solid #DEDFDF"
            },
            wrapperProps: {
                style: {
                    margin: "10px",
                }
            }
        },
        inputD: {
            element: 'input',
            value: '',
            label: false,
            labelText: '',
            props: {
                id: 'input_d',
                name: 'input_d',
                type: 'text',
                placeholder: '',
                required: true,
                style: {margin: "0 5px"}
            },
            styles: {
                height: "36px",
                width: "36px",
                fontSize: "15px",
                textAlign: "center",
                backgroundColor: colors.info,
                border: "1px solid #DEDFDF"
            },
            wrapperProps: {
                style: {
                    margin: "10px",
                }
            }
        },
        inputE: {
            element: 'input',
            value: '',
            label: false,
            labelText: '',
            props: {
                id: 'input_e',
                name: 'input_e',
                type: 'text',
                placeholder: '',
                required: true,
                style: {margin: "0 5px"}
            },
            styles: {
                height: "36px",
                width: "36px",
                fontSize: "15px",
                textAlign: "center",
                backgroundColor: colors.info,
                border: "1px solid #DEDFDF"
            },
            wrapperProps: {
                style: {
                    margin: "10px",
                }
            }
        },
        inputF: {
            element: 'input',
            value: '',
            label: false,
            labelText: '',
            props: {
                id: 'input_f',
                name: 'input_f',
                type: 'text',
                placeholder: '',
                required: true,
                style: {margin: "0 5px"}
            },
            styles: {
                height: "36px",
                width: "36px",
                fontSize: "15px",
                textAlign: "center",
                backgroundColor: colors.info,
                border: "1px solid #DEDFDF"
            },
            wrapperProps: {
                style: {
                    margin: "10px",
                }
            }
        },

        // password: {
        //     element: 'input',
        //     value: '',
        //     label: true,
        //     labelText: 'Password',
        //     props: {
        //         name: 'password_input',
        //         type: 'password',
        //         placeholder: 'Password(minimum of 8 characters)',
        //         required: true,
        //         style: {margin: "0 5px"}
        //     },
            
        // },
    })


    const ClearFields = async () => {
        let newFormData = FormData
        for (let formField in FormData) {
            // CLear fields
            newFormData[formField].value = ""            
        }
        await setFormData({...newFormData})
    }


    const AttemptResendOTP = async() => {        
        const responseObject = await PostMan(`/register/otpresend/${auth.user.usersId}`, 'post')
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            // Toast Success Message
            toast.success(responseData.message)
        } 
        else if (responseObject.status === 'error') {
            // Toast Error Message
            toast.error(responseObject.data.message)
        }
    }


    const AttemptPhoneVerification = async() => {
        let otp = ""
        let payload = {}
        let newPageButtons = PageButtons
        
        // Start Loader
        newPageButtons.submit.loader.isLoading = true
        await setPageButtons({...newPageButtons})
        
        let formValid = true
        for (let formField in FormData) {
            let fieldName = formField
            let fieldData = FormData[formField]
            console.log(fieldName, fieldData.value)
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ') {
                    formValid = false
                    // Stop Loader
                    newPageButtons.submit.loader.isLoading = false
                    await setPageButtons({...newPageButtons})
                }
            }
            otp += String(fieldData.value)
        }

        if (!formValid) {
            // Toast Error Message
            toast.error(`All fields are required!`)
            // Stop Loader
            newPageButtons.submit.loader.isLoading = false
            return setPageButtons({...newPageButtons})
        }

        payload = {
            userOtp: parseInt(otp),
            userId: auth.user.usersId
        }

        const responseObject = await PostMan('/register/otp', 'post', payload, true)

        // // Stop Loader
        // newPageButtons.submit.loader.isLoading = false
        // await setPageButtons({...newPageButtons})

        if (responseObject.status === 'success') {
            // Toast Error Message
            toast.success(`Your account is now active`)

            setTimeout(async()=> {
                // Stop Loader
                newPageButtons.submit.loader.isLoading = false
                await setPageButtons({ ...newPageButtons })

                // Logout
                props.logout()
                return setRedirect("/login")
                
                await props.login(auth.user)
                return setRedirect("/")

            }, 1500)
        }

        if (responseObject.status === 'bad_request') {
            // Toast Error Message
            toast.error(responseObject.data.message)

            return ClearFields()
        }

        else if (responseObject.status === 'error') {
            // Toast Error Message
            toast.error(responseObject.data.message)
        }

    }



    const AttemptLogout = () => {
        //
        setRedirect({
            pathname: '/logout',
            state: {
                nextUrl: `/login`,
            }
        })
    }

    useEffect(() => {
        // If already Logged in.

    }, [])


    if (redirect) {
        return <Redirect to={redirect} />
    }


    const MainContent = (config) => {
        return (
            <div style={styles.panelRight}>
                <ToastContainer />

                <div style={{ ...styles.heading, fontSize: `${config.headingSize}` }}>
                    Check Your Phone
                </div>

                <div style={styles.subHeading}>
                    A code has been sent to your Phone Number. <br />
                    Please input the code below.
                </div>

                <div style={{ marginTop: '35px', minWidth: `${config.formMinWidth}` }}>
                    
                    {/* <form> */}
                    
                    
                        <div style={{
                            display: "flex",
                            flexFlow: "row noWrap",
                            justifyContent: "center"
                        }}>
                            <FormField
                                formData={FormData}
                                change={(newFormData) => {
                                    if (newFormData.inputA.value.length > 1) {
                                        let oldValue = String(newFormData.inputA.value)[0]
                                        newFormData.inputA.value = oldValue
                                    }
                                    // Focus on Next field
                                    document.getElementById('input_b').focus()
                                    // Update FormData
                                    return setFormData({...newFormData})
                                }}
                                field={{
                                    id: "inputA",
                                    config: FormData.inputA
                                }}
                            />

                            <FormField
                                formData={FormData}
                                change={(newFormData) => {
                                    if (newFormData.inputB.value.length > 1) {
                                        let oldValue = String(newFormData.inputB.value)[0]
                                        newFormData.inputB.value = oldValue
                                    }
                                    // Focus on Next field
                                    document.getElementById('input_c').focus()
                                    // Update FormData
                                    return setFormData({...newFormData})
                                }}
                                field={{
                                    id: "inputB",
                                    config: FormData.inputB
                                }}
                            />

                            <FormField
                                formData={FormData}
                                change={(newFormData) => {
                                    if (newFormData.inputC.value.length > 1) {
                                        let oldValue = String(newFormData.inputC.value)[0]
                                        newFormData.inputC.value = oldValue
                                    }
                                    // Focus on Next field
                                    document.getElementById('input_d').focus()
                                    // Update FormData
                                    return setFormData({...newFormData})
                                }}
                                field={{
                                    id: "inputC",
                                    config: FormData.inputC
                                }}
                            />

                            <FormField
                                formData={FormData}
                                change={(newFormData) => {
                                    if (newFormData.inputD.value.length > 1) {
                                        let oldValue = String(newFormData.inputD.value)[0]
                                        newFormData.inputD.value = oldValue
                                    }
                                    // Focus on Next field
                                    document.getElementById('input_e').focus()
                                    // Update FormData
                                    return setFormData({...newFormData})
                                }}
                                field={{
                                    id: "inputD",
                                    config: FormData.inputD
                                }}
                            />


                            <FormField
                                formData={FormData}
                                change={(newFormData) => {
                                    if (newFormData.inputE.value.length > 1) {
                                        let oldValue = String(newFormData.inputE.value)[0]
                                        newFormData.inputE.value = oldValue
                                    }
                                    // Focus on Next field
                                    document.getElementById('input_f').focus()
                                    // Update FormData
                                    return setFormData({...newFormData})
                                }}
                                field={{
                                    id: "inputE",
                                    config: FormData.inputE
                                }}
                            />

                            <FormField
                                formData={FormData}
                                change={(newFormData) => {
                                    if (newFormData.inputF.value.length > 1) {
                                        let oldValue = String(newFormData.inputF.value)[0]
                                        newFormData.inputF.value = oldValue
                                    }
                                    return setFormData({...newFormData})
                                }}
                                field={{
                                    id: "inputF",
                                    config: FormData.inputF
                                }}
                            />
                        </div>

                        {/* <Button {...PageButtons.forgotPassword} /> */}

                        <Button {...PageButtons.submit} />

                        <Button {...PageButtons.resendCode} />

                    {/* </form> */}
                </div>

                <Breakpoint name="notPhone">
                    <div style={{ ...styles.dottedSquare }}>
                        <img src={require('../../../../assets/icons/dotted-square-colored.png')} />
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
                                formMinWidth: '400px',
                                headingSize: '24px',
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
                            headingSize: '24px',
                        })
                    }
                </div>
            </IsTablet>

            <IsPhone>
                <div style={styles.container.phone}>
                    {
                        MainContent({
                            formMinWidth: '200px',
                            headingSize: '24px',
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
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
        fontSize: '14px',
        lineHeight: '16px',
        color: colors.secondary,

        textAlign: "center",
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

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerificationScreen)