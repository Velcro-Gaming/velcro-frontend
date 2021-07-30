import React, { useEffect, useState } from 'react'
import ModalOverlay from '../../../../utils/overlay/ModalOverlay'
import {
    colors,
    cities
} from '../../../../App.json'
import {
    updateUser
} from '../../../../redux/actions/AuthActions'
import FormField from '../../../../utils/FormField';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../../../utils/Button';
import { PostMan } from '../../../../Helpers';
import SearchableInput from '../../../../utils/SearchableInput';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function ImageUploadModal(props) {
    const{
        auth,
        hideModal,
        imageToUpload
    } = props

    const [Buttons, setButtons] = useState({
        confirmImageUpload: {
            text: {
                color: colors.white,
                value: "Upload",
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
            onClick: () => AttemptUploadImage(),
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

    
    const AttemptUploadImage = async () => {
        // Start Loader
        let newButtons = Buttons
        newButtons.confirmImageUpload.loader.isLoading = true
        await setButtons({ ...newButtons })
        // Validate Fields
        if (!imageToUpload || !imageToUpload.raw) {
            // Toast Error Message
            toast.error('Error processing image.')
            return
        }
        //
        const imageName = () => {
            let ext = imageToUpload.raw.name.split('.')[1]
            return `${auth.user.id}V${(new Date()).getTime()}.${ext}`
        }
        const form_data = new FormData();
        form_data.append('image', imageToUpload.raw, imageName());
        //
        const responseObject = await PostMan(`account/${auth.user.id}/`, 'PATCH', form_data, false)
        // Stop Loader
        newButtons.confirmImageUpload.loader.isLoading = false
        await setButtons({ ...newButtons })
        if (responseObject.status === 'success') {
            let authResponseData = responseObject.data
            await props.updateUser(authResponseData)
            await hideModal()
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


    useEffect(() => {
        //

    }, [])


    return (
        <ModalOverlay>
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <div style={styles.header} className="text-center">Confirm Image</div>

                    <span style={{ display: 'flex', justifyContent: 'flex-end', margin: "0 0 15px"}}>
                        <Button {...Buttons.cancel} />
                    </span>

                    <div className="row">
                        <div className="col-12" 
                            style={{
                                // color: colors.grey,
                                padding: "20px 70px",
                            }}
                        >
                            <img src={imageToUpload && imageToUpload.preview} style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                // height: '350px'
                            }} />
                        </div>

                        <div className="col-12 mt-3">

                            <Button {...Buttons.confirmImageUpload} {...{ onClick: () => AttemptUploadImage() }} />

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

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploadModal)