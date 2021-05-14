import React, { Component } from 'react';
import Header from '../components/main/Header';
import {
    colors
} from '../../../App.json';

import Button from '../../../utils/Button';
import FormField from '../../../utils/FormField';
import FormFields from '../../../utils/FormFields';

import DottedBoxOverlay from '../../../utils/overlay/DottedBoxOverlay'

import Breakpoint from '../../../utils/breakpoints/Base';
import IsDesktop from '../../../utils/breakpoints/IsDesktop';
import IsTablet from '../../../utils/breakpoints/IsTablet';
import IsPhone from '../../../utils/breakpoints/IsPhone';

import { withRouter } from 'react-router-dom';


class ContactUs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            buttons: {
                sendMessage: {
                    text: {
                        color: colors.black,
                        value: "Submit",
                    },
                    styles: {
                        height: '50px',
                        width: '150px',
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
                email: {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'Email Address',
                    props: {
                        name: 'email_input',
                        type: 'email',
                        placeholder: 'Enter email address'
                    }
                },
                subject: {
                    element: 'input',
                    value: '',
                    label: true,
                    labelText: 'Subject',
                    props: {
                        name: 'subject_input',
                        type: 'text',
                        placeholder: 'Subject of your message'
                    }
                },
                message: {
                    element: 'textarea',
                    value: '',
                    label: true,
                    labelText: 'Your message',
                    props: {
                        name: 'message_input',
                        type: 'text',
                        placeholder: 'Type your message here'
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

    mainContent = (formData, config) => {
        return (
            <div>
                <div style={styles.bannerArea}>
                    <div style={styles.bannerWrapper}>

                        <DottedBoxOverlay />

                        <div className="container" style={styles.bannerInnerWrapper}>
                            <img style={{ ...styles.helpdesk }} src={require('../../../assets/images/helpdesk.png')} />

                            <IsDesktop>
                                <div style={styles.pageTitle}>
                                    Contact Us
                                </div>
                            </IsDesktop>

                            <Breakpoint name='notPhone'>
                                <img style={{ ...styles.boxes }} src={require('../../../assets/icons/boxes.png')} />
                            </Breakpoint>
                        </div>

                    </div>
                </div>

                <div className="container">
                    <div className="d-flex justify-content-center align-items-center">

                        <div style={{ ...styles.formWrapper, padding: `${config.formPadding}` }}>
                            <Breakpoint name='notDesktop'>
                                <div
                                    className="text-center my-3 mb-lg-5"
                                    style={{ ...styles.pageTitle, color: `${colors.primary}` }}
                                >
                                    Contact Us
                                </div>
                            </Breakpoint>

                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <FormField
                                        formData={this.state.formData}
                                        change={(newFormData) => this.setState({
                                            formData: newFormData
                                        })}
                                        field={{
                                            id: 'email',
                                            config: formData.email
                                        }}
                                    />
                                </div>

                                <div className="col-12 col-lg-6">
                                    <FormField
                                        formData={this.state.formData}
                                        change={(newFormData) => this.setState({
                                            formData: newFormData
                                        })}
                                        field={{
                                            id: 'subject',
                                            config: formData.subject
                                        }}
                                    />
                                </div>
                            </div>

                            <FormField
                                formData={this.state.formData}
                                change={(newFormData) => this.setState({
                                    formData: newFormData
                                })}
                                field={{
                                    id: 'message',
                                    config: formData.message
                                }}
                            />

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button {...this.state.buttons.sendMessage} />
                            </div>

                        </div>
                    </div>
                </div>

                <Breakpoint name='notPhone'>
                    <div style={styles.bgBoxes}>
                        <img style={{ ...styles.boxes, }} src={require('../../../assets/icons/boxes.png')} />
                    </div>
                </Breakpoint>
            </div>
        )
    }

    render() {
        // console.log("Contact Us Props: ", this.props)

        const {
            formData
        } = this.state

        return (
            <div>
                <Header {...this.props} headerConfig={this.state.headerConfig} />

                <div style={styles.dummyHeader} />

                <IsDesktop>
                    {
                        this.mainContent(formData, {
                            formPadding: '50px 100px'
                        })
                    }
                </IsDesktop>

                <IsTablet>
                    {
                        this.mainContent(formData, {
                            formPadding: '50px 50px'
                        })
                    }
                </IsTablet>

                <IsPhone>
                    {
                        this.mainContent(formData, {
                            formPadding: '50px 25px'
                        })
                    }
                </IsPhone>

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
        backgroundImage: `url(${require('../../../assets/images/bg-3.png')})`
    },
    bannerInnerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '310px',
        width: '100%',
        overflow: 'hidden',
    },
    helpdesk: {
        width: '345px',
        height: 'fit-content',
        alignSelf: 'flex-start',
        marginLeft: '32px',
        marginTop: '-25px',
    },
    boxes: {
        width: '330px',
        alignSelf: 'flex-start',
        marginTop: '-25px',
    },
    pageTitle: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: '34px',
        lineHeight: '46px',
        color: colors.white,
    },
    formWrapper: {
        margin: '-30px 0 150px',
        zIndex: 99,
        position: 'relative',
        background: colors.white,
        boxShadow: '0px 20px 40px rgba(239, 241, 243, 0.72)',
        borderRadius: '10px',
        maxWidth: '700px',
    },
    bgBoxes: {
        position: 'absolute',
        bottom: '50px',
        left: '-135px',
    },

}


export default withRouter(ContactUs)