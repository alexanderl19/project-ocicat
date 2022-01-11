import React from "react";
import { Badge, FormControl, FormLabel, Switch } from "@chakra-ui/react";

type OnFormChange = (event: {
  target: {
    name: string;
    value: any;
  };
}) => void;
export declare interface GradesOverTimeProps {
  value: boolean;
  onSwitchChange: OnFormChange;
}

class GradesOverTime extends React.Component<GradesOverTimeProps> {
  render() {
    return (
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="grades-over-time" mb="0">
          Enable grades over time?
        </FormLabel>
        <Switch
          id="grades-over-time"
          name="gradesOverTime"
          isChecked={this.props.value}
          onChange={this.props.onSwitchChange}
        />
        <Badge colorScheme="red" ml="2">
          Alpha
        </Badge>
      </FormControl>
    );
  }
}

export default GradesOverTime;
