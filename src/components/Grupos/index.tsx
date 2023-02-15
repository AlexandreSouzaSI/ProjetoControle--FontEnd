import editar from '../../assets/editar.png'
import excluir from '../../assets/excluir.png'
import { Container, Seletor, Table } from './styles'
import { formatDate } from './../../helpers/formatDate';
import { useState } from 'react';
import { deleteGrupos } from '../../services/api';
import { ModalConfirme, Nao } from '../Subgrupos/styles';
import { Sair } from './../Subgrupos/styles';
import AddGrupo from './../AddGrupo/index';

interface GruposProps {
  grupos: any[]
}

export function GruposComponent({ grupos }: GruposProps) {

  const [showModal, setShowModal] = useState(false);
  const [grupoId, setGrupoId] = useState('');
  const [result, setResult] = useState({})
  const [showAdd, setShowAdd] = useState(false);

  const handleEditar = async (result: string) => {
    setResult(result)
    setShowAdd(true)
  }

  const handleDelete = async (id: string) => {
    setGrupoId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    console.log(grupoId)
    const response = await deleteGrupos(grupoId);
    if (response.status === 200) {
      setShowModal(false);
      setGrupoId('');
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
                  <th scope='col'>Grupo</th>
                  <th scope='col'>Editar</th>
                  <th scope='col'>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {grupos && grupos.map(grupo => {
                  return <tr key={grupo.id}>
                      <td>{formatDate(grupo.createdAt)}</td>
                      <td><Seletor grupo={grupo.nome}>{grupo.nome}</Seletor></td>
                      <td>
                        <img
                            src={editar}
                            alt="Editar"
                            onClick={() => handleEditar(grupo)}
                        />
                      </td>
                      <td>
                        <img
                          src={excluir}
                          alt="Excluir"
                          onClick={() => handleDelete(grupo.id)}
                        />
                      </td>
                    </tr>
                })}
              </tbody>
      </Table>
      { showAdd && (
        <AddGrupo result={result}></AddGrupo>
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
