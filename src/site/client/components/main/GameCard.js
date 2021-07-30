import React, { useState } from 'react'
import { colors } from '../../../../App.json'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from '../../../../assets/images/avi.png'
import Button from '../../../../utils/Button';

function GameCard(props) {
    const {
        auth,
        self,
        listing,
        children: GameMeta
    } = props


    const [Buttons, setButtons] = useState({
        viewOffers: {
            text: {
                color: colors.white,
                value: "View Offers",
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
            linkTo: `search/${self.slug}`
        },
    })
    

    return (
        <div className="card" style={styles.card}>
            <img src={self.image} style={styles.gameCoverImage} />

            <div style={styles.wrapper}>
                <div style={{ height: "50px" }} className="d-flex justify-content-between align-items-center">

                    <div className="d-flex flex-column justify-content-between align-items-start">
                        <div style={styles.title}>
                            {self.name}
                        </div>

                        <div style={styles.category}>
                            {self.category} 
                            {listing && ` | ${listing.console.short_name}`}
                        </div>
                    </div>

                    {
                        listing ? (
                            <div>
                                {
                                    auth.user && auth.user.id === listing.owner.id ? (
                                        <div style={styles.gameStatus.wrapper}>
                                            <span style={styles.gameStatus.heading}>
                                                status
                                            </span>

                                            <span style={styles.gameStatus.content}>
                                                {listing.status}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className={"d-flex flex-column align-items-center"}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                height: '30px', width: '30px',
                                                border: `2px solid ${colors.primary}`,
                                                borderRadius: '50%', overflow: 'hidden'
                                            }}>
                                                <img src={Avatar} height={25}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>

                                            <div style={{ fontSize: '11px', color: colors.primary }}>
                                                {listing.owner.username}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        ) : null
                    }
                </div>

                {
                    listing ? null : (
                        <div>
                            <Button {...Buttons.viewOffers} />
                        </div>
                    )
                }

                {GameMeta}

            </div>
        </div>
    )
}


const styles = {
    card: {
        height: "300px",
        position: "relative",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
    },
    wrapper: {
        position: 'absolute',
        padding: '10px 15px',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: "10px",
    },
    title: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        borderBottom: "1px solid black",
        padding: "0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textTransform: "uppercase",

        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: '190px',
    },
    category: {
        fontSize: '10px',
        color: colors.grey,
        textTransform: "capitalize"
    },
    gameCoverImage: {
        height: "220px",
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

export default connect(mapStateToProps, mapDispatchToProps)(GameCard)