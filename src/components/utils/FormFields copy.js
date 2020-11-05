import React, { Component } from 'react'

import {
    colors
} from '../../App.json'

export default class FormFields extends Component {
    constructor(props) {
        super(props)
    }

    changeHandler = (event, id) => {
        let {
            change,
            formData
        } = this.props
        const newState = formData;
        newState[id].value = event.target.value;

        // Update parent component
        change(newState)
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
                    
                    <div style={styles.fieldWrapper}>

                        {this.showLabel(fieldConfig.label, fieldConfig.labelText)}

                        <input
                            {...fieldConfig.props}
                            value={fieldConfig.value}
                            onChange={(event) => this.changeHandler(event, field.id)}
                            style={styles.input}
                        />

                    </div>
                );
                break;
            case ('textarea'):
                formTemplate = (
                    <div style={styles.fieldWrapper}>
                        
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

    renderForm = () => {
        const formArray = []
        const {
            formData
        } = this.props

        for (let elementName in formData) {
            formArray.push({
                id: elementName,
                config: formData[elementName]
            })
        }

        return formArray.map((field, index) => {
            return (
                <div key={index}>
                    {this.renderFormField(field)}
                </div>
            );
        });
    };

    render() {
        return (
            <div>
                {
                    this.renderForm()
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
        background: '#FFFFFF',
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
