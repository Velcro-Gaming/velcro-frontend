import React from 'react'

export default function Overlay() {
    return (
        <div style={styles.container}>
            <img style={styles.dottedSquare.left} src={require('../../../assets/icons/dotted-square-white.png')} />
            <img style={styles.dottedSquare.right} src={require('../../../assets/icons/dotted-square-white.png')} />
        </div>
    )
}

const styles = {
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `linear-gradient(91.76deg, rgba(0, 0, 0, 0.7) 0.28%, rgba(0, 0, 0, 0.7) 22.79%, rgba(0, 0, 0, 0) 81.83%)`,

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dottedSquare: {
        left: {
            position: 'fixed',
            left: '-45px'
        },
        right: {
            position: 'fixed',
            right: '-45px'
        }
    }
}