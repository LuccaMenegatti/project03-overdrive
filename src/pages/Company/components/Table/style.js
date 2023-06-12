import { styled } from "../../../../config/stitches";

export const Container = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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

export const AddressView = styled("div", {
  gridColumnStart: "1",
  gridColumnEnd: "5",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",

  "& .cep": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },

  "& .street": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },

  "& .number": {
    gridColumnStart: "4",
    gridColumnEnd: "5",
  },

  "& .district": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },

  "& .city": {
    gridColumnStart: "3",
    gridColumnEnd: "5",
  },

  "& .contact": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
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

export const Company = styled("div", {
  marginTop: "1rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
});

export const CompanyName = styled(FormEdit, {
  "&.companyName": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "&.fantasyName": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
});

export const StartDate = styled(FormEdit, {
  gridColumnStart: "3",
  gridColumnEnd: "5",
});

export const Cnpj = styled(FormEdit, {
  gridColumnStart: "1",
  gridColumnEnd: "3",
});

export const Cnae = styled(FormEdit, {
  gridColumnStart: "3",
  gridColumnEnd: "5",
});

export const LegalNature = styled(FormEdit, {
  gridColumnStart: "1",
  gridColumnEnd: "3",
});

export const Finance = styled(FormEdit, {
  gridColumnStart: "3",
  gridColumnEnd: "5",
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

export const Cep = styled(FormEdit, {
  gridColumnStart: "1",
  gridColumnEnd: "5",
});
export const Street = styled(FormEdit, {
  gridColumnStart: "1",
  gridColumnEnd: "4",
});

export const Number = styled(FormEdit, {});

export const District = styled(FormEdit, {
  gridColumnStart: "1",
  gridColumnEnd: "5",
});

export const City = styled(FormEdit, {
  gridColumnStart: "1",
  gridColumnEnd: "5",
});

export const Contact = styled(FormEdit, {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  });
