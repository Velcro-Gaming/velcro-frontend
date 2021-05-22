import React, {useEffect, useState} from 'react'
import { colors } from '../../../../App.json'

import {
    useRouteMatch,
    Redirect,
    withRouter
} from 'react-router-dom';
import { PostMan } from '../../../../Helpers';

import GameListingCard from '../../components/search/GameListingCard';


function SearchGameDetail() {
    const match = useRouteMatch();
    const searchQuery = match.params.searchQuery;
    
    const [redirect, setRedirect] = useState(null)
    const [Game, setGame] = useState(null)
    const [GameListings, setGameListings] = useState([])


    const FetchSearchedGame = async () => {
        const responseObject = await PostMan(`game/${searchQuery}/`, 'GET')
        if (responseObject.status === 'success') {
            let game = responseObject.data
            // Remove game lisitings from Game object
            let listings = game.listings
            delete game.listings
            // Save Game to state
            setGame(game)
            // Save Game listings to state
            setGameListings(listings)
        }
        else if (responseObject.status === 'error') { 
            let responseData = responseObject.data
            if (responseData.message === "not_found") {
                setRedirect({
                    pathname: '/search',
                    state: {
                        search: {
                            status: responseData.message,
                            query: searchQuery,
                        }
                    }
                })
            }
        }
        else { }

    }

    useEffect(() => {
        // Fetch searched game
        FetchSearchedGame()

    }, [])

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <div className={"container"} style={styles.container}>
            <div style={styles.wrapper}>
                <div style={styles.gameWrapper}>
                    <div style={styles.gameCover}>
                        <img src={Game && Game.image} style={styles.gameCoverImage} />
                    </div>
                    <div style={styles.gameName}>
                        {Game && Game.name}
                    </div>
                    <div style={styles.gameCategory}>
                        {Game && Game.category}
                    </div>
                </div>

                <div style={styles.gameListingsWrapper}>
                    <div style={{color: colors.grey3, fontFamily: "Nunito sans", fontWeight: 600, fontSize: "17px"}}>
                        Search Results
                    </div>

                    <div>

                        {
                            GameListings.map(listing => {
                                return (
                                    <GameListingCard
                                        game={Game}
                                        listing={listing}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        padding: "75px 100px"
    },
    wrapper: {
        backgroundColor: colors.white,
        padding: "50px 100px"
    },
    gameWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    gameCover: {
        borderRadius: "14px",
        border: "2px solid #7F3F98"
    },
    gameCoverImage: {
        width: "220px",
        height: "250px",
        objectFit: "cover",
        borderRadius: "10px",
        margin: "3px"
    },
    gameName: {
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: 800,
        textTransform: "uppercase",
        fontSize: "30px",
        lineHeight: "42px",
        margin: "5px",
    },
    gameCategory: {
        backgroundColor: "#3D61DF",
        color: colors.white,
        padding: "5px 10px",
        fontSize: "14px",
        lineHeight: "19px",
    },

    gameListingsWrapper: {
        display: "flex",
        flexDirection: "column",
        margin: "50px 0"
    },
}

export default withRouter(SearchGameDetail)