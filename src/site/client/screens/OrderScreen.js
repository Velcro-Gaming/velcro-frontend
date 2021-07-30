import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    Route,
    Switch,
    useHistory,
    useRouteMatch,
    withRouter,
    Redirect
} from 'react-router-dom';
import {
    colors
} from '../../../App.json'

import { FaChevronLeft } from 'react-icons/fa'
import { RiTruckFill } from 'react-icons/ri'

import FormField from '../../../utils/FormField';
import Button from '../../../utils/Button';
import { PostMan } from '../../../Helpers';

import { ToastContainer, toast } from 'react-toastify';

import Header from '../components/main/Header';

import IsDesktop from '../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../utils/breakpoints/IsPhone'

import ModalConfirmAddress from '../components/main/ModalConfirmAddress'
import ModalConfirmOrder from '../components/main/ModalConfirmOrder'

import GameRent from './order/GameRent';
import GameSwap from './order/GameSwap';
import GameBuy from './order/GameBuy';


function OrderScreen(props) {
    const {
        auth
    } = props

    const match = useRouteMatch();
    const history = useHistory()

    const [Listing, setListing] = useState(null)
    const [AddressBook, setAddressBook] = useState([])
    const [ActivePageForm, setActivePageForm] = useState({})
    const [OrderPayload, setOrderPayload] = useState({})
    
    const [ShowAddressForm, setShowAddressForm] = useState(false)
    const [ShowAddressConfirmModal, setShowAddressConfirmModal] = useState(false)
    const [ShowOrderConfirmModal, setShowOrderConfirmModal] = useState(false)

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
            loader: null,
        },
        addAddress: {
            text: {
                color: colors.white,
                value: "+ Add New Address",
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
            onClick: () => setShowAddressForm(true),
            loader: null,
        },
        attemptAddAddress: {
            text: {
                color: colors.white,
                value: "Add Address",
            },
            styles: {
                height: '50px',
                width: '200px',
                margin: '30px 10px 60px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => AddNewAddress(ActivePageForm),
            loader: null,
        },
        cancelAddAddress: {
            text: {
                color: colors.primary,
                value: "Cancel",
            },
            styles: {
                height: '50px',
                width: '150px',
                margin: '30px 0 60px 10px',
                backgroundColor: colors.grey2,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => setShowAddressForm(false),
            loader: null,
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
            onClick: () => AttemptMakeOffer(ActivePageForm),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
    })

    const [OrderFormData, setOrderFormData] = useState({
        deliveryAddress: {
            element: null,
            value: '',
            label: false,
            labelText: 'Delivery Address',
            props: {
                required: true
            }
        },
        swap_amount: {
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
        buy_amount: {
            element: 'input',
            value: 0.00,
            label: true,
            labelText: 'Amount',
            props: {
                name: 'buy_amount_input',
                type: 'number',
                placeholder: '',
                required: true
            }
        },
        rent_amount: {
            element: 'input',
            value: 0.00,
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
                required: true
            }
        },
        games: {
            element: 'game',
            value: null,
            label: false,
            labelText: 'Swap game(s)',
            props: {
                name: 'games_input',
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

    const [DeliveryFormData, setDeliveryFormData] = useState({
        address_line: {
            element: 'input',
            value: '',
            label: true,
            labelText: 'Address Line',
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
    })

    const NoRouteMatch = () => {
        return <Redirect to="/search" />
    }

    const GoBack = () => {
        history.goBack()
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

    const FetchStateList = async (countryId=293) => {
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

    const FetchCityList = async (stateId=5036) => {
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
            cityData.map(city => {
                newDeliveryFormData.city.data.push({
                    value: city.id,
                    display: city.name,
                })
            })
            // Update DeliveryFormData in state.
            await setDeliveryFormData({ ...newDeliveryFormData })
        }
        else { }
    }

    const FetchAddressBook = async () => {
        const responseObject = await PostMan(`address/`, 'GET')
        if (responseObject.status === 'success') {
            let addressBook = responseObject.data
            console.log("AddressBook: ", addressBook)
            // Save AddressBook to state
            await setAddressBook(addressBook)

            // Set Default Address
            if (addressBook && addressBook.length > 0) {
                let newOrderFormData = OrderFormData
                newOrderFormData.deliveryAddress.value = addressBook[0].id
                setOrderFormData({ ...newOrderFormData })
            }
        }
        else { }
    }

    const AddNewAddress = () => {
        let addressPayload = {}

        for (let formField in DeliveryFormData) {
            let fieldName = formField
            console.log("fieldName: ", fieldName)
            let fieldData = DeliveryFormData[formField]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ') {
                    // Toast Error Message
                    toast.error(`${fieldData.labelText} field is required!`)
                    return
                }

            }
            // Set in addressPayload
            addressPayload[fieldName] = fieldData.value
        }
        // Proceed to Address Confirmation
        setShowAddressConfirmModal(true)
    }

    const AttemptMakeOffer = async (activeForm) => {
        let orderPayload = {
            _type: activeForm.title,
            bill_to: auth.user.id,
            listing: Listing.id,
        }
        let orderFormPayload = {
            delivery_address: OrderFormData.deliveryAddress
        }
        if (activeForm.title === 'rent') {
            orderFormPayload['fee'] = OrderFormData.rent_amount
            orderFormPayload['duration'] = OrderFormData.duration
        }
        if (activeForm.title === 'swap') {
            orderFormPayload['fee'] = OrderFormData.swap_amount
            orderFormPayload['duration'] = OrderFormData.duration
            orderFormPayload['games'] = OrderFormData.games   
        }
        if (activeForm.title === 'buy') {
            orderFormPayload['fee'] = OrderFormData.buy_amount
        }
        // Validate Fields
        for (let formField in orderFormPayload) {
            let fieldName = formField
            let fieldData = orderFormPayload[formField]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ') {
                    // Toast Error Message
                    return toast.error(`${fieldData.labelText} field is required!`)
                }
            }
            // Set in formPayload
            orderPayload[fieldName] = fieldData.value
        }

        if (Object.keys(orderPayload).length > 3) {
            let payload = orderPayload
            console.log("order payload: ", payload)

            // Set Order Payload for ModalOrderConfirm
            await setOrderPayload({ ...payload })

            // Show Order confirm modal
            setShowOrderConfirmModal(true)
        }
    }


    // console.log("ActivePageForm: ", ActivePageForm)
    // console.log("user: ", auth.user)


    useEffect(() => {

        // Fetch Address Book
        FetchAddressBook()

        // Fetch Countries
        FetchCountryList()

    }, [])


    const MainContent = (config) => {
        const {
            button,
            container,
            deliverySection
        } = config

        return (
            <div>
                <Header {...props} headerConfig={HeaderConfig} />

                <ToastContainer />

                {
                    ShowAddressConfirmModal ? (
                        <ModalConfirmAddress
                            deliveryFormData={DeliveryFormData}
                            hideModal={() => setShowAddressConfirmModal(false)}
                        />
                    ) : null
                }

                {
                    ShowOrderConfirmModal ? (
                        <ModalConfirmOrder
                            orderPayload={OrderPayload}
                            hideModal={() => setShowOrderConfirmModal(false)}
                        />
                    ) : null
                }

                <div style={{
                    ...styles.container,
                    padding: container.padding,
                }}>
                    <div className={"container"}>
                        <div style={styles.goBack} onClick={() => GoBack()}>
                            <FaChevronLeft size={12} />
                            <span style={{ marginLeft: '7px' }}>Back</span>
                        </div>

                        <div style={styles.orderSection}>
                            <Switch>
                                <Route exact path={`${match.path}/:gameSlug/rent`}>
                                    <GameRent
                                        setListing={(listing) => setListing(listing)}
                                        setActiveForm={(activeForm) => setActivePageForm(activeForm)}
                                        orderFormData={OrderFormData}
                                        updateOrderFormData={(newOrderFormData) => setOrderFormData({ ...newOrderFormData })}
                                    />
                                </Route>
                                <Route exact path={`${match.path}/:gameSlug/swap`}>
                                    <GameSwap
                                        setListing={(listing) => setListing(listing)}
                                        setActiveForm={(activeForm) => setActivePageForm(activeForm)}
                                        orderFormData={OrderFormData}
                                        updateOrderFormData={(newOrderFormData) => setOrderFormData({ ...newOrderFormData })}
                                    />
                                </Route>
                                <Route exact path={`${match.path}/:gameSlug/buy`}>
                                    <GameBuy
                                        setListing={(listing) => setListing(listing)}
                                        setActiveForm={(activeForm) => setActivePageForm(activeForm)}
                                        orderFormData={OrderFormData}
                                        updateOrderFormData={(newOrderFormData) => setOrderFormData({ ...newOrderFormData })}
                                    />
                                </Route>

                                <Route component={NoRouteMatch} />
                            </Switch>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', margin: "35px 0", fontWeight: 600, fontFamily: 'Nunito Sans', textTransform: 'uppercase', color: colors.primary }}>
                            <RiTruckFill size={20} />
                            <span style={{ marginLeft: '7px' }}>Delivery Information</span>
                        </div>

                        <div style={{ ...styles.deliverySection, padding: deliverySection.padding }}>

                            {
                                ShowAddressForm ? (
                                    <form style={styles.deliveryForm}>
                                        <div style={{ fontFamily: 'Nunito Sans', fontSize: '17px', fontWeight: 500, margin: '0 0 10px' }}>
                                            Enter a valid delivery address
                                        </div>

                                        <FormField
                                            formData={DeliveryFormData}
                                            change={(newDeliveryFormData) => setDeliveryFormData({ ...newDeliveryFormData })}
                                            field={{
                                                id: 'address_line',
                                                config: DeliveryFormData.address_line
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

                                        <div style={{ display: 'flex', }}>
                                            <Button {...PageButtons.attemptAddAddress} {...{
                                                styles: {
                                                    height: button.height,
                                                    width: button.width,
                                                    margin: button.margin,
                                                    fontSize: button.fontSize,
                                                    backgroundColor: colors.primary,
                                                    border: {
                                                        width: "1px",
                                                        style: "solid",
                                                        color: colors.white,
                                                        radius: "3px",
                                                    },
                                                    color: colors.white
                                                },
                                            }} />
                                            <Button {...PageButtons.cancelAddAddress} {...{
                                                styles: {
                                                    height: button.height,
                                                    width: button.width,
                                                    margin: button.margin,
                                                    fontSize: button.fontSize,
                                                    backgroundColor: colors.grey2,
                                                    border: {
                                                        width: "1px",
                                                        style: "solid",
                                                        color: colors.white,
                                                        radius: "3px",
                                                    },
                                                    color: colors.white
                                                },
                                            }} />
                                        </div>

                                    </form>
                                ) : (
                                    <div>
                                        {
                                            AddressBook && AddressBook.length > 0 ? (
                                                <div>
                                                    <div style={{ fontFamily: 'Nunito Sans', fontSize: '17px', fontWeight: 500, margin: '0 0 10px' }}>
                                                        Select a delivery address
                                                    </div>

                                                    <div className={'horizontal-scrolling-wrapper'}>
                                                        <div className={'tray'}>
                                                            {
                                                                AddressBook.map((address, i) => {
                                                                    // console.log("address: ", address)
                                                                    return (
                                                                        <div style={styles.addressBookItem}>
                                                                            <span style={{ position: 'absolute', bottom: '40px', right: '5px', zIndex: 9 }}>
                                                                                <FormField
                                                                                    formData={{
                                                                                        checkBox: {
                                                                                            element: 'checkbox',
                                                                                            checked: OrderFormData.deliveryAddress.value === address.id ? true : false,
                                                                                            data: address,
                                                                                            label: false,
                                                                                            props: {
                                                                                                name: `address_${i}_input`,
                                                                                                type: 'checkbox',
                                                                                            },
                                                                                        }
                                                                                    }}
                                                                                    change={(addressFormData) => {
                                                                                        console.log("Clicking")
                                                                                        if (OrderFormData.deliveryAddress.value === addressFormData.checkBox.data.id) { return }
                                                                                        // Set new address
                                                                                        if (addressFormData.checkBox.checked) {
                                                                                            let newOrderFormData = OrderFormData
                                                                                            newOrderFormData.deliveryAddress.value = addressFormData.checkBox.data.id
                                                                                            setOrderFormData({ ...newOrderFormData })
                                                                                        }
                                                                                    }}
                                                                                    field={{
                                                                                        id: 'checkBox',
                                                                                        config: {
                                                                                            element: 'checkbox',
                                                                                            checked: OrderFormData.deliveryAddress.value === address.id ? true : false,
                                                                                            data: address,
                                                                                            label: false,
                                                                                            props: {
                                                                                                name: `address_${i}_input`,
                                                                                                type: 'checkbox',
                                                                                            }
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </span>
                                                                            <div className="row">
                                                                                <div className="col-4" style={{ color: colors.grey }}>
                                                                                    Address Line
                                                                                </div>
                                                                                <div className="col-8">
                                                                                    {address.address_line}
                                                                                </div>

                                                                                <div className="col-4" style={{ color: colors.grey }}>
                                                                                    City
                                                                                </div>
                                                                                <div className="col-8">
                                                                                    {address.location.name},
                                                                                </div>

                                                                                <div className="col-4" style={{ color: colors.grey }}>
                                                                                    State
                                                                                </div>
                                                                                <div className="col-8">
                                                                                    {address.location.state.name}
                                                                                </div>

                                                                                <div className="col-4" style={{ color: colors.grey }}>
                                                                                    Country
                                                                                </div>
                                                                                <div className="col-8">
                                                                                    {address.location.state.country.name}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>

                                                    <Button
                                                        {...PageButtons.addAddress}
                                                        {...{ styles: { ...PageButtons.addAddress.styles, width: "200px" } }}
                                                    />


                                                    <FormField
                                                        formData={OrderFormData}
                                                        change={(newOrderFormData) => setOrderFormData({ ...newOrderFormData })}
                                                        field={{
                                                            id: 'additionalInfo',
                                                            config: OrderFormData.additionalInfo
                                                        }}
                                                    />

                                                    <Button {...PageButtons.sendRequest} {...{ onClick: () => AttemptMakeOffer(ActivePageForm) }} />
                                                </div>
                                            ) : (
                                                <div>
                                                    <p>
                                                        You currently have no previously used address.
                                                    </p>

                                                    <Button {...PageButtons.addAddress} />
                                                </div>
                                            )
                                        }
                                    </div>
                                )
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
                        button: {
                            height: '50px',
                            width: '200px',
                            margin: '30px 10px 60px',
                            fontSize: '15px',
                        },
                        container: {
                            padding: "75px 100px",
                        },
                        deliverySection: {
                            padding: "75px 100px",
                        },
                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        button: {
                            height: '40px',
                            width: '150px',
                            margin: '30px 10px 60px',
                            fontSize: '14px',
                        },
                        container: {
                            padding: "75px 50px",
                        },
                        deliverySection: {
                            padding: "75px 35px",
                        },
                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        button: {
                            height: '30px',
                            width: '120px',
                            margin: '30px 10px 60px',
                            fontSize: '12px',
                        },
                        container: {
                            padding: "75px 10px",
                        },
                        deliverySection: {
                            padding: "75px 20px",
                        },
                    })
                }
            </IsPhone>
        </div>
    )
 }

const styles = {
    container: {
        padding: "69px 0 0 0",
        backgroundColor: colors.background,
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
    },
    deliveryForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },

    addressBook: {

    },
    addressBookItem: {
        maxWidth: '350px',
        borderRadius: '14px',
        border: `2px solid ${colors.primary}`,
        padding: '15px 20px 15px 30px',
        fontSize: '12px',
        whiteSpace: 'break-spaces',
        margin: '15px 10px',
        position: 'relative'
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