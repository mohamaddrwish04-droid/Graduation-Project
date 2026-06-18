import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";


function DashboardLayout() {
    return (
        <div
            style={{
                display: "flex",
                background: "",
                width: "100%",
                height: "100vh",
            }}>
            <Sidebar />
            <div style={{background:"",width:"85%"}}>
                <Topbar />
                <div style={{
                    background: "", width: "100%", height: "88vh"
                }}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;