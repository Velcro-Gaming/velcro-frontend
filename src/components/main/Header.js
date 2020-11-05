import React, { Component } from 'react'
import {
    colors
} from '../../App.json'
import Button from '../utils/Button'
import {
    Link,
    Redirect
} from 'react-router-dom'


export default class Header extends Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        const {
            headerButtons,
            headerStyles,
        } = this.props.headerConfig

        return (
            <div style={{ ...styles.container, backgroundColor: headerStyles.backgroundColor ? headerStyles.backgroundColor : 'transparent' }}>
                <div className="container" style={styles.navbar}>
                    <Link to="/">
                        <img
                            src={require('./../../assets/icons/logo.svg')}
                            height={100}
                            style={styles.logo}
                        />
                    </Link>

                    <div style={styles.navigation}>

                        {
                            headerButtons.map((navItem, index) => {
                                return <Button {...navItem} key={index} />
                            })
                        }
                    </div>

                </div>
            </div>
        )
    }
}


const styles = {
    container: {
        height: "69px",
        width: '100%',
        position: 'fixed',       
        display: 'flex',
        alignItems: 'center',
        background: colors.black,
        zIndex: 99999
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