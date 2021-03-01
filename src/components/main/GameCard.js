import React, { useState } from 'react'
import { colors } from '../../App.json'

import BlankImage from '../../assets/images/game-0.png'
import Button from '../utils/Button'

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
        <div className="col-12 col-md-6 col-lg-3">
            <div className="card" style={styles.card}>
                <img src={BlankImage} style={{ borderRadius: "5px" }} />
                
                <div style={styles.title}>
                    {config.name}
                </div>

                <div style={styles.attrib}>
                    Number of Orders:
                    <span style={{ color: colors.grey, margin: "0 5px" }}>
                        {config.numberOfOrders}
                    </span>
                </div>

                <div style={styles.attrib}>
                    Amount Earned:
                    <span style={{ color: colors.grey, margin: "0 5px" }}>
                        ₦{config.amountEarned}
                    </span>
                </div>

                <div className="d-flex justify-content-between align-items-center" style={{ height: "50px", margin: "10px 0 0" }}>
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
                </div>
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

        margin: "5px 0"
    },

    attrib: {
        fontFamily: "Nunito Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "11px",
        lineHeight: "15px",

    },
}