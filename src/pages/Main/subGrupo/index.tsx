import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Head } from "../../../components/Head";
import { SnackTitle } from "../../../components/SnackTitle";
import { SubgruposComponent } from "../../../components/Subgrupos";
import { Container, List, Pesquisar } from "./styles";
import  pesquisar  from '../../../assets/pesquisar.png'
import { getSubgrupos, postSubgrupos } from "../../../services/api";
import { ModalAdicionar } from './../../../components/ModalAdicionar/index';
import { getGrupos } from './../../../services/api';
import { Add } from './../../../components/ModalAdicionar/styles';
import { Container3 } from '../styles';
import { Pagination } from '../../../components/Paginação';

interface SubgrupoProps {
  id: string,
  ativo: boolean,
  createdAt: Date,
  updatedAt: Date,
  nome: string
}


export default function SubGrupo() {
  const [subGrupo, setSubGrupo] = useState([])
  const [grupo, setGrupo] = useState<Array<SubgrupoProps>>([]);
  const [, setIsOpen] = useState(false);
  const [nomeValue, setNomeValue] = useState('');
  const [tipoValue, setTipoValue] = useState('');
  const [pixValue, setPixValue] = useState('');
  const [codigoBarraValue, setCodigoBarraValue] = useState('');
  const [grupoSelecionadoValue, setGrupoSelecionadoValue] = useState('');
  const [error, setError] = useState("")
  const [totalElements, setTotalElements] = useState(0)
  const [, setTotalPages] = useState(0)
  const [, setCurrentPage] = useState(0)
  const [offset, setOffset] = useState(1)
  const [text, setText] = useState('');

  const LIMIT = 8

useEffect(() => {
  ; (async () => {
    const gruposRequest = await getGrupos()

    setGrupo(gruposRequest.data.data.items)
  })()
}, [])

const handleSearch = async () => {
  const query = {
    filter: JSON.stringify({search: text}),
  };
  const queryString = qs.stringify(query);
  const subGruposRequest = await getSubgrupos(queryString);
  setSubGrupo(subGruposRequest.data.data.items)
}

const handleAll = async () => {
    const subGruposRequest = await getSubgrupos()

    setSubGrupo(subGruposRequest.data.data.items)
}

  useEffect(() => {
    ;(async () => {

      const query = {
          limit: LIMIT,
          page: offset,
      };


      const subGrupoRequest = await getSubgrupos(`${qs.stringify(query)}`)

      setSubGrupo(subGrupoRequest.data.data.items)
      setTotalElements(subGrupoRequest.data.data.totalElements)
      setTotalPages(subGrupoRequest.data.data.totalPages)
      setCurrentPage(subGrupoRequest.data.data.currentPage)
    })()
  }, [offset])


  function handleCloseModal() {
    setIsOpen(false);
  }

   async function handleSubmit(event: {
    preventDefault: () => void;
}) {
      event.preventDefault();
      const nome = nomeValue;
      const tipo = tipoValue;
      const pix = pixValue;
      const codigo_de_barra = codigoBarraValue;
      const id_grupo = grupoSelecionadoValue;

      const data = { nome: nome, tipo: tipo, pix: pix, codigo_de_barra: codigo_de_barra, id_grupo: id_grupo };

      if (nome && id_grupo) {
        try {
          const response = await postSubgrupos(data);
          console.log("response : ", response);
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
      <Head title='Subgrupos'/>
      <Container>
          <SnackTitle>Subgrupos</SnackTitle>
              <ModalAdicionar title='Adicionar Subgrupo'>
                    <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder='Nome'
                          value={nomeValue}
                          onChange={(event) => setNomeValue(event.target.value)}
                        />
                        <select
                          value={tipoValue}
                          onChange={(event) => setTipoValue(event.target.value)}
                        >
                            <option value="Juridica">Juridica</option>
                            <option value="Fisica">Fisica</option>
                        </select>
                        <input
                          type="text"
                          placeholder='Pix'
                          value={pixValue}
                          onChange={(event) => setPixValue(event.target.value)}
                        />
                        <input
                          type="text"
                          placeholder='Codigo de Barra'
                          value={codigoBarraValue}
                          onChange={(event) => setCodigoBarraValue(event.target.value)}
                        />
                        <select
                          value={grupoSelecionadoValue}
                          onChange={(event) => setGrupoSelecionadoValue(event.target.value)}
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
                        <Add type='submit' onClick={handleCloseModal}>Adicionar</Add>
                    </form>
          </ModalAdicionar>
          <Pesquisar>
            <input
              type='text'
              id="campo_busca"
              placeholder="Busca Rapida"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
              <img src={pesquisar} alt="" onClick={handleSearch}/>
          </Pesquisar>
          <List onClick={handleAll}><p>Mostrar todos os Subgrupos</p></List>
        </Container>
      <SubgruposComponent subGrupo={subGrupo}></SubgruposComponent>
      <Container3>
      <Pagination
        limit={LIMIT}
        total={totalElements}
        offset={offset}
        setOffset={setOffset}
      />
    </Container3>
    </>
  )
}
