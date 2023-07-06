import TableLayoutPeople from "./components/Table";
import { PeopleContextProvider } from "./context/PeopleContext";

const People = () => {
    return (
        <section>
            <PeopleContextProvider>
                <TableLayoutPeople />
            </PeopleContextProvider>
        </section>
    );
};

export default People;