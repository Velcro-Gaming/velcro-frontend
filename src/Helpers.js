import React from 'react';
import { useMediaQuery } from 'react-responsive';


export default function isXLD() {
    return useMediaQuery({
        query: '(min-device-width: 1824px)'
    })
}
export function isLGD() {
    return useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
}
export function isMDD() {
    return useMediaQuery({
        query: '(max-device-width: 1224px)'
    })
}
export function isSMD() {
    return useMediaQuery({
        query: '(max-device-width: 460px)'
    })
}


export function isXLS() {
    return useMediaQuery({
        query: '(min-width: 1824px)'
    })
}
export function isLGS() {
    return useMediaQuery({
        query: '(min-width: 1224px)'
    })
}
export function isMDS() {
    return useMediaQuery({
        query: '(max-width: 1224px)'
    })
}
export function isSMS() {
    return useMediaQuery({
        query: '(max-device-width: 460px)'
    })
}


export function isPortrait() {
    return useMediaQuery({
        query: '(orientation: portrait)'
    })
}

export function  isRetina () {
    return useMediaQuery({
        query: '(min-resolution: 2dppx)'
    })
}