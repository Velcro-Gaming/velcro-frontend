import React, { useEffect, useState } from 'react'

import { PostMan } from '../../../../Helpers';
import { colors } from '../../../../App.json';
import FormField from '../../../../utils/FormField';

import IsDesktop from '../../../../utils/breakpoints/IsDesktop';
import IsTablet from '../../../../utils/breakpoints/IsTablet';
import IsPhone from '../../../../utils/breakpoints/IsPhone';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../../utils/Button';


export default function UsersScreen(props) {
    const {
        setActiveScreen
    } = props

    const [redirect, setRedirect] = useState(null)
    const [UserList, setUserList] = useState([])
    const [FormData, setFormData] = useState({
        username: {
            element: 'input',
            value: 'itsobaa',
            label: true,
            labelText: 'Username',
            props: {
                name: 'username_input',
                type: 'text',
                placeholder: 'Enter username',
                required: true,
            }
        },
        console: {
            element: 'select',
            data: [
                {
                    value: '*',
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
                required: false
            }
        },
    })

    const [PageButtons, setPageButtons] = useState({
        search: {
            text: {
                color: colors.white,
                value: "Search",
            },
            styles: {
                height: '50px',
                width: '100%',
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
            onClick: () => AttemptSearchUser(),
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
    })

    const FetchUserList = async () => {
        const responseObject = await PostMan(`account/all/`, 'GET')
        if (responseObject.status === 'success') {
            let userList = responseObject.data
            // Update UserList in state.
            await setUserList(userList)
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

    const AttemptSearchUser = async () => {
        let payload = {}
        let newPageButtons = PageButtons

        // Start Loader
        newPageButtons.signUp.loader.isLoading = true
        await setPageButtons({ ...newPageButtons })

        // Validate Fields
        for (let formField in FormData) {
            let fieldName = formField
            let fieldData = FormData[formField]
            if (fieldData.props.required) {
                if (!fieldData.value || fieldData.value == ' ') {
                    // Toast Error Message
                    toast.error(`${fieldName} field is required!`)
                    return
                }
            }
            // Set in payload
            payload[fieldName] = fieldData.value
        }

        const responseObject = await PostMan('account/user/', 'get')

        // Stop Loader
        newPageButtons.signUp.loader.isLoading = false
        await setPageButtons({ ...newPageButtons })

        if (responseObject.status === 'success') {
            let authResponseData = responseObject.data
            await props.login(authResponseData)
            return setRedirect("/")
        }
        else {}

    }

    useEffect(() => {
        setActiveScreen({
            name: 'users',
            path: '/users'
        })

        // Fetch User List
        FetchUserList()

        // Fetch Console List
        FetchConsoleList()

    }, [])

    const MainContent = (config) => {

        return (
            <div>
                <div style={{ ...styles.statsWrapper, justifyContent: config.justifyWrapperContent }}>

                    <div style={styles.statsBoxChild}>
                        <p className="m-0">TOTAL Users</p>
                        <h1 style={styles.stat}>445</h1>
                    </div>
                    <div style={styles.statsBoxChild}>
                        <p className="m-0">ACTIVE USERS</p>
                        <h1 style={styles.stat}>431</h1>
                    </div>
                    <div style={styles.statsBoxChild}>
                        <p className="m-0">VERIFIED USERS</p>
                        <h1 style={styles.stat}>245</h1>
                    </div>
                    <div style={styles.statsBoxChild}>
                        <p className="m-0">BLOCKED USERS</p>
                        <h1 style={styles.stat}>3</h1>
                    </div>
                </div>


                <div>
                    
                    <div style={{
                        ...styles.contentSection,
                        flexDirection: `${config.contentSectionFlexDirection}`,
                        alignItems: `${config.contentSectionAlignItems}`,

                    }}>

                        <div style={{ ...styles.leftSidePanel, flexGrow: `${config.leftSidePanelGrow}` }}>

                            <div style={styles.contentSectionHeader}>User Search</div>

                            <div style={styles.filterItem}>
                                <FormField
                                    formData={FormData}
                                    change={(newFormData) => setFormData({ ...newFormData })}
                                    field={{
                                        id: 'username',
                                        config: FormData.username
                                    }}
                                />

                                <FormField
                                    formData={FormData}
                                    change={(newFormData) => setFormData({ ...newFormData })}
                                    field={{
                                        id: 'console',
                                        config: FormData.console
                                    }}
                                />

                                <Button {...PageButtons.search} />

                            </div>

                        </div>

                        <div style={{
                            ...styles.rightSidePanel,
                            flexGrow: `${config.rightSidePanelGrow}`,
                            margin: `${config.rightSidePanelMargin}`,
                        }}>

                            <div style={styles.contentSectionHeader}>Users</div>

                            <div style={styles.listWrapper}>

                                {
                                    UserList.map(user => {
                                        return(
                                            <div style={styles.listItem}>
                                                <div style={styles.listItemChild}>
                                                    <div >
                                                        <img />
                                                    </div>

                                                    <div>{user.username}</div>
                                                </div>

                                                <div style={styles.listItemChild}>
                                                    <div>{user.full_name}</div>
                                                    <div>{user.mobile}</div>
                                                    <div style={{ color: user.verification === "Verified" ? "green" : "red"}}>
                                                        {user.verification}
                                                    </div>                              
                                                </div>

                                                <div style={styles.listItemChild}>
                                                    <div>
                                                        {user.consoles.map((userConsole, i) => {
                                                            console.log("userConsole: ", userConsole)
                                                            return `${i === 0 ? '' : ', '}${userConsole.console.short_name}`
                                                        })}
                                                    </div>
                                                    <div>{user.email}</div>
                                                    <div>{user.referral_code}</div>
                                                </div>

                                                <div style={styles.listItemChild}>
                                                    <Button {...{
                                                        text: {
                                                            color: colors.white,
                                                            value: "View Profile",
                                                        },
                                                        styles: {
                                                            height: '50px',
                                                            width: '100%',
                                                            margin: '30px 0',
                                                            backgroundColor: colors.grey,
                                                            border: {
                                                                width: "1px",
                                                                style: "solid",
                                                                color: colors.white,
                                                                radius: "3px",
                                                            },
                                                            color: colors.primary
                                                        },
                                                        onClick: () => {},
                                                        loader: null,
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
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
            <ToastContainer />

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
    statsBoxChild: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',

        backgroundColor: colors.white,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",

        minWidth: '235px',
        margin: '20px 0',

        height: "110px",
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
        margin: "45px 0 0 0",
    },
    contentSection: {
        display: 'flex',
    },
    leftSidePanel: {
        display: 'flex',
        flexDirection: 'column',
    },
    rightSidePanel: {
        // flexGrow: 1,

        // display: 'flex',
        // flexDirection: 'column',
        // margin: "0 0 0 30px",
    },
    filterItem: {
        backgroundColor: "white",
        padding: "20px",
        margin: "20px 0",
        width: "300px",
    },
    listWrapper: {
        display: "flex",
        flexDirection: 'column',
        // padding: "20px",
        margin: "20px 0"
    },
    listItem: {
        display: 'flex',
        justifyContent: "space-around",
        backgroundColor: colors.white,
        boxShadow: "0px 25px 40px rgba(0, 0, 0, 0.03)",
        borderRadius: '18px',

        margin: "15px 0",
        padding: "20px 0"
    }
}