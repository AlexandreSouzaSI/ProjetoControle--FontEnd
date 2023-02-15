import styled, { css } from 'styled-components'

interface SeletorProps {
  grupo: string
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const Seletor = styled.div<SeletorProps>`
${({ grupo }) =>
    grupo == 'Cartão'
    ? css`
        background-color: #FE4343;
        opacity: 0.8;
      `
    : grupo == 'Transferencia'
    ? css`
        background-color: #FEF643;
        opacity: 0.8;
      `
    : grupo == 'Fornecedores'
    ? css`
        background-color: #7F43FE;
        opacity: 0.8;
      `
    : grupo == 'Funcionarios'
    ? css`
        background-color: #46FE43;
        opacity: 0.8;
    `
    : grupo == 'Tributos'
    ? css`
        background-color: #43C6FE;
        opacity: 0.8;
    `
    : css`

    `
    }
  width: 7.5rem;
  height: 2.2rem;
  padding-top: 0.2rem;
  border: 1.5px solid grey;
  border-radius: 5px;
  opacity: 0.6;
  margin-left: 2rem;
`

export const Table = styled.table`

	  width:100%;
    margin-left: 1rem;
	  font-family: Salsa;
    border-radius: 5px 5px 5px 5px;
    font-size:20px;
	  empty-cells: show;
	  border-bottom: 1px solid grey;
	  border-collapse: collapse;
	  table-layout: fixed;

  	table, tr, td, th {
      padding: 15px;
    }

  tr:nth-child(even) {
    background: ${({ theme }) => theme.colors.gray300}
  }

	td {
		width:150px;
		height:60px;
    text-align: center;
    vertical-align: middle;
		border-bottom: 1px solid grey;
		border-collapse: collapse;
  	}

	th {
		color:black;
    width:150px;
		height:30px;
		border-bottom: 1px solid grey;
		border-collapse: collapse;
	}

  img {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }

  @media (max-width: 720px) {
      display: flex;
      flex-direction: column;
      width: 414px;
      margin-left: -1.6rem;

      tr, th, td {
        width: 30px;
        height: 8px;
        font-size: ${({ theme }) => theme.fontSize.xs};
      }

      table, tr, td, th {
        padding: 2px;
      }

      img {
        width: 0.2px;
        height: 1.5rem;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
      }
    }
`

export const ModalConfirme = styled.div`
    width: 30rem;
    height: 10rem;
    background: ${({ theme }) => theme.colors.gray100};
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

    p {
      color: ${({ theme }) => theme.colors.red};
      font-size: ${({ theme }) => theme.fontSize.xl};
    }

    div {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      button {
        width: 10rem;
        height: 3rem;
        border-radius: 5px;
        border: 2px solid grey;

        :hover {
          border-left: 0.4px solid grey;
          border-top: 0.4px solid grey;
        }

        cursor: pointer;
      }
    }
`

export const Sair = styled.button`
        width: 10rem;
        height: 3rem;
        border-radius: 5px;
        border: 2px solid grey;

        background-color: #46FE43;
        opacity: 0.8;

        :hover {
          border-left: 0.4px solid grey;
          border-top: 0.4px solid grey;
        }

        cursor: pointer;
`

export const Nao = styled.button`
        width: 10rem;
        height: 3rem;
        border-radius: 5px;
        border: 2px solid grey;

        background-color: #FE4343;
        opacity: 0.8;

        :hover {
          border-left: 0.4px solid grey;
          border-top: 0.4px solid grey;
        }

        cursor: pointer;
`


