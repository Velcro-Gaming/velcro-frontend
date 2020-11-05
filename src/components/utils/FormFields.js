import React, { Component } from 'react'
import FormField from './FormField'
import {
    colors
} from '../../App.json'

export default class FormFields extends Component {
    constructor(props) {
        super(props)
    }

    changeHandler = (newFormData) => {
        let { change } = this.props
        // Update parent component
        change(newFormData)
    };
    
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
                <FormField
                    key={index}
                    formData={formData}
                    change={(newFormData) => this.changeHandler(newFormData)}
                    field={{
                        id: field.id,
                        config: field.config
                    }}
                />
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


// const styles = {
//     fieldWrapper: {
//         margin: '10px 0',
//     },
//     label: {
//         color: colors.primary,
//         // fontFamily: 'Source Sans Pro',
//         fontStyle: 'normal',
//         fontWeight: 400,
//         fontSize: '16px',
//         lineHeight: '24px',
//     },
//     input: {
//         background: '#FFFFFF',
//         border: '1px solid #D0D0D0',
//         boxSizing: 'border-box',
//         borderRadius: '5px',
//         height: '48px',
//         width: '100%',

//         fontStyle: 'normal',
//         fontWeight: 400,
//         fontSize: '14px',
//         lineHeight: '24px',

//         margin: '10px 0',
//         padding: '0 10px',
//     },
//     textarea: {
//         background: '#FFFFFF',
//         border: '1px solid #D0D0D0',
//         boxSizing: 'border-box',
//         borderRadius: '5px',
//         minHeight: '150px',
//         width: '100%',

//         fontStyle: 'normal',
//         fontWeight: 400,
//         fontSize: '14px',
//         lineHeight: '24px',

//         margin: '10px 0',
//         padding: '0 10px',
//     }
// }
