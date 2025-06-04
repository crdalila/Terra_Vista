import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { AuthProvider } from "../../context/AuthContext";

function Root() {
    return (
        <AuthProvider>
            <header>
                <p>Header</p> {/* TODO HEADER */}
            </header>
            <main>
                <Outlet />
            </main>

            <footer>
                <p>Footer</p> {/* TODO FOOTER */}
            </footer>
        </AuthProvider>
    )
}

export default Root