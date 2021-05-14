import React, { useState, useEffect } from 'react'

import { colors } from '../../../../App.json'

import Breakpoint from '../../../../utils/breakpoints/Base';
import IsDesktop from '../../../../utils/breakpoints/IsDesktop';
import IsTablet from '../../../../utils/breakpoints/IsTablet';
import IsPhone from '../../../../utils/breakpoints/IsPhone';
import FormField from '../../../../utils/FormField';
import { PostMan } from '../../../../Helpers';


export default function OrdersScreen(props) {
    const {
        setActiveScreen
    } = props

    const [FormData, setFormData] = useState({
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
                    value: 0,
                    display: '---'
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
                    value: 'sell',
                    display: 'Sell'
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
            // Update FormData in state.
            await setFormData({ ...newFormData })
        }
        else { }
    }

    const FetchStateList = async (countryId) => {
        const responseObject = await PostMan(`location/states?country_id=${countryId}`, 'GET')
        if (responseObject.status === 'success') {
            let stateList = responseObject.data
            let newFormData = FormData
            stateList.map(state => {
                newFormData.state.data.push({
                    value: state.id,
                    display: `${state.name})`,
                })
            })
            await setFormData({ ...newFormData })
        }
        else { }
    }

    const FetchCityList = async (stateId = 5036) => {
        const responseObject = await PostMan(`location/cities?state_id=${stateId}`, 'GET')
        if (responseObject.status === 'success') {
            let countryData = responseObject.data
            let newFormData = FormData
            countryData.map(country => {
                newFormData.callingCode.data.push({
                    value: country.id,
                    display: country.name,
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

    useEffect(()=> {
        setActiveScreen({
            name: 'orders',
            path: '/orders'
        })

        // Fetch Consoles
        FetchConsoleList()

        // Fetch Countries
        FetchCountryList()

    }, [])
    
    const MainContent = (config) => {
        
        return (
            <div>

                <div style={{ ...styles.statsWrapper, justifyContent: config.justifyWrapperContent}}>
                    <div style={styles.statsBox}>
                        <div style={styles.statsBoxChild}>
                            <p className="m-0">TOTAL ORDERS</p>
                            <h1 style={styles.stat}>345</h1>
                        </div>

                        <span style={styles.divider} />

                        <div style={styles.statsBoxChild}>
                            <p className="m-0">PENDING</p>
                            <h1 style={styles.stat}>43</h1>
                        </div>
                    </div>

                    <div style={styles.statsBox}>
                        <div style={styles.statsBoxChild}>
                            <h1 style={{ ...styles.stat, color: '#52F07F' }}>+3</h1>
                            <p className="m-0">LAST MONTH</p>
                        </div>

                        <span style={styles.divider} />

                        <div style={styles.statsBoxChild}>
                            <h1 style={styles.stat}>33</h1>
                            <p className="m-0">THIS MONTH</p>
                        </div>
                    </div>

                    <div style={styles.statsBox}>
                        <div style={styles.statsBoxChild}>
                            <h1 style={{ ...styles.stat, color: '#52F07F' }}>+12</h1>
                            <p className="m-0">LAST WEEK</p>
                        </div>

                        <span style={styles.divider} />

                        <div style={styles.statsBoxChild}>
                            <h1 style={styles.stat}>04</h1>
                            <p className="m-0">THIS WEEK</p>
                        </div>
                    </div>

                    <div style={styles.statsBox}>
                        <div style={styles.statsBoxChild}>
                            <h1 style={{ ...styles.stat, color: '#52F07F' }}>+12</h1>
                            <p className="m-0">YESTERDAY</p>
                        </div>

                        <span style={styles.divider} />

                        <div style={styles.statsBoxChild}>
                            <h1 style={styles.stat}>02</h1>
                            <p className="m-0">TODAY</p>
                        </div>
                    </div>
                </div>



                <div>
                    <div style={styles.contentSectionHeader}>ORDERS IN DETAIL</div>


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
                                        id: 'console',
                                        config: FormData.console
                                    }}
                                />
                            </div>

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

                            <div style={{ backgroundColor: "white", padding: "20px", margin: "20px 0" }}>
                            

                                <div>
                                    <div>

                                    </div>
                                </div>


                            </div>





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
    statsWrapper: {
        display: 'flex',
        flexFlow: 'row wrap'
    },
    statsBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.white,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",

        minWidth: '235px',
        margin: '20px 0',

        // flex: "1 1 0px"
    },
    statsBoxChild: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',

        height: "110px",
        // padding: "15px 25px",
        padding: "15px 20px",
        fontSize: "12px",
        color: colors.primary
    },
    stat: {
        fontFamily: "Gothic A1",
        fontStyle: 'normal',
        fontWeight: 500,
    },
    divider: {
        height: "75%",
        width: "1px",
        backgroundColor: "#DEDFDF",
    },

    contentSectionHeader: {
        color: colors.primary,
        fontWeight: 800,
        fontSize: "18px",
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