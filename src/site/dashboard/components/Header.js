import React from 'react'
import { connect } from 'react-redux'
import {
    Link,
    Redirect
} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { colors } from '../../../App.json'
import {
    // login,
    logout
} from '../../../redux/actions/AuthActions'
import Dropdown from '../../../utils/Dropdown'

import { BiChevronDown } from 'react-icons/bi'

function Header(props) {
    const {
        auth
    } = props

    const userToggleDropdown = {
        title: <div>{auth.user && auth.user.username} <BiChevronDown /></div>,
        data: [
            {
                name: "Change Password",
                action: () => {console.log("Change Password")}
            },
            {
                name: "Sign Out",
                action: () => props.logout()
            }
        ],
        wrapperStyles: {
            padding: "5px 15px",
            backgroundColor: colors.grey,
        }
    }

    return (
        <div className="container" style={styles.navbar}>
            <Link to="/">
                <img
                    src={require('./../../../assets/icons/logo.svg')}
                    style={styles.logo}
                />
            </Link>

            {
                auth.loggedIn ? (
                    <Dropdown {...userToggleDropdown} />
                ) : null
            }
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