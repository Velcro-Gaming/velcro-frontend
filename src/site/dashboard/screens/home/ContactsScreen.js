import React, { useEffect } from 'react'

export default function ContactsScreen(props) {
    const {
        setActiveScreen
    } = props

    useEffect(() => {
        setActiveScreen({
            name: 'contacts',
            path: '/contacts'
        })
    }, [])

    return (
        <div>

        </div>
    )
}
