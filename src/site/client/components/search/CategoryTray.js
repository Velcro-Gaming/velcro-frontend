import React, { useState, useEffect} from 'react'
import { colors } from '../../../../App.json'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import GameCard from '../../components/main/GameCard';
import { PostMan } from '../../../../Helpers'

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

export default function CategoryTray(props) {
    const {
        category
    } = props

    const carouselDisplayCount = 4
    const [currentIndex, setSlide] = useState(0)

    const [IsOpen, setIsOpen] = useState(false)
    const [CategoryGames, setCategoryGames] = useState(null)

    const FetchCategoryGames = async () => {
        const responseObject = await PostMan(`game/all/?category=${category.slug}`, 'GET')
        if (responseObject.status === 'success') {
            let categoryGames = responseObject.data
            console.log("categoryGames: ", categoryGames)
            // Save Games to state
            await setCategoryGames(categoryGames)
        }

        else { }
    }

    useEffect(() => {
        // Fetch Category Games
        if (IsOpen && CategoryGames === null) {
            FetchCategoryGames()
        }   
    })

    const MainContent = (config) => {
        return (
            <div style={styles.container}>
                <div style={styles.wrapper}>
                    <div>{category.name}</div>

                    {
                        IsOpen ? (
                            <div 
                                onClick={() => setIsOpen(!IsOpen)}
                                className={"hover-primary"}
                            >
                                <IoIosArrowUp />
                            </div>
                        ) : (
                            <div 
                                onClick={() => setIsOpen(!IsOpen)}
                                className={"hover-primary"}
                            >
                                <IoIosArrowDown />
                            </div>
                        )
                    }
                </div>

                {
                    IsOpen ? (
                        <div className={"horizontal-scrolling-wrapper"} style={styles.tray}>
                            {/* <Carousel
                                autoPlay={true}
                                showThumbs={false}
                                swipeable={true}
                                stopOnHover={false}
                                infiniteLoop={true}
                                interval={4500}

                                centerMode={true}
                                centerSlidePercentage={100 / carouselDisplayCount}
                                selectedItem={currentIndex}
                            >
                                {
                                    CategoryGames && CategoryGames.map(game => {
                                        return (
                                            <GameCard
                                                self={game}
                                            />
                                        )
                                    })
                                }
                            </Carousel> */}

                            
                            <div className={"tray"}>
                                {
                                    CategoryGames && CategoryGames.map(game => {
                                        return (
                                            <div style={{width: '250px', margin: '0 15px'}}>
                                                <GameCard
                                                    self={game}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            
                        </div>
                    ) : null
                }

            </div>
        )
    }


    return (
        <div>
            <IsDesktop>
                {
                    MainContent({
                        promptSize: '35px',
                        wrapperMargin: '80px 150px',
                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        promptSize: '25px',
                        wrapperMargin: '80px 100px',
                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        promptSize: '15px',
                        wrapperMargin: '50px 35px',
                    })
                }
            </IsPhone>
        </div>
    )
}


const styles = {
    container: {
        padding: "20px 15px",
        margin: "25px 0"
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px solid #7F3F98",

        fontFamily: "Nunito Sans",
        fontSize: '25px',
        color: colors.black,
        textTransform: "uppercase",

    },
    tray: {
        backgroundColor: colors.grey1,
        padding: "30px"
    }
}