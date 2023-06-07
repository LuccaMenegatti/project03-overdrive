import { styled } from "../../config/stitches";

export const Cabecalho = styled ("nav", { 
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor:"#222326",
  
   "& a" : {
    display: "flex",
    alignItems: "right",
    marginRight: "20px",
    gap: "0.5rem",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    transition: ".5s all",
  },

  "& a:hover" : {
    color: "#D71818",
  },
});
  
  
export const LogoOverdrive = styled("img", {
    height: "37.5px",
    width: "187.5px",
    margin: "auto",
    marginTop: "5px",
    marginBottom: "5px",
    textAlign: "center",
});


  