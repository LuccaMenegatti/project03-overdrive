import { styled } from "../../../../config/stitches";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";

export const TableContainer = styled("div", {
  height: "84vh",
});

export const HeaderContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const CalendarCreate = styled(Calendar, {
  "&.p-calendar-w-btn-right .p-datepicker-trigger": {
    background: "$green500",
    border: "1px solid $green500",
  },
  "&.p-calendar-w-btn-right .p-datepicker-trigger:hover": {
    background: "$green600",
    border: "1px solid $green600",
  },
});

export const CalendarEdit = styled(Calendar, {
  "&.p-calendar-w-btn-right .p-datepicker-trigger": {
    background: "$yellow500",
    border: "1px solid $yellow500",
  },
  "&.p-calendar-w-btn-right .p-datepicker-trigger:hover": {
    background: "$yellow600",
    border: "1px solid $yellow600",
  },
});

export const StatusChange = styled(Dialog, {
  variants: {
    headerStyle: {
      active: {
        "&.p-dialog .p-dialog-header": {
        },
        "&.p-dialog .p-dialog-header .p-dialog-header-icon": {
        },
      },

      inactive: {
        "&.p-dialog .p-dialog-header": {
        },
        "&.p-dialog .p-dialog-header .p-dialog-header-icon": {
        },
      },
    },
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

export const People = styled("div", {
  marginTop: "1rem",
  display: "grid",
});

export const InputContainer = styled("div", {
  margin: "1rem 1rem",
  display: "inline-block",
  "& .p-float-label input:focus ~ label, .p-float-label input:-webkit-autofill ~ label, .p-float-label input.p-filled ~ label, .p-float-label textarea:focus ~ label, .p-float-label textarea.p-filled ~ label, .p-float-label .p-inputwrapper-focus ~ label, .p-float-label .p-inputwrapper-filled ~ label, .p-float-label .p-tooltip-target-wrapper ~ label ":
    {
      color: "#222",
      fontSize: "18px",
      top: "-0.95rem",
      left: "0.5rem",
    },
});

export const ViewData = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  "& .peopleName": {
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

export const PeopleContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
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