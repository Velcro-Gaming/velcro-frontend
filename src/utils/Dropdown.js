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
        <div style={wrapperStyles && wrapperStyles.placeholder ? wrapperStyles.placeholder : styles.placeholderWrapper} onMouseEnter={() => setShowDropdownMenu(true)} onMouseLeave={() => setShowDropdownMenu(false)}>
            {/* <div style={{ cursor: 'pointer' }} onMouseEnter={() => setShowDropdownMenu(true)} onMouseLeave={() => setShowDropdownMenu(false)}>
                {title}
            </div> */}

            {
                title
            }
            {
                ShowDropdownMenu ? (
                    <div style={wrapperStyles && wrapperStyles.dropdown ? { ...styles.dropdownWrapper, ...wrapperStyles.dropdown } : styles.dropdownWrapper}>
                        <span style={wrapperStyles && wrapperStyles.toolTip ? { ...styles.toolTip, ...wrapperStyles.toolTip} : styles.toolTip } />
                        {
                            data.map(item => {
                                return (
                                    <div
                                        className={'hover-bg-primary'}
                                        style={wrapperStyles && wrapperStyles.dropdownItem ? wrapperStyles.dropdownItem : styles.dropdownItem}
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
        padding: '5px 15px',
        cursor: 'pointer',
    },
    dropdownWrapper: {        
        position: 'absolute',
        minWidth: '150px',
        backgroundColor: colors.dark,
        padding: '15px 0'
    },
    dropdownItem: {
        color: colors.white,
        fontSize: '12px',
        padding: '10px 15px'
    },

    toolTip: {
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: `10px solid ${colors.dark}`,

        position: 'absolute',
        top: '-8px',
        left: '45%'
    }
}