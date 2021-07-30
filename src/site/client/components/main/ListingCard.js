import React, { useState } from 'react'
import { colors } from '../../../../App.json'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BlankImage from '../../../../assets/images/game-0.png'
import Button from '../../../../utils/Button'

import GameCard from './GameCard'
import Avatar from '../../../../assets/images/avi.png'

function ListingCard(props) {
    const {
        auth,
        self
    } = props

    console.log("Self: ", self)
    console.log("Self.owner: ", self.owner)

    console.log("self.owner.id: ", self.owner.id)
    console.log("auth.user.id: ", auth.user.id)
    console.log(auth.user.id === self.owner.id)

    let game = self.game

    const [Buttons, setButtons] = useState({
        rent: {
            text: {
                color: colors.white,
                value: "Rent",
            },
            styles: {
                height: '30px',
                width: '100%',
                padding: '0 25px',
                margin: '0 10px 0 0',
                fontSize: '12px',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            linkTo: {
                pathname: `/order/${game.slug}/rent`,
                state: { listing:self, game }
            }
        },
        swap: {
            text: {
                color: colors.primary,
                value: "Swap",
            },
            styles: {
                height: '30px',
                width: '100%',
                padding: '0 25px',
                margin: '0 10px 0 0',
                fontSize: '12px',
                backgroundColor: colors.tetiary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            linkTo: {
                pathname: `/order/${game.slug}/swap`,
                state: { listing:self, game }
            }
        },
        buy: {
            text: {
                color: colors.primary,
                value: "Buy",
            },
            styles: {
                height: '30px',
                width: '100%',
                padding: '0 25px',
                margin: '0 10px 0 0',
                fontSize: '12px',
                backgroundColor: colors.grey2,
                border: {
                    width: "1px",
                    style: "solid",
                    color: "#641E6E",
                    radius: "3px",
                },
                color: colors.white
            },
            linkTo: {
                pathname: `/order/${game.slug}/buy`,
                state: { listing:self, game }
            }
        },
        initiateReturn: {
            text: {
                color: colors.white,
                value: "Initiate Return",
            },
            styles: {
                height: '35px',
                width: '100%',
                margin: null,
                fontSize: "11px",
                backgroundColor: colors.primary,
                border: {
                    width: null,
                    style: null,
                    color: null,
                    radius: null,
                },
                color: colors.white
            },
            onClick: () => { }
        },
    })

    // {
    //     name: "Fifa 20",
    //     numberOfOrders: 2,
    //     amountEarned: 20000,
    //     imageUrl: null,
    //     status: "swapped"
    // }

    // console: 5
    // game:
    //     category: "sport"
    //     id: 2
    //     image: "http://api.velcrogaming.local:8080/media/weather_illustration.png"
    //     name: "Fifa 20"
    //     slug: "fifa-20"
    // id: 3
    // original_case: false
    // rent: false
    // rent_amount: "0.00"
    // sell: false
    // sell_amount: "0.00"
    // swap: true

    // console.log("Listing: ", self)

    return (
        <GameCard self={self.game} listing={self}>
            
            {
                auth.user && auth.user.id == self.owner.id ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "5px 0 0" }}>

                        <div style={{ display: 'flex' }}>
                            <div style={styles.attribWrapper}>
                                Revenue
                                <div style={styles.attrib}>
                                    ₦{self.orders.earned}
                                </div>
                            </div>

                            <div style={styles.attribWrapper}>
                                Orders
                                <div style={styles.attrib}>
                                    {self.orders.count}
                                </div>
                            </div>
                        </div>

                        <div>
                            {
                                self.status === "rented" || self.status === "swapped" ? (
                                    <Button {...Buttons.initiateReturn} />
                                ) : null
                            }
                        </div>

                    </div>
                ) : (
                        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', margin: "5px 0 0" }}>
                        {
                            self.rent ? (
                                <Button {...Buttons.rent} />
                            ) : null
                        }

                        {
                            self.swap ? (
                                <Button {...Buttons.swap} />
                            ) : null
                        }

                        {
                            self.sell ? (
                                <Button {...Buttons.buy} />
                            ) : null
                        }
                    </div>
                )
            }

            
        </GameCard>
    )
}


const styles = {
    card: {
        backgroundColor: colors.white,
        padding: '15px',

        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
    },
    title: {
        fontFamily: "Nunito Sans",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "22px",
        margin: "5px 0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    gameCoverImage: {
        height: "200px",
        objectFit: "cover",
        borderRadius: "5px",
    },
    attribWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: colors.primary,
        fontFamily: "Roboto",
        fontSize: "6px",
        marginRight: "10px",
    },
    attrib: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${colors.dark}`,
        fontFamily: "Nunito Sans",
        fontSize: "10px",
        borderRadius: "3px",
        color: colors.grey3,
        minHeight: "30px",
        minWidth: "30px",
        padding: "5px",
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

export default connect(mapStateToProps, mapDispatchToProps)(ListingCard)