import React, { useState } from 'react';
import { putGrupos } from '../../services/api';
import { Add } from '../ModalAdicionar/styles';
import { ModalEditar } from '../ModalEditar/index';

interface Props {
  result: any;
}


export default function AddGrupo({ result }: Props) {
  const [, setIsOpen] = useState(true);
  const [error, setError] = useState("")
  const [nome, setNome] = useState(result.nome)


  function handleCloseModal() {
    setIsOpen(false);
  }

   async function handleSubmit(event: {
    preventDefault: () => void;
}) {
      event.preventDefault();
      const id = result.id;
      const nomeV = nome;

      const data = { nome: nomeV };

      if (nome) {
        try {
          await putGrupos(id, data);
          handleCloseModal();
          window.location.reload();
        } catch (error) {
          console.error(error);
          setError("Ocorreu um erro ao adicionar o subgrupo");
        }
      } else {
        setError("Nome ou Grupo não podem ser vazios");
      }
    }

  return (
    <>
              <ModalEditar title='Alterar Grupo'>
                    <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder='Nome'
                          value={nome}
                          onChange={(event) => setNome(event.target.value)}
                        />
                        {error && <h3>{error}</h3>}
                        <Add type='submit' onClick={handleCloseModal}>Confirmar</Add>
                    </form>
              </ModalEditar>
    </>
  )
}
