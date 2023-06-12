import { styled } from "../../../../config/stitches";

export const Container = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ViewData = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",

  "& .name": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },

  "& .userName": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },

  "& .id": {
    gridColumnStart: "1",
    gridColumnEnd: "2",
  },

  "& .cpf": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },

  "& .status": {
    // Estilos para a classe .status
  },

  "& .numberContact": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },
});

export const CompanyView = styled("div", {
  gridColumnStart: "1",
  gridColumnEnd: "5",
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

  "& .status": {
    // Estilos para a classe .status
  },

  "& .id": {
    gridColumnStart: "1",
    gridColumnEnd: "2",
  },

  "& .cnpj": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },

  "& .cnae": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },

  "& .startDate": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },

  "& .finance": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },

  "& .legalNature": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
});

export const PersonContainer = styled("div", {
  flexWrap: "wrap",
  justifyContent: "space-around",
});

export const Person = styled("div", {
  display: "flex",
  margin: ".2rem",
  fontSize: "1.2rem",
});

export const PersonData = styled("div", {
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

const FormEdit = styled("div", {
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

export const People = styled("div", {
  marginTop: "1rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
});

export const PeopleName = styled(FormEdit, {
  "&.name": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
  "&.userName": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },
});

export const Cpf = styled(FormEdit, {
  gridColumnStart: "1",
  gridColumnEnd: "3",
});

export const NumberContact = styled(FormEdit, {
  gridColumnStart: "3",
  gridColumnEnd: "5",
});

export const Company = styled(FormEdit, {
  gridColumnStart: "1",
  gridColumnEnd: "5",
});
