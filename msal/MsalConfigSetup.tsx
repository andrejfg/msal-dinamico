"use client"

import React, { useState } from "react";
import { useMsalConfig } from "./MsalConfigProvider";

const MsalConfigSetup: React.FC = () => {
  const { setClientId, setTenantId, setScopes, config } = useMsalConfig();
  const [localClientId, setLocalClientId] = useState(config.clientId||"");
  const [localTenantId, setLocalTenantId] = useState(config.tenantId||"");
  const [localScopes, setLocalScopes] = useState(config.scopes.join(","));

  const handleSave = () => {
    setClientId(localClientId);
    setTenantId(localTenantId);
    const scopesAux = localScopes.split(",").map(items=> items.trim()).filter(item=> item.length !==0)
    setScopes(scopesAux);

    localStorage.setItem("clientId", localClientId);
    localStorage.setItem("tenantId", localTenantId);
    localStorage.setItem("scopes", scopesAux.join(","));
  };

  return (
    <div className="flex flex-col p-4 border rounded shadow-md w-96">
      <h2 className="text-lg font-bold mb-2">Configuração Microsoft</h2>
      <div>

      <span>Para esta aplicação funcionar, o redirect URI desta página (</span>
      <span className="font-bold">{window.location.origin}</span>
      <span>) deve ser incluído na aplicação da Azure.</span>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Client ID</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={localClientId}
          onChange={(e) => setLocalClientId(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Tenant ID</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={localTenantId}
          onChange={(e) => setLocalTenantId(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Scopes (separados por vírgula)</label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={localScopes}
          onChange={(e) =>setLocalScopes(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleSave}
      >
        Salvar Configuração
      </button>
    </div>
  );
};

export default MsalConfigSetup;
