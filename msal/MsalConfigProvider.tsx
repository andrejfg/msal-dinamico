"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { getToken, initializeMsal } from "./msal";
import MsalConfigSetup from "./MsalConfigSetup";

export interface MsalConfigContextProps {
  msalConfig: Configuration;
  allowedToLogin: boolean;
  msalInstance: PublicClientApplication | undefined;
  loginRequest: { scopes: string[] };
  graphConfig: { graphMeEndpoint: string };
  setClientId: (clientId: string) => void;
  setTenantId: (authority: string) => void;
  setScopes: (scopes: string[]) => void;
  setGraphMeEndpoint: (endpoint: string) => void;
  token?: {
    accessToken: string;
    idToken: string;
    refresh: string;
  };
  config: {
    clientId: string | null;
    tenantId: string | null;
    scopes: string[];
  };
}

const MsalConfigContext = createContext<MsalConfigContextProps | undefined>(
  undefined
);

interface MsalProviderProps {
  children: ReactNode;
}

const MsalConfigProvider: React.FC<MsalProviderProps> = ({ children }) => {
  const [clientId, setClientId] = useState<string | null>(
    localStorage.getItem("clientId")
  );
  const [tenantId, setTenantId] = useState<string | null>(
    localStorage.getItem("tenantId")
  );
  const [scopes, setScopes] = useState<string[]>(
    localStorage.getItem("scopes")?.split(",") || []
  );
  const [graphMeEndpoint, setGraphMeEndpoint] = useState<string>(
    "https://graph.microsoft.com/v1.0/me"
  );

  const allowedToLogin = !!clientId && !!tenantId;

  const authority = tenantId
    ? `https://login.microsoftonline.com/${tenantId}`
    : undefined;

  const config = { clientId, tenantId, scopes };

  const msalConfig: Configuration = {
    auth: {
      clientId: clientId || "",
      authority,
      redirectUri: "/",
      postLogoutRedirectUri: "/",
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true,
    },
  };

  const loginRequest = { scopes };
  const graphConfig = { graphMeEndpoint };

  const msalInstance = allowedToLogin
    ? initializeMsal(new PublicClientApplication(msalConfig))
    : undefined;

  return (
    <MsalConfigContext.Provider
      value={{
        config,
        allowedToLogin,
        msalConfig,
        msalInstance,
        loginRequest,
        graphConfig,
        setClientId,
        setTenantId,
        setScopes,
        setGraphMeEndpoint,
      }}
    >
      <div className="flex flex-col flex-1 gap-4">
        <MsalConfigSetup />
        {allowedToLogin && children}
      </div>
    </MsalConfigContext.Provider>
  );
};

export const useMsalConfig = (): MsalConfigContextProps => {
  const context = useContext(MsalConfigContext);
  if (!context) {
    throw new Error("useMsal must be used within a MsalProvider");
  }

  const [token, setToken] = useState<{
    accessToken: string;
    idToken: string;
    refresh: string;
  }>({ accessToken: "", idToken: "", refresh: "" });

  useEffect(() => {
    getToken(context).then((token) => {
      if (token) {
        setToken(token);
      }
    });
  }, [context]);

  context.token = token;
  return context;
};

export default MsalConfigProvider;
