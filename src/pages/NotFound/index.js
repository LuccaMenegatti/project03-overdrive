import { NotFoundPageContainer , NotFoundIcon , NotFoundHeading , NotFoundMessage  } from "./style";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundPageContainer>
      <NotFoundIcon />
      <NotFoundHeading>{`Erro ao acessar pagina`}</NotFoundHeading>
      <NotFoundMessage>{'Tente acessar uma nova pagina no menu superior'}</NotFoundMessage>   
    </NotFoundPageContainer>
  );
};

export default NotFound;