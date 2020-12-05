import React, { Component } from 'react';
import Header from '../../components/main/Header';
import {
    colors
} from '../../App.json';
import DottedBoxOverlay from '../../components/utils/overlay/DottedBoxOverlay'
import { withRouter } from 'react-router-dom';

import IsDesktop from '../../components/utils/breakpoints/IsDesktop';
import IsTablet from '../../components/utils/breakpoints/IsTablet';
import IsPhone from '../../components/utils/breakpoints/IsPhone';


class TermsCondition extends Component {
    constructor(props) {
        super(props)

        this.state = {
            buttons: {
                signUp: {
                    text: {
                        color: colors.black,
                        value: "Sign up",
                    },
                    styles: {
                        height: '50px',
                        width: '100%',
                        backgroundColor: colors.primary,
                        border: {
                            width: "1px",
                            style: "solid",
                            color: colors.white,
                            radius: "3px",
                        },
                        color: colors.white
                    },
                    linkTo: "/",
                },
            },
            headerConfig: {
                headerButtons: [
                    {
                        text: {
                            color: colors.black,
                            value: "Get Started",
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
                        isProtected: false,
                        linkTo: "/register",
                    },
                ],
                headerStyles: {
                    backgroundColor: colors.black
                }
            },
            formData: {
                username: {
                    element: 'input',
                    value: 'mike8761',
                    label: true,
                    labelText: 'Username',
                    config: {
                        name: 'username_input',
                        type: 'text',
                        placeholder: 'Enter username'
                    }
                },
                email: {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'Email',
                    props: {
                        name: 'email_input',
                        type: 'email',
                        placeholder: 'Enter email address'
                    }
                },
                phoneNumber: {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'Phone number',
                    props: {
                        name: 'phone_number_input',
                        type: 'number',
                        placeholder: 'Enter phone number'
                    }
                },
                password: {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'Password',
                    props: {
                        name: 'password_input',
                        type: 'password',
                        placeholder: 'Password(minimum of 8 characters)'
                    }
                },
            }
        }
    }

    updateForm = (newState) => {
        this.setState({
            formData: newState
        })
    };

    render() {

        return (
            <div>
                <Header {...this.props} headerConfig={this.state.headerConfig} />

                <div style={styles.dummyHeader} />

                <div style={styles.bannerArea}>
                    <div style={styles.bannerWrapper}>

                        {/* <DottedBoxOverlay /> */}
                        <IsDesktop>
                            <DottedBoxOverlay />
                        </IsDesktop>

                        <div className="container" style={styles.bannerInnerWrapper}>

                            <div style={styles.pageTitle}>
                                Terms & Conditions
                            </div>

                        </div>

                    </div>
                </div>

                <div className="container">
                    <div style={styles.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat nam at lectus urna duis convallis. Vulputate enim nulla aliquet porttitor. Pellentesque adipiscing commodo elit at imperdiet dui. Dictumst quisque sagittis purus sit. Nunc aliquet bibendum enim facilisis. Malesuada proin libero nunc consequat interdum varius. Volutpat commodo sed egestas egestas fringilla phasellus. Augue eget arcu dictum varius. Ornare arcu dui vivamus arcu. Fusce id velit ut tortor pretium viverra suspendisse potenti.

                        Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Neque volutpat ac tincidunt vitae semper quis lectus nulla. Justo donec enim diam vulputate. Nibh venenatis cras sed felis eget. Arcu bibendum at varius vel pharetra. Massa ultricies mi quis hendrerit. Sed elementum tempus egestas sed sed risus pretium. Ac ut consequat semper viverra nam libero justo laoreet sit. Arcu odio ut sem nulla pharetra. Aliquet porttitor lacus luctus accumsan. Rhoncus urna neque viverra justo nec ultrices dui sapien. Venenatis a condimentum vitae sapien pellentesque habitant morbi. At in tellus integer feugiat scelerisque varius. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. At tellus at urna condimentum mattis pellentesque id. Lacus sed viverra tellus in hac. Suspendisse interdum consectetur libero id faucibus nisl. Tempus urna et pharetra pharetra.

                        Quam viverra orci sagittis eu volutpat odio facilisis mauris. At in tellus integer feugiat. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Id porta nibh venenatis cras. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Risus feugiat in ante metus. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Gravida neque convallis a cras. Sit amet volutpat consequat mauris nunc congue nisi vitae. Eget dolor morbi non arcu risus quis varius quam quisque. Quam id leo in vitae turpis massa sed. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Bibendum enim facilisis gravida neque convallis a. Eu facilisis sed odio morbi quis commodo odio aenean sed. Sit amet luctus venenatis lectus. Sed id semper risus in hendrerit. Faucibus nisl tincidunt eget nullam non. Dictumst quisque sagittis purus sit amet volutpat consequat.

                        Pharetra convallis posuere morbi leo urna molestie at. Eget magna fermentum iaculis eu non diam. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Sem integer vitae justo eget magna fermentum iaculis eu. Quis vel eros donec ac odio tempor orci dapibus. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Porttitor rhoncus dolor purus non enim. Integer enim neque volutpat ac tincidunt vitae semper. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Aliquet nibh praesent tristique magna sit amet purus gravida quis.
                    </div>
                </div>
            </div>
        )
    }
}


const styles = {
    dummyHeader: {
        height: "69px",
    },
    bannerArea: {
        position: 'relative',
    },
    bannerWrapper: {
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${require('../../assets/images/bg-4.png')})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    bannerInnerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '310px',
        width: '100%',
        overflow: 'hidden',
    },
    helpdesk: {
        width: '345px',
        height: 'fit-content',
        alignSelf: 'flex-start',
    },
    pageTitle: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: '34px',
        lineHeight: '46px',
        color: colors.white,
    },
    content: {
        margin: '50px 0',
    },

}


export default withRouter(TermsCondition)