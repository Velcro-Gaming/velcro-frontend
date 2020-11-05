import React from 'react'


export default function FormFields() {
    return (
        <div>

        </div>
    )
}



const FormFields = (props) => {

    const showLabel = (show, label) => {
        return show ? <Label>{label}</Label> : null
    };

    const changeHandler = (event, id) => {
        const newState = props.formData;
        newState[id].value = event.target.value;

        // Update parent component
        props.change(newState)
    };

    const renderTemplate = (data) => {
        // let formTemplate = " ";
        let formTemplate = " ";
        let values = data.settings;

        switch (values.element) {
            case ('input'):
                formTemplate = (
                    <Element>
                        {showLabel(values.label, values.labelText)}
                        <Input
                            {...values.config} value={values.value}
                            onChange={(event) => changeHandler(event, data.id)}
                        />
                    </Element>
                );
                break;
            case ('textarea'):
                formTemplate = (
                    <Element>
                        {showLabel(values.label, values.labelText)}
                        <Message
                            {...values.config} value={values.value}
                            onChange={(event) => changeHandler(event, data.id)}
                        />
                    </Element>
                );
                break;
            default:
                formTemplate = null
        }
        return formTemplate;

    };

    const renderFields = () => {
        const formArray = [];

        for (let elementName in props.formData) {
            formArray.push({
                id: elementName,
                settings: props.formData[elementName]
            })
        }

        // console.log(formArray);

        return formArray.map((item, i) => {
            return (
                <div key={i}>
                    {renderTemplate(item)}
                </div>
            );
        });
    };

    const csrfToken = window.props.csrfToken;

    return (
        <div>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
            {renderFields()}
        </div>
    );
};
