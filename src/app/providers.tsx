"use client";

import { RepositoryProvider } from "@/contexts";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <RepositoryProvider>{children}</RepositoryProvider>;
};

export default Providers;
