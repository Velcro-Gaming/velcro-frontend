import React, { useState } from 'react'
import {
    Link,
    Redirect
} from 'react-router-dom'
import { colors } from '../App.json'


export default function Dropdown(props) {
    const {
        title,
        data
    } = props

    const [ShowDropdownMenu, setShowDropdownMenu] = useState(false)

    return (
        <div>
            <div style={styles.placeholder}>
                {title}
            </div>
            {
                ShowDropdownMenu ? (
                    <ul>
                        {
                            data.map(item => {
                                return <li>
                                    {
                                        item.linkTo ? (
                                            <Link to={item.linkTo}>
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <span onClick={() => item.action}>
                                                {item.name}
                                            </span>
                                        )
                                    }
                                </li>
                            })
                        }
                    </ul>
                ) : null
            }
        </div>
    )
}


const styles = {
    placeholder: { 
        backgroundColor: colors.grey,
        padding: "5px 15px",
    }
}