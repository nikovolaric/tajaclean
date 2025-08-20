"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type StatsType = {
  days: number;
  sales: boolean;
  orders: boolean;
  average: boolean;
  start_date?: Date;
  end_date?: Date;
};

type StatsContextType = {
  stats: StatsType;
  setStats: (stats: StatsType) => void;
};

const defaultStats: StatsType = {
  days: 30,
  sales: true,
  orders: false,
  average: false,
};

export const StatsContext = createContext<StatsContextType | undefined>(
  undefined,
);

export function useStatsContext() {
  const context = useContext(StatsContext);
  if (!context)
    throw new Error("useStatsContext must be used within a ContextProvider");
  return context;
}

function StatsContextProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<StatsType>(defaultStats);

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export default StatsContextProvider;
