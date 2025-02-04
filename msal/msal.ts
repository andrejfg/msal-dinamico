import { AuthenticationResult, EventType, PublicClientApplication } from "@azure/msal-browser";
import { getCurrentToken } from "@/msal/tokenFetcher";
import { MsalConfigContextProps, useMsalConfig } from "./MsalConfigProvider";

export function initializeMsal(msalInstance: PublicClientApplication) {
  console.log("=> msal initialization..");
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback(async (event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  return msalInstance
}

export async function getToken(context: MsalConfigContextProps) {
  const authToken = await getCurrentToken(context);
  return authToken;
}

export const handleLogin = ({ msalInstance, loginRequest }: MsalConfigContextProps, loginType = "redirect") => {
  if (msalInstance === undefined) return;
  if (loginType === "popup") {
    msalInstance.loginPopup(loginRequest).catch((e) => {
      console.error(`loginPopup failed: ${e}`);
    });
  } else if (loginType === "redirect") {
    msalInstance.loginRedirect(loginRequest).catch((e) => {
      console.error(`loginRedirect failed: ${e}`);
    });
  }
};

export const handleLogout = (msalInstance: PublicClientApplication, logoutType = "redirect") => {
  if (logoutType === "popup") {
    msalInstance.logoutPopup().catch((e: any) => {
      console.error(`logoutPopup failed: ${e}`);
    });
  } else if (logoutType === "redirect") {
    const logoutRequest = {
      account: msalInstance.getActiveAccount(),
      postLogoutRedirectUri: "/",
    };
    msalInstance.logoutRedirect(logoutRequest).catch((e) => {
      console.error(`logoutRedirect failed: ${e}`);
    });
  }
};