import styled from 'styled-components';

export const ContainerMain = styled.div`
  display: flex;
  justify-content: center;
    
  .table {
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.11);
  }
`;

export const ContainerModal = styled.div``;

export const ContainerTable = styled.div`
  margin-top: 80px;
  width: 80%;
`;

export const ContainerTitle = styled.div`
  margin-bottom: 20px;
  border-bottom: solid 1px #E9E9E9;

  display: flex;
  flex-direction: column;

  .button-register {
    width: 200px;
  }
`;

export const ContainerMessageNoRegisters = styled.div`
  display: flex;
  align-items: center;

  .icon-alert {
    color: #5C1111;
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
`;






