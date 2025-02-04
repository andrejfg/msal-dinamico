'use client'
import { handleLogout } from "@/msal/msal";
import { useMsalConfig } from "@/msal/MsalConfigProvider";

const SignOutButton = ({ className = "fancybtn", text = "Logout" }) => {
  const { msalInstance } = useMsalConfig();
  return (
    <button type="button" className={className} onClick={() => handleLogout(msalInstance!,"redirect")}>
      {text}
    </button>
  );
};
export {SignOutButton};