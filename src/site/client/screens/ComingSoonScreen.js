import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
import {
    colors
} from '../../../App.json';

import Header from '../components/main/Header';
import Button from '../../../utils/Button';

import BaseOverlay from '../../../utils/overlay/BaseOverlay';
import DottedBoxOverlay from '../../../utils/overlay/DottedBoxOverlay';

import { withRouter } from 'react-router-dom';

import Breakpoint from '../../../utils/breakpoints/Base';
import IsDesktop from '../../../utils/breakpoints/IsDesktop';
import IsTablet from '../../../utils/breakpoints/IsTablet';
import IsPhone from '../../../utils/breakpoints/IsPhone';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ModalJoinSubscribersList from '../components/main/ModalJoinSubscribersList';


function ComingSoonScreen(props) {
    const {
        timerProps
    } = props

    const [ShowJoinSubscribersModal, setShowJoinSubscribersModal] = useState(false)

    const [HeaderConfig, setHeaderConfig] = useState({
        headerButtons: [
            {
                isProtected: false,
                text: {
                    color: colors.white,
                    value: "Subscribe",
                },
                styles: {
                    backgroundColor: colors.primary,
                    border: {
                        width: null,
                        style: null,
                        color: null,
                        radius: null,
                    },
                    color: colors.white
                },
                onClick: () => { },
            },
        ],
        headerStyles: {
            backgroundColor: colors.black
        }
    })


    const [PageButtons, setPageButtons] = useState({
        subscribe: {
            text: {
                color: colors.white,
                value: "Subscribe",
            },
            styles: {
                height: '50px',
                width: '150px',
                margin: '50px 0',
                backgroundColor: null,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => setShowJoinSubscribersModal(true),
        },
        subscribeMobile: {
            text: {
                color: colors.white,
                value: "Subscribe",
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
            onClick: () => setShowJoinSubscribersModal(true),
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
            onClick: () => setShowJoinSubscribersModal(true),
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
    })


    const MainContent = (config) => {
        return (
            <>
                <div style={{ height: '69px' }}></div>

                <div className={"container"}
                    style={{
                        ...styles.upperSection,
                        ...styles.showOnTop
                    }}
                >

                    <div style={{ ...styles.subHeader, fontSize: "18px", }}>
                        Velcro Is Coming Soon!
                    </div>

                    <div>
                        <Carousel
                            autoPlay={true}
                            showArrows={false}
                            showThumbs={false}
                            showStatus={false}
                            showIndicators={false}
                            swipeable={true}
                            stopOnHover={false}
                            infiniteLoop={true}
                            interval={4500}
                        >
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ ...styles.header, fontSize: `${config.headingSize}`, }}>
                                    Start Making Money
                                </div>

                                <div style={{ ...styles.subHeader, fontSize: `${config.subHeadingSize}`, }}>
                                    Off Your Old Video Games
                                </div>
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                <div style={{ ...styles.header, fontSize: `${config.headingSize}`, }}>
                                    Get The Latest Video Games
                                </div>

                                <div style={{ ...styles.subHeader, fontSize: `${config.subHeadingSize}`, }}>
                                    At the lowest rate possible
                                </div>
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                <div style={{ ...styles.header, fontSize: `${config.headingSize}`, }}>
                                    Rent, Swap and Earn
                                </div>

                                <div style={{ ...styles.subHeader, fontSize: `${config.subHeadingSize}`, }}>
                                    Video Games at your own convience..
                                </div>
                            </div>
                        </Carousel>
                    </div>


                    <div style={{ display: 'flex', color: colors.white, margin: '25px 0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 25px 0 0' }}>
                            <span style={{
                                fontSize: "50px"
                            }}>{timerProps.formatted.days}</span>
                            <span>Days</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 25px 0 0' }}>
                            <span style={{
                                fontSize: "50px"
                            }}>{timerProps.formatted.hours}</span>
                            <span>Hours</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 25px 0 0' }}>
                            <span style={{
                                fontSize: "50px"
                            }}>{timerProps.formatted.minutes}</span>
                            <span>Minutes</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 25px 0 0' }}>
                            <span style={{
                                fontSize: "50px"
                            }}>{timerProps.formatted.seconds}</span>
                            <span>Seconds</span>
                        </div>
                    </div>


                    <Breakpoint name="notDesktop">
                        <div className="row">
                            <div style={{
                                width: `${config.callToAction.buttonWidth}`,
                                height: `${config.callToAction.buttonHeight}`,
                            }}>
                                <Button {...PageButtons.getStartedMobile} />
                            </div>
                            <div style={{
                                width: `${config.callToAction.buttonWidth}`,
                                height: `${config.callToAction.buttonHeight}`,
                            }}>
                                <Button {...PageButtons.subscribeMobile} />
                            </div>
                        </div>
                    </Breakpoint>

                    <IsDesktop>
                        <div style={{
                            width: `${config.callToAction.buttonWidth}`,
                            height: `${config.callToAction.buttonHeight}`,
                        }}>
                            <Button {...PageButtons.subscribe} />
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
                                    style={{ width: 'initial', }}
                                    src={require('../../../assets/icons/consoles.png')}
                                />
                            </span>
                        </div>

                        <div className="col-12 col-lg-6 mb-3">
                            <div style={{ ...styles.navigation, ...config.navigation }}>
                                <Button {...PageButtons.contactUs} />
                                <Button {...PageButtons.termsAndConditions} />
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }

    return (
        <div style={{ position: 'relative' }}>

            <BaseOverlay>
                <IsDesktop>
                    <DottedBoxOverlay />
                </IsDesktop>
            </BaseOverlay>


            <Header {...props} headerConfig={HeaderConfig} />

            
            {
                ShowJoinSubscribersModal ? (
                    <ModalJoinSubscribersList
                        // orderPayload={OrderPayload}
                        hideModal={() => setShowJoinSubscribersModal(false)}
                    />
                ) : null
            }


            <div style={styles.container}>
                <div>
                    <Carousel
                        autoPlay={true}
                        showArrows={false}
                        showStatus={false}
                        showThumbs={false}
                        showIndicators={false}
                        swipeable={true}
                        stopOnHover={false}
                        infiniteLoop={true}
                        interval={4500}
                    >
                        <div style={{
                            background: `linear-gradient(91.76deg, rgba(0, 0, 0, 0.7) 0.28%, rgba(0, 0, 0, 0.7) 22.79%, rgba(0, 0, 0, 0) 81.83%), url(${require('../../../assets/images/bg-slide1.png')})`,
                            ...styles.background,

                        }}>
                            <div style={{ ...styles.wrapper, padding: '0 0' }} />
                        </div>

                        <div style={{
                            background: `linear-gradient(91.76deg, rgba(0, 0, 0, 0.7) 0.28%, rgba(0, 0, 0, 0.7) 22.79%, rgba(0, 0, 0, 0) 81.83%), url(${require('../../../assets/images/bg-slide2.png')})`,
                            ...styles.background,
                        }}>
                            <div style={{ ...styles.wrapper, padding: '0 0' }} />
                        </div>
                        <div style={{
                            background: `linear-gradient(91.76deg, rgba(0, 0, 0, 0.7) 0.28%, rgba(0, 0, 0, 0.7) 22.79%, rgba(0, 0, 0, 0) 81.83%), url(${require('../../../assets/images/bg-slide3.png')})`,
                            ...styles.background,
                        }}>
                            <div style={{ ...styles.wrapper, padding: '0 0' }} />
                        </div>
                    </Carousel>
                </div>



                <div style={{ ...styles.wrapper, position: 'absolute', top: 0 }}>
                    <IsDesktop>
                        {
                            MainContent({
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
                            })
                        }
                    </IsDesktop>

                    <IsTablet>
                        {
                            MainContent({
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
                            })
                        }
                    </IsTablet>

                    <IsPhone>
                        {
                            MainContent({
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
                            })
                        }
                    </IsPhone>
                </div>
            </div>

        </div>
    )
}



const styles = {
    container: {
        height: '100vh',
        position: 'relative'

    },
    background: {
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    wrapper: {
        height: '100vh',
        width: '100%',
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
        margin: '20px 0',
        color: colors.white,
    },
    subHeader: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: '30px',
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


export default withRouter(ComingSoonScreen)