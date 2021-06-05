import React, {useState} from 'react'

import Button from '../../../utils/Button';
import { colors } from '../../../App.json'
import Header from '../components/main/Header'

import AviDefault from '../../../assets/images/avi.png'

import { FaChevronLeft } from 'react-icons/fa'
import { AiOutlineCamera } from 'react-icons/ai'

import FormField from '../../../utils/FormField';
import ProtectedRoute from '../../../utils/ProtectedRoute'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    updateUser
} from '../../../redux/actions/AuthActions'


function AccountProfileScreen(props) {
    const {
        auth
    } = props

    console.log("auth.user: ", auth.user)

    const [HeaderConfig, setHeaderConfig] = useState({
        headerButtons: [
            {
                isProtected: false,
                text: {
                    color: colors.white,
                    value: "Get Started",
                },
                styles: {
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
        headerStyles: {
            backgroundColor: colors.black
        }
    })

    const [FormData, setFormData] = useState({
        first_name: {
            element: 'input',
            value: auth.user.first_name,
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
            value: auth.user.last_name,
            label: true,
            labelText: 'Last name',
            props: {
                name: 'last_name_input',
                type: 'text',
                placeholder: 'Enter last name',
                required: true
            }
        },
        username: {
            element: 'input',
            value: auth.user.username,
            label: true,
            labelText: 'Username',
            props: {
                name: 'username_input',
                type: 'text',
                placeholder: 'Enter Username',
                required: false
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
        email: {
            element: 'input',
            value: auth.user.email,
            label: true,
            labelText: 'Email',
            props: {
                name: 'email_input',
                type: 'email',
                placeholder: 'Enter email address',
                required: true,
            }
        },
        mobile: {
            element: 'input',
            value: auth.user.mobile,
            label: true,
            labelText: 'Phone number',
            props: {
                name: 'mobile_input',
                type: 'tel',
                placeholder: 'Enter phone number',
                required: true,
            }
        },
    })

    const [VerificationFormData, setVerificationFormData] = useState({
        nin: {
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
        ninConfirm: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'confirm your NIN',
            props: {
                name: 'nin_input',
                type: 'text',
                placeholder: 'Re-enter NIN number',
                required: false
            }
        },
    })

    const [PasswordFormData, setPasswordFormData] = useState({
        currentPassword: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Password',
            props: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter password',
                required: true,
            }
        },
        newPassword: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Password',
            props: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter Password (minimum of 8 characters)',
                required: true,
            }
        },
        newPasswordConfirm: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Password Confirmation',
            props: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Password Confirmation',
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
            onClick: () => AttemptRegister(),
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
            onClick: () => AttemptRegister(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
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
            onClick: () => AttemptRegister(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
    })
    
    const AttemptRegister = async () => {
        let formPayload = {}
        let newPageButtons = PageButtons

        // // Start Loader
        // newPageButtons.signUp.loader.isLoading = true
        // await setPageButtons({ ...newPageButtons })

        // // Validate Fields
        // for (let formField in FormData) {
        //     let fieldName = formField
        //     let fieldData = FormData[formField]
        //     if (fieldData.props.required) {
        //         if (!fieldData.value || fieldData.value == ' ') {
        //             // Toast Error Message
        //             toast.error(`${fieldName} field is required!`)
        //             return
        //         }
        //     }
        //     // Set in formPayload
        //     formPayload[fieldName] = fieldData.value
        // }

        // let actualCallingCode
        // FormData.callingCode.data.map(item => {
        //     if (item.value === formPayload.callingCode) {
        //         actualCallingCode = item.calling_code
        //     }
        // })

        // let payload = {
        //     username: formPayload.username,
        //     email: formPayload.email,
        //     mobile: `+${actualCallingCode}${formPayload.phoneNumber}`,
        //     password: formPayload.password
        // }

        // const responseObject = await PostMan('register/', 'post', payload)

        // // Stop Loader
        // newPageButtons.signUp.loader.isLoading = false
        // await setPageButtons({ ...newPageButtons })

        // if (responseObject.status === 'success') {
        //     let authResponseData = responseObject.data
        //     await props.login(authResponseData)
        //     return setRedirect("/")
        // }
        // else if (responseObject.status === 'bad_request') {
        //     let responseData = responseObject.data
        //     for (let key in responseData) {
        //         let fieldErrors = responseData[key]
        //         fieldErrors.map(errorMessage => {
        //             // Toast Error Message
        //             toast.error(errorMessage)
        //         })
        //     }
        // }
        // else if (responseObject.status === 'error') {
        //     // Toast Error Message
        //     toast.error(responseObject.data.message)
        // }
        // else {
        //     console.log("Error")
        // }


    }
    

    return (
        <ProtectedRoute>
            <div>
                <Header headerConfig={HeaderConfig} />

                <div style={styles.container}>
                    <div style={styles.bannerWrapper}>
                        <div className="container" style={styles.bannerContent}>

                            <div style={styles.goBack}>
                                <FaChevronLeft size={10} />
                                <span style={{ marginLeft: '7px' }}>Back</span>
                            </div>

                            <div style={styles.profileImage}>
                                <img style={styles.imageWrapper} src={AviDefault} />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                    position: 'absolute',
                                    bottom: '15px',
                                    right: '-90px',
                                }}>
                                    <span style={{ backgroundColor: colors.grey, color: colors.primary, height: '25px', width: '25px', borderRadius: '50%', textAlign: 'center' }}>
                                        <AiOutlineCamera />
                                    </span>

                                    <p style={{ color: colors.grey3, margin: '0 0 0 5px', fontSize: '15px' }}>
                                        Change Avatar
                                </p>
                                </div>
                            </div>

                            <div style={styles.pageTitle}>
                                Account
                        </div>
                        </div>
                    </div>


                    <div className="container" style={{ backgroundColor: colors.grey2, padding: "50px 35px" }}>

                        <div className={"row"} style={{ padding: "0 30px" }}>

                            <div className="col-12 col-md-6">
                                <div style={styles.sectionTitle}>
                                    Referral Code
                            </div>

                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <div style={styles.referralCode}>
                                            {auth.user.referral_code}
                                        </div>

                                        <p style={styles.referralMessage}>
                                            For 50% off on your next Order if you bring
                                            a new user to Velcro Gaming using this code
                                    </p>
                                    </div>
                                </div>
                            </div>


                            <div className="col-12 col-md-6">
                                <div style={styles.sectionTitle}>
                                    Verification
                            </div>

                                <div className={"row"}>
                                    <div className="col-12">
                                        <div>
                                            <span>status:</span>
                                            <span style={{ color: colors.danger, margin: "0 0 0 10px" }}>
                                                not verified
                                        </span>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <FormField
                                            formData={VerificationFormData}
                                            change={(newFormData) => setVerificationFormData({ ...newFormData })}
                                            field={{
                                                id: 'nin',
                                                config: VerificationFormData.nin
                                            }}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <FormField
                                            formData={VerificationFormData}
                                            change={(newFormData) => setVerificationFormData({ ...newFormData })}
                                            field={{
                                                id: 'ninConfirm',
                                                config: VerificationFormData.ninConfirm
                                            }}
                                        />
                                    </div>

                                    <div className={"col-12"}>
                                        <Button {...PageButtons.attemptVerification} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">

                                <div style={styles.sectionTitle}>
                                    Edit account Information
                                </div>

                                <form className="row">
                                    <div className="col-12 col-md-6">
                                        <FormField
                                            formData={FormData}
                                            change={(newFormData) => setFormData({ ...newFormData })}
                                            field={{
                                                id: 'first_name',
                                                config: FormData.first_name
                                            }}
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
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
                                                id: 'username',
                                                config: FormData.username
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

                                    <div className="col-12">
                                        <FormField
                                            formData={FormData}
                                            change={(newFormData) => setFormData({ ...newFormData })}
                                            field={{
                                                id: 'mobile',
                                                config: FormData.mobile
                                            }}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <FormField
                                            formData={FormData}
                                            change={(newFormData) => setFormData({ ...newFormData })}
                                            field={{
                                                id: 'console',
                                                config: FormData.console
                                            }}
                                        />
                                    </div>

                                    <div className={"col-12"}>
                                        <Button {...PageButtons.updateInformation} />
                                    </div>
                                </form>
                            </div>


                            <div className="col-12 col-md-6">
                                <div style={styles.sectionTitle}>
                                    Change password
                            </div>

                                <div className={"row"}>
                                    <div className="col-12">
                                        <FormField
                                            formData={PasswordFormData}
                                            change={(newFormData) => setFormData({ ...newFormData })}
                                            field={{
                                                id: 'currentPassword',
                                                config: PasswordFormData.currentPassword
                                            }}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <FormField
                                            formData={PasswordFormData}
                                            change={(newFormData) => setFormData({ ...newFormData })}
                                            field={{
                                                id: 'newPassword',
                                                config: PasswordFormData.newPassword
                                            }}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <FormField
                                            formData={PasswordFormData}
                                            change={(newFormData) => setFormData({ ...newFormData })}
                                            field={{
                                                id: 'newPasswordConfirm',
                                                config: PasswordFormData.newPasswordConfirm
                                            }}
                                        />
                                    </div>

                                    <div className={"col-12"}>
                                        <Button {...PageButtons.changePassword} />
                                    </div>
                                </div>

                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}


const styles = {
    container: {
        padding: "69px 0 0 0",
        backgroundColor: colors.background,
    },
    bannerWrapper: {
        height: '220px',
        backgroundImage: `url(${require('../../../assets/images/bg-6.png')})`,
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
        top: '100px',
        left: '50px',
    },
    imageWrapper: {
        height: '180px',
        width: '180px',
        objectFit: 'cover',
        border: '2px solid #7F3F98',
        boxSizing: 'border-box',
        borderRadius: '100px',

        position: 'relative',
    },
    goBack: {
        display: 'flex',
        alignItems: 'center',

        position: 'absolute',
        top: '30px',
        left: '50px',

        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
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