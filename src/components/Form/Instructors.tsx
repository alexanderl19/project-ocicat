import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import Fuse from "fuse.js";

import { Instructor } from "../../../interfaces/inputs.interface";
import { Props } from "react-select";

export declare interface InstructorsProps {
  instructors: Instructor[];
  onChange: Props["onChange"];
}

class Instructors extends React.Component<InstructorsProps> {
  fuse: Fuse<unknown> | undefined;
  options: any;

  getOptions = async () => {
    const instructors = await fetch("/api/instructors");
    const instructorsJSON: Instructor[] = await instructors.json();
    return instructorsJSON.map((instructor) => {
      return {
        value: {
          ...instructor,
          lastName: instructor.shortened_name.split(",")[0],
        },
        label: instructor.name,
      };
    });
  };

  promiseOptions = async (inputValue: string) => {
    if (!this.fuse) {
      this.options = await this.getOptions();
      const fuseOptions = {
        includeScore: true,
        keys: [
          {
            name: "value.name",
            weight: 0.25,
          },
          {
            name: "value.lastName",
            weight: 0.5,
          },
          {
            name: "value.shortened_name",
            weight: 0.25,
          },
        ],
      };
      this.fuse = new Fuse(this.options, fuseOptions);
      return this.options;
    }
    return this.fuse.search(inputValue).map((x) => x.item);
  };

  render() {
    return (
      <FormControl>
        <FormLabel htmlFor="instructors">Instructor Name</FormLabel>
        <AsyncSelect
          id="instructors"
          isMulti
          name="instructors"
          value={this.props.instructors}
          onChange={this.props.onChange}
          cacheOptions
          defaultOptions
          loadOptions={this.promiseOptions}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "#3182CE",
              neutral20: "#E2E8F0",
            },
          })}
        />
      </FormControl>
    );
  }
}

export default Instructors;
