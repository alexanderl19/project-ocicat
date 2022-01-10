import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import Fuse from "fuse.js";

type Year = string;

class Years extends React.Component {
  fuse: Fuse<unknown> | undefined;
  options: any;

  getOptions = async () => {
    const years = await fetch("/api/years");
    const yearsJSON: Year[] = await years.json();
    return yearsJSON.map((year) => {
      return { value: year, label: year };
    });
  };

  promiseOptions = async (inputValue: string) => {
    if (!this.fuse) {
      this.options = await this.getOptions();
      const fuseOptions = {
        keys: ["value"],
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
        <FormLabel htmlFor="years">Years</FormLabel>
        <AsyncSelect
          id="years"
          isMulti
          name="years"
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

export default Years;
