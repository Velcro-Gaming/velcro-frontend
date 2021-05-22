import React from 'react'
import { colors } from '../../../../App.json'

import {
    useRouteMatch,
    useLocation,
    Redirect,
    withRouter
} from 'react-router-dom';

export default function GameRent() {

    const match = useRouteMatch();
    const gameSlug = match.params.gameSlug;
    console.log("gameSlug: ", gameSlug)

    const GoBackToScratch = () => {
        return <Redirect to={`/search/${gameSlug}`} />
    }

    // Redirect if missing state
    const { state } = useLocation()
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
                    GAME RENT
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
                            <div style={{ display: 'flex', margin: '15px 0' }}>
                                <div style={{ flex: 1, color: colors.primary, fontSize: '14px' }}>
                                    Rental Fee:
                                </div>
                                <div style={{ flex: 2 }}>
                                    N2500 <span style={{ fontSize: '12px', color: colors.grey3 }}>per week</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', margin: '15px 0' }}>
                                <div style={{ flex: 1, color: colors.primary, fontSize: '14px' }}>
                                    Duration:
                                </div>
                                <div style={{ flex: 2 }}>
                                    <select>
                                        <option value="0">---</option>
                                        <option value="1">1 Month</option>
                                        <option value="2">2 Month</option>
                                        <option value="3">3 Month</option>
                                    </select>
                                </div>
                            </div>
                        </div>

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
