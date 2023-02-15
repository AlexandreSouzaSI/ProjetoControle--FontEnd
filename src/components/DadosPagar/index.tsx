import { Container, Seletor, Table } from './styles'
import editar from '../../assets/editar.png'
import excluir from '../../assets/excluir.png'
import { currencyFormat } from '../../helpers/currencyFormat'
import { formatDate } from './../../helpers/formatDate';
import { useState } from 'react';
import { deleteSaidas } from '../../services/api';
import { ModalConfirme, Nao } from '../Subgrupos/styles';
import { Sair } from './../Subgrupos/styles';
import AddPagar from '../AddPagar';

interface DadosPagarProps {
  saidas: any[]
}

export function DadosPagar({ saidas }: DadosPagarProps) {

  const [showModal, setShowModal] = useState(false);
  const [saidaId, setSaidaId] = useState('');
  const [result, setResult] = useState({})
  const [showAdd, setShowAdd] = useState(false);

  const handleEditar = async (result: string) => {
    setResult(result)
    setShowAdd(true)
  }

  const handleDelete = async (id: string) => {
    setSaidaId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    console.log(saidaId)
    const response = await deleteSaidas(saidaId);
    if (response.status === 200) {
      setShowModal(false);
      setSaidaId('');
      /* setData([...subGrupo.filter(item => item.id !== subgrupoId)]); */
      window.location.reload();
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };


  return (
    <>
    <Container>
      <Table>
        <thead>
          <tr>
            <th scope='col'>Data</th>
            <th scope='col'>Vencimento</th>
            <th scope='col'>Pagamento</th>
            <th scope='col'>Multa</th>
            <th scope='col'>Juros</th>
            <th scope='col'>Desconto</th>
            <th scope='col'>Valor</th>
            <th scope='col'>Grupo</th>
            <th scope='col'>Sugrupo</th>
            <th scope='col'>Editar</th>
            <th scope='col'>Excluir</th>
          </tr>
        </thead>
        <tbody>
            {saidas && saidas.map(saida => {
              return <tr key={saida.id}>
                        <td>{formatDate(saida.createdAt)}</td>
                        <td>{saida.data_vencimento}</td>
                        <td>{saida.data_pagamento}</td>
                        <td>{currencyFormat(saida.multa)}</td>
                        <td>{currencyFormat(saida.juros)}</td>
                        <td>{currencyFormat(saida.desconto)}</td>
                        <td>{currencyFormat(saida.valor)}</td>
                        <td><Seletor grupo={saida.subgrupo.grupo.nome}>{saida.subgrupo.grupo.nome}</Seletor></td>
                        <td>{saida.subgrupo.nome}</td>
                        <td>
                        <img
                            src={editar}
                            alt="Editar"
                            onClick={() => handleEditar(saida)}
                          />
                        </td>
                        <td>
                        <img
                          src={excluir}
                          alt="Excluir"
                          onClick={() => handleDelete(saida.id)}
                        />
                      </td>
                    </tr>
            })}

        </tbody>
      </Table>
      { showAdd && (
        <AddPagar result={result}></AddPagar>
      )}
      { showModal && (
        <ModalConfirme>
            <p>Tem certeza que deseja excluir este subgrupo?</p>
          <div>
            <Sair onClick={handleConfirmDelete}>Sim</Sair>
            <Nao onClick={handleCancelDelete}>Não</Nao>
          </div>
        </ModalConfirme>
      )}
    </Container>
    </>
  )
}
