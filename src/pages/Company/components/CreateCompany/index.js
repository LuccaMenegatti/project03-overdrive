import { Dialog } from "primereact/dialog";
import React, { useState, useRef } from "react";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import "primeicons/primeicons.css";
import { useAxios } from "../../../../hooks/useAxios";
import { useContext } from "react";
import { CompanyContext } from "../../context/CompanyContext";

import {
  District,
  Cnae,
  Cnpj,
  Cep,
  City,
  StartDate,
  Contact,
  Finance,
  CompanyName,
  LegalNature,
  Number,
  Street,
  Address,
  Company,
} from "./style";

import { useAddress } from "../../../../hooks/useAddress";

const CreateCompanyDialog = (props) => {
  let emptyCompany = {
    cnpj: null,
    startDate: null,
    companyName: null,
    fantasyName: null,
    cnae: null,
    legalNature: null,
    finance: null,
    address: {
      cep: null,
      street: null,
      district: null,
      number: null,
      city: null,
      contact: null,
    },
  };

  const { data, CreateCompany, GetCompany, getData} = useAxios();
  const { address, getAddress } = useAddress();
  const { companyDialog, setCompanyDialog } = useContext(CompanyContext);
  const [company, setCompany] = useState(emptyCompany);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);

  const hideDialog = () => {
    setSubmitted(false);
    setCompanyDialog(false);
    setCompany(emptyCompany);
  };

  const saveCompany = () => {
    setSubmitted(true);
    CreateCompany("Company", company);
    setCompanyDialog(false);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";

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

  const companyDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveCompany} />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Dialog
        visible={companyDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Cadastro de Empresas"
        modal
        className="p-fluid"
        footer={companyDialogFooter}
        onHide={hideDialog}>

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
                className={classNames({
                  "p-invalid": submitted && !company.name,
                })}
              />
              <label htmlFor="cnpj"> Cnpj </label>
            </span>
            {submitted && !company.cnpj && (
              <small className="p-error">O Campo Cnpj é obrigatório.</small>
            )}
            {submitted && company.cnpj.length < 14 && (
              <small className="p-error">O Campo Cnpj deve ter 14 numeros.</small>
            )}
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
              <InputText
                id="contact"
                value={company.address.contact}
                onChange={(e) => onInputAddressChange(e, "contact")}
              />
              <label htmlFor="contact">Numero para Contato</label>
            </span>
          </Contact>
        </Address>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateCompanyDialog;
