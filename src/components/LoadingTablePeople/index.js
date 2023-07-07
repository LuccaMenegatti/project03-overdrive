import React from "react";

//primereact
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";

//estilos
import { ButtonLoading, HeaderContainer } from "./style";

const LoadingTablePeople = () => {
  const items = Array.from({ length: 5 }, (v, i) => i);

  const header = (
    <HeaderContainer>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText 
                type="search" 
                placeholder="Pesquisar..." 
            />
        </span>

        <Button
            label="Cadastrar Pessoa"
            icon="pi pi-plus"
            severity="success"
        />
    </HeaderContainer>
  );

  const cellTemplate = () => {
    return <Skeleton></Skeleton>;
  };
  const buttonTemplate = () => {
    return (
      <ButtonLoading>
        <Skeleton shape="circle" size="2.4rem" className="mr-2"></Skeleton>
        <Skeleton shape="circle" size="2.4rem" className="mr-2"></Skeleton>
        <Skeleton shape="circle" size="2.4rem" className="mr-2"></Skeleton>
        <Skeleton shape="circle" size="2.4rem" className="mr-2"></Skeleton>
      </ButtonLoading>
    );
  };

  return (
    <DataTable
      dataKey="id"
      removableSort
      paginator 
      rows={10}
      rowsPerPageOptions={[5, 10, 25]}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      value={items}
      header={header}
    >
        <Column field="id" header="Id" body={cellTemplate} sortable style={{ minWidth: '5rem' }}></Column>
        <Column field="name" header="Nome" body={cellTemplate} sortable style={{ minWidth: '10rem' }}></Column>
        <Column field="userName" header="Nome de Usuario" body={cellTemplate} sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="cpf" header="Cpf" body={cellTemplate} sortable style={{ minWidth: '10rem' }}></Column>
        <Column field="numberContact" header="Contato" body={cellTemplate} sortable style={{ minWidth: '10rem' }}></Column>
        <Column field="company.name" header="Empresa" body={cellTemplate} sortable style={{ minWidth: '10rem' }}></Column>
        <Column field="status" header="Status" body={cellTemplate} sortable style={{ minWidth: '10rem' }}></Column>
        <Column body={buttonTemplate} exportable={false} style={{ minWidth: "9rem" }}></Column>

    </DataTable>
  );
};

export default LoadingTablePeople;