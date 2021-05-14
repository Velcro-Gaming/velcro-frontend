import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    Link,
    Redirect,
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { colors } from '../../../App.json'

import Header from '../components/Header'
import OrdersScreen from './home/OrdersScreen'
import UsersScreen from './home/UsersScreen'
import GamesScreen from './home/GamesScreen'
import ContactsScreen from './home/ContactsScreen'
import WithdrawalsScreen from './home/WithdrawalsScreen'


function HomeScreen() {
    const match = useRouteMatch()

    const [ActiveScreen, setActiveScreen] = useState({
        name: '',
        path: null
    })



    
    return (
        <div style={styles.container}>
            <div style={{ ...styles.headerWrapper, backgroundColor: 'transparent' }}>

                <Header />

                <div className="container" style={styles.wrapper}>


                    <div style={styles.navbar}>
                        <div style={styles.navItem}>
                            <Link 
                                to="/orders"
                                className="hover-bold"
                                style={{ 
                                    fontWeight: ActiveScreen.name === "orders" ? 800 : 'normal'
                                }}
                            >Orders</Link>
                        </div>
                        <div style={styles.navItem}>
                            <Link 
                                to="/users"
                                className="hover-bold"
                                style={{ 
                                    fontWeight: ActiveScreen.name === "users" ? 800 : 'normal'
                                }}
                            >Users</Link>
                        </div>
                        <div style={styles.navItem}>
                            <Link 
                                to="/games"
                                className="hover-bold"
                                style={{ 
                                    fontWeight: ActiveScreen.name === "games" ? 800 : 'normal'
                                }}
                            >Games</Link>
                        </div>
                        <div style={styles.navItem}>
                            <Link 
                                to="/contacts"
                                className="hover-bold"
                                style={{ 
                                    fontWeight: ActiveScreen.name === "contacts" ? 800 : 'normal'
                                }}
                            >Contacts</Link>
                        </div>
                        <div style={styles.navItem}>
                            <Link 
                                to="/withdrawals"
                                className="hover-bold"
                                style={{ 
                                    fontWeight: ActiveScreen.name === "withdrawals" ? 800 : 'normal'
                                }}
                            >Withdrawals</Link>
                        </div>
                    </div>


                    <div style={styles.pageContent}>

                        <Switch>
                            <Route exact path={`${match.path}`}>
                                <Redirect to="/orders"/>
                            </Route>
                            <Route exact path={'/orders'}>
                                <OrdersScreen setActiveScreen={(config) => setActiveScreen({...config})} />
                            </Route>
                            <Route exact path={'/users'}>
                                <UsersScreen setActiveScreen={(config) => setActiveScreen({...config})} />
                            </Route>
                            <Route exact path={'/games'}>
                                <GamesScreen setActiveScreen={(config) => setActiveScreen({...config})} />
                            </Route>
                            <Route exact path={'/withdrawals'}>
                                <WithdrawalsScreen setActiveScreen={(config) => setActiveScreen({...config})} />
                            </Route>
                            <Route exact path={'/contacts'}>
                                <ContactsScreen setActiveScreen={(config) => setActiveScreen({...config})} />
                            </Route>
                        </Switch>

                    </div>
                </div>
            </div>
            
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: colors.background,
        minHeight: "100vh",
    },
    wrapper: {
        padding: "80px 0",
    },
    headerWrapper: {
        padding: "20px 0",
    },
    navbar: {
        display: 'flex',
        flexFlow: "row wrap",
        borderBottom: "1px solid #641E6E",
        width: "fit-content",
        margin: "10px",
    },
    navItem: {
        color: colors.primary,
        margin: "0 15px 10px 0",
        fontSize: "18px",
        lineHeight: "25px",
    },
    pageContent: {
        padding: "50px 0",
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)