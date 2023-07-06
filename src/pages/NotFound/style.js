import { styled } from "../../config/stitches";
import { AiOutlineExclamationCircle } from 'react-icons/ai';

// Definindo estilos com Stitches
export const NotFoundPageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
  fontFamily: 'Arial, sans-serif',
});

export const NotFoundIcon = styled(AiOutlineExclamationCircle, {
  fontSize: '10rem',
  marginBottom: '1rem',
  color: 'red',
});

export const NotFoundHeading = styled('h1', {
  fontSize: '2rem',
  marginBottom: '1rem',
});

export const NotFoundMessage = styled('p', {
  fontSize: '1.2rem',
});