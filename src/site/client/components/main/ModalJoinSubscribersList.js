import React, { useEffect, useState } from 'react'
import ModalOverlay from '../../../../utils/overlay/ModalOverlay'
import {
    colors,
} from '../../../../App.json'

import FormField from '../../../../utils/FormField';
import Button from '../../../../utils/Button';
import { PostMan } from '../../../../Helpers';

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GamerImage from '../../../../assets/icons/gamer.png'


function ModalJoinSubscribersList(props) {
    const {
        auth,
        hideModal,
    } = props

    const [ShowSubscribeForm, setShowSubscribeForm] = useState(null)

    const [FormData, setFormData] = useState({
        first_name: {
            element: 'input',
            value: "",
            label: true,
            labelText: 'First Name',
            props: {
                name: 'first_name_input',
                type: 'text',
                placeholder: 'Enter first name',
                required: true,
                disabled: false,
            }
        },
        last_name: {
            element: 'input',
            value: "",
            label: true,
            labelText: 'Last Name',
            props: {
                name: 'last_name_input',
                type: 'text',
                placeholder: 'Enter last name',
                required: true,
                disabled: false,
            }
        },
        email: {
            element: 'input',
            value: "",
            label: true,
            labelText: 'Email Address',
            props: {
                name: 'email_input',
                type: 'email',
                placeholder: 'Enter Email Address',
                required: true,
                disabled: false,
            }
        },
    })

    const [Buttons, setButtons] = useState({
        attemptSubscribe: {
            text: {
                color: colors.white,
                value: "Subscribe",
            },
            styles: {
                height: '50px',
                width: '150px',
                margin: '30px 0',
                backgroundColor: colors.primary,
                border: {
                    width: null,
                    style: null,
                    color: null,
                    radius: null,
                },
                color: colors.white
            },
            onClick: () => setShowSubscribeForm(true),
        },
        cancelAttemptSubscribe: {
            text: {
                color: colors.danger,
                value: "Cancel",
            },
            styles: {
                height: '50px',
                width: '150px',
                margin: '20px 0',
                backgroundColor: null,
                border: {
                    width: '2px',
                    style: 'solid',
                    color: colors.danger,
                    radius: null,
                },
                color: colors.white
            },
            onClick: () => setShowSubscribeForm(false),
        },
        subscribe: {
            text: {
                color: colors.white,
                value: "Submit",
            },
            styles: {
                height: '50px',
                width: '150px',
                margin: '20px 0',
                backgroundColor: colors.primary,
                border: {
                    width: '2px',
                    style: 'solid',
                    color: colors.primary,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AttemptJoinSubscribersList(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
        cancel: {
            text: {
                color: colors.primary,
                value: "cancel",
            },
            styles: {
                height: '30px',
                width: null,
                margin: null,
                backgroundColor: null,
                border: {
                    width: null,
                    style: null,
                    color: null,
                    radius: null,
                },
                color: colors.white
            },
            onClick: () => hideModal(),
            loader: null,
        },
    })

    const AttemptJoinSubscribersList = async () => {
        // Start Loader
        let newButtons = Buttons
        newButtons.subscribe.loader.isLoading = true
        await setButtons({ ...newButtons })
        // Payload
        let payload = {}
        // Validate Fields
        for (let formField in FormData) {
            let fieldName = formField
            let fieldData = FormData[formField]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ') {
                    // Toast Error Message
                    toast.error(`${fieldData.labelText} field is required!`)
                    return
                }
            }
            // Set in formPayload
            payload[fieldName] = fieldData.value
        }

        // Response Object
        const responseObject = await PostMan(`account/subscribe/`, 'POST', payload)
        
        // Stop Loader
        newButtons.subscribe.loader.isLoading = false
        await setButtons({ ...newButtons })
        
        // Handle Response
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            toast.success(responseData.message)
            setTimeout(()=> {
                // Hide Modal
                hideModal()
            }, 3000)
        }
        else if (responseObject.status === 'bad_request') {
            let responseData = responseObject.data
            if (responseData.message) {
                // Toast Error Message
                toast.error(responseData.message)
            } else {
                for (let key in responseData) {
                    let fieldErrors = responseData[key]
                    fieldErrors.map(errorMessage => {
                        // Toast Error Message
                        toast.error(`${key}: ${errorMessage}`)
                    })
                }
            }
        }
        else {
            console.log("responseObject: ", responseObject)
        }
    }


    useEffect(() => {
        //

    }, [])

    
    const MainContent = (config) => {
        return (
            <div style={styles.wrapper}>
                <div style={{ ...styles.container, ...config.container}}>
                    {/* <div style={styles.header} className="text-center">Subscribe</div> */}

                    <span style={{ display: 'flex', justifyContent: 'flex-end', margin: "0 0 15px" }}>
                        <Button {...Buttons.cancel} />
                    </span>

                    <div className="row">
                        <div className="col-md-6 text-center">
                            <img style={{ ...config.bannerImage }} src={GamerImage} />
                        </div>
                        <div className="col-md-6">

                            {
                                ShowSubscribeForm ? (
                                    <>
                                        <div className="row">
                                            <div className="col-12">
                                                <div style={{
                                                    fontFamily: 'Nunito Sans',
                                                    fontSize: '20px',
                                                    margin: '0 0 10px'
                                                }}>
                                                    Enter your information below.
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <FormField
                                                    formData={FormData}
                                                    change={(newFormData) => setFormData({ ...newFormData })}
                                                    field={{
                                                        id: 'first_name',
                                                        config: FormData.first_name
                                                    }}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <FormField
                                                    formData={FormData}
                                                    change={(newFormData) => setFormData({ ...newFormData })}
                                                    field={{
                                                        id: 'last_name',
                                                        config: FormData.last_name
                                                    }}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <FormField
                                                    formData={FormData}
                                                    change={(newFormData) => setFormData({ ...newFormData })}
                                                    field={{
                                                        id: 'email',
                                                        config: FormData.email
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                        }}>
                                            <span style={{ margin: '0 5px' }}>
                                                <Button {...Buttons.subscribe} />
                                            </span>

                                            <span style={{ margin: '0 5px' }}>
                                                <Button {...Buttons.cancelAttemptSubscribe} />
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            style={{
                                                fontFamily: 'Oxanium',
                                                fontWeight: 600,
                                                fontSize: '30px',
                                            }}
                                        >
                                            SUBSCRIBE
                                        </div>

                                        <div style={{
                                            fontFamily: 'Oxanium',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            margin: '5px 0 15px',
                                            color: colors.primary
                                        }}>
                                            To Our Newsletter
                                        </div>
                                        <div style={{
                                            fontFamily: 'Nunito Sans'
                                        }}>
                                            Velcro Gaming is currently in development so we can’t let you see what’s under the hood just yet. However, you
                                            can receive regular updates via your mail on our launch progress and when you can start enjoying Velcro Gaming
                                            by subscribing below.
                                        </div>

                                        <Button {...Buttons.attemptSubscribe} />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <ModalOverlay>
            
            <IsDesktop>
                {
                    MainContent({
                        container: {
                            borderRadius: "15px",
                        },
                        bannerImage: {
                            width: "350px"
                        },
                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        container: {
                            borderRadius: "15px",
                        },
                        bannerImage: {
                            width: "350px"
                        },
                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        container: {
                            width: "100%",
                            height: "100%",
                            padding: "20px 20px",
                            overflowY: "auto",
                        },
                        bannerImage: {
                            width: "300px"
                        },
                    })
                }
            </IsPhone>

            <ToastContainer />

        </ModalOverlay>
    )
}


const styles = {
    wrapper: { // Centered Content
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        width: "100%",
        height: "100%",
    },

    container: {
        backgroundColor: colors.white,
        maxWidth: "850px",
        padding: "20px 30px",
        
    },

    header: {
        fontFamily: "Nunito Sans",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "17px",
        lineHeight: "24px",
        color: colors.black,
        margin: "20px"
    },
    paragrapgh: {
        fontSize: "14px",
        textAlign: "justify"
    },
}



const mapDispatchToProps = dispatch => {
    return bindActionCreators({

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalJoinSubscribersList)