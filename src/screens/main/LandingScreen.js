import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    colors
} from '../../App.json'
import Button from '../../components/utils/Button'
import Overlay from '../../components/utils/overlay/LandingPageOverlay'

import { withRouter } from 'react-router-dom';


class LandingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttons: {
                signIn: {
                    text: {
                        color: colors.black,
                        value: "Sign in",
                    },
                    styles: {
                        height: '50px',
                        width: '150px',
                        margin: null,
                        backgroundColor: null,
                        border: {
                            width: "1px",
                            style: "solid",
                            color: colors.white,
                            radius: "3px",
                        },
                        color: colors.white
                    },
                    linkTo: "/login",
                },
                termsAndConditions: {
                    text: {
                        color: colors.white,
                        value: "Terms & Conditions",
                    },
                    styles: {
                        height: '50px',
                        width: '100%',
                        margin: null,
                        backgroundColor: null,
                        border: {
                            width: null,
                            style: null,
                            color: null,
                            radius: null,
                        },
                        color: colors.white
                    },
                    linkTo: '/terms-and-conditions'
                },
                contactUs: {
                    text: {
                        color: colors.white,
                        value: "Contact Us",
                    },
                    styles: {
                        height: '50px',
                        width: '150px',
                        margin: '0 25px',
                        backgroundColor: null,
                        border: {
                            width: null,
                            style: null,
                            color: null,
                            radius: null,
                        },
                        color: colors.white
                    },
                    linkTo: '/contact-us'
                },
            }
        }
    }

    render() {
        console.log("Props: ", this.props)

        return (
            <div>
                <Overlay />

                <div style={{ ...styles.container, }}>
                    {/* <Overlay /> */}
                    
                    <div className={"container"} style={{ ...styles.upperSection, ...styles.showOnTop }}>
                        <div style={styles.header}>
                            Rent, Swap and Earn
                        </div>
                        <div style={styles.subHeader}>
                            Video Games at your own convience..
                        </div>

                        <div style={{ width: '150px' }}>
                            <Button {...this.state.buttons.signIn} />
                        </div>
                    </div>

                    <div className={"container"} style={{ ...styles.lowerSection, ...styles.showOnTop }}>
                        <img style={{ height: '45px' }} src={require('../../assets/icons/consoles.png')} />

                        <div style={styles.navigation}>
                            <Button {...this.state.buttons.termsAndConditions} />
                            <Button {...this.state.buttons.contactUs} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        height: '100vh',
        backgroundImage: `url(${require('../../assets/images/bg-1.png')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

        display: 'flex',
        flexFlow: 'column noWrap',
        justifyContent: 'space-between',
    },
    upperSection: {
        color: colors.white,
        paddingTop: '300px'
    },
    header: {
        fontWeight: 800,
        fontSize: '50px',
        lineHeight: '68px',
        marginBottom: '20px',
    },
    subHeader: {
        fontWeight: 100,
        fontSize: '22px',
        lineHeight: '30px',
        marginBottom: '40px',
    },
    lowerSection: {
        display: 'flex',
        justifyContent: 'space-between',

        paddingBottom: '50px',
    },
    navigation: {
        display: 'flex',
    },
    showOnTop: {
        position: 'relative',
        zIndex: 1,
    },
}


export default withRouter(LandingScreen)