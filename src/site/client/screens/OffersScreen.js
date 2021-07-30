import React, { useState, useEffect } from 'react'

import { colors } from '../../../App.json'

import Breakpoint from '../../../utils/breakpoints/Base';
import IsDesktop from '../../../utils/breakpoints/IsDesktop';
import IsTablet from '../../../utils/breakpoints/IsTablet';
import IsPhone from '../../../utils/breakpoints/IsPhone';
import FormField from '../../../utils/FormField';
import { PostMan } from '../../../Helpers';
import OfferCard from '../components/main/OfferCard';
import Header from '../components/main/Header';


export default function OffersScreen(props) {
    const [MyOffers, setMyOffers] = useState([])
    const [HeaderConfig, setHeaderConfig] = useState({
        headerButtons: [

        ],
        headerStyles: {
            backgroundColor: colors.black
        }
    })
    const [FormData, setFormData] = useState({
        console: {
            element: 'select',
            data: [
                {
                    value: '',
                    display: 'All'
                },
            ],
            value: '',
            label: true,
            labelText: 'Console',
            props: {
                name: 'console_input',
                type: 'text',
                placeholder: null,
                required: true
            }
        },
        order_type: {
            element: 'select',
            data: [
                {
                    value: '',
                    display: 'All'
                },
                {
                    value: 'rent',
                    display: 'Rent'
                },
                {
                    value: 'swap',
                    display: 'Swap'
                },
                {
                    value: 'buy',
                    display: 'Buy'
                },
            ],
            value: '',
            label: true,
            labelText: 'Order Type',
            props: {
                name: 'order_type_input',
                type: 'text',
                placeholder: null,
                required: true
            }
        },

        country: {
            element: 'select',
            data: [
                {
                    value: '',
                    display: 'All'
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
                    value: '',
                    display: 'All'
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
                    value: '',
                    display: 'All'
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

    const FetchMyOffers = async () => {
        const responseObject = await PostMan('order/all/?request_from=owner', 'GET')
        if (responseObject.status === 'success') {
            let offers = responseObject.data
            // Save Games to state
            await setMyOffers(offers)
        }
        else { }
    }

    const FetchCountryList = async () => {
        const responseObject = await PostMan(`location/countries`, 'GET')
        if (responseObject.status === 'success') {
            let countryData = responseObject.data
            let newFormData = FormData
            countryData.map(country => {
                newFormData.country.data.push({
                    value: country.id,
                    display: country.name,
                })
            })
            // Set Nigeria as Default
            newFormData.country.value = 293
            // Fetch States
            FetchStateList(293)
            // Clear City List
            newFormData.city.data = [
                {
                    value: '',
                    display: 'All'
                },
            ]
            // Update FormData in state.
            await setFormData({ ...newFormData })
        }
        else { }
    }

    const FetchStateList = async (countryId=293) => {
        const responseObject = await PostMan(`location/states?country_id=${countryId}`, 'GET')
        if (responseObject.status === 'success') {
            let stateList = responseObject.data
            let newFormData = FormData
            // Clear Old List
            newFormData.state.data = [
                {
                    value: '',
                    display: 'All'
                },
            ]
            // Clear City List
            newFormData.city.data = [
                {
                    value: '',
                    display: 'All'
                },
            ]
            stateList.map(state => {
                newFormData.state.data.push({
                    value: state.id,
                    display: `${state.name}`,
                })
            })
            await setFormData({ ...newFormData })
        }
        else { }
    }

    const FetchCityList = async (stateId=5036) => {
        const responseObject = await PostMan(`location/cities?state_id=${stateId}`, 'GET')
        if (responseObject.status === 'success') {
            let cityData = responseObject.data
            let newFormData = FormData
            // Clear Old List
            newFormData.city.data = [
                {
                    value: '',
                    display: 'All'
                },
            ]
            cityData.map(city => {
                newFormData.city.data.push({
                    value: city.id,
                    display: city.name,
                })
            })
            // Update FormData in state.
            await setFormData({ ...newFormData })
        }
        else { }
    }

    const FetchConsoleList = async () => {
        const responseObject = await PostMan(`console/all/`, 'GET')
        if (responseObject.status === 'success') {
            let consoleData = responseObject.data
            let newFormData = FormData
            consoleData.map(console => {
                newFormData.console.data.push({
                    value: console.id,
                    display: console.name,
                })
            })
            // Update FormData in state.
            await setFormData({ ...newFormData })
        }
        else { }
    }

    const RenderOffers = () => {
        let order_type = FormData && FormData.order_type.value
        let _console = FormData && FormData.console.value
        let country = FormData && FormData.country.value
        let state = FormData && FormData.state.value
        let city = FormData && FormData.city.value
        
        let visibleOffers = MyOffers.filter(offer => {
            let isVisible = true
            // Filter by Order type
            if (isVisible && order_type) {
                console.log("offer._type: ", offer._type)
                console.log("order_type: ", order_type)
                if (offer._type !== order_type) {
                    isVisible = false
                }
            }
            // Filter by Console type
            if (isVisible && _console) {
                console.log("console: ", _console)
                if (offer.listing.console.id !== parseInt(_console)) {
                    isVisible = false
                }
            }
            // Filter by Location
            if (isVisible && city) {
                console.log("city: ", city)
                if (offer.delivery_address.location.id !== parseInt(city)) {
                    isVisible = false
                }
            } else if (isVisible && state) {
                console.log("state: ", state)
                if (offer.delivery_address.location.state.id !== parseInt(state)) {
                    isVisible = false
                }
            } else if (isVisible && country) {
                console.log("country: ", country)
                if (offer.delivery_address.location.state.country.id !== parseInt(country)) {
                    isVisible = false
                }
            }
            return isVisible
        })
        // Return Visible offers
        return visibleOffers.map(offer => {
            return (
                <OfferCard
                    self={offer}
                />
            )
        })
    }

    useEffect(() => {
        // Fetch Offers
        FetchMyOffers()

        // Fetch Consoles
        FetchConsoleList()

        // Fetch Countries
        FetchCountryList()

    }, [])

    const MainContent = (config) => {

        return (
            <div style={styles.container}>

                <div style={styles.pageContent} className={"container"}>
                    <div style={styles.contentSectionHeader}>OFFERS</div>


                    <div style={{
                        ...styles.contentSection,
                        flexDirection: `${config.contentSectionFlexDirection}`,
                        alignItems: `${config.contentSectionAlignItems}`,

                    }}>

                        <div style={{ ...styles.leftSidePanel, flexGrow: `${config.leftSidePanelGrow}` }}>

                            <div style={styles.filterItem}>
                                <FormField
                                    formData={FormData}
                                    change={(newFormData) => setFormData({ ...newFormData })}
                                    field={{
                                        id: 'order_type',
                                        config: FormData.order_type
                                    }}
                                />
                            </div>

                            <div style={styles.filterItem}>
                                <FormField
                                    formData={FormData}
                                    change={(newFormData) => setFormData({ ...newFormData })}
                                    field={{
                                        id: 'console',
                                        config: FormData.console
                                    }}
                                />
                            </div>

                            <div style={styles.filterItem}>
                                <FormField
                                    formData={FormData}
                                    change={(newFormData) => {
                                        let countryId = newFormData.country.value
                                        // Update Form
                                        setFormData({ ...newFormData })
                                        // Fetch States
                                        FetchStateList(countryId)
                                    }}
                                    field={{
                                        id: 'country',
                                        config: FormData.country
                                    }}
                                />

                                <FormField
                                    formData={FormData}
                                    change={(newFormData) => {
                                        let stateId = newFormData.state.value
                                        // Update Form
                                        setFormData({ ...newFormData })
                                        // Fetch States
                                        FetchCityList(stateId)
                                    }}
                                    field={{
                                        id: 'state',
                                        config: FormData.state
                                    }}
                                />

                                <FormField
                                    formData={FormData}
                                    change={(newFormData) => setFormData({ ...newFormData })}
                                    field={{
                                        id: 'city',
                                        config: FormData.city
                                    }}
                                />
                            </div>
                        </div>


                        <div style={{
                            ...styles.rightSidePanel,
                            flexGrow: `${config.rightSidePanelGrow}`,
                            margin: `${config.rightSidePanelMargin}`,
                        }}>

                            <p style={{ padding: '10px 20px', textAlign: 'center' }}>
                                Every Order on Velcro Gaming is entitled to a “Grace” Period  (24 Hours) after an 
                                order has been completed during which an order can be terminated and after which 
                                the order period begins. During this period the user renting the game is required 
                                to test the game and initiate a  return if the Item is in poor condition of does 
                                not work to satisfaction. During this period the Order Sum will remain with 
                                Velcro Gaming. After which you will receive your Payment.
                            </p>


                            <div style={{ minHeight: '500px', padding: "20px", }}>
                                {
                                    RenderOffers()
                                }
                            </div>

                        </div>

                    </div>
                </div>



            </div>
        )
    }

    return (
        <div>
            <Header headerConfig={HeaderConfig} />

            <IsDesktop>
                {
                    MainContent({
                        justifyWrapperContent: 'space-between',
                        contentSectionFlexDirection: 'row',
                        contentSectionAlignItems: 'inherit',
                        leftSidePanelGrow: 0,
                        rightSidePanelGrow: 1,
                        rightSidePanelMargin: "0 0 0 30px",

                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        justifyWrapperContent: 'space-between',
                        contentSectionFlexDirection: 'column',
                        contentSectionAlignItems: 'center',
                        leftSidePanelGrow: 0,
                        rightSidePanelGrow: 1,
                        rightSidePanelMargin: "0 0 0 30px",

                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        justifyWrapperContent: 'space-around',
                        contentSectionFlexDirection: 'column',
                        contentSectionAlignItems: 'center',
                        leftSidePanelGrow: 1,
                        rightSidePanelGrow: 1,
                        rightSidePanelMargin: "0 0 0 0",

                    })
                }
            </IsPhone>
        </div>
    )
}


const styles = {
    container: {
        backgroundColor: colors.background,
        minHeight: "100vh",
        padding: "50px 0",
    },

    contentSectionHeader: {
        color: colors.primary,
        fontFamily: "Nunito Sans",
        fontWeight: 500,
        fontSize: "26px",
        textAlign: "center",
        margin: "35px",
    },
    contentSection: {
        display: 'flex',
    },
    leftSidePanel: {
        display: 'flex',
        flexDirection: 'column',
    },
    rightSidePanel: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        // margin: "0 0 0 30px",
    },

    filterItem: {
        backgroundColor: "white",
        padding: "20px",
        margin: "20px 0",
        width: "300px",
    },
}