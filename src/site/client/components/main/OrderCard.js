import React, { useState } from 'react'

import { PostMan } from '../../../../Helpers';
import { colors, paystack_pub_key } from '../../../../App.json'

import BlankImage from '../../../../assets/images/game-0.png'
import Button from '../../../../utils/Button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { usePaystackPayment } from 'react-paystack';

import GameCard from './GameCard'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaCheck, FaShippingFast, FaRegClock } from 'react-icons/fa'


function OrderCard(props) {
    const {
        auth,
        self
    } = props

    let listing = self.listing

    const [Buttons, setButtons] = useState({
        payNow: {
            text: {
                color: colors.white,
                value: "Pay Now",
            },
            styles: {
                height: '30px',
                width: '100%',
                margin: null,
                fontSize: "13px",
                backgroundColor: colors.success,
                border: {
                    width: null,
                    style: null,
                    color: null,
                    radius: null,
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
    })

    const AttemptPlaceOrder = async (paymentReference) => {
        // Start Loader
        let newButtons = Buttons
        newButtons.payNow.loader.isLoading = true
        await setButtons({ ...newButtons })
        // Set Payload
        let payload = { payment_reference: paymentReference }
        // Response Object
        const responseObject = await PostMan(`order/${self.id}/`, 'PATCH', payload)
        // Stop Loader
        newButtons.payNow.loader.isLoading = false
        await setButtons({ ...newButtons })
        // Handle Response
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            // Show Success Message before Redirect
            toast.success("Order has been placed successfully")
            setTimeout(() => {
                return window.location = "/my-orders"
            }, 3000)
        }
        else {
            console.log("responseObject: ", responseObject)
        }
    }    

    const PayButton = () => {
        const paymentReference = (new Date()).getTime()
        const config = {
            reference: paymentReference,
            email: auth.user.email,
            amount: self.fee * 100,
            publicKey: paystack_pub_key,
        };

        const onSuccess = () => AttemptPlaceOrder(paymentReference)
        const onClose = () => { }

        const initializePayment = usePaystackPayment(config);
        const onClick = () => initializePayment(onSuccess, onClose)

        return (<Button 
            {...Buttons.payNow}
            {...{
                onClick: () => onClick()
            }}
        />)
    };

    return (
        <GameCard self={listing.game} listing={listing}>
            <ToastContainer />

            {
                self.status.value === "pending" ? (
                    <div style={{
                        backgroundColor: colors.grey1, margin: '10px 0'
                    }}>
                        <div style={{ padding: '5px', fontSize: '10px', color: colors.grey3 }}>
                            Payment required to finalize {self._type} order
                        </div>
                    </div>
                ) : null
            }
            {
                self.status.value === "paid" ? (
                    <div style={{
                        backgroundColor: colors.grey1, margin: '10px 0'
                    }}>
                        <div style={{ padding: '5px', fontSize: '11px', color: colors.white }}>
                            <span style={{ margin: '0 5px' }}>
                                <FaRegClock color={colors.white} size={12} />
                            </span>
                            Your {self._type} order is being processed.
                        </div>
                    </div>
                ) : null
            }
            {
                self.status.value === "in_progress" ? (
                    <div style={{
                        backgroundColor: colors.warning, margin: '10px 0'
                    }}>
                        <div style={{ padding: '5px', fontSize: '11px', color: colors.white }}>
                            <span style={{ margin: '0 5px' }}>
                                <FaRegClock color={colors.white} size={12} />
                            </span>
                            Your {self._type} order is being processed.
                        </div>
                    </div>
                ) : null
            }
            {
                self.status.value === "in_transit" ? (
                    <div style={{
                        backgroundColor: colors.primaryLight, margin: '10px 0'
                    }}>
                        <div style={{ padding: '5px', fontSize: '11px', color: colors.white }}>
                            <span style={{ margin: '0 5px' }}>
                                <FaShippingFast color={colors.white} size={11} />
                            </span>
                            Your {self._type} order is now in transit.
                        </div>
                    </div>
                ) : null
            }
            {
                self.status.value === "completed" ? (
                    <div style={{ margin: '10px 0' }}>
                        {
                            self._type === "buy" ? (
                                <div style={{
                                    backgroundColor: colors.success, margin: '10px 0'
                                }}>
                                    <div style={{ padding: '5px', fontSize: '11px', color: colors.white }}>
                                        <span style={{ margin: '0 5px' }}>
                                            <FaCheck color={colors.white} size={11} />
                                        </span>
                                        Your {self._type} order is completed.
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{
                                        backgroundColor: colors.grey1, padding: '2px',
                                        position: 'relative'
                                    }}>
                                        <div
                                            style={{
                                                height: '15px', width: '20%',
                                                backgroundColor: colors.primary,
                                            }}
                                        />
                                    </div>

                                    <div style={{ fontSize: '10px', color: colors.grey3 }}>
                                        In your possession
                                    </div>
                                </div>
                            )
                        }
                    </div>
                ) : null
            }

            <div className="d-flex justify-content-between align-items-center">
                <div>
                    {
                        self.payment_status === "pending" ? <PayButton /> : null
                    }
                </div>

                {/* <div style={styles.gameStatus.wrapper}>
                    <span style={styles.gameStatus.heading}>
                        Type
                    </span>

                    <span style={styles.gameStatus.content}>
                        {self._type}
                    </span>
                </div> */}
            </div>


        </GameCard>
    )

}


const styles = {
    wrapper: {
        position: 'absolute',
        padding: '10px 15px',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: "10px",
    },
    title: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        borderBottom: "1px solid black",
        padding: "0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    attrib: {
        fontFamily: "Nunito Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "11px",
        lineHeight: "15px",

    },
    gameStatus: {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center"
        },
        heading: {
            fontFamily: "Nunito Sans",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "8px",
            lineHeight: "8px",
        },
        content: {
            fontFamily: "Nunito Sans",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "10px",
            lineHeight: "12px",
            textTransform: "capitalize"
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard)