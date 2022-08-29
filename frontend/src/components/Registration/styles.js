import styled from 'styled-components';

export const ContainerMain = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 70px;

`;

export const ContainerForm = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .input-text {
    margin-bottom: 15px;
    padding: 10px;
  }
`;

export const ContainerActionButtons = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

export const ContainerAlternatives = styled.div`
  margin-left: 50px;

  .label-radio {
    font-size: larger;
    padding: 5px;
  }

  > div {
    width: 380px;
    word-break: break-all;
  }

  .button-delete-alternative {
    color: #A80A0A;
  }
`;

export const ContainerSecondary = styled.div`
  border: solid 1px #E6E6E6;
  box-shadow: 2px 2px 8px #E6E6E6;
  width: 60%;

  display: flex;
  
  padding: 80px;
  border-radius: 10px;


  @media only screen and (max-width: 1800px) {
    width: 90%;
  }
`;




