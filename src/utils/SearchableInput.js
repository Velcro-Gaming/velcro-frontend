import React from 'react'
import { Link } from 'react-router-dom';

import {
    colors
} from '../App.json'

export default function SearchableInput(props) {
    const {
        field,
        selected,
        filteredList,
        setFilteredList,
        setSelectedObject,
        formData,
        change
    } = props

    let fieldConfig = field.config

    const changeHandler = (event, id) => {
        const newFormData = formData;
        newFormData[id].value = event.target.value;

        // Update parent component
        change(newFormData)
    };

    const handleKeyUp = (event) => {
        const {
            keyUpHandler,
        } = props

        if (event.keyCode === 13 && typeof keyUpHandler !== "undefined") {
            // Update parent component
            keyUpHandler()
        }
    }

    const showLabel = (show, label) => {
        return show ? (
            <div style={styles.label}>
                {label}
            </div>
        ) : null
    };
    
    // if (selected) {
    // }
    
    return (
        <div style={fieldConfig.wrapperProps ? fieldConfig.wrapperProps.style : styles.fieldWrapper}>
            
            {showLabel(fieldConfig.label, fieldConfig.labelText)}

            {
                fieldConfig.prepend ? (
                    <span
                        style={{
                            position: 'absolute',
                            color: colors.white,
                            margin: '7px 15px',
                            ...fieldConfig.prepend.styles
                        }}
                    >
                        {fieldConfig.prepend.content}
                    </span>
                ) : null
            }

            
            {
                selected ? (
                    <div
                        style={{
                            width: "100%",
                            height: "48px",
                            borderRadius: "5px",
                            margin: "10px 0",
                            padding: "10px 15px",
                            backgroundColor: colors.primary,
                            color: colors.white,

                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        {selected.name}

                        <div 
                            onClick={() => setSelectedObject(null)}
                            style={{color: colors.danger, cursor: "pointer"}}
                        >remove</div>
                    </div>
                ) : (
                    <input
                        {...fieldConfig.props}
                        value={fieldConfig.value}
                        onChange={(event) => changeHandler(event, field.id)}
                        style={fieldConfig.styles ? fieldConfig.styles : styles.input}
                        className={"place-holder-white"}
                        onKeyUp={(event) => handleKeyUp(event)}
                    />
                )
            }
            

            

            {
                filteredList.length > 0 ? (
                    <div style={{
                        position: 'absolute',
                        zIndex: 99,
                        backgroundColor: colors.dark,
                        // width: "390px",
                        padding: "5px 0",
                        borderRadius: "5px",
                        color: colors.white
                    }}>
                        {
                            filteredList.map(object => {
                                return (
                                    <div
                                        className={"hover-bg-primary"}
                                        onClick={()=>{
                                            setFilteredList([])
                                            setSelectedObject(object)
                                        }}
                                        style={{ margin: "2px 0", padding: "5px 20px", backgroundColor: "none" }}
                                    >
                                        {object.name}
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
    fieldWrapper: {
        margin: '10px 0',
    },
    label: {
        color: colors.primary,
        // fontFamily: 'Source Sans Pro',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
    },
    input: {
        // background: '#FFFFFF',
        border: '1px solid #D0D0D0',
        boxSizing: 'border-box',
        borderRadius: '5px',
        height: '48px',
        width: '100%',

        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '24px',

        margin: '10px 0',
        padding: '0 10px',
    },
}