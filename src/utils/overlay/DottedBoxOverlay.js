import React from 'react'

export default function DottedBoxOverlay() {
    return (
        <div >
            <img style={styles.dottedSquare.left} src={require('../../assets/icons/dotted-square-white.png')} />
            <img style={styles.dottedSquare.right} src={require('../../assets/icons/dotted-square-white.png')} />
        </div>
    )
}

const styles = {
    dottedSquare: {
        left: {
            position: 'absolute',
            left: '-45px',
            bottom: '40%',
        },
        right: {
            position: 'absolute',
            right: '-45px',
            bottom: '40%',
        },
    }
}