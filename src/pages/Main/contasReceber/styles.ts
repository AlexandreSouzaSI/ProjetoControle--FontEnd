import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 0;

  p {
    font-weight: bold;
  }
`

export const Adicionar = styled.button`
  width: 17rem;
  height: 3rem;
  border: 2px solid grey ;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #46FE43;
  opacity: 0.4;

  :hover{
    border: 1px solid grey;
  }

  img {
    width: 1.5rem;
    height: 2rem;
  }
`

export const Pesquisar = styled.div`
  width: 13rem;
  height: 3rem;
  border-radius: 5px;
  border: 1px solid black ;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;

  input {
    width: 10rem;
    border-radius: 5px;
    height: 2.9rem;
    border-left: none;
    border: none;
    padding-left: 1rem;

    :focus {
      box-shadow: 0 0 0 0;
      outline: 0;
    }


    ::placeholder {
      text-align: center;
    }
  }

  img {
    width: 1.5rem;
    height: 2rem;
    margin-right: 0.4rem;
    cursor: pointer;
  }
`

export const List = styled.button`
  width: 17rem;
  height: 3rem;
  border: 2px solid grey ;
  border-radius: 5px;
  background: #7F43FE;
  opacity: 0.4;

  :hover{
    border: 1px solid grey;
  }
`
