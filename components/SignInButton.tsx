'use client'

import { handleLogin } from "@/msal/msal";
import { useMsalConfig } from "@/msal/MsalConfigProvider";

export const SignInButton = ({ className = 'bg-blue-200 text-blue-700 hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-md', text = 'Login' }) => {
    const context = useMsalConfig()
    return (
        <button className={className} onClick={() => handleLogin(context)}>
            {text}
        </button>
    )
};