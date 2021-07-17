import React, { useState, useEffect } from 'react'
import { colors } from '../../../../App.json'
import Button from '../../../../utils/Button'
import { BiCheck, BiUser } from 'react-icons/bi'

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

import GameCard from '../../components/main/GameCard'
import OrderCard from '../../components/main/OrderCard'

import { Redirect } from 'react-router'
import { PostMan } from '../../../../Helpers'
import { AiOutlineSearch } from 'react-icons/ai'

function MyOrdersScreen(props) {
    const [MyOrders, setMyOrders] = useState([])
    const [redirect, setRedirect] = useState(null)
    const [ActiveScreen, setActiveScreen] = useState({
        name: '',
        path: '/'
    })
    const [PageButtons, setPageButtons] = useState({
        searchGames: {
            text: {
                color: colors.white,
                value: <span>Find Your Next Game <AiOutlineSearch /> </span>,
            },
            styles: {
                height: '25px',
                width: '150px',
                margin: null,
                backgroundColor: colors.primary,
                fontSize: '10px',
                border: {
                    width: null,
                    style: null,
                    color: null,
                    radius: '12.5px',
                },
                color: colors.white
            },
            onClick: () => setRedirect('/search'),
        },

    })
    
    const FetchMyOrders = async () => {
        const responseObject = await PostMan(`order/all/`, 'GET')
        if (responseObject.status === 'success') {
            let orders = responseObject.data
            console.log("orders: ", orders)
            // let myGames = responseData.data
            // Save Games to state
            await setMyOrders(orders)
        }
        else { }
    }
    

    const MainContent = (config) => {
        // const 
        if (MyOrders.length > 0) {
            return (
                <div className="row" style={{minHeight: '500px'}}>
                    {
                        MyOrders.map(order => {
                            console.log("Order: ", order)
                            return (
                                <OrderCard
                                    self={order}
                                />
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <div style={{ 
                    margin: config.wrapperMargin,
                    backgroundColor: colors.white,
                    borderRadius: '15px',
    
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img style={{ margin: '100px 0 0 0' }} src={require('../../../../assets/icons/caution.png')} />
    
                    <div style={{ ...styles.prompt, fontSize: config.promptSize }}>
                        You have not Ordered any Games
                    </div>
    
                    <Button {...PageButtons.searchGames} />
    
                    <div style={styles.alertWrapper}>
                        <BiUser />
    
                        <div style={styles.alert}>
                            Your accout is verified.
                        </div>
                        
                        <BiCheck />
                    </div>
                </div>
            )
        }
    }

    useEffect(()=>{
        // Set Active Screen
        props.setActiveScreen({
            name: 'myOrders',
            path: '/my-orders'
        })

        // Fetch User Games
        FetchMyOrders()
    }, [])
    
    if (redirect) {
        return <Redirect to={redirect} />
    }

    
    return (
        <div style={styles.container}>
            <IsDesktop>
                { 
                    MainContent({
                        promptSize: '35px',
                        wrapperMargin: '80px 150px',
                    })
                }
            </IsDesktop>

            <IsTablet>
                { 
                    MainContent({
                        promptSize: '25px',
                        wrapperMargin: '80px 100px',
                    })
                }
            </IsTablet>

            <IsPhone>
                { 
                    MainContent({
                        promptSize: '15px',
                        wrapperMargin: '50px 35px',
                    })
                }
            </IsPhone>
        </div>
    )
}

const styles = {
    container: {
        padding: '0 0 100px 0'
    },
    prompt: {
        // fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        lineHeight: '42px',
        textAlign: 'center',
        color: colors.grey,
        margin: '50px 0',
    },
    alertWrapper: {
        margin: '50px 0',
        padding: '0 10px',
        height: '51px',
        display: 'flex',
        alignItems: 'center',
        background: '#E8FEE7',
        // backgroundColor: '#4CAF50'
    },
    alert: {
        margin: '50px 0',
        fontSize: '9px',
        padding: '0 10px',
    },
}


export default (MyOrdersScreen)