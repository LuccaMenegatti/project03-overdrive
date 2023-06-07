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

export const Address = styled("div", {
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