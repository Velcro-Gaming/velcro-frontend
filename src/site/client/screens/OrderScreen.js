import React, { useEffect, useState } from 'react'

import {
    Route,
    Switch,
    useHistory,
    useRouteMatch,
    withRouter,
    Redirect
} from 'react-router-dom';

import Header from '../components/main/Header';
import {
    colors
} from '../../../App.json'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GameRent from './order/GameRent';
import GameSwap from './order/GameSwap';
import GameBuy from './order/GameBuy';

import { FaChevronLeft } from 'react-icons/fa'
import { RiTruckFill } from 'react-icons/ri'

import FormField from '../../../utils/FormField';
import Button from '../../../utils/Button';
import { PostMan } from '../../../Helpers';

function OrderScreen(props) {
    const {
        auth
    } = props

    const match = useRouteMatch();
    const history = useHistory()

    const [HeaderConfig, setHeaderConfig] = useState({
        headerButtons: [
            {
                isProtected: false,
                text: {
                    color: colors.white,
                    value: "Get Started",
                },
                styles: {
                    backgroundColor: colors.primary,
                    border: {
                        width: null,
                        style: null,
                        color: null,
                        radius: null,
                    },
                    color: colors.white
                },
                linkTo: "/register",
            },
        ],
        headerStyles: {
            backgroundColor: colors.black
        }
    })

    const [PageButtons, setPageButtons] = useState({
        goBack: {
            text: {
                color: colors.white,
                value: "Send Request",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '30px 0 60px 0',
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
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
        sendRequest: {
            text: {
                color: colors.white,
                value: "Send Request",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '30px 0 60px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => {},
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
    })

    const [OrderFormData, setOrderFormData] = useState({
        amount: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Amount ($)',
            props: {
                name: 'amount_input',
                type: 'number',
                placeholder: '',
                required: false
            }
        },
        buy_amount: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Amount',
            props: {
                name: 'buy_amount_input',
                type: 'number',
                placeholder: '',
                required: false
            }
        },
        rent_amount: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Rent Fee',
            props: {
                name: 'rent_amount_input',
                type: 'number',
                placeholder: '',
                required: false
            }
        },
        duration: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
                },
                {
                    value: 2,
                    display: '2 weeks'
                },
                {
                    value: 3,
                    display: '3 weeks'
                },
                {
                    value: 4,
                    display: '4 weeks'
                },
                {
                    value: 5,
                    display: '5 weeks'
                },
                {
                    value: 6,
                    display: '6 weeks'
                },
                {
                    value: 7,
                    display: '7 weeks'
                },
                {
                    value: 8,
                    display: '8 weeks'
                },
                {
                    value: 9,
                    display: '9 weeks'
                },
            ],
            value: '',
            label: true,
            labelText: 'Duration',
            props: {
                name: 'state_input',
                type: 'text',
                placeholder: null,
                required: false
            }
        },
        additionalFee: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Additional Fees (Optional)',
            props: {
                name: 'additional_fee_input',
                type: 'number',
                placeholder: '',
                required: false
            }
        },
        games: {
            element: 'game',
            value: [

            ],
            // label: true,
            // labelText: 'Additional Fees (Optional)',
            props: {
                name: 'games_input',
                // type: 'number',
                // placeholder: '',
                required: false
            }
        },
    })

    const [DeliveryFormData, setDeliveryFormData] = useState({
        address: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Address',
            props: {
                name: 'address_input',
                type: 'text',
                placeholder: 'Enter Delivery address',
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
        additionalInfo: {
            element: 'textarea',
            value: '',
            label: true,
            labelText: 'Additional info',
            props: {
                name: 'address_input',
                type: 'text',
                placeholder: 'Type message here',
                required: true
            }
        },
    })

    const NoRouteMatch = () => {
        return <Redirect to="/search" />
    }

    const FetchCountryList = async () => {
        const responseObject = await PostMan(`location/countries`, 'GET')
        if (responseObject.status === 'success') {
            let countryData = responseObject.data
            let newDeliveryFormData = DeliveryFormData
            countryData.map(country => {
                newDeliveryFormData.country.data.push({
                    value: country.id,
                    display: country.name,
                })
            })
            // Set Nigeria as Default
            newDeliveryFormData.country.value = 293
            // Fetch States
            FetchStateList(293)
            // Clear City List
            newDeliveryFormData.city.data = [
                {
                    value: 0,
                    display: '---'
                },
            ]
            // Update DeliveryFormData in state.
            await setDeliveryFormData({ ...newDeliveryFormData })
        }
        else { }
    }

    const FetchStateList = async (countryId) => {
        const responseObject = await PostMan(`location/states?country_id=${countryId}`, 'GET')
        if (responseObject.status === 'success') {
            let stateList = responseObject.data
            let newDeliveryFormData = DeliveryFormData
            // Clear Old List
            newDeliveryFormData.state.data = [
                {
                    value: 0,
                    display: '---'
                },
            ]
            // Clear City List
            newDeliveryFormData.city.data = [
                {
                    value: 0,
                    display: '---'
                },
            ]
            stateList.map(state => {
                newDeliveryFormData.state.data.push({
                    value: state.id,
                    display: `${state.name}`,
                })
            })
            await setDeliveryFormData({ ...newDeliveryFormData })
        }
        else { }
    }

    const FetchCityList = async (stateId = 5036) => {
        const responseObject = await PostMan(`location/cities?state_id=${stateId}`, 'GET')
        if (responseObject.status === 'success') {
            let cityData = responseObject.data
            let newDeliveryFormData = DeliveryFormData
            // Clear Old List
            newDeliveryFormData.city.data = [
                {
                    value: 0,
                    display: '---'
                },
            ]
            cityData.map(country => {
                newDeliveryFormData.city.data.push({
                    value: country.id,
                    display: country.name,
                })
            })
            // Update DeliveryFormData in state.
            await setDeliveryFormData({ ...newDeliveryFormData })
        }
        else { }
    }

    const GoBack = () => {
        history.goBack()
    }

    useEffect(() => {

        // Fetch Countries
        FetchCountryList()

    }, [])


    return (
        <div>
            <Header {...props} headerConfig={HeaderConfig} />


            <div style={styles.wrapper}>
                <div className={"container"} style={styles.container}>

                    {/* <div style={{ margin: "35px 0", fontWeight: 600, fontFamily: 'Nunito Sans' }}>
                        Back
                    </div> */}

                    <div style={styles.goBack} onClick={() => GoBack()}>
                        <FaChevronLeft size={12} />
                        <span style={{ marginLeft: '7px' }}>Back</span>
                    </div>

                    <div style={styles.orderSection}>
                        <Switch>
                            <Route exact path={`${match.path}/:gameSlug/rent`}>
                                <GameRent
                                    orderFormData={OrderFormData}
                                    updateOrderFormData={(newOrderFormData) => setOrderFormData({...newOrderFormData})}
                                />
                            </Route>
                            <Route exact path={`${match.path}/:gameSlug/swap`}>
                                <GameSwap
                                    orderFormData={OrderFormData}
                                    updateOrderFormData={(newOrderFormData) => setOrderFormData({...newOrderFormData})}
                                />
                            </Route>
                            <Route exact path={`${match.path}/:gameSlug/buy`}>
                                <GameBuy
                                    orderFormData={OrderFormData}
                                    updateOrderFormData={(newOrderFormData) => setOrderFormData({...newOrderFormData})}
                                />
                            </Route>

                            <Route component={NoRouteMatch} />
                        </Switch>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', margin: "35px 0", fontWeight: 600, fontFamily: 'Nunito Sans', textTransform: 'uppercase', color: colors.primary }}>
                        <RiTruckFill size={20} />
                        <span style={{ marginLeft: '7px' }}>Delivery Information</span>
                    </div>

                    <div style={styles.deliverySection}>
                        <div style={{ fontFamily: 'Nunito Sans', fontSize: '17px', fontWeight: 500, margin: '0 0 10px'}}>
                            Enter a valid delivery address
                        </div>
                        
                        <form style={styles.deliveryForm}>
                            <FormField
                                formData={DeliveryFormData}
                                change={(newDeliveryFormData) => setDeliveryFormData({ ...newDeliveryFormData })}
                                field={{
                                    id: 'address',
                                    config: DeliveryFormData.address
                                }}
                            />

                            <FormField
                                formData={DeliveryFormData}
                                change={(newDeliveryFormData) => {
                                    let countryId = newDeliveryFormData.country.value
                                    // Update Form
                                    setDeliveryFormData({ ...newDeliveryFormData })
                                    // Fetch States
                                    FetchStateList(countryId)
                                }}
                                field={{
                                    id: 'country',
                                    config: DeliveryFormData.country
                                }}
                            />

                            <FormField
                                formData={DeliveryFormData}
                                change={(newDeliveryFormData) => {
                                    let stateId = newDeliveryFormData.state.value
                                    // Update Form
                                    setDeliveryFormData({ ...newDeliveryFormData })
                                    // Fetch States
                                    FetchCityList(stateId)
                                }}
                                field={{
                                    id: 'state',
                                    config: DeliveryFormData.state
                                }}
                            />

                            <FormField
                                formData={DeliveryFormData}
                                change={(newDeliveryFormData) => setDeliveryFormData({ ...newDeliveryFormData })}
                                field={{
                                    id: 'city',
                                    config: DeliveryFormData.city
                                }}
                            />

                            <FormField
                                formData={DeliveryFormData}
                                change={(newDeliveryFormData) => setDeliveryFormData({ ...newDeliveryFormData })}
                                field={{
                                    id: 'additionalInfo',
                                    config: DeliveryFormData.additionalInfo
                                }}
                            />

                            <Button {...PageButtons.sendRequest} />
                            

                        </form>
                    </div>
                
                    

                </div>
            </div>

        </div>
    )
}

const styles = {
    wrapper: {
        padding: "69px 0 0 0",
        backgroundColor: colors.background,
    },
    container: {
        // height: '500px',
        padding: "75px 100px",
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
    orderSection: {
        
    },
    deliverySection: {
        backgroundColor: colors.white,
        padding: "70px 100px"
    },

    deliveryForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
        // justifyContent: 'center',
    }
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        // register
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderScreen))