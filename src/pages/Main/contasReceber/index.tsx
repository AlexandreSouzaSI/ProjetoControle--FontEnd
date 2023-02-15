import React, { useState, useEffect } from "react"
import qs from 'qs';
import { DadosReceber } from "../../../components/DadosReceber";
import { Head } from "../../../components/Head";
import { SnackTitle } from "../../../components/SnackTitle";
import { Container, List, Pesquisar } from "./styles";
import  pesquisar  from '../../../assets/pesquisar.png'
import { getEntradas, getSaidas, getSubgrupos, postEntradas } from './../../../services/api';
import { ModalAdicionar } from './../../../components/ModalAdicionar/index';
import { Add } from "../../../components/ModalAdicionar/styles";
import { Container3 } from '../styles';
import { Pagination } from '../../../components/Paginação';

interface SubgrupoProps {
  id: string,
  ativo: boolean,
  createdAt: Date,
  updatedAt: Date,
  nome: string
}

export default function ContasReceber() {
const [entradas, setEntradas] = useState([])
const [subgrupo, setSubgrupo] = useState<Array<SubgrupoProps>>([]);
const [, setIsOpen] = useState(false);
const [error, setError] = useState("")
const [dateValue, setDateValue] = useState("");
const [grupoSelecionadoValue, setGrupoSelecionadoValue] = useState('');
const [valorValue, setValorValue] = useState("")
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
  const entradasRequest = await getEntradas(queryString);
  setEntradas(entradasRequest.data.data.items)
}

const handleAll = async () => {
    const entradasRequest = await getEntradas()

    setEntradas(entradasRequest.data.data.items)
}

useEffect(() => {
  ;(async () => {

    const query = {
      limit: LIMIT,
      page: offset,
    };

    const entradasRequest = await getEntradas(`${qs.stringify(query)}`)

    setEntradas(entradasRequest.data.data.items)
    setTotalElements(entradasRequest.data.data.totalElements)
    setTotalPages(entradasRequest.data.data.totalPages)
    setCurrentPage(entradasRequest.data.data.currentPage)
  })()
}, [offset])

function handleCloseModal() {
  setIsOpen(false);
}

async function handleSubmit(event: {
  preventDefault: () => void;
}) {
    event.preventDefault();
    const data = dateValue
    const id_subgrupo = grupoSelecionadoValue
    const valor = valorValue

    const response = {
      data: data,
      id_subgrupo: id_subgrupo,
      valor: valor,
    };

    if (id_subgrupo && valor && data) {
      try {
        const result = await postEntradas(response);
        console.log("response : ", result);
        handleCloseModal();
        window.location.reload();
      } catch (error) {
        console.error(error);
        setError("Ocorreu um erro ao adicionar o subgrupo");
      }
    } else {
      setError("Nenhum campo pode ser vazio");
    }
  }

  return (
    <>
      <Head title='Contas a Receber'/>
      <Container>
          <SnackTitle>Contas a Receber</SnackTitle>
          <ModalAdicionar title='Adicionar Conta a Receber'>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder='Data do Recebimento'
                value={dateValue}
                onChange={(event) => setDateValue(event.target.value)}
              />
                    <select
                  value={grupoSelecionadoValue}
                  onChange={(event) => setGrupoSelecionadoValue(event.target.value)}
                >
                  <React.Fragment>
                  <option value="" disabled>Selectione</option>
                    {subgrupo.length > 0 && subgrupo.map(sub => {
                      return <option key={sub.id} value={sub.id}>
                        {sub.nome}
                      </option>
                    })}
                  </React.Fragment>
                </select>
                <input
                type="text"
                placeholder='Valor'
                value={valorValue}
                onChange={(event) => setValorValue(event.target.value)}
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
          <List onClick={handleAll}><p>Mostrar todas as Contas</p></List>
        </Container>
      <DadosReceber entradas={entradas}></DadosReceber>
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
