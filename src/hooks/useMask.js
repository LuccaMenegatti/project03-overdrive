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

    const maskName = (name) => {
        if (!name) return;
        if (name.length > 15) {
          const nomesimplificado = name.slice(0, 15);
          return `${nomesimplificado}...`;
        }
        return name;
    };

    const maskUserName = (userName) => {
        if (!userName) return;
        if (userName.length > 15) {
          const nomesimplificado = userName.slice(0, 15);
          return `${nomesimplificado}...`;
        }
        return userName;
    };

    const maskCompanyName = (fullName) => {
        if (!fullName) return;
        if (fullName.length > 15) {
          const nomesimplificado = fullName.slice(0, 15);
          return `${nomesimplificado}...`;
        }
        return fullName;
    };

    const maskEmptyData = (data) => {
        if (data) return data;
        return 'Sem dados';
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

    const companyStatusBodyTemplate = (rowData) => {
        if(rowData.idCompany !== null){
            return rowData.company.companyName;
        } else {
            return '';
        }       
    };

    const companyNameBodyTemplate = (rowData) => {
        return maskEmptyData(maskCompanyName(rowData.companyName));
      };

    const nameBodyTemplate = (rowData) => {
        return maskName(rowData.name);
    };

    const userNameBodyTemplate = (rowData) => {
        return maskUserName(rowData.userName);
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
    maskName,
    maskUserName,
    maskCompanyName,
    maskEmptyData,
    cnpjBodyTemplate,
    cpfBodyTemplate,
    cnaeBodyTemplate,
    contactBodyTemplate,
    dateBodyTemplate,
    priceBodyTemplate,
    statusBodyTemplate,
    companyStatusBodyTemplate,
    companyNameBodyTemplate,
    nameBodyTemplate,
    userNameBodyTemplate,
  };
};