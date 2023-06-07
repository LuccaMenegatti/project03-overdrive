import TableLayout from "./components/Table/DataTable";
import { CompanyContextProvider } from "./context/CompanyContext";
import { useAxios } from "../../hooks/useAxios";


const Company = () => {
    const { data } = useAxios("Company");
    return (
        <section>
            <CompanyContextProvider>
                <TableLayout />
            </CompanyContextProvider>
        </section>
    );
};

export default Company;
