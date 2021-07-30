import React, { useEffect, useState } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
import {
    updateUser,
} from '../../../../redux/actions/AuthActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UploadGameModal(props) {
    const {
        auth,
        updateUser,
        hideModal
    } = props
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
        saveAddress: {
            text: {
                color: colors.white,
                value: "Save",
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
            onClick: () => AttemptSaveAddress(),
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
            onClick: () => hideModal(),
            loader: null,
        },
    })

    const [formData, setFormData] = useState({
        game: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Select a game',
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
        rentAmount: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Rent Cost (per week)',
            props: {
                name: 'price_input',
                type: 'number',
                placeholder: 'Enter cost per week',
                required: false
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
        sellAmount: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Selling Price',
            props: {
                name: 'price_input',
                type: 'number',
                placeholder: 'Enter selling price',
                required: false
            }
        },
    })

    const [AddressFormData, setAddressFormData] = useState({
        address_line: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Address Line',
            props: {
                name: 'address_input',
                type: 'text',
                placeholder: 'Enter Pick-up address',
                required: true
            }
        },
        country: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
                },
            ],
            value: '',
            label: true,
            labelText: 'Country',
            props: {
                name: 'country_input',
                type: 'text',
                placeholder: null,
                required: true
            }
        },
        state: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
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
        city: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
                },
            ],
            value: '',
            label: true,
            labelText: 'City',
            props: {
                name: 'city_input',
                type: 'text',
                placeholder: null,
                required: true
            }
        },
    })

    const AttemptUploadGame = async() => {
        let payload = {
            "game": formData.game.value,
            "console": formData.console.value,
            "originalCase": formData.originalCase.value,
            "swap": formData.swap.checked,
            "rent": formData.rent.checked,
            "rentAmount": formData.rentAmount.value,
            "sell": formData.sell.checked,
            "sellAmount": formData.sellAmount.value,            
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

        const responseObject = await PostMan(`listing/`, 'POST', payload)
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            // Toast Success message
            toast.success(responseData.message)
            setTimeout(()=> {
                // Hide modal
                hideModal()
                // Reload Page
                window.location.reload()
            }, 2000)
        }
        else {
            console.log("responseObject: ", responseObject)
        }
    }

    const AttemptSaveAddress = async () => {
        // Start Loader
        let newButtons = Buttons
        newButtons.saveAddress.loader.isLoading = true
        await setButtons({ ...newButtons })
        // Payload
        let address_payload = {}
        for (let formField in AddressFormData) {
            let fieldName = formField
            console.log("fieldName: ", fieldName)
            let fieldData = AddressFormData[formField]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ') {
                    // Toast Error Message
                    toast.error(`${fieldData.labelText} field is required!`)
                    return
                }

            }
            // Set in addressPayload
            address_payload[fieldName] = fieldData.value
        }
        let payload = {
            "user": auth.user.id,
            "address_line": address_payload.address_line,
            "location": address_payload.city,
        }
        console.log("payload: ", payload)

        // Response Object
        const responseObject = await PostMan(`address/`, 'POST', payload)
        // Stop Loader
        newButtons.saveAddress.loader.isLoading = false
        await setButtons({ ...newButtons })
        // Handle Response
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            console.log("responseData: ", responseData)
            let userData = responseData.user
            await updateUser(userData)
            // hideModal()
            // return window.location.reload()
        }
        else {
            console.log("responseObject: ", responseObject)
        }
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

    const FetchCountryList = async () => {
        const responseObject = await PostMan(`location/countries`, 'GET')
        if (responseObject.status === 'success') {
            let countryData = responseObject.data
            let newAddressFormData = AddressFormData
            countryData.map(country => {
                newAddressFormData.country.data.push({
                    value: country.id,
                    display: country.name,
                })
            })
            // Set Nigeria as Default
            newAddressFormData.country.value = 293
            // Fetch States
            FetchStateList(293)
            // Clear City List
            newAddressFormData.city.data = [
                {
                    value: 0,
                    display: '---'
                },
            ]
            // Update AddressFormData in state.
            await setAddressFormData({ ...newAddressFormData })
        }
        else { }
    }

    const FetchStateList = async (countryId=293) => {
        const responseObject = await PostMan(`location/states?country_id=${countryId}`, 'GET')
        if (responseObject.status === 'success') {
            let stateList = responseObject.data
            let newAddressFormData = AddressFormData
            // Clear Old List
            newAddressFormData.state.data = [
                {
                    value: 0,
                    display: '---'
                },
            ]
            // Clear City List
            newAddressFormData.city.data = [
                {
                    value: 0,
                    display: '---'
                },
            ]
            stateList.map(state => {
                newAddressFormData.state.data.push({
                    value: state.id,
                    display: `${state.name}`,
                })
            })
            await setAddressFormData({ ...newAddressFormData })
        }
        else { }
    }

    const FetchCityList = async (stateId=5036) => {
        const responseObject = await PostMan(`location/cities?state_id=${stateId}`, 'GET')
        if (responseObject.status === 'success') {
            let cityData = responseObject.data
            let newAddressFormData = AddressFormData
            // Clear Old List
            newAddressFormData.city.data = [
                {
                    value: 0,
                    display: '---'
                },
            ]
            cityData.map(country => {
                newAddressFormData.city.data.push({
                    value: country.id,
                    display: country.name,
                })
            })
            // Update AddressFormData in state.
            await setAddressFormData({ ...newAddressFormData })
        }
        else { }
    }


    useEffect(()=>{
        // Fetch and save games list to state
        FetchAllGames()

        if (auth.user && !auth.user.default_address) {
            // Fetch Countries
            FetchCountryList()
        }

    }, [])

    console.log("SelectedGame: ", SelectedGame)


    return (
        <ModalOverlay>
            <div style={styles.wrapper}>
                {
                    auth.user && auth.user.default_address ? (
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
                                            let query = newFormData.game.value
                                            console.log('query: ', query)
                                            filterGamesList(query)
                                        }}
                                        field={{
                                            id: 'game',
                                            config: formData.game
                                        }}

                                        filteredList={FilteredGamesList}
                                        setFilteredList={setFilteredGamesList}
                                        selected={SelectedGame}
                                        setSelectedObject={(game) => {
                                            if (game) {
                                                setSelectedGame({ ...game })
                                                // Set Game name
                                                let newFormData = formData
                                                newFormData.game.value = game.id

                                                // Set Consoles
                                                game.consoles.map(console_ => {
                                                    newFormData.console.data.push({
                                                        value: parseInt(console_.id),
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



                                <div className="col-12">
                                    Conditions

                                    <div className="row">
                                        <div className="col-6">
                                            <FormField
                                                formData={formData}
                                                change={(newFormData) => setFormData({ ...newFormData })}
                                                field={{
                                                    id: 'swap',
                                                    config: formData.swap
                                                }}
                                            />
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-6">
                                            <FormField
                                                formData={formData}
                                                change={(newFormData) => {
                                                    if (newFormData.rent.checked) {
                                                        newFormData.rentAmount.props.required = true
                                                    } else {
                                                        newFormData.rentAmount.props.required = false
                                                    }
                                                    setFormData({ ...newFormData })
                                                }}
                                                field={{
                                                    id: 'rent',
                                                    config: formData.rent
                                                }}
                                            />
                                        </div>

                                        <div className="col-6">
                                            {
                                                formData.rent.checked ? (
                                                    <FormField
                                                        formData={formData}
                                                        change={(newFormData) => setFormData({ ...newFormData })}
                                                        field={{
                                                            id: 'rentAmount',
                                                            config: formData.rentAmount
                                                        }}
                                                    />
                                                ) : null
                                            }
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-6">
                                            <FormField
                                                formData={formData}
                                                // change={(newFormData) => setFormData({ ...newFormData })}
                                                change={(newFormData) => {
                                                    if (newFormData.sell.checked) {
                                                        newFormData.sellAmount.props.required = true
                                                    } else {
                                                        newFormData.sellAmount.props.required = false
                                                    }
                                                    setFormData({ ...newFormData })
                                                }}
                                                field={{
                                                    id: 'sell',
                                                    config: formData.sell
                                                }}
                                            />
                                        </div>

                                        <div className="col-6">
                                            {
                                                formData.sell.checked ? (
                                                    <FormField
                                                        formData={formData}
                                                        change={(newFormData) => setFormData({ ...newFormData })}
                                                        field={{
                                                            id: 'sellAmount',
                                                            config: formData.sellAmount
                                                        }}
                                                    />
                                                ) : null
                                            }
                                        </div>
                                    </div>

                                </div>


                                <div className="col-12">
                                    <p style={styles.paragrapgh}>
                                        All games sent to Velcro
                                        would be tested at company HQ before being swapped. Any faulty games would be returned to the
                                        user and the delivery fee paid will not be returned.
                                    </p>

                                    <Button {...Buttons.uploadGame} />

                                    <p style={styles.paragrapgh}>
                                        By clicking ‘’Upload’’ you confirm that you have read and agreed to
                                        our <Link to="/">terms of use</Link> and <Link to="/">privacy policy.</Link>
                                    </p>
                                </div>

                            </div>
                        </div>
                    ) : (
                            <div style={styles.container}>
                                <div style={styles.header} className="text-center">
                                    Enter a default pick up address
                                </div>

                                <span style={{ display: 'flex', justifyContent: 'flex-end', }}>
                                    <Button {...Buttons.cancel} />
                                </span>

                                <div className="row mt-3">

                                    <div className="col-12">
                                        <p style={styles.paragrapgh}>
                                            To upload a game on velcro, You're required to have a default pick-up 
                                            address.
                                        </p>
                                    </div>

                                    <div className="col-12">
                                        <FormField
                                            formData={AddressFormData}
                                            change={(newFormData) => setAddressFormData({ ...newFormData })}
                                            field={{
                                                id: 'address_line',
                                                config: AddressFormData.address_line
                                            }}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <FormField
                                            formData={AddressFormData}
                                            // change={(newFormData) => setAddressFormData({ ...newFormData })}
                                            change={(newAddressFormData) => {
                                                let countryId = newAddressFormData.country.value
                                                // Update Form
                                                setAddressFormData({ ...newAddressFormData })
                                                // Fetch States
                                                FetchStateList(countryId)
                                            }}
                                            field={{
                                                id: 'country',
                                                config: AddressFormData.country
                                            }}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <FormField
                                            formData={AddressFormData}
                                            // change={(newFormData) => setAddressFormData({ ...newFormData })}
                                            change={(newAddressFormData) => {
                                                let stateId = newAddressFormData.state.value
                                                // Update Form
                                                setAddressFormData({ ...newAddressFormData })
                                                // Fetch States
                                                FetchCityList(stateId)
                                            }}
                                            field={{
                                                id: 'state',
                                                config: AddressFormData.state
                                            }}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <FormField
                                            formData={AddressFormData}
                                            change={(newFormData) => setAddressFormData({ ...newFormData })}
                                            field={{
                                                id: 'city',
                                                config: AddressFormData.city
                                            }}
                                        />
                                    </div>


                                    <div className="col-12">
                                        <p style={styles.paragrapgh}>
                                            Note that this can always be updated in your account
                                            settings.
                                        </p>

                                        <Button {...Buttons.saveAddress} />

                                        {/* <p style={styles.paragrapgh}>
                                            By clicking ‘’Upload’’ you confirm that you have read and agreed to
                                            our <Link to="/">terms of use</Link> and <Link to="/">privacy policy.</Link>
                                        </p> */}
                                    </div>

                                </div>
                            </div>
                    )
                }
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


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updateUser
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadGameModal)