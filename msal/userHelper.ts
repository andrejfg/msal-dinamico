'use client'
import { AccountInfo, PublicClientApplication } from "@azure/msal-browser";

export function getLoggedInUser(msalInstance: PublicClientApplication): AccountInfo | null {
    const account: AccountInfo | null = msalInstance?.getActiveAccount();
    return account;
}

export function getUserClaims(msalInstance: PublicClientApplication, account?: AccountInfo | null): string[] {
    let userAccount = account;
    if (!userAccount) {
        userAccount = getLoggedInUser(msalInstance);
    }

    return userAccount?.idTokenClaims?.roles as string[] | undefined ?? [];
}

export function isUserAllowed(msalInstance: PublicClientApplication, requiredRole: string, account?: AccountInfo | null, claims?: string[] | null): boolean {
    let userClaims = claims;

    if (!userClaims) {
        userClaims = getUserClaims(msalInstance, account);
    }

    return userClaims ? userClaims.includes(requiredRole) : false;
}

export function extractInitials(name: string | null | undefined): string {
    if (!name) return '';

    const ignoreList = ["ext"]; // titles to ignore

    return name
        .split(',')
        .filter(part => !ignoreList.includes(part.toLowerCase()))
        .map(part => part.trim())
        .map(part => part[0])
        .join('')
        .toUpperCase();
}