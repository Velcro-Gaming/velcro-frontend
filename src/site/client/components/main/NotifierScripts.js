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
            if (nType === "order") {
                let order = notification.content_object
                let orderType = order._type
                let _orderType = <span style={{ fontWeight: 600, color: colors.primary }}>{String(order._type).toUpperCase()}</span>
                let orderStatus = order.status
                let orderObj = order.listing
                let orderItem = orderObj.game
                let _orderItem = <span style={{ fontWeight: 600, color: colors.dark }}>{String(orderItem.name).toUpperCase()}</span>
                let orderItemOwner = <span style={{ fontWeight: 600, color: colors.dark }}>{orderObj.owner.username}</span>


                if (nReceipientId === orderItemOwner.id) {
                    if (orderType === "swap") {
                        if (orderStatus === "pending") {
                            nMessage = `An Offer of ${_orderType} has been made for your ${_orderItem} title. To respond, Click here. Approval period is maximum of 48 hours`
                        }
                        else if (orderStatus === "approved") {
                            if (order.fee) {
                                nMessage = `An Offer to ${_orderType} your ${_orderItem} has been accepted by you. Order is now pending payment completion`
                            } else {
                                nMessage = `An Offer to ${_orderType} your ${_orderItem} has been Accepted by you. Click here to see your orders status`
                            }

                        }
                        else if (orderStatus === "paid") {
                            nMessage = `An Offer to ${_orderType} your ${_orderItem} has been received. $${order.fee} will be deposited to your wallet once ${_orderType} items are picked up and items pass Test-Day. Click here to see your orders status`
                        }
                        else if (orderStatus === "in_transit") {
                            nMessage = `An offer to ${_orderType} your ${_orderItem} title has been approved. A logistics agent would contact you shortly.`
                        }
                    }
                    else if (orderStatus === "rent") {
                        if (orderStatus === "paid") {
                            nMessage = `An offer to ${_orderType} your ${_orderItem} title has been received. $${order.fee} will be deposited to your wallet once it is picked up and passes Test-Day. Click here to see your orders status`
                        }
                        else if (orderStatus === "in_transit") {
                            nMessage = `An offer to ${_orderType} your ${_orderItem} title has been approved. A logistics agent would contact you shortly.`
                        }
                    }
                    else if (orderStatus === "buy") {
                        if (orderStatus === "paid") {
                            nMessage = `An offer to ${_orderType} your ${_orderItem} title has been received. $${order.fee} will be deposited to your wallet once it is picked up and passes Test-Day. Click here to see your orders status`
                        }
                        else if (orderStatus === "in_transit") {
                            nMessage = `An offer to ${_orderType} your ${_orderItem} title has been Approved. A logistics agent would contact you shortly.`
                        }
                    }

                } else {

                    console.log("orderType: ", orderType)

                    if (orderType === "swap") {
                        if (orderStatus === "pending") {
                            nMessage = (
                                <span>
                                    Your Offer of ${_orderType} for ${orderItemOwner}’s ${_orderItem} title has been submitted and is pending approval from ${orderItemOwner}. Approval period is maximum of 48 hours
                                </span>
                            )
                        }
                        else if (orderStatus === "approved") {
                            nMessage = (
                                <span>
                                    Your Offer of ${_orderType} for ${orderItemOwner}’s ${_orderItem} title has been accepted. You have 24hours to complete payment
                                </span>
                            )
                        }
                        else if (orderStatus === "paid") {
                            nMessage = (
                                <span>
                                    Your Offer of ${_orderType} for ${orderItemOwner}’s ${_orderItem} title has been has been approved. Click here to see your orders status
                                </span>
                            )
                        }
                        else if (orderStatus === "in_transit") {
                            nMessage = (
                                <span>
                                    Your Offer of ${_orderType} for ${orderItemOwner}’s ${_orderItem} title has been approved and is currently in transit
                                </span>
                            )
                        }
                    }
                    else if (orderType === "rent") {
                        if (orderStatus === "pending") {
                            nMessage = (
                                <span>
                                    Your Offer of {_orderType} for {orderItemOwner}’s {_orderItem} title is pending payment. You have 1 hour to complete your order.
                                </span>
                            )
                            nAction = () => { }
                        }
                        else if (orderStatus === "paid") {
                            nMessage = (
                                <span>
                                    Your Offer of ${_orderType} for ${orderItemOwner}’s ${_orderItem} title has been has been Approved. Click here to see your orders status
                                </span>
                            )
                        }
                        else if (orderStatus === "in_transit") {
                            nMessage = (
                                <span>
                                    Your Offer of ${_orderType} for ${orderItemOwner}’s ${_orderItem} title has been approved and is currently in transit
                                </span>
                            )
                        }
                    }
                    else if (orderType === "buy") {
                        if (orderStatus === "pending") {
                            nMessage = (
                                <span>
                                    Your Offer of ${_orderType} for ${orderItemOwner}’s ${_orderItem} title is pending payment. You have 1 hour to complete your order.
                                </span>
                            )
                        }
                        else if (orderStatus === "paid") {
                            nMessage = (
                                <span>
                                    Your Offer of ${_orderType} for ${orderItemOwner}’s ${_orderItem} title has been has been Approved. Click here to see your orders status
                                </span>
                            )
                        }
                        else if (orderStatus === "in_transit") {
                            nMessage = (
                                <span>
                                    Your Offer of ${_orderType} for ${orderItemOwner}’s ${_orderItem} title has been approved and is currently in transit
                                </span>
                            )
                        }
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
