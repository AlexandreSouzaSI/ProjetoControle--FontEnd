import { useState, useEffect } from 'react';
import qs from 'qs';
import { GruposComponent } from "../../../components/Grupos";
import { Head } from "../../../components/Head";
import { SnackTitle } from "../../../components/SnackTitle";
import { Container, List, Pesquisar } from "./styles";
import  pesquisar  from '../../../assets/pesquisar.png'
import { getGrupos, getSubgrupos, postGrupos } from './../../../services/api';
import { ModalAdicionar } from './../../../components/ModalAdicionar/index';
import { Add } from '../../../components/ModalAdicionar/styles';
import { Container3 } from '../styles';
import { Pagination } from '../../../components/Paginação';

interface SubgrupoProps {
  id: string,
  ativo: boolean,
  createdAt: Date,
  updatedAt: Date,
  nome: string
}


export default function Grupos() {
  const [grupos, setGrupos] = useState([])
  const [, setSubgrupo] = useState<Array<SubgrupoProps>>([]);
  const [, setIsOpen] = useState(false);
  const [nomeValue, setNomeValue] = useState('');
  const [error, setError] = useState("")
  const [totalElements, setTotalElements] = useState(0)
  const [, setTotalPages] = useState(0)
  const [, setCurrentPage] = useState(0)
  const [offset, setOffset] = useState(1)
  const [text, setText] = useState('');

  const LIMIT = 8

useEffect(() => {
  ; (async () => {
    const subgrupoRequest = await getSubgrupos(error)

    setSubgrupo(subgrupoRequest.data.data.items)
  })()
}, [])

const handleSearch = async () => {
  const query = {
    filter: JSON.stringify({search: text}),
  };
  const queryString = qs.stringify(query);
  const gruposRequest = await getGrupos(queryString);
  setGrupos(gruposRequest.data.data.items)
  console.log("Grupos: ",grupos)
}

const handleAll = async () => {
    const gruposRequest = await getGrupos()

    setGrupos(gruposRequest.data.data.items)
}

  useEffect(() => {
    ;(async () => {

      const query = {
        limit: LIMIT,
        page: offset,
      };

      const gruposRequest = await getGrupos(`${qs.stringify(query)}`)

      setGrupos(gruposRequest.data.data.items)
      setTotalElements(gruposRequest.data.data.totalElements)
      setTotalPages(gruposRequest.data.data.totalPages)
      setCurrentPage(gruposRequest.data.data.currentPage)
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

      const data = { nome: nome };

      if (nome) {
        try {
          const response = await postGrupos(data);
          console.log("response : ", response);
          handleCloseModal();
          window.location.reload();
        } catch (error) {
          console.error(error);
          setError("Ocorreu um erro ao adicionar o Grupo");
        }
      } else {
        setError("Nome não podem ser vazios");
      }
    }

  return (
    <>
      <Head title='Grupos'/>
      <Container>
          <SnackTitle>Grupos</SnackTitle>
              <ModalAdicionar title='Adicionar Grupo'>
                <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder='Nome'
                        value={nomeValue}
                        onChange={(event) => setNomeValue(event.target.value)}
                      />
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
          <List onClick={handleAll}><p>Mostrar todos os Grupos</p></List>
        </Container>
      <GruposComponent grupos={grupos}></GruposComponent>
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
