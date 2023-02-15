import React ,{ useState, useEffect } from "react"
import qs from 'qs';
import { DadosPagar } from "../../../components/DadosPagar"
import { Head } from "../../../components/Head"
import { SnackTitle } from "../../../components/SnackTitle"
import { Container, List, Pesquisar } from "./styles"
import  pesquisar  from '../../../assets/pesquisar.png'
import { getSaidas, getSubgrupos, postSaidas } from "../../../services/api"
import { ModalAdicionar } from "../../../components/ModalAdicionar"
import { Add } from "../../../components/ModalAdicionar/styles"
import { Container3 } from '../styles';
import { Pagination } from '../../../components/Paginação';

interface SubgrupoProps {
  id: string,
  ativo: boolean,
  createdAt: Date,
  updatedAt: Date,
  nome: string
}

export default function ContasPagar() {
const [saidas, setSaidas] = useState([])
const [subgrupo, setSubgrupo] = useState<Array<SubgrupoProps>>([]);
const [, setIsOpen] = useState(false);
const [error, setError] = useState("")
const [dataVencimento, setDataVencimento] = useState("")
const [dataPagamento, setDataPagamento] = useState("")
const [multaValue, setMultaValue] = useState("")
const [jurosValue, setJurosValue] = useState("")
const [descontoValue, setDescontoValue] = useState("")
const [grupoSelecionadoValue, setGrupoSelecionadoValue] = useState('');
const [valorValue, setValorValue] = useState("")
const [subgrupoSelecionado, setSubGrupoSelecionado] = useState('');
const [totalElements, setTotalElements] = useState(0)
const [, setTotalPages] = useState(0)
const [, setCurrentPage] = useState(0)
const [offset, setOffset] = useState(1)
const [text, setText] = useState('');

const LIMIT = 8

useEffect(() => {
  ; (async () => {
    const subgrupoRequest = await getSubgrupos()

    setSubgrupo(subgrupoRequest.data.data.items)
  })()
}, [])

console.log("subgrupos : ", subgrupo)

const handleSearch = async () => {
  const query = {
    filter: JSON.stringify({search: text}),
  };
  const queryString = qs.stringify(query);
  const saidasRequest = await getSaidas(queryString);
  setSaidas(saidasRequest.data.data.items)
}

const handleAll = async () => {
    const saidasRequest = await getSaidas()

    setSaidas(saidasRequest.data.data.items)
}

useEffect(() => {
  ;(async () => {

    const query = {
      limit: LIMIT,
      page: offset,
    };

    const saidasRequest = await getSaidas(`${qs.stringify(query)}`)

    setSaidas(saidasRequest.data.data.items)
    setTotalElements(saidasRequest.data.data.totalElements)
    setTotalPages(saidasRequest.data.data.totalPages)
    setCurrentPage(saidasRequest.data.data.currentPage)
  })()
}, [offset])

function handleCloseModal() {
  setIsOpen(false);
}

async function handleSubmit(event: {
  preventDefault: () => void;
}) {
    event.preventDefault();
    const data_pagamento = dataPagamento
    const data_vencimento = dataVencimento
    const multa = multaValue
    const juros = jurosValue
    const desconto = descontoValue
    const id_subgrupo = subgrupoSelecionado
    const valor = valorValue
    const id_grupo = grupoSelecionadoValue

    const data = {
      data_pagamento: data_pagamento,
      data_vencimento: data_vencimento,
      multa: multa,
      juros: juros,
      desconto: desconto,
      id_subgrupo: id_subgrupo,
      valor: valor,
      id_grupo: id_grupo
    };

    if (valor && data_vencimento && data_pagamento) {
      try {
        console.log("data", data)
        const response = await postSaidas(data);
        console.log("response : ", response);
        handleCloseModal();
        window.location.reload();
      } catch (error) {
        console.error(error);
        setError("Ocorreu um erro ao adicionar o grupo");
      }
    } else {
      setError("Nome ou Grupo não podem ser vazios");
    }
  }

  return (
    <>
        <Head title='Contas a Pagar'/>
        <Container>
          <SnackTitle>Contas a Pagar</SnackTitle>
          <ModalAdicionar title='Adicionar Contas a Pagar'>
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
                value={multaValue}
                onChange={(event) => setMultaValue(event.target.value)}
              />
              <input
                type="text"
                placeholder='Juros'
                value={jurosValue}
                onChange={(event) => setJurosValue(event.target.value)}
              />
              <input
                type="text"
                placeholder='Desconto'
                value={descontoValue}
                onChange={(event) => setDescontoValue(event.target.value)}
              />
                <select
                  value={grupoSelecionadoValue}
                  onChange={(event) => setGrupoSelecionadoValue(event.target.value)}
                >
                  <React.Fragment>
                  <option value="" disabled>Selecione</option>
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
            <img src={pesquisar} alt="" onClick={handleSearch} />
          </Pesquisar>
          <List onClick={handleAll}><p>Mostrar todas as Contas</p></List>
        </Container>
        <DadosPagar saidas={saidas}></DadosPagar>
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
