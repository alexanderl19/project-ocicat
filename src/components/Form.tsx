import React from "react";
import Instructors from "./Form/Instructors";
import Quarters from "./Form/Quarters";
import Years from "./Form/Years";
import Departments from "./Form/Departments";
import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

class Form extends React.Component {
  render() {
    return (
      <SimpleGrid columns={[1, 2, 3]} spacing="6" p="4" textAlign="left">
        <Instructors />
        <Quarters />
        <Years />
        <Departments />
        <FormControl>
          <FormLabel htmlFor="course">Course Code</FormLabel>
          <Input id="course" placeholder="Course Code" />
          <FormHelperText>(E.g. 7A)</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="class">Class Code</FormLabel>
          <Input id="class" placeholder="Class Code" />
          <FormHelperText>(E.g. 12345)</FormHelperText>
        </FormControl>
      </SimpleGrid>
    );
  }
}

export default Form;
