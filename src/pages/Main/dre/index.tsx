
import { Container } from './../styles';
import { Despesas, Filtro, Lucro, Recebimentos } from './styles';
import { useState, useEffect } from 'react';
import { getSumEntradas } from './../../../services/api';


export default function Dre() {
  const [recebimentos, setRecebimentos] = useState<string>('')
  const [contaFuncionario, setContaFuncionario] = useState<string>('')
  const [contaFornecedores, setContaFornecedores] = useState<string>('')
  const [contaTributos, setContaTributos] = useState<string>('')


  useEffect(() => {
    ; (async () => {
      const recebimentosRequest = await getSumEntradas()

      setRecebimentos(recebimentosRequest.data.data)

      console.log("recebimentos : ", recebimentos)
    })()
  },[recebimentos])

  /* useEffect(() => {
    ; (async () => {
      const contaFuncionario = await getSumEntradas()

      setRecebimentos(recebimentosRequest.data.data)

      console.log("recebimentos : ", recebimentos)
    })()
  },[recebimentos]) */

  return (
    <Container>
        <Filtro>
          <h1>Filtro</h1>
        </Filtro>
        <Recebimentos>
          <>
            <h1>{recebimentos}</h1>
          </>
        </Recebimentos>
        <Despesas>
          <h1>Despesas</h1>
        </Despesas>
        <Lucro>
          <h1>Lucro</h1>
        </Lucro>
    </Container>
  )

}
