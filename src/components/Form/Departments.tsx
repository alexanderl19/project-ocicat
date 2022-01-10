import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import Fuse from "fuse.js";

interface Department {
  department: string;
  department_name: string;
}

class Departments extends React.Component {
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
        keys: ["department.department", "department.department_name"],
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
        <FormLabel htmlFor="departments">Departments</FormLabel>
        <AsyncSelect
          id="departments"
          isMulti
          name="departments"
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
