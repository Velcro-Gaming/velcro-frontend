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

    const [Address, setAddress] = useState({
        addressLine: "",
        city: null,
        state: null,
        country: null,
    })

    const [Buttons, setButtons] = useState({
        confirmAddress: {
            text: {
                color: colors.white,
                value: "Confirm Address",
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
            onClick: () => AttemptAddAddress(),
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

    
    const ParseAddress = () => {
        let address_line = deliveryFormData.address_line.value

        let cityId = deliveryFormData.city.value
        let city
        deliveryFormData.city.data.map(cityObj => {
            if (cityObj.value === parseInt(cityId)) { return city = cityObj.display }
        })

        let stateId = deliveryFormData.state.value
        let state
        deliveryFormData.state.data.map(stateObj => {
            if (stateObj.value === parseInt(stateId)) { return state = stateObj.display }
        })

        let countryId = deliveryFormData.country.value
        let country
        deliveryFormData.country.data.map(countryObj => {
            if (countryObj.value === parseInt(countryId)) { return country = countryObj.display }
        })

        setAddress({
            addressLine: address_line,
            city: {
                id: parseInt(cityId),
                name: city
            },
            state: {
                id: parseInt(stateId),
                name: state
            },
            country: {
                id: parseInt(countryId),
                name: country
            },
        })
    }

    const AttemptAddAddress = async () => {
        // Start Loader
        let newButtons = Buttons
        newButtons.confirmAddress.loader.isLoading = true
        await setButtons({ ...newButtons })
        // Payload
        let payload = {
            "user": auth.user.id,
            "address_line": Address.addressLine,
            "location": Address.city.id,
        }
        // Response Object
        const responseObject = await PostMan(`address/`, 'POST', payload)
        // Stop Loader
        newButtons.confirmAddress.loader.isLoading = false
        await setButtons({ ...newButtons })
        // Handle Response
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            hideModal()
            return window.location.reload()
        }
        else {
            console.log("responseObject: ", responseObject)
        }
    }


    useEffect(() => {
        // Parse and set Address Data
        ParseAddress()

    }, [])


    return (
        <ModalOverlay>
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <div style={styles.header} className="text-center">Confirm Your Address</div>

                    <span style={{ display: 'flex', justifyContent: 'flex-end', margin: "0 0 15px"}}>
                        <Button {...Buttons.cancel} />
                    </span>

                    <div className="row">
                        <div className="col-4" style={{ color: colors.grey }}>
                            Address Line
                        </div>
                        <div className="col-8">
                            {Address.addressLine}
                        </div>

                        <div className="col-4" style={{ color: colors.grey }}>
                            City
                        </div>
                        <div className="col-8">
                            {Address.city && Address.city.name}
                        </div>

                        <div className="col-4" style={{ color: colors.grey }}>
                            State
                        </div>
                        <div className="col-8">
                            {Address.state && Address.state.name}
                        </div>

                        <div className="col-4" style={{ color: colors.grey }}>
                            Country
                        </div>
                        <div className="col-8">
                            {Address.country && Address.country.name}
                        </div>

                        <div className="col-12 mt-3">

                            <Button {...Buttons.confirmAddress} {...{ onClick: () => AttemptAddAddress() }} />

                            <p style={styles.paragrapgh}>
                                By clicking ‘’Confirm Address’’ you confirm that the above address is correct.
                            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadGameModal)