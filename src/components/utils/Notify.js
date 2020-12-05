import React from 'react'

export default function Notify(props) {
    const { notification } = props
    return (
        <div style={styles.wrapper}>
            <img
                style={styles.bell}
                src={require('./../../assets/icons/notification_bell.png')}
            />
            
            {
                notification ? (
                    <img
                        style={styles.oval}
                        src={require('./../../assets/icons/notification_oval.png')}
                    />
                ) : null
            }

        </div>
    )
}

const styles = {
    wrapper: {
        height: '20px',
        position: 'relative'
    },
    bell: {

    },
    oval: {
        bottom: '3px',
        position: 'relative',
        right: '10px',
    }
}