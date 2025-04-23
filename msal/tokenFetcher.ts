import { MsalConfigContextProps } from "./MsalConfigProvider";

export async function getCurrentToken({
  msalInstance,
  loginRequest: { scopes },
}: MsalConfigContextProps): Promise<{
  accessToken: string;
  idToken: string;
} | null> {
  const instance = msalInstance;
  if (!instance) {
    return null;
  }
  const acquireAccessToken = async () => {
    const activeAccount = instance.getActiveAccount(); // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
    const accounts = instance.getAllAccounts();

    if (!activeAccount && accounts.length === 0) {
      /*
       * User is not signed in. Throw error or wait for user to login.
       * Do not attempt to log a user in outside of the context of MsalProvider
       */
      return null;
    }
    const request = {
      scopes,
      account: activeAccount || accounts[0],
    };

    try {
      const authResult = await instance.acquireTokenSilent(request);
      console.log({ authResult });
      return {
        accessToken: authResult.accessToken,
        idToken: authResult.idToken,
        refresh: "",
      }; // i need to get refresh token
    } catch (error) {
      // If silent acquisition fails, try acquiring token through popup or redirect
      try {
        const authResult = await instance.acquireTokenPopup(request);
        return {
          accessToken: authResult.accessToken,
          idToken: authResult.idToken,
          refresh: "",
        };
      } catch (error) {
        console.error("Error acquiring token:", error);
        return null;
      }
    }
  };

  var token = null;

  if (typeof window !== "undefined") {
    token = await acquireAccessToken();
  }

  return token;
}
