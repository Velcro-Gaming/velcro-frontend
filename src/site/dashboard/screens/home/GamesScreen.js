import React, { useEffect, useState } from 'react';

import { PostMan } from '../../../../Helpers';
import { colors } from '../../../../App.json';

import FormField from '../../../../utils/FormField';
import Button from '../../../../utils/Button';

import GameCard from '../../components/GameCard'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function GamesScreen(props) {
    const {
        setActiveScreen
    } = props

    const [redirect, setRedirect] = useState(null)
    const [GameList, setGameList] = useState([])
    const [formFields, setFormFields] = useState({
        name: {
            element: 'input',
            value: '',
            label: false,
            labelText: 'Name',
            props: {
                name: 'name_input',
                type: 'text',
                placeholder: 'eg. Mad Max Fury Road III',
                required: true,
            }
        },
        category: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
                },
                {
                    value: 'action',
                    display: 'Action'
                },
                {
                    value: 'adventure',
                    display: 'Adventure'
                },
                {
                    value: 'racing',
                    display: 'Racing'
                },
                {
                    value: 'sport',
                    display: 'Sport'
                },
                {
                    value: 'strategy',
                    display: 'Strategy'
                },
                {
                    value: 'others',
                    display: 'Others'
                },
            ],
            value: '',
            label: false,
            labelText: 'Category',
            props: {
                name: 'category_input',
                type: 'text',
                placeholder: null,
                required: true
            }
        },
        image: {
            element: 'input',
            value: null,
            file: null,
            label: false,
            labelText: 'Game Cover',
            props: {
                name: 'cover_input',
                type: 'file',
                placeholder: 'Upload Game cover',
                required: false,
                accept: "image/*",
            }
        },
        consoles: {
            element: 'select',
            data: [
                {
                    value: '*',
                    label: 'All'
                },
            ],
            value: [],
            label: false,
            labelText: 'Consoles',
            props: {
                name: 'consoles_input',
                type: 'text',
                placeholder: 'consoles',
                required: true,
                isMulti: true,
            },
            styles: {
                border: '1px solid #D0D0D0',
                boxSizing: 'border-box',
                borderRadius: '5px',
                height: '75px',
                width: '100%',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                margin: '10px 0',
                padding: '0 10px',
            }
        }, 
        consoleFilter: {
            element: 'select',
            data: [
                {
                    value: '*',
                    display: 'All'
                },
            ],
            value: '*',
            label: false,
            labelText: 'Console',
            props: {
                name: 'console_input',
                type: 'text',
                placeholder: null,
                required: false
            }
        },
        categoryFilter: {
            element: 'select',
            data: [
                {
                    value: '*',
                    display: 'All'
                },
                {
                    value: 'action',
                    display: 'Action'
                },
                {
                    value: 'adventure',
                    display: 'Adventure'
                },
                {
                    value: 'racing',
                    display: 'Racing'
                },
                {
                    value: 'sport',
                    display: 'Sport'
                },
                {
                    value: 'strategy',
                    display: 'Strategy'
                },
                {
                    value: 'others',
                    display: 'Others'
                },
            ],
            value: '*',
            label: false,
            labelText: 'Category',
            props: {
                name: 'category_input',
                type: 'text',
                placeholder: null,
                required: true
            }
        },
    })

    const [PageButtons, setPageButtons] = useState({
        upload: {
            text: {
                color: colors.white,
                value: "Upload",
            },
            styles: {
                height: '50px',
                width: '50%',
                margin: '30px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AttemptGameUpload(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
    })

    const FetchGameList = async () => {
        const responseObject = await PostMan(`game/all/`, 'GET')
        if (responseObject.status === 'success') {
            let gameList = responseObject.data
            // Update game list in state.
            await setGameList(gameList)
        }
        else { }
    }

    const FetchConsoleList = async () => {
        const responseObject = await PostMan(`console/all/`, 'GET')
        if (responseObject.status === 'success') {
            let consoleData = responseObject.data
            let newFormFields = formFields
            consoleData.map(console => {
                newFormFields.consoles.data.push({
                    value: console.id,
                    label: console.name,
                })
                newFormFields.consoleFilter.data.push({
                    value: console.id,
                    display: console.name,
                })
            })
            // Update formFields in state.
            await setFormFields({ ...newFormFields })
        }
        else { }
    }

    const RenderGameList = () => {
        const consoleFilter = formFields.consoleFilter.value
        const categoryFilter = formFields.categoryFilter.value
        // Filter Game List
        let filteredGameList = GameList.map(game => {
            // Filter by Category filter
            if (categoryFilter !== "*") {
                if (game.category !== categoryFilter) {
                    return
                }
            }
            // Filter by Console filter
            if (consoleFilter !== "*") {
                let exists = game.consoles.filter(console_ => {
                    return console_.id == consoleFilter
                })
                if (exists.length === 0) { return }
            }
            return (
                <GameCard config={game} />
            )
        })

        return filteredGameList
    }

    const AttemptGameUpload = async () => {
        // Create an object of formData 
        const formPayload = new FormData();
        let payload = {
            name: formFields.name,
            category: formFields.category,
            consoles: formFields.consoles,
            image: formFields.image
        }       
                
        // Start Loader
        let newPageButtons = PageButtons
        newPageButtons.upload.loader.isLoading = true
        await setPageButtons({ ...newPageButtons })

        for (let field in payload) {
            let fieldData = formFields[field]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ' || fieldData.value == 0) {
                    // Toast Error Message
                    toast.error(`${field.labelText} field is required!`)
                    return
                }
            }

            if (field === 'consoles') {
                // payload[field] = 
                fieldData.value.map(console_ => {
                    // return console_.value
                    formPayload.append('consoles', console_.value);
                })
            } else {
                // payload[field] = fieldData.value
                formPayload.append(field, fieldData.value);
            }
        }

        console.log("formPayload: ", formPayload.serialize)
        console.log("formPayload: ", formPayload.serializeArray)

        const responseObject = await PostMan('game/', 'post', formPayload, false)

        console.log("responseObject: ", responseObject)

        // Stop Loader
        newPageButtons.upload.loader.isLoading = false
        await setPageButtons({ ...newPageButtons })

        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            let gameData = responseData.game_listing

            // Fetch Game List
            FetchGameList()
        }
        else if (responseObject.status === 'bad_request') {
            let responseData = responseObject.data
            for (let key in responseData) {
                if (key === "message") {
                    toast.error(responseData[key])
                } else {
                    let fieldErrors = responseData[key]
                    fieldErrors.map(errorMessage => {
                        // Toast Error Message
                        toast.error(errorMessage)
                    })
                }
            }
        }
        else if (responseObject.status === 'error') {
            // Toast Error Message
            toast.error(responseObject.data.message)
        }

    }

    useEffect(() => {
        setActiveScreen({
            name: 'games',
            path: '/games'
        })

        // Fetch Console List
        FetchConsoleList()

        // Fetch Game List
        FetchGameList()
    }, [])

    // console.log("GameList: ", GameList)


    return (
        <div>
            <div style={styles.contentSectionHeader}>
                New Game Upload
            </div>

            <div style={{ display: 'flex' }}>
                <div style={{ width: '55%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1, textAlign: 'end', margin: '0 30px 0 0' }}>
                            {formFields.name.labelText}
                        </div>

                        <div style={{ flex: 2 }}>
                            <FormField
                                formData={formFields}
                                change={(newFormFields) => setFormFields({ ...newFormFields })}
                                field={{
                                    id: 'name',
                                    config: formFields.name
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1, textAlign: 'end', margin: '0 30px 0 0' }}>
                            {formFields.category.labelText}
                        </div>

                        <div style={{ flex: 2 }}>
                            <FormField
                                formData={formFields}
                                change={(newFormFields) => setFormFields({ ...newFormFields })}
                                field={{
                                    id: 'category',
                                    config: formFields.category
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1, textAlign: 'end', margin: '0 30px 0 0' }}>
                            {formFields.consoles.labelText}
                        </div>

                        <div style={{ flex: 2 }}>
                            <FormField
                                formData={formFields}
                                change={(newFormFields) => {
                                    newFormFields.consoles.value.map(console_ => {
                                        // If "All" consoles selected
                                        if (console_.value === '*') {
                                            // Reset consoles field
                                            newFormFields.consoles.value = []
                                            // Select all consoles
                                            newFormFields.consoles.data.map(console_ => {
                                                if (console_.value !== '*') {
                                                    newFormFields.consoles.value.push(console_)
                                                }
                                            })
                                        }
                                    })
                                    setFormFields({ ...newFormFields })
                                }}
                                field={{
                                    id: 'consoles',
                                    config: formFields.consoles
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1, textAlign: 'end', margin: '0 30px 0 0' }}>
                            {formFields.image.labelText}
                        </div>

                        <div style={{ flex: 2 }}>
                            <FormField
                                formData={formFields}
                                change={(newFormFields) => setFormFields({ ...newFormFields })}
                                field={{
                                    id: 'image',
                                    config: formFields.image
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1, textAlign: 'end', margin: '0 30px 0 0' }}></div>

                        <div style={{ flex: 2 }}>
                            <Button {...PageButtons.upload} />
                        </div>
                    </div>

                    
                </div>

                <div> </div>
            </div>


            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "45px 0 0 0" }}>
                <div style={styles.contentSectionHeader}>
                    All Games
                </div>

                <div style={{display:'flex', alignItems: 'center'}}>
                    <div style={{ margin: "0 10px 0 0" }}>
                        {formFields.categoryFilter.labelText}
                    </div>

                    <FormField
                        formData={formFields}
                        change={(newFormFields) => setFormFields({ ...newFormFields })}
                        field={{
                            id: 'categoryFilter',
                            config: formFields.categoryFilter
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ margin: "0 10px 0 0" }}>
                        {formFields.consoleFilter.labelText}
                    </div>

                    <FormField
                        formData={formFields}
                        change={(newFormFields) => setFormFields({ ...newFormFields })}
                        field={{
                            id: 'consoleFilter',
                            config: formFields.consoleFilter
                        }}
                    />
                </div>
            </div>

            <div className={"row"}>
                {
                    RenderGameList()
                }
            </div>
        </div>
    )
}


const styles = {
    contentSectionHeader: {
        color: colors.primary,
        fontWeight: 800,
        fontSize: "18px",
        
    },
    contentSection: {
        display: 'flex',
    },
}