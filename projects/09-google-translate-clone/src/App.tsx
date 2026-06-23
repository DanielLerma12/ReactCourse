import { useStore } from "./hooks/useStore";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";

function App() {
  const { state, setFromLanguage, interchangeLanguages } = useStore();

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <h2>From</h2>
          {state.fromLanguage}
        </Col>

        <Col>
          <button onClick={interchangeLanguages}>intercambiar</button>
        </Col>

        <Col>
          <h2>To</h2>
          {state.toLanguage}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
