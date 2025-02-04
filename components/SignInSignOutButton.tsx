"use client";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { InteractionStatus } from "@azure/msal-browser";
import { useEffect, useState } from "react";

const SignInSignOutButton = () => {
    const { inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const [result, setResult] = useState<JSX.Element | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            setResult(<SignOutButton />);
        } else if (inProgress !== InteractionStatus.HandleRedirect) {
            setResult(<SignInButton />);
        } else {
            setResult(null);
        }
    }, [isAuthenticated, inProgress]);

    return result;
};

export default SignInSignOutButton;
