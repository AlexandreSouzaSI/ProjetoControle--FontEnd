import styled from "styled-components";


export const Container = styled.div`
  width: 96.5%;
  height: 10rem;
  margin: 0px 0px 0px 2.5rem;
  display: flex;
`
export const Quadros = styled.div`
  width: 30rem;
  height: 9rem;
  background-color: ${({ theme }) => theme.colors.gray300};
  border-radius: 10px;
  border: 1px solid grey;
  display: flex;
  margin: 5px;
`

