import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";

import "./App.css";
import { AUTO_LANGUAGUE } from "./constants";
import { ArrowInterButton } from "./components/icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    state,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debouncedFromText = useDebounce(state.fromText);

  useEffect(() => {
    if (debouncedFromText === "") return;
    console.log("translate");
    translate({
      fromLanguage: state.fromLanguage,
      toLanguage: state.toLanguage,
      text: debouncedFromText,
    })
      .then((result) => {
        if (result === null) return;
        setResult(result);
      })
      .catch(() => setResult("Error"));
  }, [debouncedFromText, state.fromLanguage, state.toLanguage]);

  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={state.fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={state.fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button
            onClick={interchangeLanguages}
            disabled={state.fromLanguage === AUTO_LANGUAGUE}
          >
            <ArrowInterButton />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={state.toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              type={SectionType.To}
              value={state.result}
              onChange={setResult}
              loading={state.loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
