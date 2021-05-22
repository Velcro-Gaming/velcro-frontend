import React from 'react'
import { connect } from 'react-redux'
import {
    Link,
    Redirect
} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { colors } from '../../../App.json'
import Dropdown from '../../../utils/Dropdown'

function Header(props) {
    const {
        auth
    } = props

    const userToggleDropdown = {
        title: auth.user && auth.user.username,
        data: [
            {
                name: "Change Password",
                linkTo: "/admin/change-password"
            },
            {
                name: "Change Password",
                action: () => { }
            }
        ]
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
                    <Dropdown
                        title={userToggleDropdown.title}
                        data={userToggleDropdown.data}
                    />
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