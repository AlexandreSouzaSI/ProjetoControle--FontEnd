import styled from "styled-components";

interface Props {
  ativo: boolean
}

export const Pages = styled.ul`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center ;
  text-align: center;
  align-items: center;

  li {
    width: 5rem;
    display: flex;
    justify-content: center;

  }
`

 export const Botao = styled.button<Props>`

    width: 10rem;
    height: 3rem;
    margin: 2px;
    border: 2px solid black;
    border-radius: 4px;
    background: ${({ theme, ativo }) => ativo ? theme.colors.white : theme.colors.gray500};
    border: ${({ theme, ativo }) => ativo ? theme.colors.white : theme.colors.black};

    :hover {
      background: ${({ theme }) => theme.colors.gray300};
      opacity: 0.8;
    }
 `
