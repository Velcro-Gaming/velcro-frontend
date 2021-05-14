import React from 'react'
import { connect } from 'react-redux'
import {
    Link,
    Redirect
} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { colors } from '../../App.json'
import Dropdown from '../../../../utils/Dropdown'

function Navbar() {
    const userToggleDropdown = {
        title: "Riyatola",
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
        <div>
            <ul>
                <li>
                    <Link to="/orders">Orders</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/games">Games</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/withdrawal">Withdrawals</Link>
                </li>
            </ul>
            
        </div>
    )
}



const styles = {
    
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)