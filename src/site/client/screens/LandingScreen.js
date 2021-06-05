import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    colors
} from '../../../App.json'
import Button from '../../../utils/Button'

import BaseOverlay from '../../../utils/overlay/BaseOverlay'
import DottedBoxOverlay from '../../../utils/overlay/DottedBoxOverlay'

import { withRouter } from 'react-router-dom';

import Breakpoint from '../../../utils/breakpoints/Base';
import IsDesktop from '../../../utils/breakpoints/IsDesktop';
import IsTablet from '../../../utils/breakpoints/IsTablet';
import IsPhone from '../../../utils/breakpoints/IsPhone';


class LandingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttons: {
                signIn: {
                    text: {
                        color: colors.white,
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
                signInMobile: {
                    text: {
                        color: colors.white,
                        value: "Sign in",
                    },
                    styles: {
                        height: '100%',
                        width: '100%',
                        margin: '0 5px',
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
                getStartedMobile: {
                    text: {
                        color: colors.white,
                        value: "Get Started",
                    },
                    styles: {
                        height: '100%',
                        width: '100%',
                        margin: '0 5px',
                        backgroundColor: colors.primary,
                        border: {
                            width: "1px",
                            style: "solid",
                            color: colors.primary,
                            radius: "3px",
                        },
                        color: colors.white
                    },
                    linkTo: "/register",
                },
                termsAndConditions: {
                    text: {
                        color: colors.white,
                        value: "Terms & Conditions",
                    },
                    styles: {
                        height: '50px',
                        width: '170px',
                        margin: '0 0 0 20px',
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
                        width: '120px',
                        margin: '0 0 0 0',
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
        // console.log("Props: ", this.props)

        const mainContent = (config) => {
            return (
                <div style={{ ...styles.wrapper, padding: `${config.wrapperPadding}` }}>

                    <div style={{ height: '69px' }}></div>

                    <div className={"container"}
                        style={{
                            ...styles.upperSection,
                            ...styles.showOnTop
                        }}
                    >
                        <div style={{ ...styles.header, fontSize: `${config.headingSize}`, }}>
                            Rent, Swap and Earn
                        </div>
                        <div style={{ ...styles.subHeader, fontSize: `${config.subHeadingSize}`, }}>
                            Video Games at your own convience..
                        </div>

                        <Breakpoint name="notPhone">
                            <div style={{
                                width: `${config.callToAction.buttonWidth}`,
                                height: `${config.callToAction.buttonHeight}`,
                            }}>
                                <Button {...this.state.buttons.signIn} />
                            </div>
                        </Breakpoint>
                        
                        <IsPhone>
                            <div className="row">
                                <div style={{
                                    width: `${config.callToAction.buttonWidth}`,
                                    height: `${config.callToAction.buttonHeight}`,
                                }}>
                                    <Button {...this.state.buttons.getStartedMobile} />
                                </div>
                                <div style={{
                                    width: `${config.callToAction.buttonWidth}`,
                                    height: `${config.callToAction.buttonHeight}`,
                                }}>
                                    <Button {...this.state.buttons.signInMobile} />
                                </div>
                            </div>
                        </IsPhone>

                    </div>


                    <div className={"container"} style={{
                        ...styles.showOnTop
                    }}>
                        <div className="row">
                            <div className="col-12 col-lg-6 mb-5">
                                <img 
                                    style={{ height: `${config.iconSize}` }}
                                    src={require('../../../assets/icons/consoles.png')}
                                />
                            </div>

                            <div className="col-12 col-lg-6 mb-5">
                                <div style={{ ...styles.navigation, flexFlow: `${config.navigation.direction}` }}>
                                    
                                    <Button {...this.state.buttons.contactUs} />
                                    <Button {...this.state.buttons.termsAndConditions} />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <BaseOverlay>
                    <IsDesktop>
                        <DottedBoxOverlay />
                    </IsDesktop>
                </BaseOverlay>

                <div style={styles.container}>
                    <IsDesktop>
                        {
                            mainContent({
                                headingSize: '50px',
                                subHeadingSize: '22px',
                                iconSize: '45px',
                                wrapperPadding: '0 0',
                                callToAction: {
                                    buttonWidth: '150px',
                                    buttonHeight: '50px',
                                },
                                navigation: {
                                    direction: 'row nowrap'
                                }
                            })
                        }
                    </IsDesktop>

                    <IsTablet>
                        {
                            mainContent({
                                headingSize: '40px',
                                subHeadingSize: '18px',
                                iconSize: '35px',
                                wrapperPadding: '0 0',
                                callToAction: {
                                    buttonWidth: '120px',
                                    buttonHeight: '50px',
                                },
                                navigation: {
                                    direction: 'row nowrap'
                                }
                            })
                        }
                    </IsTablet>

                    <IsPhone>
                        {
                            mainContent({
                                headingSize: '30px',
                                subHeadingSize: '14px',
                                iconSize: '25px',
                                wrapperPadding: '0 10px',
                                callToAction: {
                                    buttonWidth: '120px',
                                    buttonHeight: '50px',
                                },
                                navigation: {
                                    direction: 'column'
                                }
                            })
                        }
                    </IsPhone>
                </div>
                
            </div>
        )
    }
}

const styles = {
    container: {
        height: '100vh',
        backgroundImage: `url(${require('../../../assets/images/bg-slide1.png')})`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    wrapper: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column noWrap',
        justifyContent: 'space-between',
    },
    upperSection: {
        alignSelf: 'end',
    },
    header: {
        fontFamily: 'Nunito Sans',
        fontWeight: 800,
        // lineHeight: '68px',
        marginBottom: '20px',
        color: colors.white,
    },
    subHeader: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: '30px',
        marginBottom: '40px',
        color: colors.white,
    },
    lowerSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignSelf: 'end',
        paddingBottom: '50px',
    },
    navigation: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    showOnTop: {
        position: 'relative',
        zIndex: 1,
    },
}


export default withRouter(LandingScreen)