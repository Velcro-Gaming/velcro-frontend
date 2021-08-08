import React, { useEffect, useState } from 'react'
import ModalOverlay from '../../../../utils/overlay/ModalOverlay'
import {
    colors,
    cities
} from '../../../../App.json'

import FormField from '../../../../utils/FormField';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../../../utils/Button';
import { PostMan } from '../../../../Helpers';
import SearchableInput from '../../../../utils/SearchableInput';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function UploadGameModal(props) {
    const{
        auth,
        hideModal,
        deliveryFormData
    } = props

    const [BankInfo, setBankInfo] = useState(null)

    const [Buttons, setButtons] = useState({
        confirmBankAccount: {
            text: {
                color: colors.white,
                value: "Confrim Account",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '20px 0',
                backgroundColor: colors.grey3,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.primary,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => ConfirmBankAccount(),
            // onClick: () => {},
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
        attemptAddBankAccount: {
            text: {
                color: colors.white,
                value: "Save Account",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '20px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AttemptAddBankAccount(),
            // onClick: () => {},
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

    const [FormData, setFormData] = useState({
        bank_code: {
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
                name: 'bank_code_input',
                type: 'text',
                placeholder: null,
                required: true,
                disabled: false
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
                disabled: false,
            }
        },
    })


    const FetchBankList = async () => {
        const responseObject = await PostMan(`wallet/banks/paystack/`, 'GET')
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            console.log("responseData: ", responseData)
            let bankList = responseData.banks
            let newFormData = FormData
            bankList.map(bank => {
                newFormData.bank_code.data.push({
                    value: bank.code,
                    display: bank.name,
                })
            })
            // Update BankList in state.
            await setFormData({ ...newFormData })
        }
        else { }
    }

    const ConfirmBankAccount = async () => {
        // Start Loader
        let newButtons = Buttons
        newButtons.confirmBankAccount.loader.isLoading = true
        await setButtons({ ...newButtons })
        // Payload
        let payload = {}
        let formPayload = {
            "bank_code": FormData.bank_code,
            "account_number": FormData.account_number,
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
        // Response Object
        const responseObject = await PostMan(`wallet/bank-account/verify/`, 'POST', payload)
        // Stop Loader
        newButtons.confirmBankAccount.loader.isLoading = false
        await setButtons({ ...newButtons })
        // Handle Response
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            let bankInfo = responseData.bank
            console.log("bankInfo: ", bankInfo)
            // await setBankInfo(bankInfo)
            setBankInfo(bankInfo)
            
            // hideModal()
            //
            let newFormData = FormData
            for (let formField in formPayload) {
                let fieldData = newFormData[formField]
                fieldData.props.disabled = true
            }
            setFormData({...newFormData})
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

    const AttemptAddBankAccount = async (BankInfo) => {
        // Start Loader
        let newButtons = Buttons
        newButtons.attemptAddBankAccount.loader.isLoading = true
        await setButtons({ ...newButtons })
        // Payload
        let payload = {
            user: auth.user.id,
            bank_code: BankInfo.code,
            account_name: BankInfo.account_name,
            account_number: BankInfo.account_number,
        }
        // Response Object
        const responseObject = await PostMan(`wallet/bank-account/`, 'POST', payload)
        // Stop Loader
        newButtons.attemptAddBankAccount.loader.isLoading = false
        await setButtons({ ...newButtons })
        // Handle Response
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            hideModal()
            return window.location.reload()
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
        // Fetch Bank list
        FetchBankList()

    }, [])


    return (
        <ModalOverlay>
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <div style={styles.header} className="text-center">Enter Account Information</div>

                    <span style={{ display: 'flex', justifyContent: 'flex-end', margin: "0 0 15px"}}>
                        <Button {...Buttons.cancel} />
                    </span>

                    <div className="row">
                        <div className="col-12 mt-3">

                            <FormField
                                formData={FormData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'bank_code',
                                    config: FormData.bank_code
                                }}
                            />

                            <FormField
                                formData={FormData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'account_number',
                                    config: FormData.account_number
                                }}
                            />

                            {
                                BankInfo ? (
                                    <>
                                        <p style={styles.paragrapgh}>
                                            {BankInfo.account_name}
                                        </p>

                                        <Button {...Buttons.attemptAddBankAccount} {...{
                                            onClick: () => AttemptAddBankAccount(BankInfo)
                                        }} />
                                    </>
                                ) : (
                                        <Button {...Buttons.confirmBankAccount} />
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>

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
        width: "450px",
        padding: "20px 30px"
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
        textAlign: "end"
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadGameModal)