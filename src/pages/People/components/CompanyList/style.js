import { styled } from "../../../../config/stitches";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export const AddPeopleInCompany = styled(Dialog, {
});
export const RemovePeopleInCompany = styled(Dialog, {
});

export const Text = styled("div", {
  textAlign: "left",
  paddingTop: "1rem",
  "& span": {
    fontSize: "1.2rem",
    verticalAlign: "middle",
  },
});

export const Container = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
});

export const Company = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "90%",
  justifyContent: "space-between",
});

export const Icon = styled("i", {
  padding: "1.5rem 1.7rem",
  borderRadius: "10px",
  "&.pi": {
    fontSize: "3.8rem",
    verticalAlign: "middle",
  },
});

export const CompanyInfo = styled("i", {
  flexDirection: "column",
  fontStyle: "normal",
  flexWrap: "wrap",
  width: "80%",
});

export const Name = styled("div", {
  fontSize: "1.2rem",
  marginBottom: "1rem",

  "& label": {
    padding: "0.3rem",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  "& span": {
    padding: "0.24rem",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
});

export const TextView = styled("div", {
  fontSize: "1.5rem",
  marginBottom: "1rem",

  "& label": {
    padding: "0.3rem",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  "& span": {
    border: "1px solid #000",
    padding: "0.24rem",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
});

export const Cnpj = styled("div", {
  fontSize: "1.2rem",
  paddingBottom: "1rem",
  "& label": {
    padding: "0.3rem",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
  "& span": {
    padding: "0.24rem",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
});

export const IconView = styled("i", {
  margin: "0.3rem",
  padding: ".4rem .6rem",
  borderRadius: "10px",
  "&.pi": {
    fontSize: "4rem",
    verticalAlign: "middle",
  },
});

export const ViewData = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
});

export const ViewPerson = styled("div", {
  paddingTop: "1rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  paddingBottom: "1rem",
  "& h3": {
    gridColumnStart: "1",
    gridColumnEnd: "6",
    fontSize: "1.2rem",
    textAlign: "center",
  },
  "& .name": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },
  "& .userName": {
    gridColumnStart: "4",
    gridColumnEnd: "6",
  },

  "& .cpf": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },
  "& .numberContact": {
    gridColumnStart: "4",
    gridColumnEnd: "6",
  },
});

export const ViewCompany = styled("div", {
  paddingTop: "1rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  "& h3": {
    gridColumnStart: "1",
    gridColumnEnd: "6",
    fontSize: "1.2rem",
    textAlign: "center",
  },

  "& Button": {
    marginTop: "2rem",
    gridColumnStart: "2",
    gridColumnEnd: "5",
    fontSize: "1.2rem",
    textAlign: "center",
  },

  "& .companyName": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },
  "& .fantasyName": {
    gridColumnStart: "4",
    gridColumnEnd: "6",
  },

  "& .cnae": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },
  "& .legalNature": {
    gridColumnStart: "4",
    gridColumnEnd: "6",
  },

  "& .cnpj": {
    gridColumnStart: "1",
    gridColumnEnd: "4",
  },

  "& .startDate": {
    gridColumnStart: "4",
    gridColumnEnd: "6",
  },
  "& .finance": {
    gridColumnStart: "1",
    gridColumnEnd: "6",
  },
});