import React, { useState } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { colors } from '../../../../App.json'

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

import Button from '../../../../utils/Button';

import { GrLocation } from 'react-icons/gr';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { PostMan } from '../../../../Helpers';
import OrderCard from './OrderCard';
import Header from './Header'


function OfferCard(props) {
    const {
        auth,
        self
    } = props

    let listing = self.listing
    let game = listing.game    

    console.log("auth: ", auth)
    console.log("self: ", self)

    const [Buttons, setButtons] = useState({
        rent: {
            text: {
                color: colors.white,
                value: "Rent",
            },
            styles: {
                height: '45px',
                width: '120px',
                margin: '30px 15px',
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
                state: { game, listing }
            }
        },
        swap: {
            text: {
                color: colors.primary,
                value: "Swap",
            },
            styles: {
                height: '45px',
                width: '120px',
                margin: '30px 15px',
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
                state: { game, listing }
            }
        },
        buy: {
            text: {
                color: colors.primary,
                value: "Buy",
            },
            styles: {
                height: '45px',
                width: '120px',
                margin: '30px 15px',
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
                state: { game, listing }
            }
        }
    })

    
    const StatusColor = {
        "rent": {
            background: colors.primary,
            color: colors.white,
        },
        "swap": {
            background: colors.primaryLight,
            color: colors.white,
        },
        "buy": {
            background: colors.grey2,
            color: colors.primary,
        },
    }

    const getPickupAddress = () => {
        if (self.pickup_address) {
            return self.pickup_address.full_address
        } else if (auth.user.default_address) {
            return auth.user.default_address.full_address
        } else { return null}
    }

    const MainContent = (config) => {
        return (
            <div style={{ ...styles.wrapper, padding: config.wrapper.padding, }}>
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', }}>
                    <div style={styles.game.root}>
                        <img src={listing.game.image} style={styles.game.image} />
                        <div style={styles.game.name}>
                            {listing.game.name}
                        </div>
                    </div>
                </div>


                <div style={{ width: '50%', ...styles.offerMetaWrapper, flexDirection: config.metaWrapper.flexDirection }}>
                    <div style={{ ...styles.offerCondition, }}>
                        <div style={{ margin: '10px' }}>
                            <span style={styles.offerConditionKey}>Fee</span>
                            <span style={styles.offerConditionValue}>
                                ${self.fee}
                            </span>
                        </div>

                        {
                            self._type == 'buy' ? null : (
                                <div style={{ margin: '10px' }}>
                                    <span style={styles.offerConditionKey}>Duration</span>
                                    <span style={styles.offerConditionValue}>
                                        {self.duration} Wks
                                    </span>
                                </div>
                            )
                        }
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'center', }}>
                        <div style={{ ...styles.offerStatus, color: colors.white }}>
                            {self.status.display}
                        </div>

                    </div>
                </div>


                <div style={{
                    backgroundColor: StatusColor[self._type].background,
                    color: StatusColor[self._type].color,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    padding: '10px 15px',
                    fontSize: '12px',
                    textTransform: 'uppercase'
                }}>
                    {self._type}
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,

                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: "14px",
                    color: colors.grey3,
                    padding: '10px 15px',
                }}>
                    <span style={{
                        ...styles.addressWrapper,
                        flexDirection: config.address.flexDirection,
                        width: config.address.width
                    }}>
                        <span style={{ fontWeight: 'bold', margin: '0 5px' }}>
                            <GrLocation /> Delivery:
                        </span>

                        <span style={styles.addressValue}>
                            {self.delivery_address.short_address}
                        </span>
                    </span>

                    <span style={{ 
                            ...styles.addressWrapper, 
                            flexDirection: config.address.flexDirection,
                            width: config.address.width
                        }}>
                        <span style={{ fontWeight: 'bold', margin: '0 5px' }}>
                            <GrLocation /> Pick up:
                        </span>

                        <span style={styles.addressValue}>
                            {
                                getPickupAddress()
                            }
                        </span>
                    </span>
                </div>
            </div>
        )
    }
    
    return (
        <>
            <IsDesktop>
                {
                    MainContent({
                        wrapper: {
                            padding: "30px 50px 60px",
                        },
                        metaWrapper: {
                            flexDirection: "row",
                        },
                        address: {
                            flexDirection: "row",
                            width: "auto"
                        }
                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        wrapper: {
                            padding: "30px 50px 70px",
                        },
                        metaWrapper: {
                            flexDirection: "column",
                        },
                        address: {
                            flexDirection: "row",
                            width: "300px"
                        }
                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        wrapper: {
                            padding: "30px 20px 100px",
                        },
                        metaWrapper: {
                            flexDirection: "column",
                        },
                        address: {
                            flexDirection: "column",
                            width: "200px"
                        }
                    })
                }
            </IsPhone>
        </>
    )
}


const styles = {
    wrapper: {
        position: 'relative',
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        background: colors.white,
        border: "1px solid #D0D0D0",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        margin: "20px 0",
    },
    game: {
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        image: {
            height: "100px",
            width: "100px",
            objectFit: 'cover'
        },
        name: {
            color: colors.primary,
            fontFamily: 'IBM Plex Sans',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '14px',
        }
    },

    offerMetaWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    offerCondition: {
        display: 'flex',
        flexDirection: 'column',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
    },
    offerConditionKey: {
        color: colors.grey3,
        fontFamily: 'Source Sans Pro',
    },
    offerConditionValue: {
        margin: '0 5px',
        padding: '5px 10px',
        backgroundColor: colors.grey1
    },
    offerStatus: {
        margin: '0 5px',
        padding: '5px 10px',
        backgroundColor: colors.grey3
    },

    addressWrapper: { 
        display: 'flex',
        whiteSpace: "nowrap",
                
    },
    addressValue: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
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

export default connect(mapStateToProps, mapDispatchToProps)(OfferCard)