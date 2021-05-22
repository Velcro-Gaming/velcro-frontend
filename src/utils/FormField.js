import React, { Component } from 'react'

import {
    colors
} from '../App.json'

import Select from 'react-select';
import SearchableInput from './SearchableInput';

// import { AiOutlineSearch } from 'react-icons/ai'

export default class FormField extends Component {
    constructor(props) {
        super(props)
    }

    changeHandler = (event, id) => {
        // console.log("event: ", event)

        let eventValue
        let {
            field,
            change,
            formData,
        } = this.props

        const newFormData = formData;

        // console.log("field: ", field)
        

        // if (field.config.props.type === 'file') {
        //     eventValue = event.target.files[0];

        //     console.log("eventValue: ", eventValue)

        //     newFormData[id].value = eventValue;
        // }
        // else {
        //     if (field.config.props.isMulti) {
        //         // event: { value: 7, label: "Microsoft Xbox 360" }
        //         eventValue = event
        //     } else {
        //         eventValue = event.target.value
        //     }
        // }

        
        if (field.config.props.isMulti) {
            // event: { value: 7, label: "Microsoft Xbox 360" }
            eventValue = event
        }else if (field.config.props.type === 'file') {
            eventValue = event.target.files[0];            
        } else {
            eventValue = event.target.value
        }

        console.log("eventValue: ", eventValue)
        newFormData[id].value = eventValue;

        // Update parent component
        change(newFormData)
    };

    checkboxOnClick = (field) => {
        let {
            change,
            formData,
        } = this.props
        const newFormData = formData;
        newFormData[field.id].checked = !newFormData[field.id].checked;
        // Update parent component
        change(newFormData)
    };

    handleKeyUp = (event) => {
        const {
            keyUpHandler,
        } = this.props

        if (event.keyCode === 13 && typeof keyUpHandler !== "undefined") {
            // Update parent component
            keyUpHandler()
        }
    }

    showLabel = (show, label) => {
        return show ? (
            <div style={styles.label}>
                {label}
            </div>
        )
            :
            null
    };

    renderFormField = (field) => {
        let formTemplate
        let fieldConfig = field.config

        switch (fieldConfig.element) {

            case ('input'):
                formTemplate = (

                    <div style={fieldConfig.wrapperProps ? fieldConfig.wrapperProps.style : styles.fieldWrapper}>

                        {this.showLabel(fieldConfig.label, fieldConfig.labelText)}

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
                            fieldConfig.props.type === "file" ? (
                                <input 
                                    {...fieldConfig.props}
                                    // type="file"
                                    // id="id_cover"
                                    // name="cover"
                                    // value={fieldConfig.value}
                                    onChange={(event) => this.changeHandler(event, field.id)}
                                />
                            ) : (
                                <input
                                    {...fieldConfig.props}
                                    value={fieldConfig.value}
                                    onChange={(event) => this.changeHandler(event, field.id)}
                                    onKeyUp={(event) => this.handleKeyUp(event)}
                                    style={fieldConfig.styles ? fieldConfig.styles : styles.input}
                                    // className={fieldConfig.className}
                                    className={"place-holder-white"}
                                />
                            )
                        }

                        {/* {
                            fieldConfig.props.type === "text" ? (
                                <input
                                    {...fieldConfig.props}
                                    value={fieldConfig.value}
                                    onChange={(event) => this.changeHandler(event, field.id)}
                                    style={fieldConfig.styles ? fieldConfig.styles : styles.input}
                                    className={"place-holder-white"}
                                />
                            ) : null
                        } */}

                    </div>
                );
                break;
            
            case ('select'):
                formTemplate = (

                    <div style={fieldConfig.wrapperProps ? fieldConfig.wrapperProps.style : styles.fieldWrapper}>

                        {this.showLabel(fieldConfig.label, fieldConfig.labelText)}

                        {
                            fieldConfig.props.isMulti ? (
                                <Select
                                    {...fieldConfig.props}
                                    value={fieldConfig.value}
                                    onChange={(event) => this.changeHandler(event, field.id)}
                                    options={fieldConfig.data}
                                />
                            ) : (
                                <select
                                    {...fieldConfig.props}
                                    value={fieldConfig.value}
                                    onChange={(event) => this.changeHandler(event, field.id)}
                                    style={fieldConfig.styles ? fieldConfig.styles : styles.input}
                                >
                                    {fieldConfig.data.map((option, index) => {
                                        return <option key={index} value={option.value}>{option.display}</option>;
                                    })}
                                </select>
                            )
                        }                        

                        {/* <select
                            {...fieldConfig.props}
                            value={fieldConfig.value}
                            onChange={(event) => this.changeHandler(event, field.id)}
                            style={fieldConfig.styles ? fieldConfig.styles : styles.input}
                        >
                            {fieldConfig.data.map((option, index) => {
                                return <option key={index} value={option.value}>{option.display}</option>;
                            })}
                        </select> */}

                    </div>
                );
                break;
            case ('textarea'):
                formTemplate = (
                    <div style={fieldConfig.wrapperProps ? fieldConfig.wrapperProps.style : styles.fieldWrapper}>

                        {this.showLabel(fieldConfig.label, fieldConfig.labelText)}

                        <textarea
                            {...fieldConfig.props}
                            value={fieldConfig.value}
                            onChange={(event) => this.changeHandler(event, field.id)}
                            style={styles.textarea}
                        />

                    </div>
                );
                break;

            case ('checkbox'):
                formTemplate = (
                    <div style={fieldConfig.wrapperProps ? fieldConfig.wrapperProps.style : styles.fieldWrapper}>
                        <label className="custom-checkbox">
                            <input 
                                {...fieldConfig.props}
                                checked={fieldConfig.checked}
                                // onChange={(event) => this.changeHandler(event, field.id)}
                                onClick={() => this.checkboxOnClick(field)}
                                style={{ marginRight: "15px" }}
                            />
                            <span class="checkmark"></span>

                            {fieldConfig.label ? fieldConfig.labelText : null}
                        </label>

                    </div>
                )
            
                break;
            default:
                formTemplate = null
        }

        return formTemplate
    }

    render() {
        const { field } = this.props
        
        return (
            <div>
                {
                    this.renderFormField(field)
                }
            </div>
        )
    }
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
    textarea: {
        background: '#FFFFFF',
        border: '1px solid #D0D0D0',
        boxSizing: 'border-box',
        borderRadius: '5px',
        minHeight: '150px',
        width: '100%',

        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '24px',

        margin: '10px 0',
        padding: '0 10px',
    }
}
