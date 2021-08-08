import React from 'react'
import {
    colors
} from '../../../../App.json'

export function RenderNotifications(notifications) {
    let notificationsArray = []
    if (notifications) {
        notifications.map(notification => {
            console.log("notification: ", notification)
            let nAction = () => { }
            let nMessage = "New Notification"

            let nType = notification._type
            let nReceipientId = notification.receipient


            let order = notification.content_object
            let orderType = order._type
            let _orderType = <span style={{ fontWeight: 600, color: colors.primary }}>{String(order._type).toUpperCase()}</span>
            let orderStatus = order.status
            let orderObj = order.listing
            let orderItem = orderObj.game
            let _orderItem = <span style={{ fontWeight: 600, color: colors.dark }}>{String(orderItem.name).toUpperCase()}</span>
            let orderItemOwner = <span style={{ fontWeight: 600, color: colors.dark }}>{orderObj.owner.username}</span>


            
            if (nType === "order") {
                // let order = notification.content_object
                // let orderType = order._type
                // let _orderType = <span style={{ fontWeight: 600, color: colors.primary }}>{String(order._type).toUpperCase()}</span>
                // let orderStatus = order.status
                // let orderObj = order.listing
                // let orderItem = orderObj.game
                // let _orderItem = <span style={{ fontWeight: 600, color: colors.dark }}>{String(orderItem.name).toUpperCase()}</span>
                // let orderItemOwner = <span style={{ fontWeight: 600, color: colors.dark }}>{orderObj.owner.username}</span>


                console.log("orderType: ", orderType)

                if (orderType === "swap") {
                    if (orderStatus.value === "pending") {
                        nMessage = (
                            <span>
                                Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title has been submitted and is pending approval from {orderItemOwner}. Approval period is maximum of 48 hours
                            </span>
                        )
                    }
                    else if (orderStatus.value === "approved") {
                        nMessage = (
                            <span>
                                Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title has been accepted. You have 24hours to complete payment
                            </span>
                        )
                    }
                    else if (orderStatus.value === "paid") {
                        nMessage = (
                            <span>
                                Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title has been has been approved. Click here to see your orders status
                            </span>
                        )
                    }
                    else if (orderStatus.value === "in_transit") {
                        nMessage = (
                            <span>
                                Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title has been approved and is currently in transit
                            </span>
                        )
                    }
                }
                else if (orderType === "rent") {
                    console.log("orderStatus: ", orderStatus)
                    
                    if (orderStatus.value === "pending") {
                        nMessage = (
                            <span>
                                Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title is pending payment. You have 1 hour to complete your order.
                            </span>
                        )
                        // nAction = () => { }
                        // console.log("nMessage: ", nMessage)
                    }
                    else if (orderStatus.value === "paid") {
                        nMessage = (
                            <span>
                                Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title has been has been Approved. Click here to see your orders status
                            </span>
                        )
                    }
                    else if (orderStatus.value === "in_transit") {
                        nMessage = (
                            <span>
                                Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title has been approved and is currently in transit
                            </span>
                        )
                    }
                    else if (orderStatus.value === "completed") {
                        nMessage = (
                            <span>
                                Your order of {_orderType} for {orderItemOwner}’s {_orderItem} title has arrived. Thank your for using velcro.
                            </span>
                        )
                    }
                }
                else if (orderType === "buy") {
                    if (orderStatus.value === "pending") {
                        nMessage = (
                            <span>
                                Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title is pending payment. You have 1 hour to complete your order.
                            </span>
                        )
                    }
                    else if (orderStatus.value === "paid") {
                        nMessage = (
                            <span>
                                Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title has been has been Approved. Click here to see your orders status
                            </span>
                        )
                    }
                    else if (orderStatus.value === "in_transit") {
                        nMessage = (
                            <span>
                                Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title has been approved and is currently in transit
                            </span>
                        )
                    }
                }



                // if (nReceipientId === orderItemOwner.id) {
                    

                // } else {

                //     //
                // }

            } else if (nType === "offer") {

                console.log("orderType: ", orderType)

                if (orderType === "swap") {
                    if (orderStatus.value === "pending") {
                        nMessage = (
                            <span>
                                An Offer of {_orderType} has been made for your {_orderItem} title. To respond, Click here. Approval period is maximum of 48 hours
                            </span>
                        )
                    }
                    else if (orderStatus.value === "approved") {
                        if (order.fee) {
                            nMessage = (
                                <span>
                                    An Offer to {_orderType} your {_orderItem} has been accepted by you. Order is now pending payment completion
                                </span>
                            )
                        } else {
                            nMessage = (
                                <span>
                                    An Offer to {_orderType} your {_orderItem} has been Accepted by you. Click here to see your orders status
                                </span>
                            )
                        }

                    }
                    else if (orderStatus.value === "paid") {
                        nMessage = (
                            <span>
                                An Offer to {_orderType} your {_orderItem} has been received. ${order.fee} will be deposited to your wallet once {_orderType} items are picked up and items pass Test-Day. Click here to see your orders status
                            </span>
                        )
                    }
                    else if (orderStatus.value === "in_transit") {
                        nMessage = (
                            <span>
                                An offer to {_orderType} your {_orderItem} title has been approved. A logistics agent would contact you shortly.
                            </span>
                        )
                    }
                }
                else if (orderType === "rent") {

                    console.log("orderStatus: ", orderStatus)
                    
                    if (orderStatus.value === "paid") {
                        nMessage = (
                            <span>
                                An offer to {_orderType} your {_orderItem} title has been received. ${order.fee} will be deposited to your wallet once it is picked up and passes Test-Day. Click here to see your orders status
                            </span>
                        )
                    }
                    else if (orderStatus.value === "in_transit") {
                        nMessage = (
                            <span>
                                An offer to {_orderType} your {_orderItem} title has been approved. A logistics agent would contact you shortly.
                            </span>
                        )
                    }
                    else if (orderStatus.value === "completed") {
                        nMessage = (
                            <span>
                                Order of {_orderType} for your {_orderItem} title has been completed and your earnings have been deposited to your wallet.
                            </span>
                        )
                    }
                }
                else if (orderStatus.value === "buy") {
                    if (orderStatus.value === "paid") {
                        nMessage = (
                            <span>
                                An offer to {_orderType} your {_orderItem} title has been received. ${order.fee} will be deposited to your wallet once it is picked up and passes Test-Day. Click here to see your orders status
                            </span>
                        )
                    }
                    else if (orderStatus.value === "in_transit") {
                        nMessage = (
                            <span>
                                An offer to {_orderType} your {_orderItem} title has been Approved. A logistics agent would contact you shortly.
                            </span>
                        )
                    }
                }
            }

            notificationsArray.push({
                name: nMessage,
                action: nAction
            })
        })

    }
    return notificationsArray
}
