import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import BarGraph from "./components/BarGraph";
import LineChart from "./components/LineChart";
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
    gradesOverTime: false,
  };

  handleChange = (event: { target: { name?: string; value: any } }) => {
    const target = event.target;
    const name = target.name;

    if (name)
      this.setState({
        [name]: target.value,
      });
  };

  handleSwitchChange = () => {
    // @ts-ignore
    this.setState((state) => ({ gradesOverTime: !state.gradesOverTime }));
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
          gradesOverTime={this.state.gradesOverTime}
          onFormChange={this.handleChange}
          onSwitchChange={this.handleSwitchChange}
          handleReactSelectChange={this.handleReactSelectChange}
        />
        <Center>
          <Box w="full" maxW="container.md" py="8">
            {this.state.gradesOverTime ? (
              <LineChart
                instructors={this.state.instructors.map(
                  // @ts-ignore
                  (option) => option.value
                )}
                // @ts-ignore
                quarters={this.state.quarters.map((option) => option.value)}
                // @ts-ignore
                years={this.state.years.map((option) => option.value)}
                departments={this.state.departments.map(
                  // @ts-ignore
                  (option) => option.value
                )}
                course={this.state.course}
                class={this.state.class}
              />
            ) : (
              <BarGraph
                instructors={this.state.instructors.map(
                  // @ts-ignore
                  (option) => option.value
                )}
                // @ts-ignore
                quarters={this.state.quarters.map((option) => option.value)}
                // @ts-ignore
                years={this.state.years.map((option) => option.value)}
                departments={this.state.departments.map(
                  // @ts-ignore
                  (option) => option.value
                )}
                course={this.state.course}
                class={this.state.class}
              />
            )}
          </Box>
        </Center>
      </div>
    );
  }
}

export default App;
