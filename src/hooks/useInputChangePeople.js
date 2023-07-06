import { useContext } from "react";
import { PeopleContext } from "../pages/People/context/PeopleContext";

export const useInputChangePeople = () => {
  const { people, setPeople } = useContext(PeopleContext);

  const onInputChangePeople = (e, name) => {
    let val = (e.target && e.target.value) || "";

    if (name === "userName"){
      val = val.replace(/\s/g, "");
    }

    let _people = { ...people };

    _people[`${name}`] = val;

    setPeople(_people);
  };

  return {
    onInputChangePeople,
  };
};