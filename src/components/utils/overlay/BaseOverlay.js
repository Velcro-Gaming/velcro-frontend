import React from 'react'

export default function BaseOverlay() {
    return (
        <div style={styles.container}>
            
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
}