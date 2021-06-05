import React, { useState, useEffect } from 'react';
import Header from '../../components/main/Header';
import {
    colors
} from '../../../../App.json'
import { PostMan } from '../../../../Helpers';
import {
    useLocation,
    Redirect
} from 'react-router-dom'
import {
    updateUser
} from '../../../../redux/actions/AuthActions'

import Button from '../../../../utils/Button';
import LeftPanel from '../../components/auth/LeftPanel';
import FormField from '../../../../utils/FormField';

import Breakpoint from '../../../../utils/breakpoints/Base'
import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function VerificationScreen(props) {    
    const [redirect, setRedirect] = useState(null)
    const [HeaderConfig, setHeaderConfig] = useState({
        headerButtons: [
        ],
        headerStyles: {
            backgroundColor: null
        },
        isVisible: false
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
            onClick: () => AttemptSubmit(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
    })
    const [FormData, setFormData] = useState({
        first_name: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'First name',
            props: {
                name: 'first_name_input',
                type: 'text',
                placeholder: 'Enter first name',
                required: true
            }
        },
        last_name: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Last name',
            props: {
                name: 'last_name_input',
                type: 'text',
                placeholder: 'Enter last name',
                required: true
            }
        },
        console: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
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
        referal_code: {
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
        // nin: {
        //     element: 'input',
        //     value: '',
        //     label: true,
        //     labelText: 'Upload your NIN Number',
        //     props: {
        //         name: 'nin_input',
        //         type: 'text',
        //         placeholder: 'Enter NIN number',
        //         required: false
        //     }
        // },
    })
    

    const FetchConsoleList = async () => {
        const responseObject = await PostMan(`console/all/`, 'GET')
        if (responseObject.status === 'success') {
            let consoleData = responseObject.data
            let newFormData = FormData
            consoleData.map(console => {
                newFormData.console.data.push({
                    value: console.id,
                    display: console.name,
                })
            })
            // Update FormData in state.
            await setFormData({ ...newFormData })
        }
        else { }
    }


    const AttemptSubmit = async() => {
        let payload = {}

        // Validate Fields
        for (let formField in FormData) {
            let fieldName = formField
            let fieldData = FormData[formField]
            console.log("required: ", fieldData.props.required)
            if (!fieldData.value || fieldData.value == ' ' || fieldData.value == 0) {
                if (fieldData.props.required) {
                    // Toast Error Message
                    toast.error(`${fieldData.labelText} field is required!`)
                    return
                }
            } else {
                //
                payload[fieldName] = fieldData.value
            }
        }

        const responseObject = await PostMan(`account/${props.auth.user.id}/registration/extra/`, 'POST', payload)
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            // Toast Success Message
            toast.success(responseData.message)
            //
            let userData = responseData.user
            await props.updateUser(userData)
            //
            setRedirect("/")
        }
        else if (responseObject.status === 'bad_request') {
            // Toast Error Message
            toast.error(responseObject.data.message)
        }
        else if (responseObject.status === 'error') {
            // Toast Error Message
            toast.error(responseObject.data.message)
        }
    }

    const MainContent = (config) => {
        return (
            <div style={styles.panelRight}>

                <ToastContainer />

                <div style={{ ...styles.heading, fontSize: `${config.headingSize}` }}>
                    Welcome to Velcro Gaming!
                </div>

                <div style={{ marginTop: '35px', minWidth: `${config.formMinWidth}` }}>
                    <form>
                        <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
                            <FormField
                                formData={FormData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'first_name',
                                    config: FormData.first_name
                                }}
                            />

                            <FormField
                                formData={FormData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'last_name',
                                    config: FormData.last_name
                                }}
                            />
                        </div>
                        <FormField
                            formData={FormData}
                            change={(newFormData) => setFormData({...newFormData})}
                            field={{
                                id: 'console',
                                config: FormData.console
                            }}
                        />

                        <div style={{ ...styles.comment }}>
                            Your first order is free of Service Charge when you register with a friends referral code
                        </div>

                        <FormField
                            formData={FormData}
                            change={(newFormData) => setFormData({...newFormData})}
                            field={{
                                id: 'referal_code',
                                config: FormData.referal_code
                            }}
                        />

                        {/* <div style={{ ...styles.comment, color: `${colors.primary}` }}>
                            You may skip this step, but You will not have access to all Velcro Gaming features till you do
                        </div>

                        <FormField
                            formData={FormData}
                            change={(newFormData) => setFormData({...newFormData})}
                            field={{
                                id: 'nin',
                                config: FormData.nin
                            }}
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

    // Use Effect
    useEffect(()=> {
        // Fetch Console List on page load
        FetchConsoleList()
    }, [])

    // Redirect
    if (redirect) {
        return <Redirect to={redirect} />
    }

    //
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
        overflowX: 'scroll',
    },
    heading: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: '34px',
        lineHeight: '40px',
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
        updateUser
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