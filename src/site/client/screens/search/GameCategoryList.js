import React, {useState} from 'react'

import {
    useRouteMatch,
    useLocation,
    Redirect
} from 'react-router-dom';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { colors } from '../../../../App.json'

export default function GameCategoryList() {
    const [CategoryList, setCategoryList] = useState({
        action: {
            name: "Action",
            slug: "action",
            tray: {
                opened: false,
                games: []
            }
        },
        adventure: {
            name: "Adventure",
            slug: "adventure",
            tray: {
                opened: false,
                games: []
            }
        },
        racing: {
            name: "Racing",
            slug: "racing",
            tray: {
                opened: false,
                games: []
            }
        },
        sport: {
            name: "Sport",
            slug: "sport",
            tray: {
                opened: false,
                games: []
            }
        },
        strategy: {
            name: "Strategy",
            slug: "strategy",
            tray: {
                opened: false,
                games: []
            }
        },
        others: {
            name: "Other",
            slug: "others",
            tray: {
                opened: false,
                games: []
            }
        },
    })

    const RenderCategoryList = () => {
        let categoryList = []
        for (let categoryName in CategoryList) {
            let category = CategoryList[categoryName]
            categoryList.push(
                <div style={styles.listItem}>
                    <div>{category.name}</div>

                    {
                        category.tray.opened ? (
                            <IoIosArrowUp />
                        ) : (
                            <IoIosArrowDown />
                        )
                    }
                </div>
            )
        }
        return categoryList
    }


    const location = useLocation()
    // const { state } = useLocation()

    console.log("location: ", location)
    

    // if (redirect) {
    //     return <Redirect to={redirect} />
    // }

    return (
        <div className={"container"} style={styles.container}>
            <div>

            </div>

            <div style={styles.heading}>
                CATEGORIES
            </div>

            <div style={styles.innerWrapper}>
                {
                    // CategoryList.map(category => {
                    RenderCategoryList()
                }
            </div>
            
        </div>
    )
}


const styles = {
    container: {
        padding: "70px 0 200px 0",
    },
    heading: {
        fontWeight: 'bold',
        fontSize: '35px',
        lineHeight: '45px',
        textAlign: 'center',
        color: colors.primary
    },
    innerWrapper: {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
    },
    listItem: {
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px solid #7F3F98",

        fontFamily: "Nunito Sans",
        fontSize: '25px',
        color: colors.black,
        textTransform: "uppercase",

        padding: "20px 35px",
        margin: "25px"

    }
}