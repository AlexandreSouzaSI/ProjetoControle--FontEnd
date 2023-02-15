import React from 'react';
import { Botao, Pages } from './styles';

interface PagesProps {
  limit: number,
  total: number,
  offset: number,
  setOffset: React.Dispatch<React.SetStateAction<number>>
}

const MAX_ITEMS = 9
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

export const Pagination = ({ limit, total, offset, setOffset }: PagesProps) => {
  const current = offset ? (offset / limit) + 1 : 1
  const pages = Math.ceil(total / limit)
  const first = Math.max(current - MAX_LEFT, 1)

  return (
    <Pages>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + first)
        .map((page) => (
          <li key={page}>
            <Botao ativo={page === offset} onClick={() => setOffset((page))}
            >
              {page}
            </Botao>
          </li>
        ))}
    </Pages>
  )
}
