
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import "primeicons/primeicons.css";
import { useAxios } from '../../../../hooks/useAxios';
import CreateCompanyDialog from '../CreateCompany';
import { useContext } from "react";
import { CompanyContext } from "../../context/CompanyContext";
import TextData from "../../../../components/TextData";
import { Avatar } from "primereact/avatar";

import {
    Container, 
    ViewData,
    Address,
    Person,
    PersonData,
    PersonContainer,
  } from "./style";

export default function TableLayout() {
    let emptyCompany = {
        id: null,
        cnpj: "",
        status: "",
        startDate: null,
        companyName: "",
        fantasyName: "",
        cnae: "",
        legalNature: "",
        finance: null,
        address: {
          cep: "",
          street: "",
          district: "",
          number: null,
          city: "",
          contact: "",
        },
    };

    const {
        data, 
        peopleList,
        companyCnpj, 
        companyAddress,
        GetCompany, 
        DeleteCompany, 
        SearchPeopleInCompany, 
        SearchCnpj
    } = useAxios();

    const {companyDialog, setCompanyDialog} = useContext(CompanyContext);

    const [company, setCompany] = useState(emptyCompany);
    const [companies, setCompanies] = useState(data);
    const [peopleInCompany, setPeopleInCompany] = useState(peopleList);
    const [companyPorCnpj, setCompanyPorCnpj] = useState(companyCnpj);
    const [companyPorCnpjAddress, setCompanyPorCnpjAddress] = useState(companyAddress);
    const [deleteCompanyDialog, setDeleteCompanyDialog] = useState(false);
    const [searchPeopleInCompanyDialog, setSearchPeopleInCompanyDialog] = useState(false);
    const [deleteCompaniesDialog, setDeleteCompaniesDialog] = useState(false);
    const [selectedCompanies, setSelectedCompanies] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        GetCompany("Company/SearchCompany");
    }, [data]);

    const openNew = () => {
        setCompany(emptyCompany);
        setSubmitted(false);
        setCompanyDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCompanyDialog(false);
    };

    const hideDeleteCompanyDialog = () => {
        setDeleteCompanyDialog(false);
    };

    const hideSearchPeopleInCompany = () => {
        setSearchPeopleInCompanyDialog(false);
    }

    const saveCompany = () => {
        setSubmitted(true);

        if (company.companyName.trim()) {
            let _companies = [...companies];
            let _company = { ...company };

            if (company.id) {
                const index = findIndexById(company.id);

                _companies[index] = _company;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _company.id = createId();
                _company.image = 'product-placeholder.svg';
                _companies.push(_company);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setCompanies(_companies);
            setCompanyDialog(false);
            setCompany(emptyCompany);
        }
    };

    const editCompany = (company) => {
        setCompany({ ...company });
        setCompanyDialog(true);
    };

    const confirmDeleteCompany = (company) => {
        setCompany(company);
        setDeleteCompanyDialog(true);
    };

    const searchPeople = (company) => {
        setCompany(company);

        SearchPeopleInCompany("Company/SearchPeopleInCompany", company.id);
        SearchCnpj("Company/SearchCompanyByCnpj", company.cnpj)
        setPeopleInCompany(peopleList);
        setCompanyPorCnpj(companyCnpj);
        setCompanyPorCnpjAddress(companyAddress);

        
        setSearchPeopleInCompanyDialog(true);
       
    };

    const deleteCompany = () => {
            DeleteCompany("Company/DeleteCompany", company.id);
            GetCompany("Company/SearchCompany");       
            setCompanies(data);
        
            setDeleteCompanyDialog(false);
            setCompany(emptyCompany);
        
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Product Deleted",
              life: 3000,
            });
    };

    const findIndexById = (id) => {
         let index = -1;

         for (let i = 0; i < companies.length; i++) {
             if (companies[i].id === id) {
                 index = i;
                 break;
             }
         }

         return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const onCategoryChange = (e) => {
        let _company = { ...company };

        _company['category'] = e.value;
        setCompany(_company);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _company = { ...company };

        _company[`${name}`] = val;

        setCompany(_company);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _company = { ...company };

        _company[`${name}`] = val;

        setCompany(_company);
    }; 

    const actionBodyTemplate = (rowData) => {
        return (
            <Container>

                <Button
                    icon="pi pi-users"
                    rounded
                    outlined
                    severity="warning"
                    onClick={() => searchPeople(rowData)}
                />

                <Button 
                    icon="pi pi-pencil" 
                    rounded outlined 
                    className="mr-2" 
                    onClick={() => editCompany(rowData)} 
                />

                <Button 
                    icon="pi pi-trash" 
                    rounded outlined severity="danger" 
                    onClick={() => confirmDeleteCompany(rowData)} 
                />

            </Container>
        );
    };

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
        if(date){
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

    const cnaeBodyTemplate = (rowData) => {
        return maskCnae(rowData.cnae);
    };

    const dateBodyTemplate = (rowData) => {
        return maskDate(rowData.startDate);
    };

    const priceBodyTemplate = (rowData) => {
        return maskFinance(rowData.finance);
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={maskStatus(rowData)}></Tag>;
    };


    //header
     const header = (
         <Container>
             <span className="p-input-icon-left">
                 <i className="pi pi-search" />
                 <InputText 
                    type="search" 
                    onInput={(e) => setGlobalFilter(e.target.value)} 
                    placeholder="Pesquisar..." 
                 />
             </span>

            <Button
                label="Criar Empresa"
                icon="pi pi-plus"
                severity="success"
                onClick={openNew}
            />
         </Container>
         
     );

    const companyDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Cadastrar" icon="pi pi-check" onClick={saveCompany} />
        </React.Fragment>
    );

    const deleteCompanyDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" outlined onClick={hideDeleteCompanyDialog} />
            <Button label="Sim" icon="pi pi-check" severity="danger" onClick={deleteCompany} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">

                <DataTable 
                    ref={dt} 
                    value={data} 
                    dataKey="id"  
                    paginator rows={10} 
                    header={header}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" 
                    globalFilter={globalFilter}>

                    <Column field="id" header="Id" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="companyName" header="Nome" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="cnpj" header="Cnpj" body={cnpjBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="cnae" header="Cnae" body={cnaeBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="finance" header="Finanças" body={priceBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="startDate" header="Fundação" body={dateBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <CreateCompanyDialog visible={companyDialog} />

            <Dialog 
                visible={deleteCompanyDialog} 
                style={{ width: '32rem' }} 
                breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                header="Confirmação de exclusão" 
                modal 
                footer={deleteCompanyDialogFooter} 
                onHide={hideDeleteCompanyDialog}>

                <div className="confirmation-content">
                    {company && (
                        <span>
                            Tem certeza? Essa ação não da pra ser desfeita
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog 
                visible={searchPeopleInCompanyDialog} 
                onHide={hideSearchPeopleInCompany}
                style={{ width: '32rem' }} 
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}>

                    <TabView>
                        <TabPanel header="Empresa">
                        <ViewData>
                            <TextData
                                data={companyCnpj.companyName}
                                name="Nome da empresa"
                                className="companyName"
                            />
                            <TextData
                                data={companyCnpj.fantasyName}
                                name="Nome Fantasia"
                                className="fantasyName"
                            />
                            <TextData
                                data={companyCnpj.status}
                                name="Status"
                                className="status"
                            />

                            <TextData
                                data={maskCnpj(companyCnpj.cnpj)}
                                name="CNPJ"
                                className="cnpj"
                            />

                            <TextData 
                                data={maskCnae(companyCnpj.cnae)} 
                                name="CNAE" 
                                className="cnae"
                            />

                            <TextData
                                data={companyCnpj.legalNature}
                                name="Natureza Legal"
                                className="legalNature"
                            />

                            <TextData
                                data={maskDate(companyCnpj.startDate)}
                                name="Data de Abertura"
                                className="startDate"
                            />
                            <TextData
                                data={maskFinance(companyCnpj.finance)}
                                name="Capital Financeiro"
                                className="finance"
                            />
                            </ViewData>
                        </TabPanel>

                        <TabPanel header="Endereço">
                            <Address>
                                <TextData data={maskCep(companyAddress.cep)} 
                                    name="Cep" 
                                    className="cep" 
                                />
                                <TextData
                                    data={companyAddress.street}
                                    name="Rua"
                                    className="street"
                                />
                                <TextData
                                    data={companyAddress.number}
                                    name="Numero"
                                    className="number"
                                />
                                <TextData
                                    data={companyAddress.district}
                                    name="Bairro"
                                    className="district"
                                />

                                <TextData
                                    data={companyAddress.city}
                                    name="Cidade"
                                    className="city"
                                />

                                <TextData
                                    data={maskContact(companyAddress.contact)}
                                    name="Contato"
                                    className="contact"
                                />
                            </Address> 
                        </TabPanel>

                        <TabPanel header="Funcionarios">
                            <PersonContainer>
                                {peopleList.map((people) => 
                                    <Person>
                                    <Avatar icon="pi pi-user" shape="circle" />
                                    <div>
                                        <PersonData>
                                        <li>{people.name}</li>
                                        <li>Cpf: {maskCpf(people.cpf)}</li>
                                        </PersonData>
                                    </div>
                                    </Person>
                                )}
                            </PersonContainer>
                        </TabPanel>
                    
                    </TabView>          
            </Dialog>

            {/* <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog> */}
        </div>
    );
}
         