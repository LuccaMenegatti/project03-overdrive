
import React, { useState, useEffect, useRef, useContext } from 'react';

import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from "primereact/calendar";
import { InputText } from 'primereact/inputtext';
import { InputMask } from "primereact/inputmask";
import { Tag } from 'primereact/tag';
import "primeicons/primeicons.css";

import { useAxios } from '../../../../hooks/useAxios';
import TextData from "../../../../components/TextData";

import {
    Container, 
    ViewData,
    CompanyView,
    People,
    PeopleName,
    Cpf,
    NumberContact,
    Company, 
  } from "./style";

  import { useAddress } from "../../../../hooks/useAddress";

export default function TableLayoutPeople() {
    let emptyPeople = {
            id: null,
            name: null,
            cpf: null,
            numberContact: null,
            userName: null,
            status: null,
            idCompany: null,
            company: {
                id: null,
                cnpj: null,
                status: null,
                startDate: null,
                companyName: null,
                fantasyName: null,
                cnae: null,
                legalNature: null,
                idAddress: null,
                finance: null,
                address: {
                    id: null,
                    cep: null,
                    street: null,
                    district: null,
                    number: null,
                    city: null,
                    contact: null
                },
                peoples: [
                    null
                ],
            },
    };

    const {
        data, 
        peopleList,
        companyCnpj, 
        companyAddress,
        GetAxios, 
        PutCompany,
        CreatePeople,
        DeleteAxios,  
        SearchCnpj
    } = useAxios();

    const [people, setPeople] = useState(emptyPeople);
    const [peoples, setPeoples] = useState(data);
    const [listCompany, setListCompany] = useState([]);
    const { address, getAddress } = useAddress();
    const [peopleInCompany, setPeopleInCompany] = useState(peopleList);
    const [companyPorCnpj, setCompanyPorCnpj] = useState(companyCnpj);
    const [companyPorCnpjAddress, setCompanyPorCnpjAddress] = useState(companyAddress);
    const [createPeopleDialog, setCreatePeopleDialog] = useState(false);
    const [deletePeopleDialog, setDeletePeopleDialog] = useState(false);
    const [MoreInformationDialog, setMoreInformationDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        GetAxios("People/SearchPeople");
    }, [data]);

    const openNew = () => {
        setPeople(emptyPeople);
        setSubmitted(false);
        setCreatePeopleDialog(true);
    };

    // const hideDialog = () => {
    //     setSubmitted(false);
    // };

    const hideDeletePeopleDialog = () => {
        setDeletePeopleDialog(false);
    };

    const hideMoreInformationDialog = () => {
        setMoreInformationDialog(false);
    };

    const hideCreatePeopleDialog = () => {
        setCreatePeopleDialog(false);
    };

    // const hideEditCompanyDialog = () => {
    //     setEditCompanyDialog(false);
    // } 

    const savePeople = () => {
        setSubmitted(true);
        let _people = people;

        if(_people.cpf == null && 
           _people.numberContact == null &&
           _people.name == null ){
                toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Falha no Cadastro', life: 3000 });
        } else if(_people.cpf != null && 
            _people.numberContact != null &&
            _people.name != null ){
                if (_people.cpf.length === 11 && _people.numberContact.length === 11) {
                    CreatePeople("People", people);
                    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa Cadastrada', life: 3000 });
                    setCreatePeopleDialog(false);
                } else {
                    toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Falha no Cadastro', life: 3000 });
                }
        }
    };

    // const updateCompany = (company) => {
    //     // setSubmitted(true);
    //     // let _company = company;
    //     // PutCompany("Company/UpdateCompany", company);
    //     // setEditCompanyDialog(false);
    //   };

    // const editCompany = (company) => {
    //     setCompany({ ...company });
    //     setEditCompanyDialog(true);
    // };

    const confirmDeletePeople = (people) => {
        setPeople(people);
        setDeletePeopleDialog(true);
    };

    // const searchPeople = (company) => {
    //     setCompany(company);

    //     SearchPeopleInCompany("Company/SearchPeopleInCompany", company.id);
    //     SearchCnpj("Company/SearchCompanyByCnpj", company.cnpj)
    //     setPeopleInCompany(peopleList);
    //     setCompanyPorCnpj(companyCnpj);
    //     setCompanyPorCnpjAddress(companyAddress);

        
    //     setSearchPeopleInCompanyDialog(true);
       
    // };

    const MoreInformation = (people) => {
        setPeople(people);
        setMoreInformationDialog(true);
    }

    const deletePeople = () => {
            DeleteAxios("People/DeletePeople", people.id);
            GetAxios("People/SearchPeople");       
            setPeoples(data);
        
            setDeletePeopleDialog(false);
            setPeople(emptyPeople);
        
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Pessoa Deletada",
              life: 3000,
            });
    };

    const findIndexById = (id) => {
         let index = -1;

         for (let i = 0; i < peoples.length; i++) {
             if (peoples[i].id === id) {
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
        let _people = { ...people };

        _people['category'] = e.value;
        setPeople(_people);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _people = { ...people };

        _people[`${name}`] = val;

        setPeople(_people);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _people = { ...people };

        _people[`${name}`] = val;

        setPeople(_people);
    }; 

    // const onInputAddressChange = (e, name) => {
    //     const value = e.target.value || "";
    //     let _company = { ...company };
    //     let _address = { ...company.address };
    
    //     if (name.includes("cep")) {
    //       getAddress(value);
    //       _address[`street`] = address.logradouro;
    //       _address[`district`] = address.bairro;
    //       _address[`city`] = address.localidade;
    
    //       _company["address"] = _address;
    //       setCompany(_company);
    //     }
    //     _address[`${name}`] = value;
    //     _company["address"] = _address;
    //     setCompany(_company);
    // };

    const actionBodyTemplate = (rowData) => {
        return (
            <Container>

                <Button
                    icon="pi pi-bars"
                    rounded
                    outlined
                    severity="warning"
                    onClick={() => MoreInformation(rowData)}
                />

                <Button 
                    icon="pi pi-pencil" 
                    rounded outlined 
                    className="mr-2" 
                    // onClick={() => editCompany(rowData)} 
                />

                <Button 
                    icon="pi pi-trash" 
                    rounded outlined severity="danger" 
                    onClick={() => confirmDeletePeople(rowData)} 
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
                label="Cadastrar Pessoa"
                icon="pi pi-plus"
                severity="success"
                onClick={openNew}
            />
         </Container>
         
     );

    const createPeopleDialogFooter = (
        <React.Fragment>
          <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideCreatePeopleDialog} />
          <Button label="Cadastrar" icon="pi pi-check" onClick={savePeople} />
        </React.Fragment>
    );

    const deletePeopleDialogFooter = (
        <React.Fragment>
            <Button label="Não" icon="pi pi-times" outlined onClick={hideDeletePeopleDialog} />
            <Button label="Sim" icon="pi pi-check" severity="danger" onClick={deletePeople} />
        </React.Fragment>
    );

    // const editCompanyDialogFooter = (
    //     <React.Fragment>
    //         <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={hideEditCompanyDialog} />
    //         <Button label="Salvar" icon="pi pi-check" outlined onClick={updateCompany} />
    //     </React.Fragment>
    // );

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
                        currentPageReportTemplate=" {first} to {last}" 
                        globalFilter={globalFilter}>

                        <Column field="id" header="Id" sortable style={{ minWidth: '5rem' }}></Column>
                        <Column field="name" header="Nome" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="userName" header="Nome de ususario" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="cpf" header="Cpf" body={cpfBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="numberContact" header="Contato" body={contactBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="company.companyName" header="Empresa" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                    </DataTable>
                </div>

                {/* create dialog */}
                <Dialog
                    visible={createPeopleDialog}
                    style={{ width: "40rem" }}
                    breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                    header="Cadastro de Pessoas"
                    modal
                    className="p-fluid"
                    footer={createPeopleDialogFooter}
                    onHide={hideCreatePeopleDialog}>

                    <People>
                        {/* name */}
                        <PeopleName className="name">
                            <span className="p-float-label">
                            <InputText
                                id="name"
                                value={people.name}
                                onChange={(e) => onInputChange(e, "name")}
                                autoFocus
                            />
                            <label htmlFor="name">Nome da Pessoa</label>
                            </span>
                        </PeopleName>

                        {/* userName */}
                        <PeopleName className="userName">
                            <span className="p-float-label">
                            <InputText
                                id="userName"
                                value={people.userName}
                                onChange={(e) => onInputChange(e, "userName")}
                            />
                            <label htmlFor="userName">Nome de Usuario</label>
                            </span>
                        </PeopleName>

                        {/* cpf */}
                        <Cpf>
                            <span className="p-float-label">
                            <InputMask
                                id="cpf"
                                mask="999.999.999/99"
                                unmask={true}
                                onChange={(e) => onInputChange(e, "cpf")}
                                required
                            />
                            <label htmlFor="cpf"> Cpf </label>
                            </span>
                        </Cpf>

                        {/* numberContact */}
                        <NumberContact className="field">
                            <span className="p-float-label">
                            <InputMask
                                id="numberContact"
                                mask="(99)99999-9999"
                                unmask={true}
                                onChange={(e) => onInputChange(e, "numberContact")}
                                required
                            />
                            <label htmlFor="numberContact">Contato</label>
                            </span>
                        </NumberContact>

                        {/* company */}
                        <Company className="field">
                            <span className="p-float-label">
                            <Dropdown 
                                id="company"
                                value={people.company} 
                                onChange={(e) => onInputChange(e, "company")} 
                                options={listCompany} 
                                optionLabel="name" 
                                editable placeholder="Select a City" 
                                className="w-full md:w-14rem" 
                            />
                            <label htmlFor="company">Funcionario da empresa:</label>
                            </span>
                        </Company>
                    </People>
                </Dialog>

                {/* info dialog */}
                <Dialog 
                    visible={MoreInformationDialog} 
                    onHide={hideMoreInformationDialog}
                    style={{ width: '32rem' }} 
                    header="Informações da Pessoa"
                    breakpoints={{ '960px': '75vw', '641px': '100vw' }}>

                        <TabView>
                            <TabPanel header="Pessoa">
                                {people && (
                                    <ViewData>
                                        <TextData
                                            data={people.name}
                                            name="Nome da pessoa"
                                            className="name"
                                        />
                                        <TextData
                                            data={people.userName}
                                            name="Nome de Usuario"
                                            className="userName"
                                        />
                                        <TextData
                                            data={people.status}
                                            name="Status"
                                            className="status"
                                        />
                                        
                                        <TextData
                                            data={maskCpf(people.cpf)}
                                            name="Cpf"
                                            className="cpf"
                                        />

                                        <TextData 
                                            data={maskContact(people.numberContact)} 
                                            name="Contato" 
                                            className="numberContact"
                                        />  
                                    </ViewData>
                                )} 
                            </TabPanel>

                            {people.company === null ? (
                                <TabPanel header="Empresa">
                                {people && (
                                        <p>A pessoa "{people.name}" ainda não participa de uma empresa.</p>  
                                )}
                                </TabPanel>
                            ) : (
                                <TabPanel header="Empresa">
                                {people && (
                                    <CompanyView>
                                        <TextData data={people.company.companyName} 
                                            name="Nome da Empresa" 
                                            className="companyName" 
                                        />
                                        <TextData
                                            data={people.company.fantasyName}
                                            name="Nome Fantasia"
                                            className="fantasyName"
                                        />
                                        <TextData
                                            data={people.company.status}
                                            name="Status"
                                            className="status"
                                        />
                                        <TextData
                                            data={maskCnpj(people.company.cnpj)}
                                            name="Cnpj"
                                            className="cnpj"
                                        />
                                        <TextData
                                            data={maskCnae(people.company.cnae)}
                                            name="Cnae"
                                            className="cnae"
                                        />

                                        <TextData
                                            data={maskDate(people.company.startDate)}
                                            name="Fundação"
                                            className="startDate"
                                        />

                                        <TextData
                                            data={maskFinance(people.company.finance)}
                                            name="Finanças"
                                            className="finance"
                                        />
                                        <TextData
                                            data={people.company.legalNature}
                                            name="Natureza Legal"
                                            className="legalNature"
                                        />
                                    </CompanyView> 
                                )}
                            </TabPanel>
                            )}
                        </TabView>          
                </Dialog> 

                {/*<Dialog
                    visible={editCompanyDialog} 
                    style={{ width: "40rem" }}
                    breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                    header="Edição da empresa" 
                    modal 
                    className="p-fluid"
                    footer={editCompanyDialogFooter} 
                    onHide={hideEditCompanyDialog}> */}

                    {/* <Company>
                        
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
                    </Company> */}

                    {/* <Address>
                        <legend>Endereço</legend>

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
                    </Address> */}

                {/* </Dialog> */}

                {/* delete dialog */}
                <Dialog 
                    visible={deletePeopleDialog} 
                    style={{ width: '32rem' }} 
                    breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                    header="Confirmação de exclusão" 
                    modal 
                    footer={deletePeopleDialogFooter} 
                    onHide={hideDeletePeopleDialog}>

                    <div className="confirmation-content">
                        {people && (
                            <span>
                                <p>Tem certeza que deseja excluir a Pessoa "{people.name}"? </p>
                                <p>Essa ação não da pra ser desfeita. </p>
                            </span>
                        )}
                    </div>
                </Dialog> 
            </div>
        </React.Fragment>
    );
}
         