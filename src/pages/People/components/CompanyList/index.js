import "primeflex/primeflex.css";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";

import React, { useContext, useRef, useState } from "react";

import { useMask } from "../../../../hooks/useMask";
import {
  Container,
  Company,
  Name,
  CompanyInfo,
  Cnpj,
  Text,
  AddPeopleInCompany,
  ViewData,
  ViewPerson,
  ViewCompany,
  RemovePeopleInCompany,
} from "./style";

import {
  companyAxios,
  peopleAxios,
} from "../../../../config/axios";

import TextData from "../../../../components/TextData";
import { PeopleContext } from "../../context/PeopleContext";
import { Toast } from "primereact/toast";

const CompanyList = ({ value, peopleValue }) => {

  const {
        cnpjBodyTemplate,
        cpfBodyTemplate,
        contactBodyTemplate,
        dateBodyTemplate,
        priceBodyTemplate,
    } = useMask();

  const [company, setCompany] = useState(null);
  const { people, setPeople, peoples, setPeoples } = useContext(PeopleContext);
  const [addPeopleInCompanyDialog, setAddPeopleInCompanyDialog] = useState(false);
  const [removePeopleInCompanyDialog, setRemovePeopleInCompanyDialog] = useState(false);
  const toast = useRef(null);

  const notification = (severity, summary, text) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: text,
      life: 3000,
    });
  };

  const addPeopleInCompany = () => {
    let _company = { ...company };
    let _people = { ...people };
    let _peoples = [...peoples];

    _people.idCompany = _company.id;
    _people.company = _company;

    const index = peoples.findIndex((p) => p.id == _people.id);
    _peoples[index] = _people;

    peopleAxios
      .put(`AddPeopleInCompany/${people.id}/${company.id}`)
      .then((res) => {
        console.log(res.data.id);
        setPeople(_people);
        setPeoples(_peoples);
        console.log(_peoples);
        console.log(_people);
        notification(
          "success",
          "Concluido",
          "Funcionario adicionado na empresa"
        );
        hideAddPeopleInCompanyDialog();
      });
  };

  const removePeopleInCompany = () => {
    let _people = { ...people };
    let _peoples = [...peoples];

    _people.idCompany = null;
    _people.company = null;

    const index = peoples.findIndex((p) => p.id == _people.id);
    _peoples[index] = _people;

    peopleAxios.put(`RemovePeopleInCompany/${people.id}`).then(() => {
      setPeople(_people);
      setPeoples(_peoples);
      console.log(_peoples);
      console.log(_people);
      notification("success", "Concluido", "Funcionario removido da empresa");
      hideRemovePeopleInCompanyDialog();
    });
  };

  const openAddPeopleInCompanyDialog = (company) => {
    setCompany(company);
    setAddPeopleInCompanyDialog(true);
  };

  const openRemovePeopleInCompanyDialog = (company) => {
    setCompany(company);
    setRemovePeopleInCompanyDialog(true);
  };

  const hideAddPeopleInCompanyDialog = () => {
    setAddPeopleInCompanyDialog(false);
  };

  const hideRemovePeopleInCompanyDialog = () => {
    setRemovePeopleInCompanyDialog(false);
  };

  const addPeopleInCompanyDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        autoFocus
        outlined
        onClick={hideAddPeopleInCompanyDialog}
      />
      <Button
        label="Adicionar"
        icon="pi pi-check"
        severity="success"
        onClick={addPeopleInCompany}
      />
    </React.Fragment>
  );
  const removePeopleInCompanyDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        autoFocus
        outlined
        onClick={hideRemovePeopleInCompanyDialog}
      />

      <Button
        label="Remover"
        icon="pi pi-check"
        severity="danger"
        onClick={removePeopleInCompany}
      />
    </React.Fragment>
  );

  const companyList = (company) => {
    return (
      <Container>
        <Company>
          <CompanyInfo>
            <Name>
              <label htmlFor="">Nome:</label>
              <span>{company.companyName}</span>
            </Name>
            <Cnpj>
              <label htmlFor="">Cnpj:</label>
              <span>{cnpjBodyTemplate(company)}</span>
            </Cnpj>
          </CompanyInfo>
        </Company>
        <Button
          icon="pi pi-plus"
          size="large"
          className="p-button-rounded"
          disabled={company.status !== "Active"}
          onClick={() => openAddPeopleInCompanyDialog(company)}
        ></Button>
      </Container>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      {people.idCompany != null ?  (
        <ViewData>
          <ViewPerson>
            <h3>Dados do Funcionário</h3>
            <TextData
              data={people.name}
              name="Nome"
              className="name"
            />
             <TextData
              data={people.userName}
              name="Nome de Usuario"
              className="userName"
            />
             <TextData
              data={cpfBodyTemplate(people)}
              name="Cpf"
              className="cpf"
            />
             <TextData
              data={contactBodyTemplate(people)}
              name="Contato"
              className="numberContact"
            />
          </ViewPerson>

          <ViewCompany>
            <h3>Empresa Contratante</h3>
            <TextData
              data={people.company.companyName}
              name="Empresa"
              className="companyName"
            />
            <TextData
              data={people.company.fantasyName}
              name="Nome Fantasia"
              className="fantasyName"
            />
            <TextData data={people.company.cnae} name="Cnae" className="cnae" />

            <TextData
              data={people.company.legalNature}
              name="Natureza Legal"
              className="legalNature"
            />
            <TextData
              icon="pi-building"
              data={cnpjBodyTemplate(people.company)}
              name="Cnpj"
              className="cnpj"
            />

            <TextData
              icon="pi-calendar"
              data={dateBodyTemplate(people.company)}
              name="Fundação"
              className="startDate"
            />

            <TextData
              icon="pi-dollar"
              data={priceBodyTemplate(people.company)}
              name="Capital Financeiro"
              className="finance"
            />

            <Button
               label="Remover da Empresa"
              severity="danger"
              // disabled={company.status !== "Active"}
              onClick={() => openRemovePeopleInCompanyDialog(company)}
            ></Button>
          </ViewCompany>
        </ViewData>
      ) : (
        <DataView value={value} itemTemplate={companyList} />
      )}

      <AddPeopleInCompany
        visible={addPeopleInCompanyDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={`Adicionar na empresa`}
        modal
        footer={addPeopleInCompanyDialogFooter}
        onHide={hideAddPeopleInCompanyDialog}
      >
        <Text>
          <span>Deseja adicionar {people.name} a essa empresa? </span>
        </Text>
      </AddPeopleInCompany>

      <RemovePeopleInCompany
        visible={removePeopleInCompanyDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={`Remover ${people.name} da Empresa?`}
        modal
        footer={removePeopleInCompanyDialogFooter}
        onHide={hideRemovePeopleInCompanyDialog}
      >
        <Text>
          <span>Essa ação é definiva, deseja continuar? </span>
        </Text>
      </RemovePeopleInCompany>
    </div>
  );
};

export default CompanyList;