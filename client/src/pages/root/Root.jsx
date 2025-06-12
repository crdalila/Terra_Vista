import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { AuthProvider } from "../../context/AuthContext";

function Root() {
    return (
        <AuthProvider>
            <main>
                <Outlet />
            </main>
        </AuthProvider>
    )
}

export default Root