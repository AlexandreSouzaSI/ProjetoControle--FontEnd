import editar from '../../assets/editar.png'
import excluir from '../../assets/excluir.png'
import { Container, ModalConfirme, Nao, Sair, Seletor, Table } from './styles'
import { formatDate } from './../../helpers/formatDate';
import { useState } from 'react';
import { deleteSubgrupos } from '../../services/api';
import AddSubgrupo from '../AddSubgrupo';

interface SubgruposProps {
  subGrupo: any[],
}

export function SubgruposComponent({ subGrupo }: SubgruposProps) {

  const [showModal, setShowModal] = useState(false);
  const [subgrupoId, setSubgrupoId] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [result, setResult] = useState({})


  const handleEditar = async (result: string) => {
    setResult(result)
    setShowAdd(true)
  }

  const handleDelete = async (id: string) => {
    setSubgrupoId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteSubgrupos(subgrupoId);
    if (response.status === 200) {
      setShowModal(false);
      setSubgrupoId('');
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
                  <th scope='col'>Grupo</th>
                  <th scope='col'>Nome</th>
                  <th scope='col'>Tipo</th>
                  <th scope='col'>Pix</th>
                  <th scope='col'>Codigo de Barra</th>
                  <th scope='col'>Editar</th>
                  <th scope='col'>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {subGrupo && subGrupo.map(subGrupo => {
                  return <tr key={subGrupo.id}>
                      <td>{formatDate(subGrupo.createdAt)}</td>
                      <td><Seletor grupo={subGrupo.grupo.nome}>{subGrupo.grupo.nome}</Seletor></td>
                      <td>{subGrupo.nome}</td>
                      <td>{subGrupo.tipo}</td>
                      <td>{subGrupo.pix}</td>
                      <td>{subGrupo.codigo_de_barra}</td>
                      <td>
                        <img
                            src={editar}
                            alt="Editar"
                            onClick={() => handleEditar(subGrupo)}
                        />
                      </td>
                      <td>
                        <img
                          src={excluir}
                          alt="Excluir"
                          onClick={() => handleDelete(subGrupo.id)}
                        />
                      </td>
                    </tr>
                })}
              </tbody>
      </Table>
      { showAdd && (
        <AddSubgrupo result={result}></AddSubgrupo>
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
