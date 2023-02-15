import React, { useState, useEffect } from 'react';
import { getGrupos, putEntradas } from './../../services/api';
import { Add } from './../ModalAdicionar/styles';
import { ModalEditar } from './../ModalEditar/index';

interface SubgrupoProps {
  id: string,
  ativo: boolean,
  createdAt: Date,
  updatedAt: Date,
  nome: string
}

interface Props {
  result: any;
}


export default function AddReceber({ result }: Props) {
  const [grupo, setGrupo] = useState<Array<SubgrupoProps>>([]);
  const [, setIsOpen] = useState(true);
  const [error, setError] = useState("")
  const [dataRecebimento, setDataRecebimento] = useState(result.data)
  const [valorV, setValor] = useState(result.valor)
  const [grupoSelected, setGrupoSelected] = useState(result.subgrupo.id)


useEffect(() => {
  ; (async () => {
    const gruposRequest = await getGrupos()

    setGrupo(gruposRequest.data.data.items)
  })()
}, [])

  function handleCloseModal() {
    setIsOpen(false);
  }

   async function handleSubmit(event: {
    preventDefault: () => void;
}) {
      event.preventDefault();
      const id = result.id;
      const data = dataRecebimento;
      const valor = valorV;
      const id_grupo = grupoSelected;

      const datas = {
        data: data,
        valor: valor,
        id_grupo: id_grupo
      };

      if (valor && grupoSelected) {
        try {
          await putEntradas(id, datas);
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
              <ModalEditar title='Alterar Conta a Receber'>
                    <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder='Data do Recebimento'
                      value={dataRecebimento}
                      onChange={(event) => setDataRecebimento(event.target.value)}
                    />
                <select
                  value={grupoSelected}
                  onChange={(event) => setGrupoSelected(event.target.value)}
                >
                  <React.Fragment>
                  <option value="" disabled>Selectione</option>
                    {grupo.length > 0 && grupo.map(sub => {
                      return <option key={sub.id} value={sub.id}>
                        {sub.nome}
                      </option>
                    })}
                  </React.Fragment>
                </select>
              <input
                type="text"
                placeholder='Valor'
                value={valorV}
                onChange={(event) => setValor(event.target.value)}
              />
              {error && <h3>{error}</h3>}
              <Add type='submit' onClick={handleCloseModal}>confirmar</Add>
            </form>
          </ModalEditar>
    </>
  )
}
