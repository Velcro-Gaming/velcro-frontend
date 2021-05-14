import React, { useEffect } from 'react'

export default function WithdrawalsScreen(props) {
    const {
        setActiveScreen
    } = props

    useEffect(() => {
        setActiveScreen({
            name: 'withdrawals',
            path: '/withdrawals'
        })
    }, [])

    return (
        <div>

        </div>
    )
}
