import { Tag } from "primereact/tag";

export const useMask = () => {
  
    //Mascaras
    const maskCnpj = (cnpj) => {
        if (cnpj) {
            return cnpj.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5"
            );
        }
    };

    const maskCpf = (cpf) => {
        if (cpf) {
            return cpf.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3/$4"
            );
        }
    };
    

    const maskCnae = (cnae) => {
        if(cnae){
            return cnae.replace(
            /^(\d{4})(\d{1})(\d{2})/,
            "$1-$2/$3"
            );
        }
    };

    const maskCep = (cep) => {
        if(cep) {
            return cep.replace(
            /^(\d{5})(\d{3})/,
            "$1-$2"
            );
        }
    };

    const maskContact = (contact) => {
        if(contact){
            return contact.replace(
            /^(\d{2})(\d{5})(\d{4})/,
            "($1)$2-$3"
            );
        }
    };

    const maskDate = (date) => {
        if (date && typeof date == "string") {
            return date.split("T")[0].split("-").reverse().join("/");
        }
    };

    const maskStatus = (company) => {
        switch (company.status) {
            case 'Active':
                return 'success';

            case 'Pending':
                return 'warning';

            case 'Inactive':
                return 'danger';

            default:
                return null;
        }
    };

    const maskFinance = (value) => {
        if(value){
            return value.toLocaleString('pt-RS', { style: 'currency', currency: 'BRL' });
        }
    };

    //Templates
    const cnpjBodyTemplate = (rowData) => {
        return maskCnpj(rowData.cnpj);
    };

    const cpfBodyTemplate = (rowData) => {
        return maskCpf(rowData.cpf);
    };

    const cnaeBodyTemplate = (rowData) => {
        return maskCnae(rowData.cnae);
    };

    const dateBodyTemplate = (rowData) => {
        return maskDate(rowData.startDate);
    };

    const priceBodyTemplate = (rowData) => {
        return maskFinance(rowData.finance);
    };

    const contactBodyTemplate = (rowData) => {
        return maskContact(rowData.numberContact);
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={maskStatus(rowData)}></Tag>;
    };

 

  return {
    maskCnpj,
    maskCpf,
    maskCnae,
    maskCep,
    maskContact,
    maskDate,
    maskStatus,
    maskFinance,
    cnpjBodyTemplate,
    cpfBodyTemplate,
    cnaeBodyTemplate,
    contactBodyTemplate,
    dateBodyTemplate,
    priceBodyTemplate,
    statusBodyTemplate,
  };
};