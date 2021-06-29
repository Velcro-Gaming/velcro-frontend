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

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class LandingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttons: {
                signIn: {
                    text: {
                        color: colors.white,
                        value: "Get Started",
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
                    linkTo: "/register",
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
                        
                        {
                            config.content && config.content.heading ? (
                                <div style={{ ...styles.header, fontSize: `${config.headingSize}`, }}>
                                    {config.content.heading}
                                </div>
                            ) : null
                        }

                        {
                            config.content && config.content.subHeading ? (
                                <div style={{ ...styles.subHeader, fontSize: `${config.subHeadingSize}`, }}>
                                    {config.content.subHeading}
                                </div>
                            ) : null
                        }

                        <Breakpoint name="notDesktop">
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
                        </Breakpoint>

                        <IsDesktop>
                            <div style={{
                                width: `${config.callToAction.buttonWidth}`,
                                height: `${config.callToAction.buttonHeight}`,
                            }}>
                                <Button {...this.state.buttons.signIn} />
                            </div>
                        </IsDesktop>


                    </div>


                    <div className={"container"} style={{
                        ...styles.showOnTop
                    }}>
                        <div className="row mb-3">
                            <div className="col-12 col-lg-6 mb-3" style={{ textAlign: 'initial' }}>
                                <span style={{ display: 'flex', ...config.icon }}>
                                    <img
                                        style={{ width: 'initial',  }}
                                        src={require('../../../assets/icons/consoles.png')}
                                    />
                                </span>
                            </div>

                            <div className="col-12 col-lg-6 mb-3">
                                <div style={{ ...styles.navigation, ...config.navigation }}>
                                    <Button {...this.state.buttons.contactUs} />
                                    <Button {...this.state.buttons.termsAndConditions} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }

        const getCarouselContent = (slideContent) => {
            return (
                <div>
                    <IsDesktop>
                        {
                            mainContent({
                                headingSize: '50px',
                                subHeadingSize: '22px',
                                icon: {
                                    height: '45px',
                                    justifyContent: 'flex-start'
                                },
                                wrapperPadding: '0 0',
                                callToAction: {
                                    buttonWidth: '150px',
                                    buttonHeight: '50px',
                                },
                                navigation: {
                                    flexFlow: 'row nowrap',
                                    justifyContent: 'flex-end',
                                },
                                content: slideContent
                            })
                        }
                    </IsDesktop>

                    <IsTablet>
                        {
                            mainContent({
                                headingSize: '40px',
                                subHeadingSize: '18px',
                                icon: {
                                    height: '35px',
                                    justifyContent: 'flex-start'
                                },
                                wrapperPadding: '0 0',
                                callToAction: {
                                    buttonWidth: '120px',
                                    buttonHeight: '50px',
                                },
                                navigation: {
                                    flexFlow: 'row nowrap',
                                    justifyContent: 'flex-end',
                                },
                                content: slideContent
                            })
                        }
                    </IsTablet>

                    <IsPhone>
                        {
                            mainContent({
                                headingSize: '30px',
                                subHeadingSize: '14px',
                                icon: {
                                    height: '25px',
                                    justifyContent: 'flex-end'
                                },
                                wrapperPadding: '0 10px',
                                callToAction: {
                                    buttonWidth: '120px',
                                    buttonHeight: '50px',
                                },
                                navigation: {
                                    flexFlow: 'column',
                                    alignItems: 'flex-end',
                                },
                                content: slideContent
                            })
                        }
                    </IsPhone>
                </div>
            )
        }

        return (
            <div style={{ position: 'relative' }}>
                
                <BaseOverlay>
                    <IsDesktop>
                        <DottedBoxOverlay />
                    </IsDesktop>
                </BaseOverlay>


                <div style={styles.container}>
                    <div>                        
                        <Carousel
                            autoPlay={true}
                            showThumbs={false}
                            swipeable={true}
                            stopOnHover={false}
                            infiniteLoop={true}
                            interval={4500}
                        >
                            <div style={{
                                background: `linear-gradient(91.76deg, rgba(0, 0, 0, 0.7) 0.28%, rgba(0, 0, 0, 0.7) 22.79%, rgba(0, 0, 0, 0) 81.83%), url(${require('../../../assets/images/bg-slide1.png')})`,
                                ...styles.background,

                            }}>
                                {
                                    getCarouselContent({
                                        heading: "Start Making Money",
                                        subHeading: "Off Your Old Video Games"
                                    })
                                }
                            </div>

                            <div style={{
                                background: `linear-gradient(91.76deg, rgba(0, 0, 0, 0.7) 0.28%, rgba(0, 0, 0, 0.7) 22.79%, rgba(0, 0, 0, 0) 81.83%), url(${require('../../../assets/images/bg-slide2.png')})`,
                                ...styles.background,
                            }}>
                                {
                                    getCarouselContent({
                                        heading: "Get The Latest Video Games",
                                        subHeading: "At the lowest rate possible"
                                    })
                                }
                            </div>
                            <div style={{
                                background: `linear-gradient(91.76deg, rgba(0, 0, 0, 0.7) 0.28%, rgba(0, 0, 0, 0.7) 22.79%, rgba(0, 0, 0, 0) 81.83%), url(${require('../../../assets/images/bg-slide3.png')})`,
                                ...styles.background,
                            }}>
                                {
                                    getCarouselContent({
                                        heading: "Rent, Swap and Earn",
                                        subHeading: "Video Games at your own convience.."
                                    })
                                }
                            </div>
                        </Carousel>
                    </div>
                </div>

                {/* <BaseOverlay>
                    <IsDesktop>
                        <DottedBoxOverlay />
                    </IsDesktop>
                </BaseOverlay> */}
                
            </div>
        )
    }
}

const styles = {
    container: {
        height: '100vh',
        
    },
    background: {
        // boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.7)',
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    wrapper: {
        height: '100vh',
        display: 'flex',
        flexFlow: 'column noWrap',
        justifyContent: 'space-between',
    },
    upperSection: {
        alignSelf: 'end',
        textAlign: 'initial',
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
        // alignItems: 'flex-end',
    },
    showOnTop: {
        // position: 'relative',
        zIndex: 99,
    },
}


export default withRouter(LandingScreen)