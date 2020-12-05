import React from 'react';
import BaseBreakpoint from './Base';


export default function PhoneBreakpoint(props) {
    return (
        <BaseBreakpoint name="desktop">
            {props.children}
        </BaseBreakpoint>
    );
}