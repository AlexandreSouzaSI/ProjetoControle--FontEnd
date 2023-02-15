import { Container } from "./styles";

interface InfoBoxProps {
  info: any[]
}

export function InfoBox({ info }: InfoBoxProps) {
  return <Container>
    {info && info.map(info => {
      return <tr key={info.id}>
                      <p>{info.title}</p>
                      <p>{info.pagamentos_total}</p>
                      <p>{info.pagamentos_aberto}</p>
                      <p>abertos</p>
                    </tr>
                })}
    </Container>
}
