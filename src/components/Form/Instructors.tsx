import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import Fuse from "fuse.js";

interface Instructor {
  name: string;
  shortened_name: string;
}

class Instructors extends React.Component {
  fuse: Fuse<unknown> | undefined;
  options: any;

  getOptions = async () => {
    const instructors = await fetch("/api/instructors");
    const instructorsJSON: Instructor[] = await instructors.json();
    return instructorsJSON.map((instructor) => {
      return { value: instructor, label: instructor.name };
    });
  };

  promiseOptions = async (inputValue: string) => {
    if (!this.fuse) {
      this.options = await this.getOptions();
      const fuseOptions = {
        keys: ["value.name", "value.shortened_name"],
        sortFn: (a: any, b: any) => b - a,
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
