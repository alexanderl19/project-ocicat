import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import Fuse from "fuse.js";

import { Quarter } from "../../../interfaces/inputs.interface";
import { Props } from "react-select";

export declare interface QuartersProps {
  quarters: Quarter[];
  onChange: Props["onChange"];
}
class Quarters extends React.Component<QuartersProps> {
  fuse: Fuse<unknown> | undefined;
  options: any;

  getOptions = async () => {
    const quarters = await fetch("/api/quarters");
    const quartersJSON: Quarter[] = await quarters.json();
    return quartersJSON.map((quarter) => {
      return { value: quarter, label: quarter };
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
        <FormLabel htmlFor="quarters">Quarters</FormLabel>
        <AsyncSelect
          id="quarters"
          isMulti
          name="quarters"
          value={this.props.quarters}
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

export default Quarters;
