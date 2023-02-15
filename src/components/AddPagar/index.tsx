import React, { useState, useEffect } from 'react';
import { getGrupos, putSaidas } from './../../services/api';
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


export default function AddPagar({ result }: Props) {
  const [grupo, setGrupo] = useState<Array<SubgrupoProps>>([]);
  const [, setIsOpen] = useState(true);
  const [error, setError] = useState("")
  const [dataVencimento, setDataVencimento] = useState(result.data_vencimento)
  const [dataPagamento, setDataPagamento] = useState(result.data_pagamento)
  const [multaV, setMulta] = useState(result.multa)
  const [jurosV, setJuros] = useState(result.juros)
  const [descontoV, setDesconto] = useState(result.desconto)
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
      const data_pagamento = dataPagamento;
      const data_vencimento = dataVencimento;
      const multa = multaV;
      const juros = jurosV;
      const desconto = descontoV;
      const valor = valorV;
      const id_grupo = grupoSelected;

      const data = {
        data_pagamento: data_pagamento,
        data_vencimento: data_vencimento,
        multa: multa,
        juros: juros,
        desconto: desconto,
        valor: valor,
        id_grupo: id_grupo
      };

      if (valor && grupoSelected) {
        try {
          await putSaidas(id, data);
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
              <ModalEditar title='Alterar Conta a Pagar'>
                    <form onSubmit={handleSubmit}>
                    <input
                type="text"
                placeholder='Data do Vencimento'
                value={dataVencimento}
                onChange={(event) => setDataVencimento(event.target.value)}
              />
              <input
                type="text"
                placeholder='Data do Pagamento'
                value={dataPagamento}
                onChange={(event) => setDataPagamento(event.target.value)}
              />
              <input
                type="text"
                placeholder='Multa'
                value={multaV}
                onChange={(event) => setMulta(event.target.value)}
              />
              <input
                type="text"
                placeholder='Juros'
                value={jurosV}
                onChange={(event) => setJuros(event.target.value)}
              />
              <input
                type="text"
                placeholder='Desconto'
                value={descontoV}
                onChange={(event) => setDesconto(event.target.value)}
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
