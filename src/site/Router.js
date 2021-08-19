import React from "react";
import {
    withRouter
} from "react-router-dom";
import Countdown from 'react-countdown';

import ClientRouter from './client/Router'
import DashboardRouter from './dashboard/Router'

import CommingSoonScreen from './client/screens/ComingSoonScreen';

const Renderer = (timerProps) => { 
    // "2021-09-01T00:00:00"
    // const { hours, minutes, seconds, completed } = props
    //
    if (timerProps.completed) {
        // Render a completed state
        return <ClientRouter />;
    } else {
        // Render a countdown
        return <CommingSoonScreen timerProps={timerProps} />
    }
};


function RouterBase() {
    const subDomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : false;

    if (subDomain === "dashboard") {
        return <DashboardRouter />
    }
    // Add Coming Soon
    if (subDomain === "test") {
        return <ClientRouter />
    }
    return (
        <Countdown
            date={"2021-10-01T00:00:00"}
            renderer={Renderer}
        />
    )
}

export default withRouter(RouterBase)





