import React, {useEffect, useState} from 'react'
import { colors } from '../../../../App.json'

import {
    useRouteMatch,
    useHistory,
    Redirect,
    withRouter
} from 'react-router-dom';
import { PostMan } from '../../../../Helpers';
import { FaChevronLeft } from 'react-icons/fa';

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'


import ListingCard from '../../components/search/ListingCard';


function SearchGameDetail() {
    const match = useRouteMatch();
    const history = useHistory()

    const searchQuery = match.params.searchQuery;
    
    const [redirect, setRedirect] = useState(null)
    const [Game, setGame] = useState(null)
    const [GameListings, setGameListings] = useState([])
    const [SavedListings, setSavedListings] = useState([])    
    
    const FetchMySavedListings = async () => {
        const responseObject = await PostMan(`listing/saved/`, 'GET')
        if (responseObject.status === 'success') {
            let savedListings = responseObject.data
            // Save Games to state
            await setSavedListings(savedListings)
        }
        else { }
    }

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

    const GoBack = () => {
        history.goBack()
    }

    function IsSavedListing(listing) {
        let isSaved = false
        SavedListings.map(savedListing => {
            if (listing.id === savedListing.id) {
                isSaved = true
            }
        })
        return isSaved
    }

    useEffect(() => {
        // Fetch Searched Game
        FetchSearchedGame()

        // Fetch Saved Listings
        FetchMySavedListings()

    }, [])

    if (redirect) {
        return <Redirect to={redirect} />
    }

    const MainContent = (config) => {
        const {
            container,
            wrapper
        } = config
        return (
            <div className={"container"} style={{ ...styles.container, padding: container.padding}}>

                <div style={styles.goBack} onClick={() => GoBack()}>
                    <FaChevronLeft size={12} />
                    <span style={{ marginLeft: '7px' }}>Back</span>
                </div>

                <div style={{ ...styles.wrapper, padding: wrapper.padding }}>
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
                        <div style={{
                            color: colors.grey3,
                            fontFamily: "Nunito sans",
                            fontWeight: 600,
                            fontSize: "17px",
                            whiteSpace: 'nowrap'
                        }}>
                            Search Results
                        </div>

                        <div>

                            {
                                GameListings.map(listing => {
                                    return (
                                        <ListingCard
                                            game={Game}
                                            listing={listing}
                                            isSavedListing={(listing) => IsSavedListing(listing)}
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

    return (
        <div>
            <IsDesktop>
                {
                    MainContent({
                        container: {
                            padding: "75px 80px"
                        },
                        wrapper: {
                            padding: "50px 80px"
                        }
                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        container: {
                            padding: "0 20px 50px"
                        },
                        wrapper: {
                            padding: "50px 50px"
                        }
                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        container: {
                            padding: "0 20px 20px"
                        },
                        wrapper: {
                            padding: "50px 20px"
                        }
                    })
                }
            </IsPhone>
        </div>
    )
}

const styles = {
    container: {
        minHeight: "100vh",
    },
    wrapper: {
        backgroundColor: colors.white,
    },
    goBack: {
        display: 'flex',
        alignItems: 'center',
        margin: "35px 0",
        fontWeight: 600,
        fontFamily: 'Nunito Sans',
        color: colors.primary,
        cursor: 'pointer',
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
        textAlign: 'center',
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