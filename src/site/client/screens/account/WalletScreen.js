import React, { useState, useEffect } from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { colors } from '../../../../App.json'
import { PostMan } from '../../../../Helpers';
import {
    updateUser
} from '../../../../redux/actions/AuthActions'
import { useHistory } from 'react-router';

import AviDefault from '../../../../assets/images/avi.png'

import { FaChevronLeft } from 'react-icons/fa'
import { AiFillCreditCard } from 'react-icons/ai'

import ModalImageUpload from '../../components/main/ModalImageUpload'

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

import Button from '../../../../utils/Button';
import Header from '../../components/main/Header'
import FormField from '../../../../utils/FormField';

import { ToastContainer, toast } from 'react-toastify';
import ModalAddBankAccount from '../../components/main/ModalAddBankAccount';


function AccountProfileScreen(props) {
    const {
        auth
    } = props

    const history = useHistory()

    const [ShowAddAccountModal, setShowAddAccountModal] = useState(false)

    const [MyBanks, setMyBanks] = useState([
        // {
        //     id: 1,
        //     bank_name: "Polaris Bank",
        //     account_number: 208152344
        // },
        // {
        //     id: 2,
        //     bank_name: "First Bank",
        //     account_number: 6802223011
        // },
    ])
    const [Transactions, setTransactions] = useState(null)
    const [Wallet, setWallet] = useState(null)
    

    const [HeaderConfig, setHeaderConfig] = useState({
        headerButtons: [

        ],
        headerStyles: {
            backgroundColor: colors.black
        }
    })

    // const [FormData, setFormData] = useState({
    //     bank_name: {
    //         element: 'select',
    //         data: [
    //             {
    //                 value: 0,
    //                 display: '---'
    //             },
    //         ],
    //         value: '',
    //         label: true,
    //         labelText: 'Select Bank',
    //         props: {
    //             name: 'bank_name_input',
    //             type: 'text',
    //             placeholder: null,
    //             required: true,
    //         }
    //     },
    //     account_number: {
    //         element: 'input',
    //         value: "",
    //         label: true,
    //         labelText: 'Account Number',
    //         props: {
    //             name: 'account_number_input',
    //             type: 'text',
    //             placeholder: 'Enter Account number',
    //             required: true,
    //         }
    //     },
    // })

    const [WithdrawalFormData, setWithdrawalFormData] = useState({
        withdrawal_bank: {
            element: 'select',
            data: [
                {
                    value: 0,
                    display: '---'
                },
            ],
            value: '',
            label: true,
            labelText: 'Select Bank',
            props: {
                name: 'bank_name_input',
                type: 'text',
                placeholder: null,
                required: true,
            }
        },
        withdrawal_amount: {
            element: 'input',
            value: "",
            label: true,
            labelText: 'Amount to withdraw',
            props: {
                name: 'withdrawal_amount_input',
                type: 'text',
                placeholder: 'Enter Amount',
                required: true,
            }
        },
    })

    const [PageButtons, setPageButtons] = useState({
        saveBankAccount: {
            text: {
                color: colors.white,
                value: "Save",
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
        attemptWithdrawToBank: {
            text: {
                color: colors.white,
                value: "Withdraw To Bank",
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
            onClick: () => setShowAddAccountModal(!ShowAddAccountModal),
            loader: null,
        },
        toggleAddBankAccount: {
            text: {
                color: colors.white,
                value: "+ Add Bank Account",
            },
            styles: {
                height: '30px',
                width: '100%',
                margin: '0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => setShowAddAccountModal(!ShowAddAccountModal),
            loader: null,
        },
        updateInformation: {
            text: {
                color: colors.white,
                value: "Update",
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

    const FetchTransactions = async () => {
        const responseObject = await PostMan(`transactions/`, 'GET')
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            console.log("responseData: ", responseData)
            // Update Transactions in state.
            await setTransactions(responseData)
        }
        else { }
    }

    const FetchWallet = async () => {
        const responseObject = await PostMan(`wallet/`, 'GET')
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            console.log("Wallet responseData: ", responseData)
            let wallet = responseData.wallet
            // Update Wallet in state.
            await setWallet({ ...wallet })
        }
        else { }
    }

    const FetchBankAccounts = async () => {
        const responseObject = await PostMan(`wallet/bank-account/`, 'GET')
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            // Update banks in state.
            await setMyBanks(responseData)
        }
        else { }
    }

    const GoBack = () => {
        return history.goBack()
    }

    useEffect(() => {
        // Fetch all transactions
        FetchTransactions()

        // Fetch all bank accounts
        FetchBankAccounts()

        // Fetch Wallet
        FetchWallet()

    }, [])
    

    const MainContent = (config) => {
        return (
            <div style={styles.container}>
                <div className="container"
                    style={{
                        backgroundColor: colors.grey2,
                        padding: config.containerPadding,
                        minHeight: '100vh', 
                    }}
                >                    
                    <div className={"row"}
                        style={{ padding: "0 20px" }}
                    >
                        <div className={"col-12"}>
                            <div
                                onClick={() => GoBack()}
                                style={styles.goBack}
                            >
                                <FaChevronLeft size={10} />
                                <span style={{ marginLeft: '7px' }}>Back</span>
                            </div>


                            <div style={styles.contentSectionHeader}>Wallet</div>


                            <div style={{ ...styles.statsWrapper, ...config.statsWrapper }}>
                                <div style={styles.statsBox}>
                                    <div style={styles.statsBoxChild}>
                                        <p className="m-0">Balance</p>
                                        <div style={{ ...styles.stat, fontSize: '30px',}}>
                                            ₦{Wallet && Wallet.balance ? (
                                                <>
                                                    {
                                                        Wallet.balance === 0 ?
                                                            "0.00"
                                                            :
                                                            Wallet.balance
                                                    }
                                                </>
                                            ) : "0.00"}
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.statsBox}>
                                    {
                                        Wallet && Wallet.deposits.most_recent ? (
                                            <>
                                                <div style={styles.statsBoxChild}>
                                                    <div style={{
                                                        ...styles.stat,
                                                        fontSize: "15px",
                                                    }}>
                                                        ₦{Wallet && Wallet.deposits ? (
                                                            <>
                                                                {
                                                                    Wallet.deposits.most_recent === 0 ?
                                                                        "0.00"
                                                                        :
                                                                        Wallet.deposits.most_recent
                                                                }
                                                            </>
                                                        ) : "0.00"}
                                                    </div>
                                                    <p className="m-0">Most Recent</p>
                                                </div>

                                                <span style={styles.divider} />
                                            </>
                                        ) : null
                                    }

                                    <div style={styles.statsBoxChild}>
                                        <div style={{ ...styles.stat, color: colors.success }}>
                                            ₦{Wallet && Wallet.deposits ? (
                                                <>
                                                    {
                                                        Wallet.deposits.total_amount === 0 ?
                                                            "0.00"
                                                            :
                                                            Wallet.deposits.total_amount
                                                    }
                                                </>
                                            ) : "0.00"}
                                        </div>
                                        <p className="m-0">Deposits</p>
                                    </div>
                                </div>

                                <div style={styles.statsBox}>
                                    {
                                        Wallet && Wallet.withdrawals.most_recent ? (
                                            <>
                                                <div style={styles.statsBoxChild}>
                                                    <div style={{
                                                        ...styles.stat,
                                                        fontSize: "15px",
                                                    }}>
                                                        ₦{Wallet && Wallet.withdrawals ? (
                                                            <>
                                                                {
                                                                    Wallet.withdrawals.most_recent === 0 ?
                                                                        "0.00"
                                                                        :
                                                                        Wallet.withdrawals.most_recent
                                                                }
                                                            </>
                                                        ) : "0.00"}
                                                    </div>
                                                    <p className="m-0">Most Recent</p>
                                                </div>

                                                <span style={styles.divider} />
                                            </>
                                        ) : null
                                    }

                                    <div style={styles.statsBoxChild}>
                                        <div style={{
                                            ...styles.stat, 
                                            color: colors.warning 
                                        }}>
                                            ₦{Wallet && Wallet.withdrawals ? (
                                                <>
                                                    {
                                                        Wallet.withdrawals.total_amount === 0 ?
                                                            "0.00"
                                                            :
                                                            Wallet.withdrawals.total_amount
                                                    }
                                                </>
                                            ) : "0.00"}
                                        </div>
                                        <p className="m-0">Withdrawals</p>
                                    </div>
                                </div>

                                <div style={styles.statsBox}>
                                    {
                                        Wallet && Wallet.purchases.most_recent ? (
                                            <>
                                                <div style={styles.statsBoxChild}>
                                                    <div style={{
                                                        ...styles.stat,
                                                        fontSize: "15px",
                                                    }}>
                                                        ₦{Wallet && Wallet.purchases ? (
                                                            <>
                                                                {
                                                                    Wallet.purchases.most_recent === 0 ?
                                                                        "0.00"
                                                                        :
                                                                        Wallet.purchases.most_recent
                                                                }
                                                            </>
                                                        ) : "0.00"}
                                                    </div>
                                                    <p className="m-0">Most Recent</p>
                                                </div>

                                                <span style={styles.divider} />
                                            </>
                                        ) : null
                                    }

                                    <div style={styles.statsBoxChild}>
                                        <div style={{ 
                                            ...styles.stat, 
                                            color: colors.danger 
                                        }}>
                                            ₦{Wallet && Wallet.purchases ? (
                                                <>
                                                    {
                                                        Wallet.purchases.total_amount === 0 ?
                                                            "0.00"
                                                            :
                                                            Wallet.purchases.total_amount
                                                    }
                                                </>
                                            ) : "0.00"}
                                        </div>
                                        <p className="m-0">Purchases</p>
                                    </div>  
                                </div>
                            </div>
                        </div>

                        
                        <div className="col-12 col-md-6">                          

                            <div className="row">
                                <div className="col-12">
                                    <div style={styles.sectionTitle}>
                                        Account Details
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                        <div style={{
                                            color: colors.primary
                                        }}>Bank Account Details</div>

                                        <Button {...PageButtons.toggleAddBankAccount} />
                                    </div>

                                    {
                                        MyBanks && MyBanks.length > 0 ? MyBanks.map((bank, i) => {
                                            return (
                                                <div style={{
                                                    display: 'flex',
                                                    position: 'relative',
                                                    alignItems: 'center',
                                                    backgroundColor: colors.white,
                                                    margin: '20px 0',
                                                    padding: '20px',
                                                }}>
                                                    <div style={{ margin: "0 20px" }}>
                                                        <AiFillCreditCard color={colors.primary} size={30} />
                                                    </div>

                                                    <div>
                                                        <div style={{ padding: "10px" }}>
                                                            <span>Bank Name:</span>
                                                            <span style={{
                                                                color: colors.primary,
                                                                padding: '15px'
                                                            }}>{bank.bank_name}</span>
                                                        </div>
                                                        <div style={{ padding: "10px" }}>
                                                            <span>Account Number:</span>
                                                            <span style={{
                                                                color: colors.primary,
                                                                padding: '15px'
                                                            }}>{bank.account_number}</span>
                                                        </div>
                                                    </div>


                                                    <span style={{ position: 'absolute', bottom: '40px', right: '10px', zIndex: 9 }}>
                                                        <FormField
                                                            formData={{
                                                                checkBox: {
                                                                    element: 'checkbox',
                                                                    checked: WithdrawalFormData.withdrawal_bank.value === bank.id ? true : false,
                                                                    data: bank,
                                                                    label: false,
                                                                    props: {
                                                                        name: `address_${i}_input`,
                                                                        type: 'checkbox',
                                                                    },
                                                                }
                                                            }}
                                                            change={(withdrawalFormData) => {
                                                                console.log("Clicking")
                                                                if (WithdrawalFormData.withdrawal_bank.value === bank.id) { return }
                                                                // Set new address
                                                                if (withdrawalFormData.checkBox.checked) {
                                                                    let newWithdrawalFormData = WithdrawalFormData
                                                                    newWithdrawalFormData.withdrawal_bank.value = withdrawalFormData.checkBox.data.id
                                                                    setWithdrawalFormData({ ...newWithdrawalFormData })
                                                                }
                                                            }}
                                                            field={{
                                                                id: 'checkBox',
                                                                config: {
                                                                    element: 'checkbox',
                                                                    checked: WithdrawalFormData.withdrawal_bank.value === bank.id ? true : false,
                                                                    data: bank,
                                                                    label: false,
                                                                    props: {
                                                                        name: `address_${i}_input`,
                                                                        type: 'checkbox',
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </span>
                                                </div>
                                            )
                                        }) : (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                backgroundColor: colors.white,
                                                color: colors.grey3,
                                                margin: '20px 0',
                                                padding: '20px',
                                            }}>
                                                You have not added your bank account.
                                                Click the button above to add your withdrawal bank account.
                                            </div>
                                        )
                                    }     


                                    <FormField
                                        formData={WithdrawalFormData}
                                        change={(newWithdrawalFormData) => setWithdrawalFormData({ ...newWithdrawalFormData })}
                                        field={{
                                            id: 'withdrawal_amount',
                                            config: WithdrawalFormData.withdrawal_amount
                                        }}
                                    />

                                    <Button {...PageButtons.attemptWithdrawToBank} />

                                </div>
                            </div>
                        </div>


                        <div className="col-12 col-md-6">
                            <div style={styles.sectionTitle}>
                                Transaction History
                            </div>

                            <div className={"row"}>
                                
                                {
                                    Transactions && Transactions.map(transaction => {
                                        console.log("transaction: ", transaction)
                                        return (
                                            <div className="col-12"
                                                style={{
                                                    borderLeft: '3px solid green',
                                                    backgroundColor: colors.white,
                                                    margin: '0 0 15px',
                                                }}
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '10px',
                                                    borderBottom: '1px solid black'
                                                }}>
                                                    <div style={{
                                                        fontSize: '20px'
                                                    }}>
                                                        ₦{transaction.amount}
                                                    </div>

                                                    <div>
                                                        <span style={{ color: colors.grey, margin: '0 10px 0 0' }}>
                                                            Transaction ID:
                                                        </span>
                                                        <span style={{ color: colors.primary }}>
                                                            {transaction.reference}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '10px',
                                                }}>
                                                    {
                                                        transaction.payment_source === "card" ? (
                                                            <div></div>
                                                        ) : null
                                                    }

                                                    {
                                                        transaction._type.value === "withdrawal" ? (
                                                            <div style={{ color: colors.primary }}>
                                                                <span>Polaris Bank</span>
                                                                <span style={{ padding: '0 10px', color: colors.grey3 }}>|</span>
                                                                <span>1921521344</span>
                                                            </div>
                                                        ) : null
                                                    }

                                                    <div style={{ color: colors.success, alignSelf: 'flex-end', }}>
                                                        {transaction._type.display} {transaction.status.value}
                                                    </div>
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
            <Header headerConfig={HeaderConfig} />

            <ToastContainer />

            {
                ShowAddAccountModal ? (
                    <ModalAddBankAccount
                        // orderPayload={OrderPayload}
                        hideModal={() => setShowAddAccountModal(false)}
                    />
                ) : null
            }

            <IsDesktop>
                {
                    MainContent({
                        statsWrapper: {
                            justifyContent: 'space-between',
                        },
                        profileImage: {
                            top: '100px',
                            left: '50px',
                        },
                        imageWrapper: {
                            height: '180px',
                            width: '180px',
                        },
                        changeImageWraper: {
                            bottom: '15px',
                            right: '-90px',
                        },
                        containerPadding: "50px 35px"
                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        statsWrapper: {
                            justifyContent: 'space-between',
                        },
                        profileImage: {
                            top: '100px',
                            left: '50px',
                        },
                        imageWrapper: {
                            height: '180px',
                            width: '180px',
                        },
                        changeImageWraper: {
                            bottom: '15px',
                            right: '-90px',
                        },
                        containerPadding: "50px 35px"
                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        statsWrapper: {
                            justifyContent: 'space-between',
                        },
                        profileImage: {
                            top: '170px',
                            left: '20px',
                        },
                        imageWrapper: {
                            height: '130px',
                            width: '130px',
                        },
                        changeImageWraper: {
                            bottom: '15px',
                            right: '-110px',
                        },
                        containerPadding: "50px 20px"
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
        minHeight: "100vh"
    },
    bannerWrapper: {
        height: '220px',
        backgroundImage: `url(${require('../../../../assets/images/bg-6.png')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    bannerContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        height: '100%',
        position: 'relative',
    },
    pageTitle: {
        fontSize: '34px',
        color: colors.white,
    },
    profileImage: {
        position: 'absolute',
    },
    imageWrapper: {
        objectFit: 'cover',
        border: '2px solid #7F3F98',
        boxSizing: 'border-box',
        borderRadius: '100px',
        position: 'relative',
    },
    goBack: {
        display: 'flex',
        alignItems: 'center',

        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        cursor: 'pointer',
    },
    sectionTitle: {
        fontSize: "18px",
        color: colors.grey3,
        margin: "50px 0 30px",
        fontFamily: 'Nunito Sans',
        textTransform: 'uppercase'
    },
    referralCode: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        lineHeight: '49px',
        textTransform: 'uppercase',
    },
    referralMessage: {
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        width: "300px",
        color: colors.primary
    },


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
    },
    statsBoxChild: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        height: "110px",
        padding: "15px 20px",
        fontSize: "12px",
        color: colors.grey3,
    },
    stat: {
        // fontFamily: "Gothic A1",
        color: colors.primary,
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '25px',
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfileScreen)