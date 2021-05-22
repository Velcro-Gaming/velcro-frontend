import React, { useState } from 'react'

import { colors } from '../../../../App.json'
import Button from '../../../../utils/Button';

import { GrLocation } from 'react-icons/gr';
import { FaRegHeart } from 'react-icons/fa';

export default function GameListingCard(props) {
    const {
        game,
        listing
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

    //

    
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

    
    return (
        <div style={styles.gameListing}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: "20px 15px" }}>
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

                <div style={{ display: 'flex', alignItems: 'center', fontSize: "14px", color: colors.dark, margin: "20px 0" }}>
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


            <div style={{ height: "auto", width: "2px", backgroundColor: colors.grey2, margin: "10px 20px" }} />


            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                <div style={{ alignSelf: 'flex-end', fontSize: "14px", color: colors.primary }}>
                    <FaRegHeart />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    {
                        listing.rent ? (
                            <Button {...Buttons.rent} />
                        ) : null
                    }

                    {
                        listing.swap ? (
                            <Button {...Buttons.swap} />
                        ) : null
                    }

                    {
                        listing.sell ? (
                            <Button {...Buttons.buy} />
                        ) : null
                    }
                </div>

                <div style={{ alignSelf: 'flex-end', fontSize: "14px", color: colors.grey3 }}>
                    <GrLocation /> Ikeja, Lagos
                </div>
            </div>

        </div>
    )
}


const styles = {
    gameListing: {
        display: "flex",
        background: colors.grey1,
        border: "1px solid #D0D0D0",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",

        margin: "20px 0",

        padding: "15px 40px"
    }
}