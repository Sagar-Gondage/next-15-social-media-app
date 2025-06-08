"use client";

import React, { createContext, useContext } from "react";

const SessionContext = createContext(null);

export default function SessionProvider({ children, value }) {
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}
