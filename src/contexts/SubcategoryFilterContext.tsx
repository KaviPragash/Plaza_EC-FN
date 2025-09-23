"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface SubcategoryFilterContextType {
  selectedSubcategory: string | null;
  selectedSubcategoryCode: string | null;
  setFilter: (subcategoryName: string, subcategoryCode: string) => void;
  clearFilter: () => void;
}

const SubcategoryFilterContext = createContext<SubcategoryFilterContextType | undefined>(undefined);

interface SubcategoryFilterProviderProps {
  children: ReactNode;
}

export function SubcategoryFilterProvider({ children }: SubcategoryFilterProviderProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedSubcategoryCode, setSelectedSubcategoryCode] = useState<string | null>(null);

  const setFilter = (subcategoryName: string, subcategoryCode: string) => {
    setSelectedSubcategory(subcategoryName);
    setSelectedSubcategoryCode(subcategoryCode);
    
    // Scroll to products section
    setTimeout(() => {
      document.getElementById("products-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const clearFilter = () => {
    setSelectedSubcategory(null);
    setSelectedSubcategoryCode(null);
  };

  return (
    <SubcategoryFilterContext.Provider 
      value={{
        selectedSubcategory,
        selectedSubcategoryCode,
        setFilter,
        clearFilter
      }}
    >
      {children}
    </SubcategoryFilterContext.Provider>
  );
}

export function useSubcategoryFilter() {
  const context = useContext(SubcategoryFilterContext);
  if (context === undefined) {
    throw new Error('useSubcategoryFilter must be used within a SubcategoryFilterProvider');
  }
  return context;
}