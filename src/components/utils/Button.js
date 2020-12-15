import React, { Component } from 'react'
import {
    colors
} from '../../App.json'
import {
    Link
} from 'react-router-dom'


export default class Button extends Component {
    constructor(props) {
        super(props)
        
    }
    
    render() {
        const buttonState = this.props

        const {
            height,
            width,
            margin,
            backgroundColor,
            border,
            // color,
            fontSize
        } = buttonState.styles

        // console.log("BTN fontSize: ", fontSize)

        const RenderButton = () => {
            if (buttonState.linkTo) {
                return (
                    <Link
                        className={"btn"}
                        style={{
                            color: buttonState.text.color,
                            height: height ? height : '50px',
                            width: width ? width : '150px',
                            backgroundColor: backgroundColor,
                            border: `${border.width} ${border.style} ${border.color}`,
                            borderRadius: border.radius,
                            fontSize: typeof fontSize === 'undefined' ? '16px' : fontSize,
                            
                            ...styles.wrapper,
                        }}
                        to={buttonState.linkTo}
                    >
                        {buttonState.text.value}
                    </Link>
                )
            } else if (buttonState.onClick) {
                return (
                    <div
                        className={"btn"}
                        style={{
                            color: buttonState.text.color,
                            height: height ? height : '50px',
                            width: width ? width : '150px',
                            backgroundColor: backgroundColor,
                            border: `${border.width} ${border.style} ${border.color}`,
                            borderRadius: border.radius,
                            fontSize: typeof fontSize === 'undefined' ? '16px' : fontSize,

                            ...styles.wrapper,
                        }}
                        onClick={buttonState.onClick}
                    >
                        {buttonState.text.value}
                    </div>
                )
            } else {
                return (
                    <div style={{
                        color: buttonState.text.color,
                        fontSize: typeof fontSize === 'undefined' ? '16px' : fontSize,
                    }} >
                        {buttonState.text.value}
                    </div>
                )
            }
        }

        return (
            <div style={{ margin: `${margin ? margin : null}` }}>
                {
                    RenderButton()

                    // !buttonState.onClick && !buttonState.linkTo ? (
                    //     <div style={{ 
                    //         color: buttonState.text.color,
                    //     }} >
                    //         {buttonState.text.value}
                    //     </div>
                    // ) : (
                    //     <Link
                    //         className={"btn"}
                    //         style={{
                    //             color: color,
                    //             height: height ? height : '50px',
                    //             width: width ? width : '150px',
                    //             backgroundColor: backgroundColor,
                    //             border: `${border.width} ${border.style} ${border.color}`,
                    //             borderRadius: border.radius,

                    //             ...styles.wrapper,
                    //         }}
                    //         to={buttonState.linkTo}
                    //     >
                    //         {buttonState.text.value}
                    //     </Link>
                    // )

                }
            </div>
        )
    }
}

const styles = {
    wrapper: {
        // height: '50px',
        // minWidth: '150px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        fontFamily: 'Nunito Sans',
        // fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '22px',
        letterSpacing: '0em',
        textAlign: 'left',

        // margin: '0 15px',
    }
}