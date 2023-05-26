
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import "primeicons/primeicons.css";
import { useAxios } from '../../../../hooks/useAxios';
import { Container } from "./style";

export default function ProductsDemo() {
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

    const {data} = useAxios("Company/SearchCompany");
    const [company, setCompany] = useState(emptyCompany);
    const [companies, setCompanies] = useState(data);
    const [companyDialog, setCompanyDialog] = useState(false);
    const [deleteCompanyDialog, setDeleteCompanyDialog] = useState(false);
    const [deleteCompaniesDialog, setDeleteCompaniesDialog] = useState(false);
    const [selectedCompanies, setSelectedCompanies] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    // useEffect(() => {
    //     ProductService.getProducts().then((data) => setProducts(data));
    // }, []);

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

    const deleteCompany = () => {
        let _companies = companies.filter((val) => val.id !== company.id);

        setCompanies(_companies);
        setDeleteCompanyDialog(false);
        setCompany(emptyCompany);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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
                    icon="pi pi-ellipsis-h"
                    rounded
                    outlined
                    severity="warning"
                    // onClick={() => expandCompanyInfo(rowData)}
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
        return cnpj.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
    };

    const maskCnae = (cnae) => {
        return cnae.replace(
          /^(\d{4})(\d{1})(\d{2})/,
          "$1-$2/$3"
        );
    };

    const maskDate = (date) => {
        return date.split("T")[0].split("-").reverse().join("/");
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
        return value.toLocaleString('pt-RS', { style: 'currency', currency: 'BRL' });
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
                 <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
             </span>

            <Button
                label="New"
                icon="pi pi-plus"
                severity="success"
                onClick={openNew}
            />
         </Container>
         
     );

    const companyDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveCompany} />
        </React.Fragment>
    );

    const deleteCompanyDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCompanyDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCompany} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">

                <DataTable ref={dt} 
                    value={data} 
                    selection={selectedCompanies} 
                    onSelectionChange={(e) => setSelectedCompanies(e.value)}
                    dataKey="id"  
                    paginator rows={10} 
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" 
                    globalFilter={globalFilter}
                    header={header}>

                    {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                    <Column field="id" header="Id" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="companyName" header="Nome" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="cnpj" header="Cnpj" body={cnpjBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="cnae" header="Cnae" body={cnaeBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    {/* <Column field="image" header="Image" body={imageBodyTemplate}></Column> */}
                    <Column field="finance" header="Finanças" body={priceBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="startDate" header="Fundação" body={dateBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={companyDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Company Details" modal className="p-fluid" footer={companyDialogFooter} onHide={hideDialog}>
                {company.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${company.image}`} alt={company.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={company.companyName} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !company.companyName })} />
                    {submitted && !company.companyName && <small className="p-error">Name is required.</small>}
                </div>
                {/* <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div> */}

                {/* <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div> */}

                {/* <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div> */}
            </Dialog>

            <Dialog visible={deleteCompanyDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteCompanyDialogFooter} onHide={hideDeleteCompanyDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {company && (
                        <span>
                            Are you sure you want to delete <b>{company.companyName}</b>?
                        </span>
                    )}
                </div>
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
        