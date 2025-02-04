'use client'

import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react"
import UnauthorizedMessage from "@/components/UnauthorizedMessage";
import { useMsalConfig } from "./MsalConfigProvider";

export default function MyMsalProvider({ children }: { children: React.ReactNode }) {

    const { msalInstance } = useMsalConfig();

    if(msalInstance===undefined) return (<UnauthorizedMessage />)

    return (
        <MsalProvider instance={msalInstance}>
            <AuthenticatedTemplate>
                {children}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <UnauthorizedMessage />
            </UnauthenticatedTemplate>
        </MsalProvider>
    );
};