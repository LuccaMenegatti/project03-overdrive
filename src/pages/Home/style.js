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

export const Paragrafo = styled("p", {
    textAlign: "justify",
    fontSize:"1.3rem",
});


