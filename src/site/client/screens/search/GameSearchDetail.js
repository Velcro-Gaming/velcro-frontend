import React, {useEffect, useState} from 'react'
import { colors } from '../../../../App.json'

import {
    useRouteMatch,
    useLocation,
    Redirect,
    withRouter
} from 'react-router-dom';
import { PostMan } from '../../../../Helpers';
import Button from '../../../../utils/Button';

import { GrLocation } from 'react-icons/gr';
import { FaRegHeart } from 'react-icons/fa';
import SearchScreen from '../SearchScreen';


function SearchGameDetail() {

    const [redirect, setRedirect] = useState(null)
    const [Game, setGame] = useState(null)
    
    // const match = useRouteMatch();
    // const searchQuery = match.params.searchQuery;
    // console.log("match: ", match)
    // console.log("match params: ", match.params)

    const match = useRouteMatch();
    
    const searchQuery = match.params.searchQuery;
    console.log("searchQuery: ", searchQuery)




    const location = useLocation()
    // const { state } = useLocation()

    console.log("location: ", location)
    


    const FetchSearchedGame = async () => {
        
        const searchQuery = match.params.searchQuery;

        const responseObject = await PostMan(`game/${searchQuery}/`, 'GET')
        console.log("responseObject: ", responseObject)

        if (responseObject.status === 'success') {
            let game = responseObject.data
            console.log("game: ", game)
            // let myGames = responseData.data
            // Save Games to state
            await setGame(game)
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

    const getUserInitials = (user) => {
        // props.logout()
        if (user.full_name) {
            let userFullName = user.full_name
            let firstName = userFullName.split(' ')[0]
            let lastName = userFullName.split(' ')[1]
            return `${firstName[0]}${lastName[0]}`.toUpperCase()
        }
        return `${user.username[0]}${user.username[0]}`.toUpperCase()
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
                            Game && Game.listings.map(listing => {
                                return (
                                    <div style={styles.gameListing}>
                                        <div style={{ display: 'flex', flexDirection: 'column', padding: "20px 15px" }}>
                                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                                
                                                {
                                                    listing.owner.image ? (
                                                        <img src={listing.owner.image} style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                    ) : (
                                                        <div style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            backgroundColor: colors.grey,
                                                            color: colors.primary,
                                                            height: '32px',
                                                            width: '32px',
                                                            borderRadius: '50%',
                                                            fontSize: '15px',
                                                            lineHeight: '20px',
                                                        }}>
                                                            {getUserInitials(listing.owner)}
                                                        </div>
                                                    )
                                                }

                                                <div style={{ color:colors.primary, margin: "0 0 0 15px" }}>
                                                    {listing.owner.username}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', fontSize: "14px", color: colors.dark, margin: "20px 0"}}>
                                                Original Case: 
                                                {
                                                    listing.original_case ? (
                                                        <div style={{ margin: "0 0 0 10px", color: colors.success }}>Yes</div>
                                                    ) : (
                                                        <div style={{ margin: "0 0 0 10px", color: colors.danger }}>No</div>
                                                    )
                                                }
                                            </div>
                                        </div>

                                        
                                        <div style={{ height: "auto", width: "2px", backgroundColor: colors.grey2, margin: "10px 20px"}} />


                                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                            
                                            <div style={{alignSelf: 'flex-end', fontSize: "14px", color: colors.primary}}>
                                                <FaRegHeart />
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                {
                                                    listing.rent ? (
                                                        <Button {...{
                                                            text: {
                                                                color: colors.white,
                                                                value: "Rent",
                                                            },
                                                            styles: {
                                                                height: '45px',
                                                                width: '120px',
                                                                margin: '30px 15px',
                                                                backgroundColor: colors.primary,
                                                                border: {
                                                                    width: "1px",
                                                                    style: "solid",
                                                                    color: colors.white,
                                                                    radius: "3px",
                                                                },
                                                                color: colors.white
                                                            },
                                                            onClick: () => { },
                                                        }} />
                                                    ): null
                                                }

                                                {
                                                    listing.swap ? (
                                                        <Button {...{
                                                            text: {
                                                                color: colors.primary,
                                                                value: "Swap",
                                                            },
                                                            styles: {
                                                                height: '45px',
                                                                width: '120px',
                                                                margin: '30px 15px',
                                                                backgroundColor: colors.tetiary,
                                                                border: {
                                                                    width: "1px",
                                                                    style: "solid",
                                                                    color: colors.white,
                                                                    radius: "3px",
                                                                },
                                                                color: colors.white
                                                            },
                                                            onClick: () => { },
                                                        }} />
                                                    ) : null
                                                }

                                                {
                                                    listing.sell ? (
                                                        <Button {...{
                                                            text: {
                                                                color: colors.primary,
                                                                value: "Buy ",
                                                            },
                                                            styles: {
                                                                height: '45px',
                                                                width: '120px',
                                                                margin: '30px 15px',
                                                                backgroundColor: colors.grey2,
                                                                border: {
                                                                    width: "1px",
                                                                    style: "solid",
                                                                    color: "#641E6E",
                                                                    radius: "3px",
                                                                },
                                                                color: colors.white
                                                            },
                                                            onClick: () => { },
                                                        }} />
                                                    ) : null
                                                }
                                            </div>

                                            <div style={{ alignSelf: 'flex-end', fontSize: "14px", color: colors.grey3 }}>
                                                <GrLocation /> Ikeja, Lagos
                                            </div>
                                        </div>
                                        
                                    </div>
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

        // margin: "20px"
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
        // alignItems: "center",

        margin: "50px 0"
    },

    gameListing: {
        display: "flex",
        background: colors.grey1,
        border: "1px solid #D0D0D0",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",

        margin: "20px 0",

        padding: "15px 40px"
    }
}

export default withRouter(SearchGameDetail)