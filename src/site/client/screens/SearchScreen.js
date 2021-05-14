import React, {useState} from 'react'

import {
    Route,
    Switch,
    useRouteMatch,
    useLocation,
    withRouter
} from 'react-router-dom';

// import LandingScreen from './LandingScreen';
// import HomeScreen from './HomeScreen';

import Header from '../components/main/Header';
import {
    colors
} from '../../../App.json'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProtectedRoute from '../../../utils/ProtectedRoute';
import GameSearchDetail from './search/GameSearchDetail';
import GameCategoryList from './search/GameCategoryList';


function SearchScreen(props) {
    const [HeaderConfig, setHeaderConfig] = useState({
        headerButtons: [
            {
                isProtected: false,
                text: {
                    color: colors.white,
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
                linkTo: "/register",
            },
        ],
        headerStyles: {
            backgroundColor: colors.black
        }
    })

    const {
        auth
    } = props

    const match = useRouteMatch();

    // function useQuery() {
    //     return new URLSearchParams(useLocation().search);
    // }
    // const searchQuery = useQuery().get('q');
    // console.log("searchQuery: ", searchQuery)



    
    // const location = useLocation()
    // const { state } = useLocation()

    // console.log("match: ", match)
    // console.log("match params: ", match.params)
    
    // console.log("location: ", location)

    

    return (
        <div>
            <Header {...props} headerConfig={HeaderConfig} />

            
            <div style={styles.wrapper}>
                <Switch>
                    <Route exact path={`${match.path}/:searchQuery`}>
                        <GameSearchDetail />
                    </Route>
                    <Route exact path={match.path}>
                        <GameCategoryList />
                    </Route>
                </Switch>

            </div>
            
        </div>
    )
}

const styles = {
    wrapper: {
        // height: '100%',
        padding: "69px 0 0 0",
        backgroundColor: colors.background,
    },
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        // register
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchScreen))