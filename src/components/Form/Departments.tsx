import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import Fuse from "fuse.js";

import { Department } from "../../../interfaces/inputs.interface";
import { Props } from "react-select";

export declare interface DepartmentsProps {
  departments: Department[];
  onChange: Props["onChange"];
}

class Departments extends React.Component<DepartmentsProps> {
  fuse: Fuse<unknown> | undefined;
  options: any;

  getOptions = async () => {
    const departments = await fetch("/api/departments");
    const departmentsJSON: Department[] = await departments.json();
    return departmentsJSON.map((department) => {
      return { value: department, label: department.department_name };
    });
  };

  promiseOptions = async (inputValue: string) => {
    if (!this.fuse) {
      this.options = await this.getOptions();
      const fuseOptions = {
        includeScore: true,
        keys: [
          {
            name: "value.department_name",
            weight: 0.3,
          },
          {
            name: "value.department",
            weight: 0.7,
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
        <FormLabel htmlFor="departments">Departments</FormLabel>
        <AsyncSelect
          id="departments"
          isMulti
          name="departments"
          value={this.props.departments}
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

export default Departments;
