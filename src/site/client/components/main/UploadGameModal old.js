import React, { useEffect, useState } from 'react'
import ModalOverlay from '../../../../utils/overlay/ModalOverlay'
import {
    colors,
    cities
} from '../../../../App.json'

import FormField from '../../../../utils/FormField';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../../../utils/Button';
import { PostMan } from '../../../../Helpers';
import SearchableInput from '../../../../utils/SearchableInput';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UploadGameModal(props) {
    const [AllGames, setAllGames] = useState([])
    const [FilteredGamesList, setFilteredGamesList] = useState([])
    const [SelectedGame, setSelectedGame] = useState(null)
    const [Buttons, setButtons] = useState({
        uploadGame: {
            text: {
                color: colors.white,
                value: "UPLOAD",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '20px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AttemptUploadGame(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
        cancel: {
            text: {
                color: colors.primary,
                value: "cancel",
            },
            styles: {
                height: '30px',
                width: null,
                margin: null,
                backgroundColor: null,
                border: {
                    width: null,
                    style: null,
                    color: null,
                    radius: null,
                },
                color: colors.white
            },
            onClick: () => props.hideModal(),
            loader: null,
        },
    })

    const [formData, setFormData] = useState({
        nameOfGame: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Name of game',
            props: {
                name: 'name_of_game',
                type: 'text',
                placeholder: 'Enter name of game',
                required: true
            }
        },
        console: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
                },
            ],
            value: '',
            label: true,
            labelText: 'Select Console',
            props: {
                name: 'category_input',
                type: 'select',
                placeholder: null,
                required: true
            }
        },
        originalCase: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
                },
                {
                    value: true,
                    display: 'Yes'
                },
                {
                    value: false,
                    display: 'No'
                },
            ],
            value: '',
            label: true,
            labelText: 'Original case?',
            props: {
                name: 'original_case_input',
                type: 'text',
                placeholder: null,
                required: true
            }
        },
        rent: {
            element: 'checkbox',
            checked: false,
            label: true,
            labelText: 'Rent',
            props: {
                name: 'rent_input',
                type: 'checkbox',
            }
        },
        swap: {
            element: 'checkbox',
            checked: false,
            label: true,
            labelText: 'Swap',
            props: {
                name: 'swap_input',
                type: 'checkbox',
            }
        },
        sell: {
            element: 'checkbox',
            checked: false,
            label: true,
            labelText: 'Sell',
            props: {
                name: 'sell_input',
                type: 'checkbox',
            }
        },
        state: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
                },
                {
                    value: 'Lagos',
                    display: 'Lagos'
                },
                {
                    value: 'Abuja',
                    display: 'Abuja'
                },
            ],
            value: '',
            label: true,
            labelText: 'State',
            props: {
                name: 'state_input',
                type: 'text',
                placeholder: null,
                required: true
            }
        },
        lga: {
            element: 'select',
            data: [],
            value: '',
            label: true,
            labelText: 'LGA',
            props: {
                name: 'lga_input',
                type: 'text',
                placeholder: null,
                required: true
            }
        },
        price: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Price',
            props: {
                name: 'price_input',
                type: 'number',
                placeholder: 'Enter price',
                required: true
            }
        },
    })

    const AttemptUploadGame = async() => {
        let payload = {
            "name": formData.nameOfGame.value,
            "originalCase": formData.originalCase.value,
            "price": formData.price.value,
            "rent": formData.rent.checked,
            "swap": formData.swap.checked,
            "sell": formData.sell.checked,
            "lga": formData.lga.value,
            "state": formData.state.value,
            "category": formData.category.value
        }

        // Validate Fields
        for (let formField in formData) {
            let fieldName = formField
            let fieldData = formData[formField]
            console.log("required: ", fieldData.props.required)
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ' || fieldData.value == 0) {
                    // Toast Error Message
                    toast.error(`${fieldData.labelText} field is required!`)
                    return
                }
            }
        }

        if(SelectedGame && SelectedGame.name !== payload["name"]) {
            // Toast Error Message
            toast.error("Select a valid game from list of suggested game(s)")
            return
        }

        console.log("payload: ", payload)

        // const responseObject = await PostMan(`/userGameUpload`, 'POST', payload)
        // if (responseObject.status === 'success') {
        //     window.location.reload()
        //     // return <Redirect to="/" />
        // }
        // else {
        //     console.log("responseObject: ", responseObject)
        // }
    }


    const FetchAllGames = async() =>{
        const responseObject = await PostMan(`game/all/`, 'GET')
        if (responseObject.status === 'success') {
            let allGames = responseObject.data
            console.log("allGames: ", allGames)
            // let allGames = responseData.data
            // Save Games to state
            await setAllGames(allGames)
        }
        else {}
    }

    function filterGamesList(query) {
        let queryFormattedToLowerCase = String(query).toLocaleLowerCase()
        if (queryFormattedToLowerCase.length === 0) {
            return setFilteredGamesList([])
        }
        let queryset = AllGames.filter(game => {
            let gameNameFormattedToLowerCase = String(game.name).toLowerCase()
            return gameNameFormattedToLowerCase.startsWith(queryFormattedToLowerCase)
        })
        return setFilteredGamesList(queryset)
    }


    useEffect(()=>{
        // Fetch and save games list to state
        FetchAllGames()

    }, [])

    console.log("SelectedGame: ", SelectedGame)


    return (
        <ModalOverlay>
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <div style={styles.header} className="text-center"> Upload Game</div>

                    <span style={{ display: 'flex', justifyContent: 'flex-end', }}>
                        <Button {...Buttons.cancel} />
                    </span>

                    <div className="row">
                        <div className="col-12">

                            <SearchableInput
                                formData={formData}
                                change={(newFormData) => {
                                    setFormData({ ...newFormData })
                                    let query = newFormData.nameOfGame.value
                                    console.log('query: ', query)
                                    filterGamesList(query)
                                }}
                                field={{
                                    id: 'nameOfGame',
                                    config: formData.nameOfGame
                                }}

                                filteredList={FilteredGamesList}
                                setFilteredList={setFilteredGamesList}
                                selected={SelectedGame}
                                setSelectedObject={(game) => {
                                    if (game) {
                                        setSelectedGame({ ...game })
                                        // Set Game name
                                        let newFormData = formData
                                        newFormData.nameOfGame.value = game.id
                                        
                                        // Set Consoles
                                        game.consoles.map(console_=>{
                                            newFormData.console.data.push({
                                                value: console_.id,
                                                display: console_.name,
                                            })
                                        })

                                        setFormData({ ...newFormData })
                                    } else {
                                        setSelectedGame(game)
                                    }
                                }}
                            />
                            
                        </div>

                        <div className="col-6">
                            <FormField
                                formData={formData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'console',
                                    config: formData.console
                                }}
                            />
                        </div>

                        <div className="col-6">
                            <FormField
                                formData={formData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'originalCase',
                                    config: formData.originalCase
                                }}
                            />
                        </div>



                        <div className="col-6">
                            Conditions
                             
                            <FormField
                                formData={formData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'rent',
                                    config: formData.rent
                                }}
                            />

                            <FormField
                                formData={formData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'swap',
                                    config: formData.swap
                                }}
                            />

                            <FormField
                                formData={formData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'sell',
                                    config: formData.sell
                                }}
                            />

                            <FormField
                                formData={formData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'price',
                                    config: formData.price
                                }}
                            />
                        </div>


                        <div className="col-6">
                            Location

                            <FormField
                                formData={formData}
                                // change={(newFormData) => setFormData({ ...newFormData })}
                                change={(newFormData) => {
                                    let state = newFormData.state.value
                                    console.log("state: ", state)
                                    // Set State LGA's
                                    let allStateLGA = [
                                        {
                                            value: 0,
                                            display: '---'
                                        },
                                    ]
                                    console.log("allStateLGA: ", allStateLGA)
                                    console.log("cities[state]: ", cities[state])

                                    Array.prototype.push.apply(allStateLGA, cities[state]);

                                    console.log("allStateLGA: ", allStateLGA)
                                    
                                    newFormData.lga.data = allStateLGA
                                    setFormData({ ...newFormData })
                                }}
                                field={{
                                    id: 'state',
                                    config: formData.state
                                }}
                            />

                            <FormField
                                formData={formData}
                                change={(newFormData) => setFormData({ ...newFormData })}
                                field={{
                                    id: 'lga',
                                    config: formData.lga
                                }}
                            />
                        </div>

                        

                        <div className="col-12">
                            <p style={styles.paragrapgh}>
                                All games sent to Velcro
                                would be tested at company HQ before being swapped. Any faulty games would be returned to the
                                user and the delivery fee paid will not be returned.
                            </p>
                            
                            <Button {...Buttons.uploadGame} />

                            <p style={styles.paragrapgh}>
                                By clicking ‘’ Upload’’ you confirm that you have read and agreed to 
                                our <Link to="/">terms of use</Link> and <Link to="/">privacy policy.</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <ToastContainer />

        </ModalOverlay>
    )
}


const styles = {
    wrapper: { // Centered Content
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        width: "100%",
        height: "100%",
    },

    container: {
        backgroundColor: colors.white,
        width: "450px",
        padding: "20px 30px"
    },

    header: {
        fontFamily: "Nunito Sans",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "17px",
        lineHeight: "24px",
        color: colors.black,
        margin: "20px"
    },
    paragrapgh: {
        fontSize: "14px",
        textAlign: "justify"
    },
}


export default UploadGameModal