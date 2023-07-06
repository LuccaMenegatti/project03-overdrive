import { styled } from "../../config/stitches";

export const HomeDiv = styled("div", {
    width: "100%",
    color: "#000",
    height: "100%",
    display: "block",
    position: "relative",
    zIndex: "1",

    '&::before': {
        position: "absolute",
        content: '',
        width: "100%",
        top:"0",
        left: "0",
        zIndex: "-1",
    }
});

export const Content = styled("div", {
    display: "flex",
    padding: "80px 10%",
    justifyContent: "space-between",
});

export const Info = styled("div", {
    "&.h1": {
        fontSize: "40px",
    },
    
    "&.p": {
        fontSize: '1.2rem',
    
    },
});

export const Buttons = styled("div", {
    padding: "20px",
    marginTop: "140px",
});

export const Lista = styled("ul", {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-between",
});

export const ButtonLink = styled("a", {
    padding: "9px 25px",
    border: "none",
    bordeRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease 0s",
});


  
