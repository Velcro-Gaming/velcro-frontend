import React, { useState, useEffect } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { colors } from '../../../../App.json'
import { PostMan } from '../../../../Helpers';
import {
    updateUser
} from '../../../../redux/actions/AuthActions'
import { useHistory } from 'react-router';

import AviDefault from '../../../../assets/images/avi.png'

import { FaChevronLeft } from 'react-icons/fa'
import { AiOutlineCamera } from 'react-icons/ai'

import ModalImageUpload from '../../components/main/ModalImageUpload'

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

import Button from '../../../../utils/Button';
import Header from '../../components/main/Header'
import FormField from '../../../../utils/FormField';

import { ToastContainer, toast } from 'react-toastify';


function AccountProfileScreen(props) {
    const {
        auth
    } = props

    const history = useHistory()

    const [ShowModalImageUpload, setShowModalImageUpload] = useState(false)


    const [ProfileImage, setProfileImage] = useState(null)
    // {
    //     preview: null,
    //         raw: null
    // }

    const [HeaderConfig, setHeaderConfig] = useState({
        headerButtons: [

        ],
        headerStyles: {
            backgroundColor: colors.black
        }
    })

    const [FormData, setFormData] = useState({
        bank_name: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
                },
            ],
            value: '',
            label: true,
            labelText: 'Select Bank',
            props: {
                name: 'bank_name_input',
                type: 'text',
                placeholder: null,
                required: true,
            }
        },
        account_number: {
            element: 'input',
            value: "",
            label: true,
            labelText: 'Account Number',
            props: {
                name: 'account_number_input',
                type: 'text',
                placeholder: 'Enter Account number',
                required: true,
            }
        },
    })

    const [VerificationFormData, setVerificationFormData] = useState({
        isVisible: false,
        nin: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Upload your NIN Number',
            props: {
                name: 'nin_input',
                type: 'text',
                placeholder: 'Enter NIN number',
                required: true
            }
        },
        ninConfirm: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'confirm your NIN',
            props: {
                name: 'nin_input',
                type: 'text',
                placeholder: 'Re-enter NIN number',
                required: true
            }
        },
    })

    const [PasswordFormData, setPasswordFormData] = useState({
        old_password: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Password',
            props: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter current password',
                required: true,
            }
        },
        new_password: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Password',
            props: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter a new Password (minimum of 8 characters)',
                required: true,
            }
        },
        new_password_confirm: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Password Confirmation',
            props: {
                name: 'password_input',
                type: 'password',
                placeholder: 'New Password Confirmation',
                required: true,
            }
        },
    })

    const [PageButtons, setPageButtons] = useState({
        updateInformation: {
            text: {
                color: colors.white,
                value: "Update",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '30px 0 60px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AttemptUpdateInformation(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
        changePassword: {
            text: {
                color: colors.white,
                value: "Change Password",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '30px 0 60px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AttemptChangePassword(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
        toggleVerificationForm: {
            text: {
                color: colors.white,
                value: "Verify My Account",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '30px 0 60px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => ToggleVerificationForm(),
            loader: null,
        },
        attemptVerification: {
            text: {
                color: colors.white,
                value: "Submit",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '30px 0 60px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AttemptVerification(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
    })

    const AttemptUpdateInformation = async () => {
        // Start Loader
        let newPageButtons = PageButtons
        newPageButtons.updateInformation.loader.isLoading = true
        await setPageButtons({ ...newPageButtons })
        //
        let payload = {}
        let formPayload = {
            first_name: FormData.first_name,
            last_name: FormData.last_name
        }
        // Validate Fields
        for (let formField in formPayload) {
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
        //
        const responseObject = await PostMan(`account/${auth.user.id}/`, 'PATCH', payload)
        // Stop Loader
        newPageButtons.updateInformation.loader.isLoading = false
        await setPageButtons({ ...newPageButtons })

        if (responseObject.status === 'success') {
            let authResponseData = responseObject.data
            // console.log("authResponseData: ", authResponseData)

            await props.updateUser(authResponseData)
            // return setRedirect("/")
            window.location.reload()
        }
        else if (responseObject.status === 'bad_request') {
            let responseData = responseObject.data
            for (let key in responseData) {
                let fieldErrors = responseData[key]
                fieldErrors.map(errorMessage => {
                    // Toast Error Message
                    toast.error(`${key}: ${errorMessage}`)
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

    const AttemptVerification = async () => {
        // Start Loader
        let newPageButtons = PageButtons
        newPageButtons.attemptVerification.loader.isLoading = true
        await setPageButtons({ ...newPageButtons })
        //
        let payload = {}
        let formPayload = {
            nin: VerificationFormData.nin,
            ninConfirm: VerificationFormData.ninConfirm,
        }
        // Validate Fields
        for (let formField in formPayload) {
            let fieldName = formField
            let fieldData = VerificationFormData[formField]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ') {
                    // Toast Error Message
                    toast.error(`${fieldData.labelText} field is required!`)
                    return
                }
                // Set in formPayload
                payload[fieldName] = fieldData.value
            }
        }
        // Ensure NIN match
        if (payload.nin !== payload.ninConfirm) {
            // Toast Error Message
            toast.error("NIN input don't match.")
            return
        } else {
            delete payload['ninConfirm']
        }
        //
        const responseObject = await PostMan(`account/verification/nin/`, 'POST', payload)
        // Stop Loader
        newPageButtons.attemptVerification.loader.isLoading = false
        await setPageButtons({ ...newPageButtons })

        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            let authResponseData = responseData.user
            await props.updateUser(authResponseData)
        }
        else if (responseObject.status === 'bad_request') {
            let responseData = responseObject.data
            for (let key in responseData) {
                let fieldErrors = responseData[key]
                fieldErrors.map(errorMessage => {
                    // Toast Error Message
                    toast.error(`${key}: ${errorMessage}`)
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

    const AttemptChangePassword = async () => {
        // Start Loader
        let newPageButtons = PageButtons
        newPageButtons.attemptVerification.loader.isLoading = true
        await setPageButtons({ ...newPageButtons })
        //
        let payload = {}
        let formPayload = {
            old_password: PasswordFormData.currentPassword,
            new_password: PasswordFormData.newPassword,
            new_password_confirm: PasswordFormData.newPasswordConfirm,
        }
        // Validate Fields
        for (let formField in formPayload) {
            let fieldName = formField
            let fieldData = PasswordFormData[fieldName]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ') {
                    // Toast Error Message
                    toast.error(`${fieldData.labelText} field is required!`)
                    return
                }
                // Set in formPayload
                payload[fieldName] = fieldData.value
            }
        }
        // Ensure NIN match
        if (payload.new_password !== payload.new_password_confirm) {
            // Toast Error Message
            toast.error("Passwords don't match.")
            return
        } else {
            delete payload['new_password_confirm']
        }
        //
        const responseObject = await PostMan(`account/password/change/`, 'POST', payload)
        // Stop Loader
        newPageButtons.attemptVerification.loader.isLoading = false
        await setPageButtons({ ...newPageButtons })

        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            // Toast Success Message
            toast.success(responseData.message)
            //
            let newPasswordFormData = PasswordFormData
            for (let formField in formPayload) {
                let fieldName = formField
                let fieldData = newPasswordFormData[fieldName]
                fieldData.value = ""
            }
            return setPasswordFormData(newPasswordFormData)
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
        else if (responseObject.status === 'error') {
            // Toast Error Message
            toast.error(responseObject.data.message)
        }
        else {
            console.log("Error")
        }
    }

    const FormStateChanged = () => {
        let first_name = FormData.first_name.value
        let last_name = FormData.last_name.value
        if (
            auth.user && first_name !== auth.user.first_name ||
            auth.user && last_name !== auth.user.last_name
        ) { return true }
        else { return false }
    }

    const GoBack = () => {
        return history.goBack()
    }

    const ToggleVerificationForm = () => {
        return setVerificationFormData({ ...VerificationFormData, isVisible: !VerificationFormData.isVisible })
    }

    useEffect(() => {
        //
        if (ProfileImage && !ShowModalImageUpload) {
            setShowModalImageUpload(true)
        }
    })

    const VerificationColor = {
        unverified: colors.danger,
        pending: colors.warning,
        verified: colors.success,
    }

    const MainContent = (config) => {
        return (
            <div style={styles.container}>
                <div className="container"
                    style={{
                        padding: config.containerPadding,
                    }}
                >
                    <div className={"row"}
                        style={{ padding: "0 20px" }}
                    >
                        <div className={"col-12"}
                            onClick={() => GoBack()}
                            style={styles.goBack}
                        >
                            <FaChevronLeft size={10}/>
                            <span style={{ marginLeft: '7px' }}>Back</span>
                        </div>

                        
                        <div className="col-12 col-md-6">
                            <div className={"row"}>
                                <div className={"col-12"}>
                                    <div style={styles.sectionTitle}>
                                        Withdraw
                                    </div>

                                    <FormField
                                        formData={FormData}
                                        change={(newFormData) => setFormData({ ...newFormData })}
                                        field={{
                                            id: 'first_name',
                                            config: FormData.first_name
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div style={styles.sectionTitle}>
                                        Account Details
                                    </div>

                                    <FormField
                                        formData={FormData}
                                        change={(newFormData) => setFormData({ ...newFormData })}
                                        field={{
                                            id: 'first_name',
                                            config: FormData.first_name
                                        }}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="col-12 col-md-6">
                            <div style={styles.sectionTitle}>
                                Withdrawal History
                            </div>

                            <div className={"row"}>
                                <div className="col-12">
                                    
                                </div>
                            </div>
                        </div>


                    
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div>
            <Header headerConfig={HeaderConfig} />

            <ToastContainer />

            {
                ShowModalImageUpload ? (
                    <ModalImageUpload
                        imageToUpload={ProfileImage}
                        hideModal={() => {
                            setProfileImage(null)
                            setShowModalImageUpload(false)
                        }}
                    />
                ) : null
            }

            <IsDesktop>
                {
                    MainContent({
                        profileImage: {
                            top: '100px',
                            left: '50px',
                        },
                        imageWrapper: {
                            height: '180px',
                            width: '180px',
                        },
                        changeImageWraper: {
                            bottom: '15px',
                            right: '-90px',
                        },
                        containerPadding: "50px 35px"
                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        profileImage: {
                            top: '100px',
                            left: '50px',
                        },
                        imageWrapper: {
                            height: '180px',
                            width: '180px',
                        },
                        changeImageWraper: {
                            bottom: '15px',
                            right: '-90px',
                        },
                        containerPadding: "50px 35px"
                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        profileImage: {
                            top: '170px',
                            left: '20px',
                        },
                        imageWrapper: {
                            height: '130px',
                            width: '130px',
                        },
                        changeImageWraper: {
                            bottom: '15px',
                            right: '-110px',
                        },
                        containerPadding: "50px 20px"
                    })
                }
            </IsPhone>
        </div>
    )
}


const styles = {
    container: {
        padding: "69px 0 0 0",
        backgroundColor: colors.background,
        minHeight: "100vh"
    },
    bannerWrapper: {
        height: '220px',
        backgroundImage: `url(${require('../../../../assets/images/bg-6.png')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    bannerContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        height: '100%',
        position: 'relative',
    },
    pageTitle: {
        fontSize: '34px',
        color: colors.white,
    },
    profileImage: {
        position: 'absolute',
    },
    imageWrapper: {
        objectFit: 'cover',
        border: '2px solid #7F3F98',
        boxSizing: 'border-box',
        borderRadius: '100px',
        position: 'relative',
    },
    goBack: {
        display: 'flex',
        alignItems: 'center',

        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        cursor: 'pointer',
    },
    sectionTitle: {
        fontSize: "18px",
        color: colors.grey3,
        margin: "50px 0 20px",
        fontFamily: 'Nunito Sans',
        textTransform: 'uppercase'
    },
    referralCode: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        lineHeight: '49px',
        textTransform: 'uppercase',
    },
    referralMessage: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        width: "300px",
        color: colors.primary
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfileScreen)