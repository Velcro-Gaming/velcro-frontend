import React from "react";
import {
    withRouter
} from "react-router-dom";


import ClientRouter from './client/Router'
import DashboardRouter from './dashboard/Router'

function RouterBase() {
    const subDomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : false;

    if (subDomain === "dashboard") {
        return <DashboardRouter />
    }
    return <ClientRouter />
}

export default withRouter(RouterBase)