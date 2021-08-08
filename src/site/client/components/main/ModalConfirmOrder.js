import React, { useEffect, useState } from 'react'
import ModalOverlay from '../../../../utils/overlay/ModalOverlay'
import {
    colors,
    paystack_pub_key
} from '../../../../App.json'

import Button from '../../../../utils/Button';
import { PostMan } from '../../../../Helpers';

import SwapIcon from '../../../../assets/icons/swap_icon.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { usePaystackPayment } from 'react-paystack';

import mastercard_logo from '../../../../assets/icons/mastercard.png'


function OrderConfirmationModal(props) {
    const {
        auth,
        hideModal,
        orderPayload,
        orderFormData,
        listing,
    } = props


    
    const [Buttons, setButtons] = useState({
        confirmOrder: {
            text: {
                color: colors.white,
                value: "Confirm",
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
            onClick: () => {},
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

    const PayButton = () => {
        const paymentReference = (new Date()).getTime()
        const config = {
            reference: paymentReference,
            email: auth.user.email,
            // amount: (orderPayload.serice_fee + orderPayload.fee) * 100,
            amount: getTotalFee() * 100,
            publicKey: paystack_pub_key,
        };

        const onSuccess = () => AttemptPlaceOrder(paymentReference)
        const onClose = () => { }

        const initializePayment = usePaystackPayment(config);
        const onClick = () => initializePayment(onSuccess, onClose)

        let btnColor, txtColor
        if (orderPayload._type === 'swap') {
            btnColor = colors.primaryLight
            txtColor = colors.white
        }
        else if (orderPayload._type === 'rent') {
            btnColor = colors.primary
            txtColor = colors.white
        }
        else {
            btnColor = colors.grey1
            txtColor = colors.primary
        }

        return (<Button { ...Buttons.confirmOrder }
            {...{
                text: {
                    color: txtColor,
                    value: <span>Confirm and Pay <img src={mastercard_logo} /></span>,
                },
                styles: {
                    height: '50px',
                    width: '100%',
                    margin: '20px 0',
                    backgroundColor: btnColor,
                    border: {
                        width: '1px',
                        style: 'solid',
                        color: colors.primary,
                        radius: '4px',
                    },
                    color: colors.white
                },
                onClick: () => onClick()
            }} 
             
        />)
    };

    const AttemptPlaceOrder = async (paymentReference) => {
        // Start Loader
        let newButtons = Buttons
        newButtons.confirmOrder.loader.isLoading = true
        await setButtons({ ...newButtons })
        // Update Payload with payment reference
        let payload = orderPayload
        payload['payment_reference'] = paymentReference
        // Response Object
        const responseObject = await PostMan(`order/`, 'POST', payload)
        // Stop Loader
        newButtons.confirmOrder.loader.isLoading = false
        await setButtons({ ...newButtons })
        // Handle Response
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            // Show Success Message before Redirect
            toast.success("Order has been placed successfully")
            setTimeout(()=>{
                hideModal()
                return window.location = "/my-orders"
            }, 3000)
        }
        else {
            console.log("responseObject: ", responseObject)
        }
    }

    const AttemptAcceptOrder = async () => {
        // Start Loader
        let newButtons = Buttons
        newButtons.confirmOrder.loader.isLoading = true
        await setButtons({ ...newButtons })
        // Response Object
        const responseObject = await PostMan(`order/`, 'POST', orderPayload)
        // Stop Loader
        newButtons.confirmOrder.loader.isLoading = false
        await setButtons({ ...newButtons })
        // Handle Response
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            // Show Success Message before Redirect
            toast.success("Order has been placed successfully")
            setTimeout(() => {
                hideModal()
                return window.location = "/my-orders"
            }, 3000)
        }
        else {
            console.log("responseObject: ", responseObject)
        }
    }

    function getTotalFee() {
        const {
            delivery_fee,
            service_fee,
            fee
        } = orderPayload
        return parseInt(fee) + parseInt(delivery_fee) + parseInt(service_fee)
    }

    // console.log("orderPayload: ", orderPayload)

    useEffect(() => {
        //

    }, [])


    return (
        <ModalOverlay>
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <div style={styles.header} className="text-center">Confirm Order</div>

                    <span style={{ display: 'flex', justifyContent: 'flex-end', margin: "0 0 15px" }}>
                        <Button {...Buttons.cancel} />
                    </span>

                    <div className="row">
                        <div className="col-12">
                            <div style={{ ...styles.heading,  }}>
                                Confirm your
                            </div>

                            {
                                orderPayload._type === 'buy' ? (
                                    <div style={{ ...styles.heading, color: colors.primary, textTransform: 'capitalize' }}>
                                        Purchase
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{ ...styles.heading, }}>
                                            Order for
                                            {/* Game for */}
                                        </div>

                                        <div style={{ ...styles.heading, color: colors.primary, textTransform: 'capitalize' }}>
                                            {orderPayload._type}
                                        </div>
                                    </div>
                                )
                            }

                        </div>


                        <div className="col-12 my-4">
                            {
                                orderPayload._type === 'swap' ? (
                                    <>
                                        <div style={styles.orderFeesWrapper}>
                                            <span>Swap Items</span>
                                            <span style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                fontFamily: 'Roboto',
                                                fontSize: '14px',
                                            }}>
                                                <span style={{
                                                    backgroundColor: colors.primary,
                                                    color: colors.white,
                                                    padding: "5px 15px",
                                                    margin: "3px 0"
                                                }}>
                                                    {listing.game.name} | {listing.console.short_name}
                                                </span>

                                                <img src={SwapIcon} style={{
                                                    height: '20px',
                                                    margin: '10px',
                                                    alignSelf: 'center',
                                                    transform: "rotate(90deg)",
                                                }} />

                                                {
                                                    orderFormData.swap_items.value.map(swap_item => {
                                                        return (
                                                            <span style={{
                                                                backgroundColor: colors.primary,
                                                                color: colors.white,
                                                                padding: "5px 15px",
                                                                margin: "3px 0"
                                                            }}>
                                                                {swap_item.game.name} | {swap_item.console.short_name}
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </span>
                                        </div>

                                        <div style={styles.orderFeesWrapper}>
                                            <span>Additional Fee</span>
                                            <span style={styles.orderFees}>
                                                ₦{orderPayload.fee}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div style={styles.orderFeesWrapper}>
                                        <span>Order Fee</span>
                                        <span style={styles.orderFees}>
                                            ₦{orderPayload.fee}
                                        </span>
                                    </div>
                                )
                            }

                            <div style={styles.orderFeesWrapper}>
                                <span>Service Fee</span>
                                <span style={styles.orderFees}>
                                    ₦{orderPayload.service_fee}
                                </span>
                            </div>

                            <div style={styles.orderFeesWrapper}>
                                <span>Delivery Fee</span>
                                <span style={styles.orderFees}>
                                    ₦{orderPayload.delivery_fee}
                                </span>
                            </div>

                            <div style={{ ...styles.orderFeesWrapper, padding: '15px 15px', fontWeight: 600,}}>
                                <span>Total</span>
                                <span style={styles.orderFees}>
                                    ₦{getTotalFee()}
                                </span>
                            </div>

                            {
                                orderPayload._type !== 'buy' ? (
                                    <div style={styles.durationsWrapper}>
                                        <span>Duration</span>
                                        <span style={styles.duration}>
                                            {orderPayload.duration} weeks
                                        </span>
                                    </div>
                                ) : null
                            }

                        </div>
                        
                        <div className="col-12 mt-3">
                            <p style={styles.paragrapgh}>
                                All games sent to Velcro
                                would be tested at company HQ before being delivered. Any faulty games would be returned to the
                                Owner and will be counted as a violation against the company’s code of conduct, After a third 
                                strike the user will be barred from using the site and their account suspended permanently.
                            </p>

                            {/* <Button {...Buttons.confirmOrder} {...{ onClick: () => AttemptPlaceOrder() }} /> */}
                            <PayButton />

                            <p style={styles.paragrapgh}>
                                By clicking ‘’Confirm’’ you confirm that you have read and agreed to our terms of use and privacy policy
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
        fontWeight: 600,
        fontSize: "17px",
        lineHeight: "24px",
        color: colors.black,
        margin: "20px"
    },
    heading: {
        fontFamily: "Roboto",
        fontWeight: 600,
        fontSize: "30px",
        // lineHeight: "35px",
        color: colors.black,
    },
    paragrapgh: {
        fontSize: "14px",
        textAlign: "justify"
    },
    orderFeesWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'Nunito Sans',
        padding: '0 15px'
    },
    orderFees: {
        fontFamily: 'Roboto',
        fontSize: '14px',
        color: colors.primary
    },
    durationsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'Nunito Sans',
        padding: '20px 65px',

        fontSize: '25px',
        fontWeight: 600,
    },
    duration: {
        fontFamily: 'Roboto',
        // fontSize: '25px',
        // fontWeight: 600,
        color: colors.primary
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmationModal)