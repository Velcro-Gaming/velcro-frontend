import React, { useState } from 'react'
import {
    Link,
    Redirect
} from 'react-router-dom'
import { colors } from '../App.json'


export default function Dropdown(props) {
    const {
        title,
        data,
        wrapperStyles
    } = props

    const [ShowDropdownMenu, setShowDropdownMenu] = useState(false)

    return (
        <div style={{ cursor: 'pointer' }} onMouseEnter={() => setShowDropdownMenu(true)} onMouseLeave={() => setShowDropdownMenu(false)}>
            <div style={wrapperStyles && wrapperStyles.placeholder ? wrapperStyles.placeholder : styles.placeholderWrapper}>
                {title}
            </div>
            {
                ShowDropdownMenu ? (
                    <div style={wrapperStyles && wrapperStyles.dropdown ? wrapperStyles.dropdown : styles.dropdownWrapper}>
                        {
                            data.map(item => {
                                return (
                                    <div
                                        className={'hover-bg-primary'} 
                                        style={{ color: colors.white, fontSize: '12px', padding: '10px 15px' }}
                                        onClick={() => item.action()}
                                    >
                                        {item.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : null
            }
        </div>
    )
}


const styles = {
    placeholderWrapper: {
        padding: "5px 15px",
    },
    dropdownWrapper: {        
        position: 'absolute',
        minWidth: '150px',
        backgroundColor: colors.dark,
    }
}