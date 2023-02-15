import { ReactNode, useState } from 'react';
import fechar from '../../assets/fechar.png'
import { ModalEditarStyles } from './styles';

interface ModalProps {
  title: ReactNode
  children: ReactNode
}

export function ModalEditar({ title, children }: ModalProps) {


  return (
        <div>
        <div>
          <ModalEditarStyles info={title}>
            <p>{title}</p>
            <div>
                <div>
                  {children}
                </div>
            </div>
          </ModalEditarStyles>
        </div>
        </div>
  );
}
