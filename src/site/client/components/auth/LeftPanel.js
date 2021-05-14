import React from 'react'


export default function LeftPanel() {
    return (
        <div style={styles.container}>
            <div style={{ ...styles.consoles }}>
                <img style={{ height: '45px' }} src={require('../../../../assets/icons/consoles.png')} />
            </div>
            
        </div>
    )
}


const styles = {
    container: {
        display: 'flex',
        height: '100%',
        width: '50%',
        backgroundImage: `url(${require('../../../../assets/images/bg-2.png')})`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    consoles: {
        position: 'fixed',
        left: '50px',
        bottom: '50px',
    },
}