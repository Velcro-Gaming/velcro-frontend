import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { colors } from '../../../../App.json';
import { PostMan } from '../../../../Helpers';
import { GrLocation } from 'react-icons/gr';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

import Button from '../../../../utils/Button';



function ListingCard(props) {
    const {
        auth,
        game,
        listing,
        isSavedListing
    } = props

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
                margin: '10px',
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
                margin: '10px',
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
                margin: '10px',
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

    const getUserInitials = (user) => {
        // props.logout()
        if (user.full_name) {
            let userFullName = user.full_name
            let firstName = userFullName.split(' ')[0]
            let lastName = userFullName.split(' ')[1]
            return `${firstName[0]}${lastName[0]}`.toUpperCase()
        }
        return `${user.username[0]}${user.username[0]}`.toUpperCase()
    }

    const ToggleSaveListing = async (listing) => {
        let payload = {
            listing: listing.id
        }
        const responseObject = await PostMan(`listing/saved/`, 'POST', payload)
        if (responseObject.status === 'success') {
            // let myGames = responseObject.data
            // Save Games to state
            window.location.reload()
        }
        else { }
    }

    
    const MainContent = (config) => {
        const {
            container,
            button,
            attrib,
            attribWrapper
        } = config

        return (
            <div style={{
                ...styles.container,
                flexDirection: container.flexDirection,
                padding: container.padding,
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', padding: "15px 10px" }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        {
                            listing.owner.image ? (
                                <img src={listing.owner.image} style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: colors.grey,
                                    color: colors.primary,
                                    height: '32px',
                                    width: '32px',
                                    borderRadius: '50%',
                                    fontSize: '15px',
                                    lineHeight: '20px',
                                }}>
                                    {getUserInitials(listing.owner)}
                                </div>
                            )
                        }

                        <div style={{ color: colors.primary, margin: "0 0 0 15px" }}>
                            {listing.owner.username}
                        </div>
                    </div>

                    <div style={{ margin: "20px 0 0" }}>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: "14px", color: colors.dark }}>
                            Console:
                            <div style={{ margin: "0 0 0 10px", color: colors.grey3 }}>
                                {listing.console.short_name}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', fontSize: "14px", color: colors.dark }}>
                            Original Case:
                            {
                                listing.original_case ? (
                                    <div style={{ margin: "0 0 0 10px", color: colors.success }}>Yes</div>
                                ) : (
                                    <div style={{ margin: "0 0 0 10px", color: colors.danger }}>No</div>
                                )
                            }
                        </div>
                    </div>
                </div>


                <IsDesktop>
                    <div style={{ height: "auto", width: "2px", backgroundColor: colors.grey1, margin: "10px 20px" }} />
                </IsDesktop>


                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5px' }}>

                    {
                        auth.user && auth.user.id == listing.owner.id ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', }}>

                                <div style={{ display: 'flex' }}>
                                    <div style={{
                                        ...styles.attribWrapper,
                                        margin: attribWrapper.margin,
                                        fontSize: attribWrapper.fontSize
                                    }}>
                                        Revenue
                                        <div style={{
                                            ...styles.attrib,
                                            fontSize: attrib.fontSize,
                                            padding: attrib.padding,
                                        }}>
                                            ₦{listing.orders.earned}
                                        </div>
                                    </div>

                                    <div style={{
                                        ...styles.attribWrapper,
                                        margin: attribWrapper.margin,
                                        fontSize: attribWrapper.fontSize
                                    }}>
                                        Orders
                                        <div style={{
                                            ...styles.attrib,
                                            fontSize: attrib.fontSize,
                                            padding: attrib.padding,
                                        }}>
                                            {listing.orders.count}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {
                                        listing.status === "rented" || listing.status === "swapped" ? (
                                            <Button {...Buttons.initiateReturn} />
                                        ) : null
                                    }
                                </div>

                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                {
                                    listing.rent ? (
                                        <Button {...Buttons.rent} {...{
                                            styles: {
                                                height: button.height,
                                                width: button.width,
                                                margin: button.margin,
                                                fontSize: button.fontSize,
                                                backgroundColor: colors.primary,
                                                border: {
                                                    width: "1px",
                                                    style: "solid",
                                                    color: colors.white,
                                                    radius: "3px",
                                                },
                                                color: colors.white
                                            },
                                        }} />
                                    ) : null
                                }

                                {
                                    listing.swap ? (
                                        <Button {...Buttons.swap} {...{
                                            styles: {
                                                height: button.height,
                                                width: button.width,
                                                margin: button.margin,
                                                fontSize: button.fontSize,
                                                backgroundColor: colors.tetiary,
                                                border: {
                                                    width: "1px",
                                                    style: "solid",
                                                    color: colors.white,
                                                    radius: "3px",
                                                },
                                                color: colors.white
                                            }
                                        }} />
                                    ) : null
                                }

                                {
                                    listing.sell ? (
                                        <Button {...Buttons.buy} {...{
                                            styles: {
                                                height: button.height,
                                                width: button.width,
                                                margin: button.margin,
                                                fontSize: button.fontSize,
                                                backgroundColor: colors.grey2,
                                                border: {
                                                    width: "1px",
                                                    style: "solid",
                                                    color: "#641E6E",
                                                    radius: "3px",
                                                },
                                                color: colors.white
                                            },
                                        }} />
                                    ) : null
                                }
                            </div>
                        )
                    }

                    <div style={{ alignSelf: 'flex-end', fontSize: "14px", color: colors.grey3 }}>
                        <GrLocation /> Ikeja, Lagos
                    </div>
                </div>

                <div className={"hover-primary"}
                    onClick={() => ToggleSaveListing(listing)}
                    style={{
                        position: 'absolute',
                        right: 0, top: 0,
                        fontSize: "14px",
                        padding: "15px"
                    }}
                >
                    {
                        isSavedListing(listing) ? (
                            <FaHeart color={colors.primary} />
                        ) : (
                            <FaRegHeart color={colors.primary} />
                        )
                    }
                </div>

            </div>
        )
    }

    return (
        <div>
            <IsDesktop>
                {
                    MainContent({
                        container: {
                            flexDirection: "row",
                            padding: "15px 20px",
                        },
                        button: {
                            height: '40px',
                            width: '110px',
                            margin: '70px 10px',
                            fontSize: '14px'
                        },
                        attribWrapper: {
                            margin: "70px 10px",
                            fontSize: "12px",
                        },
                        attrib: {
                            fontSize: "15px",
                            padding: "10px",
                        }
                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        container: {
                            flexDirection: "column",
                            padding: "15px 20px",
                        },
                        button: {
                            height: '35px',
                            width: '100px',
                            margin: '10px',
                            fontSize: '12px'
                        },
                        attribWrapper: {
                            margin: '10px',
                            fontSize: "8px",
                        }               ,
                        attrib: {
                            fontSize: "12px",
                            padding: "7px",
                        } 
                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        container: {
                            flexDirection: "column",
                            padding: "15px 15px",
                        },
                        button: {
                            height: '35px',
                            width: '75px',
                            margin: '10px 5px',
                            fontSize: '10px'
                        },
                        attribWrapper: {
                            margin: '10px 5px',
                            fontSize: "10px",
                        },
                        attrib: {
                            fontSize: "10px",
                            padding: "5px",
                        }
                    })
                }
            </IsPhone>
        </div>
    )
}


const styles = {
    container: {
        position: 'relative',
        display: "flex",
        background: colors.grey2,
        border: "1px solid #D0D0D0",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        margin: "20px 0",
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
        borderRadius: "3px",
        color: colors.grey3,
        minHeight: "30px",
        minWidth: "30px",
    },
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