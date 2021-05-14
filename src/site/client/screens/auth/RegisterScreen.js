import React, { useState, useEffect } from 'react';
import Header from '../../components/main/Header';
import {
    colors
} from '../../../../App.json'
import Button from '../../../../utils/Button';
import LeftPanel from '../../components/auth/LeftPanel';
import FormFields from '../../../../utils/FormFields';

import Breakpoint from '../../../../utils/breakpoints/Base'
import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Redirect } from 'react-router-dom';

import {
    register,
    login
} from '../../../../redux/actions/AuthActions'

import { PostMan } from '../../../../Helpers';
import FormField from '../../../../utils/FormField';

function Register(props) {
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
            value: 'itsobaa',
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
        callingCode: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
                },
            ],
            value: '',
            label: true,
            labelText: 'Phone number',
            props: {
                name: 'calin_code_input',
                type: 'text',
                placeholder: null,
                required: true
            }
        },
        phoneNumber: {
            element: 'input',
            value: '7081032420',
            label: true,
            labelText: '.',
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


    const FetchCountryList = async () => {
        const responseObject = await PostMan(`location/countries/`, 'GET')
        if (responseObject.status === 'success') {
            let countryData = responseObject.data
            let newFormData = FormData
            countryData.map(country => {
                newFormData.callingCode.data.push({
                    value: country.id,
                    display: `${country.iso2} (${country.calling_code})`,
                    calling_code: country.calling_code
                })
            })
            // Set Nigeria as Default
            newFormData.callingCode.value = 293
            // Update FormData in state.
            await setFormData({ ...newFormData })
        }
        else { }
    }


    const AttemptRegister = async () => {
        let formPayload = {}
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
            // Set in formPayload
            formPayload[fieldName] = fieldData.value
        }

        let actualCallingCode
        FormData.callingCode.data.map(item => {
            if (item.value === formPayload.callingCode) {
                actualCallingCode = item.calling_code
            }
        })

        let payload = {
            username: formPayload.username,
            email: formPayload.email,
            mobile: `+${actualCallingCode}${formPayload.phoneNumber}`,
            password: formPayload.password
        }

        const responseObject = await PostMan('register/', 'post', payload)

        // Stop Loader
        newPageButtons.signUp.loader.isLoading = false
        await setPageButtons({...newPageButtons})

        if (responseObject.status === 'success') {
            let authResponseData = responseObject.data
            await props.login(authResponseData)
            return setRedirect("/")
        }
        else if (responseObject.status === 'bad_request') {
            let responseData = responseObject.data
            for (let key in responseData) {
                let fieldErrors = responseData[key]
                fieldErrors.map(errorMessage => {
                    // Toast Error Message
                    toast.error(errorMessage)
                })                
            }
        }
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

                        <FormField
                            formData={FormData}
                            change={(newFormData) => setFormData({ ...newFormData })}
                            field={{
                                id: 'username',
                                config: FormData.username
                            }}
                        />

                        <FormField
                            formData={FormData}
                            change={(newFormData) => setFormData({ ...newFormData })}
                            field={{
                                id: 'email',
                                config: FormData.email
                            }}
                        />

                        <div style={{display: 'flex'}}>
                            <div style={{flexGrow: 1}}>
                                <FormField
                                    formData={FormData}
                                    change={(newFormData) => setFormData({ ...newFormData })}
                                    field={{
                                        id: 'callingCode',
                                        config: FormData.callingCode
                                    }}
                                />
                            </div>

                            <div style={{ flexGrow: 3 }}>
                                <FormField
                                    formData={FormData}
                                    change={(newFormData) => setFormData({ ...newFormData })}
                                    field={{
                                        id: 'phoneNumber',
                                        config: FormData.phoneNumber
                                    }}
                                />
                            </div>
                        </div>

                        <FormField
                            formData={FormData}
                            change={(newFormData) => setFormData({ ...newFormData })}
                            field={{
                                id: 'password',
                                config: FormData.password
                            }}
                        />

                        {/* <FormFields
                            formData={FormData}
                            change={(newFormData) => setFormData({...newFormData})}
                        /> */}

                        <Button {...PageButtons.signUp} />

                    </form>
                </div>

                <Breakpoint name="notPhone">
                    <div style={{ ...styles.dottedSquare }}>
                        <img src={require('../../../../assets/icons/dotted-square-colored.png')} />
                    </div>
                </Breakpoint>
            </div>
        )
    }


    const {
        auth
    } = props    

    useEffect(() => {
        // Redirect Loggedin users
        if (auth.loggedIn) {
            setRedirect({
                pathname: '/logout',
                state: {
                    nextUrl: `/login`,
                }
            })
        }

        // Fetch Country Codes
        FetchCountryList()

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