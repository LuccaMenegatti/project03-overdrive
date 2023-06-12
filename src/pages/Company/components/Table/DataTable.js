
import React, { useState, useEffect, useRef, useContext } from 'react';

import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import { Calendar } from "primereact/calendar";
import { InputText } from 'primereact/inputtext';
import { InputMask } from "primereact/inputmask";
import { Tag } from 'primereact/tag';
import "primeicons/primeicons.css";

import { useAxios } from '../../../../hooks/useAxios';
import TextData from "../../../../components/TextData";

import {
    Container, 
    District,
    Cnae,
    Cep,
    City,
    Cnpj,
    StartDate,
    Contact,
    Finance,
    CompanyName,
    LegalNature,
    Address,
    Number,
    Street,
    Company,
    ViewData,
    AddressView,
    Person,
    PersonData,
    PersonContainer,
  } from "./style";

  import { useAddress } from "../../../../hooks/useAddress";

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
        GetAxios, 
        CreateCompany,
        PutCompany,
        DeleteAxios, 
        SearchPeopleInCompany, 
        SearchCnpj
    } = useAxios();

    const [company, setCompany] = useState(emptyCompany);
    const [companies, setCompanies] = useState(data);
    const { address, getAddress } = useAddress();
    const [createCompanyDialog, setCreateCompanyDialog] = useState(false);
    const [peopleInCompany, setPeopleInCompany] = useState(peopleList);
    const [companyPorCnpj, setCompanyPorCnpj] = useState(companyCnpj);
    const [companyPorCnpjAddress, setCompanyPorCnpjAddress] = useState(companyAddress);
    const [deleteCompanyDialog, setDeleteCompanyDialog] = useState(false);
    const [searchPeopleInCompanyDialog, setSearchPeopleInCompanyDialog] = useState(false);
    const [editCompanyDialog, setEditCompanyDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        GetAxios("Company/SearchCompany");
    }, [data]);

    const openNew = () => {
        setCompany(emptyCompany);
        setSubmitted(false);
        setCreateCompanyDialog(true);
    };

    const hideCreateCompanyDialog = () => {
        setSubmitted(false);
        setCreateCompanyDialog(false);
    };

    const hideDeleteCompanyDialog = () => {
        setDeleteCompanyDialog(false);
    };

    const hideSearchPeopleInCompany = () => {
        setSearchPeopleInCompanyDialog(false);
    }

    const hideEditCompanyDialog = () => {
        setEditCompanyDialog(false);
    } 

    const saveCompany = () => {
        setSubmitted(true);
        let _company = company;
    
        if (_company.cnpj.length === 14 && _company.cnae.length === 7) {
            CreateCompany("Company", company);
            setCreateCompanyDialog(false);
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Empresa Cadastrada', life: 3000 });
        } 
    };
    
    const updateCompany = (company) => {
        // setSubmitted(true);
        // let _company = company;
        // PutCompany("Company/UpdateCompany", company);
        // setEditCompanyDialog(false);
      };

    const editCompany = (company) => {
        setCompany({ ...company });
        setEditCompanyDialog(true);
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
            DeleteAxios("Company/DeleteCompany", company.id);
            GetAxios("Company/SearchCompany");       
            setCompanies(data);
        
            setDeleteCompanyDialog(false);
            setCompany(emptyCompany);
        
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Empresa Deletada",
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

    const onInputAddressChange = (e, name) => {
        const value = e.target.value || "";
        let _company = { ...company };
        let _address = { ...company.address };
    
        if (name.includes("cep")) {
          getAddress(value);
          _address[`street`] = address.logradouro;
          _address[`district`] = address.bairro;
          _address[`city`] = address.localidade;
    
          _company["address"] = _address;
          setCompany(_company);
        }
        _address[`${name}`] = value;
        _company["address"] = _address;
        setCompany(_company);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Container>

                <Button
                    icon="pi pi-bars"
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
                label="Cadastrar Empresa"
                icon="pi pi-plus"
                severity="success"
                onClick={openNew}
            />
         </Container>
         
     );

    const createCompanyDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideCreateCompanyDialog} />
            <Button label="Cadastrar" icon="pi pi-check" onClick={saveCompany} />
        </React.Fragment>
    );

    const deleteCompanyDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" outlined onClick={hideDeleteCompanyDialog} />
            <Button label="Sim" icon="pi pi-check" severity="danger" onClick={deleteCompany} />
        </React.Fragment>
    );

    const editCompanyDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideEditCompanyDialog} />
            <Button label="Salvar" icon="pi pi-check" outlined onClick={updateCompany} />
        </React.Fragment>
    );

    return (
        <React.Fragment>
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
                        currentPageReportTemplate=" {first} a {last} " 
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

                {/* create dialog */}
                <Dialog
                    visible={createCompanyDialog}
                    style={{ width: "40rem" }}
                    breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                    header="Cadastro de Empresas"
                    modal
                    className="p-fluid"
                    footer={createCompanyDialogFooter}
                    onHide={hideCreateCompanyDialog}>

                    <Company>
                    {/* companyName */}
                    <CompanyName className="companyName">
                        <span className="p-float-label">
                        <InputText
                            id="companyName"
                            value={company.companyName}
                            onChange={(e) => onInputChange(e, "companyName")}
                            autoFocus
                        />
                        <label htmlFor="companyName">Nome da Empresa</label>
                        </span>
                    </CompanyName>

                    {/* fantasyName */}
                    <CompanyName className="fantasyName">
                        <span className="p-float-label">
                        <InputText
                            id="fantasyName"
                            value={company.fantasyName}
                            onChange={(e) => onInputChange(e, "fantasyName")}
                        />
                        <label htmlFor="fantasyName">Nome Fantasia</label>
                        </span>
                    </CompanyName>

                    {/* startDate */}
                    <StartDate className="startDate">
                        <span className="p-float-label">
                        <Calendar
                            id="startDate"
                            onChange={(e) => onInputChange(e, "startDate")}
                            value={company.startDate}
                            dateFormat="dd/mm/yy"
                            showIcon
                        />
                        <label htmlFor="startDate">Fundação</label>
                        </span>
                    </StartDate>

                    {/* cnpj */}
                    <Cnpj>
                        <span className="p-float-label">
                        <InputMask
                            id="cnpj"
                            mask="99.999.999/9999-99"
                            unmask={true}
                            onChange={(e) => onInputChange(e, "cnpj")}
                            required
                        />
                        <label htmlFor="cnpj"> Cnpj </label>
                        </span>
                    </Cnpj>

                    {/* cnae */}
                    <Cnae className="field">
                        <span className="p-float-label">
                        <InputMask
                            id="cnae"
                            mask="9999-9/99"
                            unmask={true}
                            onChange={(e) => onInputChange(e, "cnae")}
                            // value={company.cnae}
                            required
                            className={classNames({
                            "p-invalid":
                                submitted &&
                                !company.cnae &&
                                (submitted && company.cnae.length) < 7,
                            })}
                        />
                        <label htmlFor="cnae">Cnae</label>
                        </span>
                        {submitted && !company.cnae && (
                        <small className="p-error">CNAE é obrigatório.</small>
                        )}
                        {submitted && company.cnae.length < 7 && (
                        <small className="p-error">Minimo de 7 caracteres.</small>
                        )}
                    </Cnae>

                    {/* legalNature */}
                    <LegalNature className="field">
                        <span className="p-float-label">
                        <InputText
                            id="legalNature"
                            value={company.legalNature}
                            onChange={(e) => onInputChange(e, "legalNature")}
                            // autoFocus
                        />
                        <label htmlFor="legalNature">Natureza Juridica</label>
                        </span>
                    </LegalNature>

                    {/* finance */}
                    <Finance className="field col">
                        <span className="p-float-label">
                        <InputNumber
                            id="finance"
                            // value={company.finance}
                            onValueChange={(e) => onInputNumberChange(e, "finance")}
                            mode="currency"
                            currency="BRL"
                            locale="pt-RS"
                        />
                        <label htmlFor="finance">Capital Financeiro</label>
                        </span>
                    </Finance>
                    </Company>

                    <Address>
                    <legend>Endereço</legend>
                    {/* cep */}

                    <Cep className="field">
                        <span className="p-float-label">
                        <InputMask
                            id="companyName"
                            mask="99999-999"
                            unmask={true}
                            value={company.address.cep}
                            onChange={(e) => onInputAddressChange(e, "cep")}
                        />
                        <label htmlFor="cep">Cep</label>
                        </span>
                    </Cep>

                    {/* street */}
                    <Street className="field">
                        <span className="p-float-label">
                        <InputText
                            id="street"
                            value={company.address.street}
                            onChange={(e) => onInputAddressChange(e, "street")}
                        />

                        <label htmlFor="street">Rua</label>
                        </span>
                    </Street>

                    <Number className="field col">
                        <span className="p-float-label">
                        <InputNumber
                            id="number"
                            onValueChange={(e) => onInputAddressChange(e, "number")}
                        />
                        <label htmlFor="number">Numero</label>
                        </span>
                    </Number>

                    {/* district */}
                    <District className="field">
                        <span className="p-float-label">
                        <InputText
                            id="district"
                            value={company.address.district}
                            onChange={(e) => onInputAddressChange(e, "district")}
                        />
                        <label htmlFor="district">Bairro</label>
                        </span>
                    </District>

                    <City className="field">
                        <span className="p-float-label">
                        <InputText
                            id="city"
                            value={company.address.city}
                            onChange={(e) => onInputAddressChange(e, "city")}
                        />
                        <label htmlFor="city">Cidade</label>
                        </span>
                    </City>

                    {/* contact */}
                    <Contact className="field">
                        <span className="p-float-label">
                        <InputMask
                            id="contact"
                            mask="(99)99999-9999"
                            unmask={true}
                            value={company.address.contact}
                            onChange={(e) => onInputAddressChange(e, "contact")}
                        />
                        <label htmlFor="contact">Numero para Contato</label>
                        </span>
                    </Contact>
                    </Address>
                </Dialog>

                {/* info dialog */}
                <Dialog 
                    visible={searchPeopleInCompanyDialog} 
                    onHide={hideSearchPeopleInCompany}
                    style={{ width: '32rem' }} 
                    header="Informações da Empresa"
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
                                <AddressView>
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
                                </AddressView> 
                            </TabPanel>

                            {peopleList.length === 0 ? (
                                <TabPanel header="Funcionarios">
                                    <p>Essa empresa ainda não possui funcionarios!</p>
                                </TabPanel>
                            ) : (
                                <TabPanel header="Funcionarios">
                                    <PersonContainer>
                                        {peopleList.map((people) => 
                                            <Person>
                                            <div>
                                                <PersonData>
                                                <li>- {people.name}</li>
                                                <li>Cpf: {maskCpf(people.cpf)}</li>
                                                </PersonData>
                                            </div>
                                            </Person>
                                        )}
                                    </PersonContainer>
                                </TabPanel>
                                )}        
                        </TabView>          
                </Dialog>

                <Dialog
                    visible={editCompanyDialog} 
                    style={{ width: "40rem" }}
                    breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                    header="Edição da empresa" 
                    modal 
                    className="p-fluid"
                    footer={editCompanyDialogFooter} 
                    onHide={hideEditCompanyDialog}>

                    <Company>
                        {/* companyName */}
                        <CompanyName className="companyName">
                            <span className="p-float-label">
                            <InputText
                                id="companyName"
                                value={company.companyName}
                                onChange={(e) => onInputChange(e, "companyName")}
                                autoFocus
                            />
                            <label htmlFor="companyName">Nome da Empresa</label>
                            </span>
                        </CompanyName>

                        {/* fantasyName */}
                        <CompanyName className="fantasyName">
                            <span className="p-float-label">
                            <InputText
                                id="fantasyName"
                                value={company.fantasyName}
                                onChange={(e) => onInputChange(e, "fantasyName")}
                            />
                            <label htmlFor="fantasyName">Nome Fantasia</label>
                            </span>
                        </CompanyName>

                        {/* startDate */}
                        <StartDate className="startDate">
                            <span className="p-float-label">
                            <Calendar
                                id="startDate"
                                onChange={(e) => onInputChange(e, "startDate")}
                                value={company.startDate}
                                dateFormat="dd/mm/yy"
                                showIcon
                            />
                            <label htmlFor="startDate">Fundação</label>
                            </span>
                        </StartDate>

                        {/* cnae */}
                        <Cnae className="field">
                            <span className="p-float-label">
                            <InputMask
                                id="cnae"
                                mask="9999-9/99"
                                unmask={true}
                                onChange={(e) => onInputChange(e, "cnae")}
                                // value={company.cnae}
                                required
                                className={classNames({
                                "p-invalid":
                                    submitted &&
                                    !company.cnae &&
                                    (submitted && company.cnae.length) < 7,
                                })}
                            />
                            <label htmlFor="cnae">Cnae</label>
                            </span>
                            {submitted && !company.cnae && (
                            <small className="p-error">CNAE é obrigatório.</small>
                            )}
                            {submitted && company.cnae.length < 7 && (
                            <small className="p-error">Minimo de 7 caracteres.</small>
                            )}
                        </Cnae>

                        {/* legalNature */}
                        <LegalNature className="field">
                            <span className="p-float-label">
                            <InputText
                                id="legalNature"
                                value={company.legalNature}
                                onChange={(e) => onInputChange(e, "legalNature")}
                                // autoFocus
                            />
                            <label htmlFor="legalNature">Natureza Juridica</label>
                            </span>
                        </LegalNature>

                        {/* finance */}
                        <Finance className="field col">
                            <span className="p-float-label">
                            <InputNumber
                                id="finance"
                                // value={company.finance}
                                onValueChange={(e) => onInputNumberChange(e, "finance")}
                                mode="currency"
                                currency="BRL"
                                locale="pt-RS"
                            />
                            <label htmlFor="finance">Capital Financeiro</label>
                            </span>
                        </Finance>
                    </Company>

                    <Address>
                        <legend>Endereço</legend>
                        {/* cep */}

                        <Cep className="field">
                            <span className="p-float-label">
                            <InputMask
                                id="companyName"
                                mask="99999-999"
                                unmask={true}
                                value={company.address.cep}
                                onChange={(e) => onInputAddressChange(e, "cep")}
                            />
                            <label htmlFor="cep">Cep</label>
                            </span>
                        </Cep>

                        {/* street */}
                        <Street className="field">
                            <span className="p-float-label">
                            <InputText
                                id="street"
                                value={company.address.street}
                                onChange={(e) => onInputAddressChange(e, "street")}
                            />

                            <label htmlFor="street">Rua</label>
                            </span>
                        </Street>

                        <Number className="field col">
                            <span className="p-float-label">
                            <InputNumber
                                id="number"
                                onValueChange={(e) => onInputAddressChange(e, "number")}
                            />
                            <label htmlFor="number">Numero</label>
                            </span>
                        </Number>

                        {/* district */}
                        <District className="field">
                            <span className="p-float-label">
                            <InputText
                                id="district"
                                value={company.address.district}
                                onChange={(e) => onInputAddressChange(e, "district")}
                            />
                            <label htmlFor="district">Bairro</label>
                            </span>
                        </District>

                        <City className="field">
                            <span className="p-float-label">
                            <InputText
                                id="city"
                                value={company.address.city}
                                onChange={(e) => onInputAddressChange(e, "city")}
                            />
                            <label htmlFor="city">Cidade</label>
                            </span>
                        </City>

                        {/* contact */}
                        <Contact className="field">
                            <span className="p-float-label">
                            <InputMask
                                id="contact"
                                mask="(99)99999-9999"
                                unmask={true}
                                value={company.address.contact}
                                onChange={(e) => onInputAddressChange(e, "contact")}
                            />
                            <label htmlFor="contact">Numero para Contato</label>
                            </span>
                        </Contact>
                    </Address>

                </Dialog>

                {/* delete dialog */}
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
                                 <p>Tem certeza que deseja excluir a Empresa "{company.companyName}"? </p>
                                <p>Essa ação não da pra ser desfeita. </p>
                            </span>
                        )}
                    </div>
                </Dialog>
            </div>
        </React.Fragment>
    );
}
         