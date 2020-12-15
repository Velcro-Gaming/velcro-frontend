import React, { useState } from 'react'
import {
    colors
} from '../../App.json'
import Button from '../utils/Button'
import FormField from '../utils/FormField'
import {
    Link,
    Redirect
} from 'react-router-dom'
import {
    logout
} from '../../redux/actions/AuthActions'
import Notify from '../utils/Notify'
import Breakpoint from '../utils/breakpoints/Base'
import IsDesktop from '../utils/breakpoints/IsDesktop'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { FaChevronDown } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'


function Header(props) {

    const initialState = {
        redirect: null,
        notification: true,
        headerConfig: {
            authHeaderButtons: [
                {
                    text: {
                        color: colors.white,
                        value: "+ Upload Game",
                    },
                    styles: {
                        height: null,
                        width: '130px',
                        margin: null,
                        fontSize: '14px',
                        backgroundColor: colors.black,
                        border: {
                            width: null,
                            style: null,
                            color: null,
                            radius: null,
                        },
                        color: colors.white
                    },
                    isProtected: true,
                    onClick: () => { },
                },
                {
                    text: {
                        color: colors.white,
                        value: <Notify />,
                    },
                    styles: {
                        height: null,
                        width: '35px',
                        margin: '0 15px',
                        backgroundColor: colors.black,
                        border: {
                            width: null,
                            style: null,
                            color: null,
                            radius: null,
                        },
                        color: colors.white
                    },
                    isProtected: true,
                    onClick: () => { },
                },
            ],
        },
        formData: {
            search: {
                element: 'input',
                value: '',
                label: false,
                labelText: 'Search',
                prepend: {
                    content: <AiOutlineSearch />,
                    styles: {
                        color: colors.grey
                    }
                },
                props: {
                    name: 'search_input',
                    type: 'text',
                    placeholder: 'Find your favoured games now',
                    required: true,
                },
                styles: {
                    backgroundColor: '#313133',
                    borderRadius: '3px',
                    height: '40px',
                    width: '320px',
                    color: colors.grey,
                    padding: '0 45px',
                    fontSize: '14px',
                    outline: 'none',
                    border: 'none',
                },
                className: "Placeholder-white"
            },
        }
    }

    const AttemptSignOut = async () => {
        setComponentState({
            ...ComponentState,
            redirect: '/logout'
        })
    }

    const GetNavigationTray = (headerButtons) => {
        let template = []
        const { auth } = props
        if (auth.loggedIn) {
            ComponentState.headerConfig.authHeaderButtons.map((navItem, index) => {
                template.push(<Button {...navItem} key={index} />)
            })
        } else {
            headerButtons.map((navItem, index) => {
                if (navItem.isProtected && !auth.loggedIn) {
                    return null
                } else {
                    template.push(<Button {...navItem} key={index} />)
                }
            })
        }
        return template
    }

    const [ComponentState, setComponentState] = useState(initialState)
    const {
        redirect,
        formData
    } = ComponentState
    const { auth, headerConfig } = props
    const {
        headerButtons,
        headerStyles,
    } = headerConfig

    if (redirect) {
        return <Redirect to={redirect} />
    }

    const getUserNames = () => {
        let userFullName = auth.user.name
        let firstName = userFullName.split(' ')[0]
        let lastName = userFullName.split(' ')[1]
        return [firstName,lastName]
    }
    const getUserInitials = () => {
        console.log(auth)
        // props.logout()
        if (auth.user.fullName) {
            let userFullName = auth.user.fullName
            let firstName = userFullName.split(' ')[0]
            let lastName = userFullName.split(' ')[1]
            return `${firstName[0]}${lastName[0]}`.toUpperCase()
        }
        return `${auth.user.username[0]}${auth.user.username[0]}`.toUpperCase()
        
    }

    return (
        <div style={{ ...styles.container, backgroundColor: headerStyles.backgroundColor ? headerStyles.backgroundColor : 'transparent' }}>
            <div className="container" style={styles.navbar}>
                <Link to="/">
                    <img
                        src={require('./../../assets/icons/logo.svg')}
                        style={styles.logo}
                    />
                </Link>

                
                <IsDesktop>
                    {
                        auth.loggedIn ? (
                            <div>
                                <FormField
                                    formData={formData}
                                    change={(newFormData) => setComponentState({
                                        ...ComponentState,
                                        formData: newFormData
                                    })}
                                    field={{
                                        id: 'search',
                                        config: formData.search
                                    }}
                                />
                            </div>

                        ) : null

                    }

                    <div style={styles.navigation}>
                        {

                            GetNavigationTray(headerButtons)

                        }
                    </div>
                </IsDesktop>

                {
                    auth.loggedIn ? (
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            
                            <IsDesktop>
                                <div style={{ display: 'flex', alignItems: 'center', borderLeft: `1px solid ${colors.white}`, borderRight: `1px solid ${colors.white}`, padding: '0 20px' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: colors.white,
                                        color: colors.primary,
                                        height: '32px',
                                        width: '32px',
                                        borderRadius: '50%',

                                        fontSize: '15px',
                                        lineHeight: '20px',
                                    }}>
                                        {auth.user && getUserInitials()}
                                    </div>

                                    <div style={{ margin: '0 0 0 10px', fontSize: '12px', lineHeight: '16px', color: colors.white, fontFamily: 'Nunito Sans', fontStyle: 'normal', fontWeight: 'bold', }}>
                                        {auth.user.username}
                                    </div>

                                        <div style={{ color: colors.white, margin: '3px 3px', fontSize: '12px' }}>
                                            <FaChevronDown />
                                        </div>

                                    </div>

                                    <div style={{
                                        border: '1px solid #7F3F98',
                                        margin: '0 25px',
                                        padding: '0 10px',
                                        color: colors.success,
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        boxSizing: 'border-box',
                                        borderRadius: '3px'
                                    }}>

                                        ₦6,000
                                </div>
                            </IsDesktop>

                            <img
                                onClick={() => AttemptSignOut()}
                                src={require('./../../assets/icons/power-button.png')}
                                style={{ height: '20px', margin: '0 0 0 35px', cursor: 'pointer' }}
                            />

                        </div>
                    ) : null
                }

            </div>
        </div>
    )    
}


const styles = {
    container: {
        height: "69px",
        width: '100%',
        position: 'fixed',       
        display: 'flex',
        alignItems: 'center',
        background: colors.black,
        zIndex: 99
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        height: '35px'
    },
    navigation: {
        display: 'flex',
        alignItems: 'center',
    },
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logout
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)
