import { ErrorPageContainer, ErrorIcon, ErrorHeading, ErrorMessage } from "./style";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <ErrorPageContainer>
      <ErrorIcon />
      <ErrorHeading>{'Erro na requisição'}</ErrorHeading>
      <ErrorMessage>{'Tente acessar uma nova pagina no menu superior'}</ErrorMessage>
    </ErrorPageContainer>
  );
};

export default Error;