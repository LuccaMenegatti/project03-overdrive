import { styled } from "../../config/stitches";
import { Button } from "primereact/button";
import { AiOutlineCloseCircle } from 'react-icons/ai';


export const ErrorPageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
  fontFamily: 'Arial, sans-serif',
});

export const ErrorIcon = styled(AiOutlineCloseCircle, {
  fontSize: '10rem',
  marginBottom: '1rem',
  color: 'red',
});

export const ErrorHeading = styled('h1', {
  fontSize: '2rem',
  marginBottom: '1rem',
});


export const ErrorMessage = styled('p', {
    fontSize: '1.2rem',
  });