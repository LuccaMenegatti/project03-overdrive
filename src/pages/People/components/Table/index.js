//react
import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

//meus hooks
import { useMask } from "../../../../hooks/useMask";
import { useInputChangePeople } from "../../../../hooks/useInputChangePeople";
import LoadingTablePeople from "../../../../components/LoadingTablePeople";
import { peopleAxios, companyAxios } from "../../../../config/axios";
import CompanyList from "../CompanyList";
import { PeopleContext } from "../../context/PeopleContext";

//styles
import {
  TableContainer,
  ActionTemplate,
  StatusChange,
  HeaderContainer,
  InputContainer,
  People,
  Text,
} from "./style";

//prime react
import { InputMask } from "primereact/inputmask";
import { Message } from "primereact/message";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

export default function TableLayoutPeople() {
    
    const {
        cpfBodyTemplate,
        contactBodyTemplate,
        statusBodyTemplate,
        companyStatusBodyTemplate,
        nameBodyTemplate,
        userNameBodyTemplate,
    } = useMask();
  
    const {onInputChangePeople} = useInputChangePeople();

    const navigate = useNavigate();

    const { emptyPeople, people, setPeople, peoples, setPeoples } = useContext(PeopleContext);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createPeopleDialog, setCreatePeopleDialog] = useState(false);
    const [updatePeopleDialog, setUpdatePeopleDialog] = useState(false);
    const [companyListDialog, setCompanyListDialog] = useState(false);
    const [deletePeopleDialog, setDeletePeopleDialog] = useState(false);
    const [statusPeopleDialog, setStatusPeopleDialog] = useState(false);
    const [err, setErr] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
      setLoading(true);
      peopleAxios
        .get('SearchPeople')
        .then((res) => {
  
          setPeoples(res.data);
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

    const saveCreatePeople = () => {
      setSubmitted(true);
  
      let _peoples = [...peoples];
      let _people = { ...people };
  
      const updateTable = (cpf) => {
        peopleAxios.get(`SearchPeopleByCpf/${cpf}`).then((res) => {
          _peoples.push({ ...res.data });
          setPeoples(_peoples); 
        });
      };
  
      if (_people.name && _people.cpf.length === 11) {
        console.log("test");
        peopleAxios
          .post("", _people)
          .then((res) => {
            updateTable(res.data.cpf);
            notification("success", "Concluido", "Pessoa criada");
            hideDialogCreatePeople();
          })
          .catch((err) => {
            console.log(err.response.data);
            notification("error", "Erro", "Verifique se o Cpf ou o Telefone pertencem a outra pessoa");
          })
          .finally(() => {
            setPeople(emptyPeople);
          });
      } else {
        notification("error", "Erro", "Não foi possivel criar a pessoa");
      }
    };

    const saveUpdatePeople = () => {
      setSubmitted(true);
  
      let _peoples = [...peoples];
      let _people = { ...people };
      const cpf = _people.cpf;
  
      delete _people.cpf;
      delete _people.status;
  
      console.log(_people);

      const updateTable = () => {
        const index = peoples.findIndex((p) => p.id === people.id);
        peopleAxios.get(`SearchPeopleByCpf/${cpf}`).then((res) => {
          _peoples[index] = { ...res.data };
          console.log(res.data);
          setPeoples(_peoples);
        });
      };
  
      Object.keys(_people).forEach((peopleItem) => {
        console.log(peopleItem);
  
        if (_people[peopleItem] === "") {
          _people[peopleItem] = null;
        }
  
        _people = { ..._people };
      });
  
      if (_people.name) {
        peopleAxios
          .put("UpdatePeople", _people)
          .then((res) => {
            updateTable();
            notification(
              "success",
              "Concluido",
              "Os dados da pessoa foram editados"
            );
            hideUpdatePeopleDialog();
          })
          .catch((err) => {
            console.log(err.response.data);
            notification("error", "Erro", "Preencha todos os campos para editar");
          })
          .finally(() => {
            setPeople(emptyPeople);
          });
      } else {
        notification("error", "Erro", "Não foi possivel editar a pessoa");
      }
  
      console.log(_people);
    };

    const deletePeople = () => {
      peopleAxios
        .delete(`DeletePeople/${people.id}`)
        .then(() => {
          notification("success", "Concluido", "Essa pessoa foi excluida");
          const _peoples = peoples.filter((val) => val.id !== people.id);
          setPeoples(_peoples);
        })
        .catch(() => {
          notification("error", "Erro", "não foi possivel excluir essa pessoa");
        })
        .finally(() => {
          setPeople(emptyPeople);
        });
  
      setDeletePeopleDialog(false);
    };

    const toggleStatus = () => {
      const updateStatus = () => {
        const index = peoples.findIndex((c) => c.id === people.id);
        let _people = { ...people };
        if (_people.status === "Active") {
          _people.status = "Inactive";
        } else {
          _people.status = "Active";
        }
        peoples[index] = _people;
        console.log(peoples);
      };
  
      const updatePeople = () => {
        const index = peoples.findIndex((c) => c.id === people.id);
        let _peoples = [...peoples];
        let _people = { ...people };
        if (_people.status === "Active") {
          _people.status = "Inactive";
        } else {
          _people.status = "Active";
        }
        _people.idCompany = null;
        _people.company = null;
  
        _peoples[index] = _people;
        setPeoples(_peoples);
      };
  
      peopleAxios
        .put(`ChangeStatus/${people.id}`)
        .then((res) => {
          updateStatus();
          notification("success", "Concluido", "Status Alterado");
        })
        .then(() => {
          if (people.idCompany !== null) {
            notification(
              "info",
              "Atençao",
              "Essa pessoa foi retirada da empresa"
            );
            updatePeople();
          }
        })
        .catch((err) => {
          notification("error", "Erro", "Status não pode ser alterado");
        })
        .finally(() => {
          setPeople(emptyPeople);
        });
      setStatusPeopleDialog(false);
    };

    //open Dialog's
    const dialogCreatePeople = () => {
      setPeople(emptyPeople);
      console.log(people.cpf === null ? "" : people.cpf);
      setSubmitted(false);
      setCreatePeopleDialog(true);
    };

    const dialogSaveUpdatePeople = (people) => {
      let _people = { ...people };
  
      setPeople(_people);
      setSubmitted(false);
      setUpdatePeopleDialog(true);
    };

    const dialogDeletePeople = (people) => {
      setPeople(people);
      setDeletePeopleDialog(true);
    };

    const dialogCompanyList = (people) => {
      setPeople(people);
      companyAxios
        .get(`SearchCompany`)
        .then((res) => {
          setCompanies(res.data);
          setCompanyListDialog(true);
        })
        .catch()
        .finally();
    };

    const openStatusChangePeople = (people) => {
      setPeople(people);
      setStatusPeopleDialog(true);
    };
  
    //hide Dialog's
    const hideDialogCreatePeople = () => {
      setSubmitted(false);
      setCreatePeopleDialog(false);
    };

    const hideUpdatePeopleDialog = () => {
      setSubmitted(false);
      setPeople(emptyPeople);
      setUpdatePeopleDialog(false);
    };

    const hideDeletePeopleDialog = () => {
      setDeletePeopleDialog(false);
    };

    const hideViewPeopleComplete = () => {
      setCompanyListDialog(false);
    };

    const hideStatusPeopleDialog = () => {
      setStatusPeopleDialog(false);
    };

    //footer
    const createPeopleDialogFooter = (
      <React.Fragment>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDialogCreatePeople}
        />
        <Button
          label="Cadastrar"
          icon="pi pi-check"
          severity="success"
          onClick={saveCreatePeople}
        />
      </React.Fragment>
    );

    const updatePeopleDialogFooter = (
      <React.Fragment>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideUpdatePeopleDialog}
          severity="danger"
        />
        <Button
          label="Editar"
          icon="pi pi-check"
          onClick={saveUpdatePeople}
          severity="success"
        />
      </React.Fragment>
    );

    const deletePeopleDialogFooter = (
      <React.Fragment>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          autoFocus
          outlined
          onClick={hideDeletePeopleDialog}
        />
        <Button
          label="Deletar"
          icon="pi pi-check"
          severity="danger"
          onClick={deletePeople}
        />
      </React.Fragment>
    );

    const statusChangeDialogFooter = (
      <React.Fragment>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideStatusPeopleDialog}
          autoFocus
        />
        {people.status === "Active" ? (
          <Button
            label="Desativar"
            icon="pi pi-check"
            // severity="success"
            severity="danger"
            onClick={toggleStatus}
          />
        ) : (
          <Button
            label="Ativar"
            icon="pi pi-check"
            // severity="success"
            severity="success"
            onClick={toggleStatus}
          />
        )}
      </React.Fragment>
    );
  
  
    const actionBodyTemplate = (rowData) => {
        const statusSeverity = (data) => {
          if (data.status === "Active") {
            return "danger";
          }
          if (data.status === "Pending") {
            return "secondary";
          }
          return "success";
        };
    
        const statusIcon = (data) => {
          if (data.status === "Active") {
            return "ban";
          }
          return "check-circle";
        };
    
        const statusDisabled = (data) => {
          if (data.idCompany !== null){
            return true
          } else{
            if (data.status === "Pending") {
              return true;
            }
            return false;
          } 
        };
    
        const statusTooltip = (data) => {
          if (data.status === "Active") {
            return "Desativar Pessoa";
          }
          if (data.status === "pending") {
            return "Pessoa Pendente";
          }
    
          return "Ativar Pessoa";
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
              className="mr-2"
              outlined
              onClick={() => openStatusChangePeople(rowData)}
              tooltip={statusTooltip(rowData)}
              tooltipOptions={configTooltip}
            />
    
            <Button
              icon="pi pi-building"
              rounded
              outlined
              className="mr-2"
              disabled={rowData.status === "Inactive"}
              onClick={() => dialogCompanyList(rowData)}
              tooltip="View"
              tooltipOptions={configTooltip}
            />
    
            <Button
              icon="pi pi-pencil"
              rounded
              outlined
              className="mr-2"
              severity="warning"
              disabled={rowData.status === "Inactive"}
              onClick={() => dialogSaveUpdatePeople(rowData)}
              tooltip="Editar"
              tooltipOptions={configTooltip}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              className="mr-2"
              severity="danger"
              onClick={() => dialogDeletePeople(rowData)}
              disabled={rowData.idCompany !== null}
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
                label="Cadastrar Pessoa"
                icon="pi pi-plus"
                severity="success"
                onClick={dialogCreatePeople}
            />
        </HeaderContainer>  
    );

    return (
        <div>
          <Toast ref={toast} />
          {err && navigate("/Error")}
          <TableContainer>
            {loading ? (
              <LoadingTablePeople />
            ) : (
              <DataTable
                value={peoples}
                loading={loading}
                emptyMessage="A tabela ainda não possui dados"
                dataKey="id"
                sortField="id"
                sortOrder={-1}
                selectionMode="single"
                paginator
                scrollable
                scrollHeight="flex"
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} people"
                globalFilter={globalFilter} 
                header={header}             
              >
                    <Column field="id" header="Id" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="name" header="Nome" body={nameBodyTemplate} style={{ minWidth: '10rem' }}></Column>
                    <Column field="userName" header="Nome de Usuario" body={userNameBodyTemplate} style={{ minWidth: '12rem' }}></Column>
                    <Column field="cpf" header="Cpf" body={cpfBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="numberContact" header="Contato" body={contactBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={companyStatusBodyTemplate} field="company.companyName" header="Empresa" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: "9rem" }}></Column>

              </DataTable>
            )} 
          </TableContainer>

          {/* create people dialog */}
          <Dialog
            visible={createPeopleDialog}
            style={{ width: "30rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Cadastrar Pessoa"
            modal
            className="p-fluid"
            footer={createPeopleDialogFooter}
            onHide={hideDialogCreatePeople}
          >
            <People>
              {/* name */}
              <InputContainer className="name">
                <span className="p-float-label">
                  <InputText
                    id="name"
                    value={people.name || ""}
                    onChange={(e) => onInputChangePeople(e, "name")}
                    autoFocus
                    maxLength={50}
                    className={classNames({
                      "p-invalid": submitted && !people.name,
                    })}
                  />
                  <label htmlFor="name">Nome</label>
                </span>
                {submitted && !people.name && (
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
              </InputContainer>

              {/* userName */}
              <InputContainer className="userName">
                <span className="p-float-label">
                  <InputText
                    id="userName"
                    value={people.userName || ""}
                    maxLength={20}
                    onChange={(e) => onInputChangePeople(e, "userName")}
                  />
                  <label htmlFor="userName">Nome de Usuario</label>
                </span>
                {submitted && !people.userName && (
                  <Message
                    style={{
                      background: "none",
                      justifyContent: "start",
                      padding: "5px",
                    }}
                    severity="error"
                    text="O nome de usuario é obrigatorio"
                  />
                )}
              </InputContainer>

              {/* cpf */}
              <InputContainer className="cpf">
                <span className="p-float-label">
                  <InputMask
                    id="cpf"
                    mask="999.999.999-99"
                    unmask={true}
                    value={people.cpf || ""}
                    onChange={(e) => onInputChangePeople(e, "cpf")}
                    required
                    // autoClear={false}
                    className={classNames({
                      "p-invalid":
                        (submitted && !people.cpf) ||
                        (submitted && people.cpf?.length < 11),
                    })}
                  />
                  <label htmlFor="cpf">Cpf</label>
                </span>
                {submitted && !people.cpf && (
                  <Message
                    style={{
                      background: "none",
                      justifyContent: "start",
                      padding: "5px",
                    }}
                    severity="error"
                    text="Cpf é obrigatorio"
                  />
                )}
              </InputContainer>

              {/* numberContact */}
              <InputContainer className="numberContact">
                <span className="p-float-label">
                  <InputMask
                    id="numberContact"
                    mask="(99) 99999-9999"
                    unmask={true}
                    onChange={(e) => onInputChangePeople(e, "numberContact")}
                    value={people.phone || ""}
                  />
                  <label htmlFor="numberContact">Contato</label>
                </span>
                {submitted && !people.numberContact && (
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
              </InputContainer>
            </People>
          </Dialog>

          {/* edit people dialog */}
          <Dialog
            visible={updatePeopleDialog}
            style={{ width: "30rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Editar Pessoa"
            modal
            className="p-fluid"
            footer={updatePeopleDialogFooter}
            onHide={hideUpdatePeopleDialog}
          >
            <People>
              {/* name */}
              <InputContainer className="name">
                <span className="p-float-label">
                  <InputText
                    id="name"
                    value={people.name}
                    maxLength={50}
                    onChange={(e) => onInputChangePeople(e, "name")}
                    autoFocus
                    className={classNames({
                      "p-invalid": submitted && !people.name,
                    })}
                  />
                  <label htmlFor="name">Nome</label>
                </span>
                {submitted && !people.name && (
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
              </InputContainer>

              {/* userName */}
              <InputContainer className="userName">
                <span className="p-float-label">
                  <InputText
                    id="userName"
                    value={people.userName}
                    maxLength={20}
                    onChange={(e) => onInputChangePeople(e, "userName")}
                  />
                  <label htmlFor="userName">Nome de Usuario</label>
                </span>
                {submitted && !people.userName && (
                  <Message
                    style={{
                      background: "none",
                      justifyContent: "start",
                      padding: "5px",
                    }}
                    severity="error"
                    text="O nome de usuario é obrigatorio"
                  />
                )}
              </InputContainer>

              {/* numberContact */}
              <InputContainer className="numberContact">
                <span className="p-float-label">
                  <InputMask
                    id="numberContact"
                    mask="(99) 99999-9999"
                    unmask={true}
                    onChange={(e) => onInputChangePeople(e, "numberContact")}
                    value={people.numberContact}
                  />
                  <label htmlFor="numberContact">Contato</label>
                </span>
                {submitted && !people.numberContact && (
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
              </InputContainer>
            </People>
          </Dialog>

          {/* delete people dialog */}
          <Dialog
            visible={deletePeopleDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Deletar Pessoa"
            modal
            footer={deletePeopleDialogFooter}
            onHide={hideDeletePeopleDialog}
          >
            <Text>
              <span>Tem certeza que deseja excluir essa pessoa?</span>
            </Text>
          </Dialog>

          {/* people complete */}
          <Dialog
            visible={companyListDialog}
            style={{ width: "55rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header={`Informações sobre "${people.name}"`}
            modal
            className="p-fluid"
            onHide={hideViewPeopleComplete}
          >
            {people.companyc}
            <CompanyList value={companies} peopleValue={people} />
          </Dialog>

          {/* Status */}
          <StatusChange
            visible={statusPeopleDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Mudança de Status"
            modal
            footer={statusChangeDialogFooter}
            onHide={hideStatusPeopleDialog}
          >
            <Text>
              {people.status === "Active" ? (
                <span>
                  Desativar Pessoa {people.name}
                </span>
              ) : (
                <span>
                  Ativar Pessoa {people.name}
                </span>
              )}
            </Text>
          </StatusChange>

        </div>
    );
};

