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

import {
  Instructor,
  Quarter,
  Year,
  Department,
} from "../../interfaces/inputs.interface";
import { Props } from "react-select";

type OnFormChange = (event: {
  target: {
    name: string;
    value: any;
  };
}) => void;
export declare interface FormProps {
  instructors: Instructor[];
  quarters: Quarter[];
  years: Year[];
  departments: Department[];
  course: string;
  class: string;
  onFormChange: OnFormChange;
  handleReactSelectChange: Props["onChange"];
}

class Form extends React.Component<FormProps> {
  render() {
    return (
      <SimpleGrid columns={[1, 2, 3]} spacing="6" p="4" textAlign="left">
        <Instructors
          instructors={this.props.instructors}
          onChange={this.props.handleReactSelectChange}
        />
        <Quarters
          quarters={this.props.quarters}
          onChange={this.props.handleReactSelectChange}
        />
        <Years
          years={this.props.years}
          onChange={this.props.handleReactSelectChange}
        />
        <Departments
          departments={this.props.departments}
          onChange={this.props.handleReactSelectChange}
        />
        <FormControl>
          <FormLabel htmlFor="course">Course Code</FormLabel>
          <Input
            id="course"
            placeholder="Course Code"
            name="course"
            value={this.props.course}
            onChange={this.props.onFormChange}
          />
          <FormHelperText>(E.g. 7A)</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="class">Class Code</FormLabel>
          <Input
            id="class"
            placeholder="Class Code"
            name="class"
            value={this.props.class}
            onChange={this.props.onFormChange}
          />
          <FormHelperText>(E.g. 12345)</FormHelperText>
        </FormControl>
      </SimpleGrid>
    );
  }
}

export default Form;
