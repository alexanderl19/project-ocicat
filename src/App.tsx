import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Graph from "./components/Graph";
import "./App.css";
import { Center, Box } from "@chakra-ui/react";
import { ActionMeta } from "react-select";

class App extends React.Component {
  state = {
    instructors: [],
    quarters: [],
    years: [],
    departments: [],
    course: "",
    class: "",
  };

  handleChange = (event: { target: { name?: string; value: any } }) => {
    const target = event.target;
    const name = target.name;

    if (name)
      this.setState({
        [name]: target.value,
      });
  };

  handleReactSelectChange = (
    option: unknown,
    actionMeta: ActionMeta<unknown>
  ) => {
    const name = actionMeta.name;

    if (name)
      this.setState({
        [name]: option,
      });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Form
          instructors={this.state.instructors}
          quarters={this.state.quarters}
          years={this.state.years}
          departments={this.state.departments}
          course={this.state.course}
          class={this.state.class}
          onFormChange={this.handleChange}
          handleReactSelectChange={this.handleReactSelectChange}
        />
        <Center>
          <Box w="full" maxW="container.md" py="8">
            <Graph
              // @ts-ignore
              instructors={this.state.instructors.map((option) => option.value)}
              // @ts-ignore
              quarters={this.state.quarters.map((option) => option.value)}
              // @ts-ignore
              years={this.state.years.map((option) => option.value)}
              // @ts-ignore
              departments={this.state.departments.map((option) => option.value)}
              course={this.state.course}
              class={this.state.class}
            />
          </Box>
        </Center>
      </div>
    );
  }
}

export default App;
