import React from 'react'


export default function ModalOverlay(props) {
    return (
        <div style={styles.container}>
            { props.children }

            
        </div>
    )
}


const styles = {
    container: {
        position: "fixed",
        zIndex: 999,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
}