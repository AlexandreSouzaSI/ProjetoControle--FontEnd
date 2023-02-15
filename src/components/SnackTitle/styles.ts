import styled, { css } from "styled-components";
import { ReactNode } from 'react';

interface h1Props {
  texto: ReactNode
}

export const Title = styled.h1<h1Props>`

${({ texto }) =>
    texto == 'Contas a Pagar'
      ? css`
          color: #9F3232;
          opacity: 0.8;
        `
      : texto == 'Contas a Receber'
      ? css`
          color: #329F5B;
          opacity: 0.8;
        `
      : texto == 'Grupos'
      ? css`
          color: #32439F;
          opacity: 0.8;
        `
      : texto == 'Subgrupos'
      ? css`
          color: #909F32;
          opacity: 0.8;
        `
      : css`

      `
        }

  display: flex;
  align-items: center;
  gap: 0.5rem;


  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-family: Sigmar One;
  font-weight: bolder;
  text-transform: uppercase;

  @media (max-width: 720px) {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    justify-content: center;

    &::before {
      display: none;
    }
  }
`
