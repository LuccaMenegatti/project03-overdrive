//react
import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

//prime react
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import { Message } from "primereact/message";
import { locale, addLocale } from "primereact/api";

import "primeicons/primeicons.css";

// meus hooks
import {companyAxios} from "../../../../config/axios";
import {ptBr} from "../../../../config/configPt";
import { useMask } from "../../../../hooks/useMask";
import { useInputChange } from "../../../../hooks/useInputChange";
import LoadingTable from "../../../../components/LoadingTable";
import { useAddress } from "../../../../hooks/useAddress";
import { CompanyContext } from "../../context/CompanyContext";

//estilos
import TextData from "../../../../components/TextData";
import {
  ActionTemplate,
  TableContainer,
  HeaderContainer,
  Input,
  ViewData,
  Address,
  AddressComplete,
  People,
  PeopleData,
  Company,
  Text,
  CalendarTemplate,
} from "./style";

export default function TableLayout() {
  
    const {
        maskCpf,
        maskCep,
        maskContact,
        cnpjBodyTemplate,
        cnaeBodyTemplate,
        dateBodyTemplate,
        priceBodyTemplate,
        statusBodyTemplate,
    } = useMask();

    const {
      onInputChange,
      onInputNumberChange,
      onInputAddressChange,
      onChangeCep,
      existCep,
    } = useInputChange();

    const navigate = useNavigate();

    const { emptyCompany, company, setCompany } = useContext(CompanyContext);
    const [companies, setCompanies] = useState([]);
    const [people, setPeople] = useState([]);
    const [createCompanyDialog, setCreateCompanyDialog] = useState(false);
    const [updateCompanyDialog, setUpdateCompanyDialog] = useState(false);
    const [companyCompleteDialog, setCompanyCompleteDialog] = useState(false);
    const [deleteCompanyDialog, setDeleteCompanyDialog] = useState(false);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(true);
    const [statusCompanyDialog, setStatusCompanyDialog] = useState(false);
    const [selectedCompanies, setSelectedCompanies] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);

    addLocale("pt", ptBr);

    //renderizando com use effect
    useEffect(() => {
      setLoading(true);
        companyAxios
          .get('SearchCompany')
          .then((res) => {
            setCompanies(res.data);
          })
          .catch(() => {
            setErr(true);
          })
          .finally(() => {
            setLoading(false);
          });
    }, []);

    const notification = (severity, summary, text) => {
        toast.current.show({
          severity: severity,
          summary: summary,
          detail: text,
          life: 3000,
        });
    };

    const saveCreateCompany = () => {
        setSubmitted(true);
        let _company = { ...company };
        let _address = { ...company.address };
        let _companies = [...companies];

        const updateTable = (cnpj) => {
          companyAxios.get(`SearchCompanyByCnpj/${cnpj}`).then((res) => {
            _companies.push({ ...res.data });
            setCompanies(_companies); 
          });
        };
    
        Object.keys(_company).forEach((companyItem, i) => {
          console.log(companyItem);
          if (companyItem !== "address") {
            if (_company[companyItem] == null) {
              _company[companyItem] = "";
            }
          } else {
            Object.keys(_address).forEach((addressItem) => {
              if (_address[addressItem] == null) {
                _address[addressItem] = "";
                _company.address = { ..._address };
              }
            });
          }
          _company = { ..._company };
        });
    
        if (
          _company.cnpj.length === 14 &&
          _company.startDate !== "" &&
          _company.cnae.length === 7 &&
          _address.cep.length === 8 &&
          _address.number !== ""
        ) {
          companyAxios
            .post("", _company)
            .then((res) => {
              updateTable(res.data.cnpj);
              notification("success", "Concluido", "Empresa criada");
              hideCreateCompanyDialog();
            })
            .catch((err) => {
              console.log(err.response.data);
              notification("error", "Erro", err.response.data.split(":")[1]);
            })
            .finally(() => {
              setCompany(emptyCompany);
            });
        } else {
          notification("error", "Erro", "Não foi possivel criar a empresa");
        }
    };
    
    const saveEditCompany = () => {
        setSubmitted(true);
        let _companies = [...companies];
        let _company = { ...company };
        let _address = { ...company.address };
        const cnpj = _company.cnpj;
    
        delete _company.cnpj;
        delete _company.status;
    
        console.log(_company);
    
        const updateEdit = () => {
          const index = companies.findIndex((c) => c.id == company.id);
    
          companyAxios.get(`SearchCompanyByCnpj/${cnpj}`).then((res) => {
            _companies[index] = { ...res.data };
            console.log(res.data);
            setCompanies(_companies);
          });
        };
    
        Object.keys(_company).forEach((companyItem) => {
          console.log(companyItem);
          if (companyItem !== "address") {
            if (_company[companyItem] == "") {
              _company[companyItem] = null;
            }
          } else {
            Object.keys(_address).forEach((addressItem) => {
              if (_address[addressItem] == "") {
                _address[addressItem] = null;
                _company.address = { ..._address };
              }
            });
          }
          _company = { ..._company };
        });
    
        if (
          _company.startDate !== null &&
          _company.cnae?.length === 7 &&
          _address.cep?.length === 8 &&
          _address.number !== null
        ) {
          companyAxios
            .put("UpdateCompany", _company)
            .then((res) => {
              updateEdit();
              notification("success", "Concluido", "A empresa foi editada");
              hideUpdateCompanyDialog();
            })
            .catch((err) => {
              console.log(err.response.data);
              notification("error", "Erro", err.response.data.split(":")[1]);
            })
            .finally(() => {
              setCompany(emptyCompany);
            });
        } else {
          notification("error", "Erro", "Não foi possivel editar a empresa");
        }
    
        console.log(_company);
    };

    const deleteCompany = () => {
        companyAxios
          .delete(`DeleteCompany/${company.id}`)
          .then(() => {
            notification("success", "Concluido", "Empresa foi excluida");
            const _companies = companies.filter((val) => val.id !== company.id);
            setCompanies(_companies);
          })
          .catch(() => {
            notification("error", "Erro", "não foi possivel excluir a empresa");
          })
          .finally(() => {
            setCompany(emptyCompany);
          });
    
        setDeleteCompanyDialog(false);
    };
    

    const CreateCompanyDialog = () => {
        setCompany(emptyCompany);
        setSubmitted(false);
        setCreateCompanyDialog(true);
    };

    const UpdateCompanyDialog = (company) => {
        let _company = { ...company };
        console.log(company);
        setCompany(_company);
        setSubmitted(false);
        setUpdateCompanyDialog(true);
    };

    const ConfirmDeleteCompanyDialog = (company) => {
        setCompany(company);
        setDeleteCompanyDialog(true);
      };

    const CompanyCompleteDialog = (company) => {
        setCompany(company);
        companyAxios
          .get(`SearchPeopleInCompany/${company.id}`)
          .then((res) => {
            setPeople(res.data.peoples);
          })
          .catch()
          .finally();
    
        setCompanyCompleteDialog(true);
    };

    const hideCreateCompanyDialog = () => {
        setSubmitted(false);
        setCreateCompanyDialog(false);
    };

    const hideUpdateCompanyDialog = () => {
        setSubmitted(false);
        setCompany(emptyCompany);
        setUpdateCompanyDialog(false);
    };

    const hideDeleteCompanyDialog = () => {
        setDeleteCompanyDialog(false);
    };

    const hideCompanyCompleteDialog = () => {
        setCompanyCompleteDialog(false);
    };

    const createCompanyDialogFooter = (
        <React.Fragment>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            outlined
            severity="danger"
            onClick={hideCreateCompanyDialog}
          />
          <Button
            label="Cadastrar"
            icon="pi pi-check"
            severity="success"
            onClick={saveCreateCompany}
          />
        </React.Fragment>
    );

    const updateCompanyDialogFooter = (
        <React.Fragment>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            outlined
            onClick={hideUpdateCompanyDialog}
            severity="danger"
          />
          <Button
            label="Editar"
            icon="pi pi-check"
            onClick={saveEditCompany}
            severity="success"
          />
        </React.Fragment>
    );

    const deleteCompanyDialogFooter = (
        <React.Fragment>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            autoFocus
            outlined
            onClick={hideDeleteCompanyDialog}
          />
          <Button
            label="Deletar"
            icon="pi pi-check"
            severity="danger"
            onClick={deleteCompany}
          />
        </React.Fragment>
    );
    
    const actionBodyTemplate = (rowData) => {
        const statusSeverity = (data) => {
          if (data.status == "Active") {
            return "danger";
          }
          if (data.status == "Pending") {
            return "secondary";
          }
          return "success";
        };
    
        const statusIcon = (data) => {
          if (data.status == "Active") {
            return "thumbs-down";
          }
          return "thumbs-up";
        };
    
        const statusDisabled = (data) => {
          if (data.status == "Pending") {
            return true;
          }
          return false;
        };
    
        const statusTooltip = (data) => {
          if (data.status == "Active") {
            return "Desativa Empresa";
          }
          if (data.status == "pending") {
            return "pendente";
          }
    
          return "Ativa Empresa";
        };
    
        const configTooltip = {
          position: "top",
          showDelay: 800,
        };
    
        return (
          <ActionTemplate>
            <Button
              rounded
              icon={`pi pi-${statusIcon(rowData)}`}
              disabled={statusDisabled(rowData)}
              severity={statusSeverity(rowData)}
              outlined
              //onClick={() => openStatusChangeCompany(rowData)}
              tooltip={statusTooltip(rowData)}
              tooltipOptions={configTooltip}
            />
    
            <Button
              icon="pi pi-bars"
              rounded
              outlined
              onClick={() => CompanyCompleteDialog(rowData)}
              tooltip="View"
              tooltipOptions={configTooltip}
            />
    
            <Button
              icon="pi pi-pencil"
              rounded
              outlined
              className="mr-2"
              severity="warning"
              onClick={() => UpdateCompanyDialog(rowData)}
              tooltip="Editar"
              tooltipOptions={configTooltip}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              onClick={() => ConfirmDeleteCompanyDialog(rowData)}
              disabled={rowData.peoples?.length > 0}
              tooltip="Deletar"
              tooltipOptions={configTooltip}
            />
          </ActionTemplate>
        );
    };

    //header
    const header = (
        <HeaderContainer>
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
                onClick={CreateCompanyDialog}
            />
        </HeaderContainer>  
    );

    return (
        <div>
          <Toast ref={toast} />
          {err && navigate("/Error")}
          <TableContainer>
            {loading ? (
              <LoadingTable />
            ) : (
              <DataTable
                value={companies}
                onSelectionChange={(e) => setSelectedCompanies(e.value)}
                dataKey="id"
                removableSort
                selectionMode="single"
                emptyMessage="A tabela ainda não possui dados"
                scrollable
                scrollHeight="flex"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies"
                globalFilter={globalFilter} 
                header={header}             
              >
                    <Column field="id" header="Id" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="companyName" header="Nome" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="cnpj" header="Cnpj" body={cnpjBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="cnae" header="Cnae" body={cnaeBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="finance" header="Finanças" body={priceBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="startDate" header="Fundação" body={dateBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: "9rem" }}></Column>

              </DataTable>
            )} 

          </TableContainer>
            
            {/* create company dialog */}
            <Dialog
                visible={createCompanyDialog}
                style={{ width: "40rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Cadastrar Empresa"
                modal
                className="p-fluid"
                footer={createCompanyDialogFooter}
                onHide={hideCreateCompanyDialog}
            >
                <Company>
                {/* companyName */}
                <Input className="companyName">
                    <span className="p-float-label">
                    <InputText
                        id="companyName"
                        value={company.companyName}
                        onChange={(e) => onInputChange(e, "companyName")}
                        autoFocus
                        maxLength={100}
                    />
                    <label htmlFor="companyName">Nome da Empresa</label>
                    </span>
                    {submitted && !company.companyName && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="O nome é obrigatorio"
                      />
                    )}
                </Input>

                {/* fantasyName */}
                <Input className="fantasyName">
                    <span className="p-float-label">
                    <InputText
                        id="fantasyName"
                        value={company.fantasyName}
                        onChange={(e) => onInputChange(e, "fantasyName")}
                        maxLength={100}
                    />
                    <label htmlFor="fantasyName">Nome Fantasia</label>
                    </span>
                    {submitted && !company.fantasyName && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="O nome fantasia é obrigatorio"
                      />
                    )}
                </Input>

                {/* startDate */}
                <Input className="startDate">
                    <span className="p-float-label">
                    <CalendarTemplate
                        id="startDate"
                        onChange={(e) => onInputChange(e, "startDate")}
                        value={company.startDate}
                        dateFormat="dd/mm/yy"
                        showIcon
                        required
                        locale="pt"
                        className={classNames({
                        "p-invalid": submitted && !company.startDate,
                        })}
                    />
                    <label htmlFor="startDate">Data de abertura</label>
                    </span>
                    {submitted && !company.startDate && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="Data de abertura é obrigatorio"
                    />
                    )}
                </Input>

                {/* cnpj */}
                <Input className="cnpj">
                    <span className="p-float-label">
                    <InputMask
                        id="cnpj"
                        mask="99.999.999/9999-99"
                        unmask={true}
                        value={company.cnpj}
                        onChange={(e) => onInputChange(e, "cnpj")}
                        required
                        maxLength={14}
                        // autoClear={false}
                        className={classNames({
                        "p-invalid":
                            (submitted && !company.cnpj) ||
                            (submitted && company.cnpj?.length < 14),
                        })}
                    />
                    <label htmlFor="cnpj">CNPJ</label>
                    </span>
                    {submitted && !company.cnpj && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="Cnpj é obrigatorio"
                    />
                    )}
                    {submitted && company.cnpj?.length < 14 && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="Cnpj tem 14 numeros."
                    />
                    )}
                </Input>

                {/* cnae */}
                <Input className="cnae">
                    <span className="p-float-label">
                    <InputMask
                        id="cnae"
                        mask="9999-9/99"
                        unmask={true}
                        onChange={(e) => onInputChange(e, "cnae")}
                        value={company.cnae}
                        required
                        maxLength={7}
                        className={classNames({
                        "p-invalid":
                            submitted &&
                            !company.cnae &&
                            (submitted && company.cnae?.length) < 7,
                        })}
                    />
                    <label htmlFor="cnae">CNAE</label>
                    </span>
                    {submitted && !company.cnae && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="Cnae é obrigatório."
                    />
                    )}
                    {submitted && company.cnae?.length < 7 && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="Minimo de 7 caracteres."
                    />
                    )}
                </Input>

                {/* legalNature */}
                <Input className="legalNature">
                    <span className="p-float-label">
                    <InputText
                        id="legalNature"
                        value={company.legalNature}
                        onChange={(e) => onInputChange(e, "legalNature")}
                        maxLength={50}
                        // autoFocus
                    />
                    <label htmlFor="legalNature">Naturesa legal</label>
                    </span>
                    {submitted && !company.legalNature && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="A natureza legal é obrigatoria"
                      />
                    )}
                </Input>

                {/* finance */}
                <Input className="finance">
                    <span className="p-float-label">
                    <InputNumber
                        id="finance"
                        value={company.finance}
                        onValueChange={(e) => onInputNumberChange(e, "finance")}
                        mode="currency"
                        currency="BRL"
                        locale="pt-RS"
                    />
                    <label htmlFor="finance">Capital Financeiro</label>
                    </span>
                    {submitted && !company.finance && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="A finança é obrigatoria"
                      />
                    )}
                </Input>
                </Company>

                <Address>
                <legend>Endereço</legend>
                {/* cep */}

                <Input className="cep">
                    <span className="p-float-label">
                    <InputMask
                        id="companyName"
                        required
                        mask="99999-999"
                        unmask={true}
                        autoClear={false}
                        onChange={(e) => onChangeCep(e)}
                    />
                    <label htmlFor="cep">Cep</label>
                    </span>
                    {submitted && !company.address.cep && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="CEP é obrigatório."
                    />
                    )}
                    {submitted && company.address.cep < 7 && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="Minimo de 7 caracteres."
                    />
                    )}
                    {existCep == false && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="cep não encontrado "
                    />
                    )}
                </Input>

                {/* street */}
                <Input className="street">
                    <span className="p-float-label">
                    <InputText
                        id="street"
                        disabled={true}
                        value={company.address.street}
                        onChange={(e) => onInputAddressChange(e, "street")}
                    />

                    <label htmlFor="street">Rua</label>
                    </span>
                    {submitted && !company.address.street && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="A rua é obrigatoria"
                      />
                    )}
                </Input>

                <Input className="number">
                    <span className="p-float-label">
                    <InputNumber
                        id="number"
                        value={company.address.number}
                        onValueChange={(e) => onInputAddressChange(e, "number")}
                    />
                    <label htmlFor="number">Numero</label>
                    </span>
                    {submitted && !company.address.number && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="O numero é obrigatorio"
                      />
                    )}
                </Input>

                {/* district */}
                <Input className="district">
                    <span className="p-float-label">
                    <InputText
                        id="district"
                        disabled={true}
                        value={company.address.district}
                        onChange={(e) => onInputAddressChange(e, "district")}
                    />
                    <label htmlFor="district">Bairro</label>
                    </span>
                    {submitted && !company.address.district && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="O bairro é obrigatorio"
                      />
                    )}
                </Input>

                <Input className="city">
                    <span className="p-float-label">
                    <InputText
                        id="city"
                        disabled={true}
                        value={company.address.city}
                        onChange={(e) => onInputAddressChange(e, "city")}
                    />
                    <label htmlFor="city">Cidade</label>
                    </span>
                    {submitted && !company.address.city && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="A cidade é obrigatoria"
                      />
                    )}
                </Input>

                <Input className="contact">
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
                    {submitted && !company.address.contact && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="O contato é obrigatorio"
                      />
                    )}
                </Input>
                </Address>
            </Dialog>

            {/* update company dialog */}
            <Dialog
                visible={updateCompanyDialog}
                style={{ width: "40rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header={`Edite a Empresa ${company.companyName}`}
                modal
                className="p-fluid"
                footer={updateCompanyDialogFooter}
                onHide={hideUpdateCompanyDialog}
            >
                <Company>
                {/* companyName */}
                <Input className="companyName">
                    <span className="p-float-label">
                    <InputText
                        id="companyName"
                        value={company.companyName}
                        onChange={(e) => onInputChange(e, "companyName")}
                        autoFocus
                    />
                    <label htmlFor="companyName">Nome da Empresa</label>
                    </span>
                    {submitted && !company.companyName && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="O nome é obrigatorio"
                      />
                    )}
                </Input>

                {/* fantasyName */}
                <Input className="fantasyNameEdit">
                    <span className="p-float-label">
                    <InputText
                        id="fantasyName"
                        value={company.fantasyName}
                        onChange={(e) => onInputChange(e, "fantasyName")}
                    />
                    <label htmlFor="fantasyName">Nome Fantasia</label>
                    </span>
                    {submitted && !company.fantasyName && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="O nome fantasia é obrigatorio"
                      />
                    )}
                </Input>

                {/* legalNature */}
                <Input className="legalNatureEdit">
                    <span className="p-float-label">
                    <InputText
                        id="legalNature"
                        value={company.legalNature}
                        onChange={(e) => onInputChange(e, "legalNature")}
                        // autoFocus
                    />
                    <label htmlFor="legalNature">Natureza legal</label>
                    </span>
                    {submitted && !company.legalNature && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="A natureza legal é é obrigatoria"
                      />
                    )}
                </Input>

                {/* cnae */}
                <Input className="cnaeEdit">
                    <span className="p-float-label">
                    <InputMask
                        id="cnae"
                        mask="9999-9/99"
                        unmask={true}
                        onChange={(e) => onInputChange(e, "cnae")}
                        value={company.cnae}
                        required
                        className={classNames({
                        "p-invalid": submitted && !company.cnae,
                        })}
                    />
                    <label htmlFor="cnae">Cnae</label>
                    </span>
                    {submitted && !company.cnae && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="O campo Cnae é obrigatório."
                    />
                    )}
                    {submitted && company.cnae?.length < 7 && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="info"
                        text="Minimo de 7 caracteres."
                    />
                    )}
                </Input>

                {/* finance */}
                <Input className="financeEdit">
                    <span className="p-float-label">
                    <InputNumber
                        id="finance"
                        value={company.finance}
                        onValueChange={(e) => onInputNumberChange(e, "finance")}
                        mode="currency"
                        currency="BRL"
                        locale="pt-RS"
                    />
                    <label htmlFor="finance">Capital Financeiro</label>
                    </span>
                    {submitted && !company.finance && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="A finança é obrigatoria"
                      />
                    )}
                </Input>
                </Company>

                <Address>
                <legend>Endereço</legend>
                {/* cep */}

                <Input className="cep">
                    <span className="p-float-label">
                    <InputMask
                        id="companyName"
                        mask="99999-999"
                        unmask={true}
                        autoClear={false}
                        value={company.address.cep}
                        onChange={(e) => onChangeCep(e)}
                        required
                        className={classNames({
                        "p-invalid": submitted && company.address.cep === null,
                        })}
                    />
                    <label htmlFor="cep">Cep</label>
                    </span>
                    {submitted && !company.address.cep && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="CEP é obrigatório."
                    />
                    )}
                    {submitted && company.address.cep?.length < 7 && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="info"
                        text="Minimo de 7 caracteres."
                    />
                    )}
                    {existCep == false && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="cep não encontrado "
                    />
                    )}
                </Input>

                {/* street */}
                <Input className="street">
                    <span className="p-float-label">
                    <InputText
                        id="street"
                        disabled={true}
                        autoClear={false}
                        value={company.address.street}
                        onChange={(e) => onInputAddressChange(e, "street")}
                    />

                    <label htmlFor="street">Rua</label>
                    </span>
                    {submitted && !company.address.street && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="A rua é obrigatoria"
                      />
                    )}
                </Input>

                <Input className="number">
                    <span className="p-float-label">
                    <InputNumber
                        id="number"
                        value={company.address.number}
                        autoClear={false}
                        onValueChange={(e) => onInputAddressChange(e, "number")}
                        required
                        className={classNames({
                        "p-invalid": submitted && !company.address.number,
                        })}
                    />
                    <label htmlFor="number">Numero</label>
                    </span>
                    {submitted && !company.address.number && (
                    <Message
                        style={{
                        background: "none",
                        justifyContent: "start",
                        padding: "5px",
                        }}
                        severity="error"
                        text="Numero é obrigatório."
                    />
                    )}
                </Input>

                {/* district */}
                <Input className="district">
                    <span className="p-float-label">
                    <InputText
                        id="district"
                        disabled={true}
                        value={company.address.district}
                        autoClear={false}
                        onChange={(e) => onInputAddressChange(e, "district")}
                    />
                    <label htmlFor="district">Bairro</label>
                    </span>
                    {submitted && !company.address.district && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="O bairro é obrigatorio"
                      />
                    )}
                </Input>

                {/* city */}
                <Input className="city">
                    <span className="p-float-label">
                    <InputText
                        id="city"
                        disabled={true}
                        autoClear={false}
                        value={company.address.city}
                        onChange={(e) => onInputAddressChange(e, "city")}
                    />
                    <label htmlFor="city">Cidade</label>
                    </span>
                    {submitted && !company.address.city && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="A cidade é obrigatoria"
                      />
                    )}
                </Input>

                {/* contact */}
                <Input className="contact">
                    <span className="p-float-label">
                    <InputMask
                        id="contact"
                        mask="(99)99999-9999"
                        unmask={true}
                        autoClear={false}
                        value={company.address.contact}
                        onChange={(e) => onInputAddressChange(e, "contact")}
                    />
                    <label htmlFor="contact">Contato</label>
                    </span>
                    {submitted && !company.address.contact && (
                      <Message
                        style={{
                          background: "none",
                          justifyContent: "start",
                          padding: "5px",
                        }}
                        severity="error"
                        text="O contato é obrigatorio"
                      />
                    )}
                </Input>
                </Address>
            </Dialog>

            {/* company complete */}
            <Dialog
                visible={companyCompleteDialog}
                style={{ width: "35rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header={`Informações da empresa ${company.companyName}`}
                modal
                className="p-fluid"
                onHide={hideCompanyCompleteDialog}
            >
                <TabView>
                <TabPanel header="Empresa">
                    <ViewData>
                    <TextData
                        data={company.companyName}
                        name="Nome Da empresa"
                        className="companyName"
                    />
                    <TextData
                        data={company.fantasyName}
                        name="Nome Fantasia"
                        className="fantasyName"
                    />
                    <TextData
                        data={company.status}
                        name="Status"
                        className="status"
                    />

                    <TextData
                        data={cnpjBodyTemplate(company)}
                        name="Cnpj"
                        className="cnpj"
                    />
                    <TextData 
                        data={cnaeBodyTemplate(company)} 
                        name="Cnae" 
                        className="cnae" />

                    <TextData
                        data={company.legalNature}
                        name="Natureza Legal"
                        className="legalNature"
                    />

                    <TextData
                        data={dateBodyTemplate(company)}
                        name="Data de Abertura"
                        className="startDate"
                    />
                    <TextData
                        data={priceBodyTemplate(company)}
                        name="Capital Financeiro"
                        className="finance"
                    />
                    </ViewData>
                </TabPanel>

                <TabPanel header="Endereço">
                    <AddressComplete>
                    <TextData 
                        data={maskCep(company.address.cep)} 
                        name="CEP" 
                        className="cep" 
                    />
                    <TextData
                        data={company.address.street}
                        name="Rua"
                        className="street"
                    />
                    <TextData
                        data={company.address.number}
                        icon="star"
                        name="Numero"
                        className="number"
                    />
                    <TextData
                        data={company.address.district}
                        icon="star"
                        name="Bairro"
                        className="district"
                    />

                    <TextData
                        data={company.address.city}
                        name="Cidade"
                        className="city"
                    />

                    <TextData
                        data={maskContact(company.address.contact)}
                        name="Contato"
                        className="contact"
                    />
                    </AddressComplete>
                </TabPanel>
                <TabPanel header="Funcionarios">
                    {people.length === 0 ? (
                    <div> A empresa ainda não possui funcionarios.</div>
                    ) : (
                    <div>
                        {people.map((people, i) => (
                        <People>
                             <i class="pi pi-info-circle" />
                                <PeopleData>
                                    <label>Nome:</label>
                                    <li key={i}>{people.name.split(" ")[0]}</li>
                                </PeopleData>
                                <PeopleData>
                                    <label>Cpf: </label>
                                    <li key={i}>{maskCpf(people.cpf)}</li>
                                </PeopleData>
                                <PeopleData>
                                    <label>Contato: </label>
                                    <li key={i}>{maskContact(people.numberContact)}</li>
                                </PeopleData>
                        </People>
                        ))}
                    </div>
                    )}
                </TabPanel>
                </TabView>
            </Dialog>

            {/* delete company */}
            <Dialog
                visible={deleteCompanyDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header={`Deletar a empresa ${company.companyName}`}
                modal
                footer={deleteCompanyDialogFooter}
                onHide={hideDeleteCompanyDialog}
            >
                <Text>
                <span style={{textAlign: "Justify"}}>Tem certeza que deseja deletar a empresa {company.companyName}? </span>
                </Text>
            </Dialog>
        </div>
    );
}
  





  
         