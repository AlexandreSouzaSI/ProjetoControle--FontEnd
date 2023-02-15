import editar from '../../assets/editar.png'
import excluir from '../../assets/excluir.png'
import { currencyFormat } from '../../helpers/currencyFormat'
import { Container, Seletor, Table } from './styles'
import { useState } from 'react';
import { deleteEntradas } from '../../services/api';
import { ModalConfirme, Nao, Sair } from '../Subgrupos/styles';
import AddReceber from './../AddReceber/index';

interface DadosReceberProps {
  entradas: any[]
}

export function DadosReceber({ entradas }: DadosReceberProps) {

  const [showModal, setShowModal] = useState(false);
  const [entradaId, setEntradaId] = useState('');
  const [result, setResult] = useState({})
  const [showAdd, setShowAdd] = useState(false);


  const handleEditar = async (result: string) => {
    setResult(result)
    setShowAdd(true)
  }

  const handleDelete = async (id: string) => {
    setEntradaId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteEntradas(entradaId);
    if (response.status === 200) {
      setShowModal(false);
      setEntradaId('');
      /* setData([...subGrupo.filter(item => item.id !== subgrupoId)]); */
      window.location.reload();
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };


  return (
    <Container>
      <Table>
              <thead>
                <tr>
                  <th scope='col'>Data</th>
                  <th scope='col'>Valor</th>
                  <th scope='col'>Grupo</th>
                  <th scope='col'>Sugrupo</th>
                  <th scope='col'>Editar</th>
                  <th scope='col'>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {entradas && entradas.map(entrada => {
                  return <tr key={entrada.id}>
                      <td>{entrada.data}</td>
                      <td>{currencyFormat(entrada.valor)}</td>
                      <td><Seletor grupo={entrada.subgrupo.grupo.nome}>{entrada.subgrupo.grupo.nome}</Seletor></td>
                      <td>{entrada.subgrupo.nome}</td>
                      <td>
                        <img
                            src={editar}
                            alt="Editar"
                            onClick={() => handleEditar(entrada)}
                          />
                        </td>
                      <td>
                        <img
                          src={excluir}
                          alt="Excluir"
                          onClick={() => handleDelete(entrada.id)}
                        />
                      </td>
                    </tr>
                })}
              </tbody>
      </Table>
      { showAdd && (
        <AddReceber result={result}></AddReceber>
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
  )
}
