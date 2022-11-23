import { createContext, useContext } from "react";

export const TenantContext = createContext();

export const useTenantContext = () => useContext(TenantContext);

export default TenantContext;
