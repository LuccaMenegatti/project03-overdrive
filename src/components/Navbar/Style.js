import { styled } from "../../config/stitches";

export const Title = styled("h1", {
  fontSize: "2 rem",
});

export const Cabecalho = styled("nav", {
  height: "12vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#222326",
  fontSize: "1rem",
  padding: "0 1rem",

  "& a": {
    textDecoration: "none",
    color: "#fff",
    padding: "0.7rem",
    borderRadius: "3rem",
    fontWeight: "bold",
    transition: ".5s all",
  },
  "& a:hover": {
    color: "#D71818",
  },
});

export const LogoOverdrive = styled("img", {
  height: "37.5px",
  width: "187.5px",
  margin: "10px",
  textAlign: "center",
});

export const Ul = styled("ul", {
  display: "flex",
  margin: 0,
});

export const Li = styled("li", {
  listStyle: "none",
  marginLeft: "30px",
});


  