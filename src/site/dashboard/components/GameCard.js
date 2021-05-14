import React, { useState } from 'react'
import { colors } from '../../../App.json'

// import BlankImage from '../../../../assets/images/game-0.png'
// import Button from '../../../../utils/Button'

export default function GameCard(props) {
    const [Buttons, setButtons] = useState({
        swapped: {
            text: {
                color: colors.white,
                value: "I Want This Back",
            },
            styles: {
                height: '35px',
                width: '100%',
                margin: null,
                fontSize: "13px",
                backgroundColor: colors.primary,
                border: {
                    width: null,
                    style: null,
                    color: null,
                    radius: null,
                },
                color: colors.white
            },
            onClick: () => {}
        },
        rented: {
            text: {
                color: colors.white,
                value: "Initiate Return",
            },
            styles: {
                height: '35px',
                width: '100%',
                margin: null,
                fontSize: "13px",
                backgroundColor: colors.grey,
                border: {
                    width: null,
                    style: null,
                    color: null,
                    radius: null,
                },
                color: colors.white
            },
            onClick: () => {}
        },
    })
    
    const {
        config
    } = props
    return (
        // {
        //     name: "Fifa 20",
        //     numberOfOrders: 2,
        //     amountEarned: 20000,
        //     imageUrl: null,
        //     status: "swapped"
        // }

        // category: "others"
        // consoles: (10)[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        // id: 1
        // image: "http://api.velcrogaming.local:8080/media/Roddy-2020.jpg"
        // name: "Roddy Ricch"
        // slug: "roddy-ricch"

        <div className="col-12 col-md-6 col-lg-3 my-3">
            <div className="card" style={styles.card}>
                <img src={config.image} style={styles.gameCoverImage} />
                
                {/* {
                    config.adminGames.coverImage ? (
                        <img src={config.adminGames.coverImage} style={styles.gameCoverImage} />
                    ) : <img src={BlankImage} style={styles.gameCoverImage} />
                } */}

                
                
                <div style={styles.title}>
                    {config.name}
                </div>

                {/* <div style={styles.attrib}>
                    Number of Orders:
                    <span style={{ color: colors.grey, margin: "0 5px" }}>
                        {config.adminGames.numberOfOrders}
                    </span>
                </div> */}

                {/* <div style={styles.attrib}>
                    Amount Earned:
                    <span style={{ color: colors.grey, margin: "0 5px" }}>
                        ₦{config.adminGames.amountEarned}
                    </span>
                </div> */}

                {/* <div className="d-flex justify-content-between align-items-center" style={{ height: "50px", margin: "10px 0 0" }}>
                    <div>
                        {
                            config.status === "swapped" ? (
                                <Button {...Buttons.swapped} />
                            ) : null
                        }

                        {
                            config.status === "rented" ? (
                                <Button {...Buttons.rented} />
                            ) : null
                        }
                    </div>

                    <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: "center"
                        }}
                    >
                        <span style={{
                            fontFamily: "Nunito Sans",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: "6px",
                            lineHeight: "8px",
                        }}>
                            status
                        </span>

                        <span style={{
                            fontFamily: "Nunito Sans",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: "9px",
                            lineHeight: "12px",
                            // color: 
                        }}>
                            {config.status}
                        </span>
                    </div>
                </div> */}
            </div>
        </div>
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
    attrib: {
        fontFamily: "Nunito Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "11px",
        lineHeight: "15px",

    },
}