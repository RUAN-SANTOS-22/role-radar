import { Card } from '@primereact/ui/card';

const estiloCaption = {
  color: ' #7f7e7e',
  borderBottom: '1px solid #dadada'
}
const estiloRoot = {
  width: '100%'
}
const estiloBody = {
  padding: 0
}

const Cartao = (props) => {
  return (
    <Card.Root style={estiloRoot}>
      <Card.Body style={estiloBody}>
          <Card.Caption className="py-1 px-3 text-sm" style={estiloCaption}>
            {props.cabecalho}          
          </Card.Caption>

          <Card.Content className="p-3">
            {props.children}
          </Card.Content>
          <Card.Footer />
      </Card.Body>
    </Card.Root>
  )
}

export default Cartao