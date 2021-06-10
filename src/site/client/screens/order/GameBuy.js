import React, { useEffect } from 'react'
import { colors } from '../../../../App.json'

import {
    useRouteMatch,
    useLocation,
    Redirect,
    withRouter
} from 'react-router-dom';
import FormField from '../../../../utils/FormField';

export default function GameBuy(props) {

    console.log("useLocation(): ", useLocation())

    const match = useRouteMatch();
    const { state } = useLocation()
    
    const gameSlug = match.params.gameSlug;
    console.log("gameSlug: ", gameSlug)

    const {
        setListing,
        setActiveForm,
        orderFormData,
        updateOrderFormData,
    } = props
    console.log("props: ", props)

    useEffect(() => {
        // Set Listing in Parent Component State
        if (state) { setListing(state.listing) }
        // Set Form Meta in Parent Component State
        setActiveForm({
            title: 'buy'
        })
        // Set Game Amount
        if (state) { SetBuyAmount() }
    }, [])

    const GoBackToScratch = () => {
        return <Redirect to={`/search/${gameSlug}`} />
    }

    const SetBuyAmount = () => {
        let newOrderFormData = orderFormData
        newOrderFormData.buy_amount.value = Listing.sell_amount
        newOrderFormData.buy_amount.props.disabled = true
        updateOrderFormData(newOrderFormData)
    }

    // Redirect if missing state
    if (!state || !state.game || !state.listing) {
        return GoBackToScratch()
    }

    const {
        game: Game,
        listing: Listing
    } = state

    console.log("Game: ", Game)
    console.log("Listing: ", Listing)

    return (
        <div style={styles.container}>

            <div style={styles.wrapper}>
                <div style={{ color: colors.primary, fontWeight: 800, fontSize: '20px', margin: '0 0 30px', textAlign: 'center' }}>
                    GAME BUY
                </div>

                <div style={{ display: "flex" }}>
                    <div style={styles.gameWrapper}>
                        <div style={styles.gameCover}>
                            <img src={Game && Game.image} style={styles.gameCoverImage} />
                        </div>
                        <div style={styles.gameName}>
                            {Game && Game.name}
                        </div>

                        <div style={styles.gameAttrib}>
                            owner: <p style={{ color: colors.grey3, margin: '0 5px' }}>{Listing && Listing.owner.username}</p>
                        </div>

                        <div style={styles.gameAttrib}>
                            console: <p style={{ color: colors.grey3, margin: '0 5px' }}>{Listing && Listing.console.name}</p>
                        </div>
                    </div>


                    <div style={styles.orderInfoWrapper}>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ color: colors.primary, fontSize: '17px' }}>
                                    {orderFormData.buy_amount.labelText}
                                </div>
                                <div style={{ padding: '10px 25px', fontSize: '20px' }}>
                                    ${orderFormData.buy_amount.value}
                                </div>
                            </div>
                        </div>

                        {/* <FormField
                            formData={orderFormData}
                            change={(newFormData) => updateOrderFormData({...newFormData})}
                            field={{
                                id: 'buy_amount',
                                config: orderFormData.buy_amount
                            }}
                        /> */}

                        <p style={{ fontFamily: 'Nunito Sans', fontSize: '11px', textAlign: 'center', color: colors.primary }}>
                            Every Order on Velcro Gaming is entitled to a “Grace” Period  (24 Hours) after an order has been completed during which an order can be terminated and after which the order period begins. During this period you are required to use the game to determine its condition. The user is required to test the game initiate a  return if the Item is in poor condition or does not work to satisfaction.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

const styles = {
    wrapper: {
        backgroundColor: colors.white,
        padding: "50px 100px"
    },
    gameWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
    },
    gameCover: {
        borderRadius: "14px",
        border: "2px solid #7F3F98"
    },
    gameCoverImage: {
        width: "220px",
        height: "250px",
        objectFit: "cover",
        borderRadius: "10px",
        margin: "3px"
    },
    gameName: {
        fontFamily: 'Roboto',
        fontStyle: "normal",
        textTransform: "uppercase",
        fontSize: "20px",
        lineHeight: "32px",
        margin: "10px 0 5px",
    },
    gameAttrib: {
        display: 'flex',
        color: colors.grey,
        fontSize: "14px",
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 600,
    },
    // gameCategory: {
    //     backgroundColor: "#3D61DF",
    //     color: colors.white,
    //     padding: "5px 10px",
    //     fontSize: "14px",
    //     lineHeight: "19px",
    // },

    orderInfoWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-between',
        padding: "0 30px"
    },
}
