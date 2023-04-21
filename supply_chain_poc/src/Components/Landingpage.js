import Content from "./Content";
import Sidebar from "./Sidebar";
import React from 'react';

function LogLandingpage() {
    return (
        <>
            <div class="container1-fluid">
                <div class="row flex-nowrap " >
                    <Sidebar />
                    <div class="col py-3">
                        <Content />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogLandingpage;