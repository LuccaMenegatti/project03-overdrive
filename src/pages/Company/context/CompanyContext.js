import { createContext, useState } from "react";

export const CompanyContext = createContext();

export const CompanyContextProvider = ({ children }) => {
    let emptyCompany = {
        cnpj: null,
        startDate: null,
        companyName: null,
        fantasyName: null,
        cnae: null,
        legalNature: null,
        finance: null,
        address: {
          cep: null,
          street: null,
          district: null,
          number: null,
          city: null,
          contact: null,
        },
    };


  const [company, setCompany] = useState(emptyCompany);

  const statesTable = {
    emptyCompany,
    company,
    setCompany,
  };

  return (
    <CompanyContext.Provider value={statesTable}>
      {children}
    </CompanyContext.Provider>
  );
};