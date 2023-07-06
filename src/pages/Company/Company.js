import TableLayout from "./components/Table/DataTable";
import { CompanyContextProvider } from "./context/CompanyContext";

const Company = () => {
    return (
        <section>
            <CompanyContextProvider>
                <TableLayout />
            </CompanyContextProvider>
        </section>
    );
};

export default Company;
