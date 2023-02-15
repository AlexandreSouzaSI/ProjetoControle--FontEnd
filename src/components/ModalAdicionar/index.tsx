import React, { ReactNode, useState } from 'react';
import { Adicionar, Modal } from './styles';
import add from '../../assets/add.png'
import fechar from '../../assets/fechar.png'

interface ModalProps {
  title: ReactNode
  children: ReactNode
}

export function ModalAdicionar({ title, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Adicionar onClick={handleOpenModal}>
        <img src={add} alt="" />
        <p>{title}</p>
      </Adicionar>
      {isOpen && (
        <div>
          <Modal info={title}>
            <img src={fechar} alt="" onClick={handleCloseModal}/>
            <p>{title}</p>
            <div>
                <div>
                  {children}
                </div>
              </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
