import { styled } from "../../../../config/stitches";

const container = styled("div", {
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

export const CompanyName = styled(container, {
  "&.companyName": {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  },
  "&.fantasyName": {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  },
});

export const StartDate = styled(container, {
  gridColumnStart: "3",
  gridColumnEnd: "5",
});

export const Cnpj = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "3",
});

export const Cnae = styled(container, {
  gridColumnStart: "3",
  gridColumnEnd: "5",
});

export const LegalNature = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "3",
});

export const Finance = styled(container, {
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

export const Cep = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "5",
});
export const Street = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "4",
});

export const Number = styled(container, {});

export const District = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "5",
});

export const City = styled(container, {
  gridColumnStart: "1",
  gridColumnEnd: "5",
});

export const Contact = styled(container, {
    gridColumnStart: "1",
    gridColumnEnd: "5",
  });
