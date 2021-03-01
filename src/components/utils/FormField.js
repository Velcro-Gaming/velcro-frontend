import React, { Component } from 'react'

import {
    colors
} from '../../App.json'

// import { AiOutlineSearch } from 'react-icons/ai'

export default class FormField extends Component {
    constructor(props) {
        super(props)
    }

    changeHandler = (event, id) => {
        let {
            change,
            formData,
        } = this.props
        const newFormData = formData;
        newFormData[id].value = event.target.value;

        // Update parent component
        change(newFormData)
    };

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

                        <input
                            {...fieldConfig.props}
                            value={fieldConfig.value}
                            onChange={(event) => this.changeHandler(event, field.id)}
                            style={fieldConfig.styles ? fieldConfig.styles : styles.input}
                            // className={fieldConfig.className}
                            className={"place-holder-white"}
                        />

                    </div>
                );
                break;
            case ('select'):
                formTemplate = (

                    <div style={fieldConfig.wrapperProps ? fieldConfig.wrapperProps.style : styles.fieldWrapper}>

                        {this.showLabel(fieldConfig.label, fieldConfig.labelText)}

                        <select
                            {...fieldConfig.props}
                            value={fieldConfig.value}
                            onChange={(event) => this.changeHandler(event, field.id)}
                            // style={styles.input}
                            style={fieldConfig.styles ? fieldConfig.styles : styles.input}
                        >
                            {fieldConfig.data.map((option, index) => {
                                return <option key={index} value={option.value}>{option.display}</option>;
                            })}
                        </select>

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
