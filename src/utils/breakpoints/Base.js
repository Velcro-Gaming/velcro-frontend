import React from 'react';
import MediaQuery from 'react-responsive';

const breakpoints = {
    desktop: '(min-width: 1025px) ',
    tablet: '(min-width: 568px) and (max-width: 1024px) ',
    phone: '(max-width: 567px) ',
    
    notDesktop: '(max-width: 1024px) ',
    notPhone: '(min-width: 768px) ',
};


export default function BaseBreakpoint(props) {
    const breakpoint = breakpoints[props.name] || breakpoints.desktop;
    return (
        <MediaQuery {...props} query={breakpoint} >
            { props.children}
        </MediaQuery >
    );
}