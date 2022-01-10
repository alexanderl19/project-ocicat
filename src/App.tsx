import Header from "./components/Header";
import Form from "./components/Form";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function App() {
  return (
    <div className="App">
      <Header />
      <Form />
      <Button
        leftIcon={<SearchIcon />}
        colorScheme="teal"
        variant="solid"
      ></Button>
    </div>
  );
}

export default App;
