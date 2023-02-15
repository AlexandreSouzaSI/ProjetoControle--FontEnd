import styled, { css } from "styled-components";
import { ReactNode } from 'react';


interface SeletorProps {
  info: ReactNode
}

export const Adicionar = styled.button`
  width: 16rem;
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


export const Modal = styled.div<SeletorProps>`
${({ info }) =>
    info == 'Adicionar Contas a Pagar'
      ? css`
          color: #9F3232;
          opacity: 0.8;

          font-size: ${({ theme }) => theme.fontSize['2xl']};
          font-family: Sigmar One;
          font-weight: bolder;
          text-transform: uppercase;

          width: 50rem;
          height: 35rem;

          img {
            position: fixed;
            z-index: 999;
            opacity: 2;
            margin-left: 48rem;
            margin-bottom: 33rem;
            border-radius: 20px;
            background-color: ${({ theme }) => theme.colors.gray300};;
            cursor: pointer;
          }

          p {
            position: fixed;
            z-index: 999;
            opacity: 2;
            width: 60%;
            margin-left: 10rem;
            margin-bottom: 32rem;
            border-radius: 20px;
            background-color: ${({ theme }) => theme.colors.gray300};;
          }
        `
      : info == 'Adicionar Conta a Receber'
      ? css`
          color: #329F5B;
          opacity: 0.8;

          font-size: ${({ theme }) => theme.fontSize['2xl']};
          font-family: Sigmar One;
          font-weight: bolder;
          text-transform: uppercase;

          width: 50rem;
          height: 20rem;

          img {
            position: fixed;
            z-index: 999;
            opacity: 2;
            margin-left: 48rem;
            margin-bottom: 18rem;
            border-radius: 20px;
            background-color: ${({ theme }) => theme.colors.gray300};;
            cursor: pointer;
          }

          p {
            position: fixed;
            z-index: 999;
            opacity: 2;
            width: 60%;
            margin-left: 8rem;
            margin-bottom: 17rem;
            border-radius: 20px;
            background-color: ${({ theme }) => theme.colors.gray300};;
          }
        `
      : info == 'Adicionar Grupo'
      ? css`
          color: #32439F;
          opacity: 0.8;

          font-size: ${({ theme }) => theme.fontSize['2xl']};
          font-family: Sigmar One;
          font-weight: bolder;
          text-transform: uppercase;

          width: 30rem;
          height: 15rem;

          img {
            position: fixed;
            z-index: 999;
            opacity: 2;
            margin-left: 28rem;
            margin-bottom: 13rem;
            border-radius: 20px;
            background-color: ${({ theme }) => theme.colors.gray300};;
            cursor: pointer;
          }

          p {
            position: fixed;
            z-index: 999;
            opacity: 2;
            width: 60%;
            margin-left: 4rem;
            margin-bottom: 12rem;
            border-radius: 20px;
            background-color: ${({ theme }) => theme.colors.gray300};;
          }
        `
      : info == 'Adicionar Subgrupo'
      ? css`
          color: #909F32;
          opacity: 0.8;

          font-size: ${({ theme }) => theme.fontSize['2xl']};
          font-family: Sigmar One;
          font-weight: bolder;
          text-transform: uppercase;

          width: 50rem;
          height: 30rem;

          img {
            position: fixed;
            z-index: 999;
            opacity: 2;
            margin-left: 48rem;
            margin-bottom: 28rem;
            border-radius: 20px;
            background-color: ${({ theme }) => theme.colors.gray300};;
            cursor: pointer;
          }

          p {
            position: fixed;
            z-index: 999;
            opacity: 2;
            width: 60%;
            margin-left: 13rem;
            margin-bottom: 27rem;
            border-radius: 20px;
            background-color: ${({ theme }) => theme.colors.gray300};;
          }
      `
      : css`

      `
  }

  form {
    width: 100%;
    height: 100%;
    background-color: red;
    background: ${({ theme }) => theme.colors.gray300};
    opacity: 0.9;
    z-index: 0;
    border-radius: 20px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;


  }

  background: ${({ theme }) => theme.colors.gray300};
  opacity: 0.9;
  z-index: 999;
  border-radius: 20px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  input, select {
    width: 20rem;
    height: 3rem;
    border-radius: 10px;
    align-items: center;
    background-color: white;
    border: 1px solid grey;
    text-align: center;

    ::placeholder {
      text-align: center;
    }
  }


  p {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    font-family: Sigmar One;
    font-weight: bolder;
    text-transform: uppercase;
  }
`

export const Add = styled.button`
  width: 30rem;
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
`
