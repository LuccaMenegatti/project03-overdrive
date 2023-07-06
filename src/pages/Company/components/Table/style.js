import { styled } from "../../../../config/stitches";
import { Calendar } from "primereact/calendar";

export const TableContainer = styled("div", {
  height: "84vh",
});

export const HeaderContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const CalendarTemplate = styled(Calendar, {
  "&.p-calendar-w-btn-right .p-datepicker-trigger": {
    border: "1px solid black",
  },
  "&.p-calendar-w-btn-right .p-datepicker-trigger:hover": {
    border: "1px solid black",
  },
});


export const Text = styled("div", {
  textAlign: "left",
  paddingTop: "1rem",
  "& span": {
    fontSize: "1.2rem",
    verticalAlign: "middle",
  },
});

export const ActionTemplate = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Company = styled("div", {
  marginTop: "1rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
});

export const Input = styled("div", {
  margin: "1rem 1rem",
  display: "inline-block",
  "& .p-float-label input:focus ~ label, .p-float-label input:-webkit-autofill ~ label, .p-float-label input.p-filled ~ label, .p-float-label textarea:focus ~ label, .p-float-label textarea.p-filled ~ label, .p-float-label .p-inputwrapper-focus ~ label, .p-float-label .p-inputwrapper-filled ~ label, .p-float-label .p-tooltip-target-wrapper ~ label ":
    {
      color: "#222",
      fontSize: "18px",
      top: "-0.95rem",
      left: "0.5rem",
    },

  "&.companyName": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "&.fantasyName": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "&.fantasyNameEdit": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "&.startDate": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },
  "&.cnpj": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "&.cnae": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },
  "&.cnaeEdit": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "&.legalNatureEdit": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },
  "&.legalNature": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "&.finance": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },
  "&.financeEdit": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },

  "&.cep": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "&.street": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },
  "&.number": {},
  "&.district": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "&.city": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "&.contact": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
});

export const ViewData = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  "& .companyName": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "& .fantasyName": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },
  "& .id": {
    gridColumnStart: "1",
    gridColumnEnd: "2",
  },
  "& .cnpj": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "& .status": {
    // Estilos para a classe .status
  },

  "& .cnae": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },
  "& .legalNature": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "& .startDate": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },
  "& .finance": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
});

export const Icon = styled("i", {
  "&.pi": {
    fontSize: "1.2rem",
    marginRight: "0.4rem",
    verticalAlign: "middle",
  },
});

export const TextHeader = styled("i", {
  fontSize: "1rem",
  textAlign: "center",
  verticalAlign: "middle",
});

export const People = styled("div", {
  margin: ".2rem",
  fontSize: "1.2rem",
});

export const PeopleData = styled("div", {
  display: "flex",
  margin: ".2rem",
  alignItems: "center",

  "& label": {
    padding: ".3rem",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  "& li": {
    listStyle: "none",
    padding: ".3rem",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    width: "100%",
  },
});

export const Address = styled("fieldset", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  marginTop: "1rem",
  border: "2px solid rgb(102 102 102 / 18%)",
  paddingTop: "1rem",
  "& legend": {
    fontSize: "20px",
    marginLeft: "1rem",
  },
});

export const AddressComplete = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  "& .cep": { gridColumnStart: "1", gridColumnEnd: "5" },
  "& .street": { gridColumnStart: "1", gridColumnEnd: "4" },
  "& .number": { gridColumnStart: "4", gridColumnEnd: "5" },
  "& .district": { gridColumnStart: "1", gridColumnEnd: "5" },
  "& .city": { gridColumnStart: "1", gridColumnEnd: "5" },
  "& .contact": { gridColumnStart: "1", gridColumnEnd: "5" },
});