import React, { useState, useEffect } from 'react';
import { getGrupos, putSubgrupos } from './../../services/api';
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


export default function AddSubgrupo({ result }: Props) {
  const [grupo, setGrupo] = useState<Array<SubgrupoProps>>([]);
  const [, setIsOpen] = useState(true);
  const [error, setError] = useState("")
  const [nome, setNome] = useState(result.nome)
  const [tipo, setTipo] = useState(result.tipo)
  const [pix, setPix] = useState(result.pix)
  const [codigoBarra, setCodigoBarra] = useState(result.codigo_de_barra)
  const [grupoSelected, setGrupoSelected] = useState(result.grupo.id)


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
      const nomeV = nome;
      const tipoV = tipo;
      const pixV = pix;
      const codigo_de_barraV = codigoBarra;
      const id_grupoV = grupoSelected;

      const data = { nome: nomeV, tipo: tipoV, pix: pixV, codigo_de_barra: codigo_de_barraV, id_grupo: id_grupoV };

      if (nome && grupoSelected) {
        try {
          await putSubgrupos(id, data);
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
              <ModalEditar title='Alterar Subgrupo'>
                    <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder='Nome'
                          value={nome}
                          onChange={(event) => setNome(event.target.value)}
                        />
                        <select
                          value={tipo}
                          onChange={(event) => setTipo(event.target.value)}
                        >
                            <option value="Juridica">Juridica</option>
                            <option value="Fisica">Fisica</option>
                        </select>
                        <input
                          type="text"
                          placeholder='Pix'
                          value={pix}
                          onChange={(event) => setPix(event.target.value)}
                        />
                        <input
                          type="text"
                          placeholder='Codigo de Barra'
                          value={codigoBarra}
                          onChange={(event) => setCodigoBarra(event.target.value)}
                        />
                        <select
                          value={grupoSelected}
                          onChange={(event) => setGrupoSelected(event.target.value)}
                        >
                          <React.Fragment>
                            <option value="" disabled>Selectione</option>
                              {grupo.length > 0 && grupo.map(grupo => {
                                return <option key={grupo.id} value={grupo.id}>
                                  {grupo.nome}
                                </option>
                              })}
                          </React.Fragment>
                        </select>
                        {error && <h3>{error}</h3>}
                        <Add type='submit' onClick={handleCloseModal}>Confirmar</Add>
                    </form>
          </ModalEditar>
    </>
  )
}
