import { createContext, useState } from "react";

export const PeopleContext = createContext();

export const PeopleContextProvider = ({ children }) => {

    let emptyPeople = {
        name: null,
        cpf: null,
        numberContact: null,
        userName: null, 
        idCompany: null, 
        company: null,
    };

    const [people, setPeople] = useState(emptyPeople);
    const [peoples, setPeoples] = useState([]);

    const statesTable = {
        emptyPeople,
        people,
        setPeople,
        peoples,
        setPeoples,
    };

    return (
        <PeopleContext.Provider value={statesTable}>
        {children}
        </PeopleContext.Provider>
    );
};