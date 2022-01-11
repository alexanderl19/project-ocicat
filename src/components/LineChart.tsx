import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

import {
  Instructor,
  Quarter,
  Year,
  Department,
  Grade,
} from "../../interfaces/inputs.interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export declare interface LineChartProps {
  instructors: Instructor[];
  quarters: Quarter[];
  years: Year[];
  departments: Department[];
  course: string;
  class: string;
}

class LineChart extends React.Component<LineChartProps> {
  grades: Grade[] = [];

  componentDidMount() {
    fetch("api/years").then(async (years) => {
      const yearsJSON: Year[] = await years.json();
      yearsJSON
        .filter((year) => year)
        .map(async (year) => {
          const grades = await fetch(`/api/grades/${year}`);
          const gradesJSON: Grade[] = await grades.json();
          this.grades.push(...gradesJSON);
          this.forceUpdate();
        });
    });
  }

  render() {
    const selectedCourse = this.props.course;
    const selectedClass = this.props.class;
    const selectedQuarters = this.props.quarters;
    // const selectedYears = this.props.years;
    const selectedDepartments = this.props.departments.map(
      (department) => department.department
    );
    const selectedInstructors = this.props.instructors.map(
      (instructor) => instructor.shortened_name
    );
    const filteredGrades = (selectedYears: string[]) => {
      return this.grades.filter((grade) => {
        if (selectedCourse) {
          const gradeCourse = grade.course_id;
          if (selectedCourse !== gradeCourse) {
            return false;
          }
        }

        if (selectedClass) {
          const gradClass = grade.code;
          if (selectedClass !== gradClass) {
            return false;
          }
        }

        if (selectedQuarters.length) {
          const gradeQuarters = grade.quarter;
          if (
            !(
              selectedQuarters &&
              selectedQuarters.some((quarter) => gradeQuarters === quarter)
            )
          ) {
            return false;
          }
        }

        if (selectedYears.length) {
          const gradeYears = grade.year;
          if (
            !(
              selectedYears && selectedYears.some((year) => gradeYears === year)
            )
          ) {
            return false;
          }
        }

        if (selectedDepartments.length) {
          const gradeDepartments = grade.department;
          if (
            !selectedDepartments.some(
              (department) => gradeDepartments === department
            )
          ) {
            return false;
          }
        }

        if (selectedInstructors.length) {
          const gradeInstructors = grade.instructors.map(
            (instructor) => instructor
          );
          if (
            !selectedInstructors.some((instructor) =>
              gradeInstructors.includes(instructor)
            )
          ) {
            return false;
          }
        }
        return true;
      });
    };

    const labels = [
      "2014-15",
      "2015-16",
      "2016-17",
      "2017-18",
      "2018-19",
      "2019-20",
      "2020-21",
      "2021-22",
    ];
    const filteredGradesByYear = labels.map((year) => filteredGrades([year]));
    const totalGradesByYear = filteredGradesByYear.map((filteredGradesByYear) =>
      filteredGradesByYear.reduce(
        (output, grade) =>
          output +
          grade.grade_a_count +
          grade.grade_b_count +
          grade.grade_c_count +
          grade.grade_d_count +
          grade.grade_f_count +
          grade.grade_np_count +
          grade.grade_p_count,
        0
      )
    );
    const sumFilteredGrades: ChartData<"line"> = {
      labels,
      datasets: [
        {
          label: "a",
          data: filteredGradesByYear.map(
            (filteredGradesByYear, i) =>
              filteredGradesByYear.reduce(
                (output, grade) => output + grade.grade_a_count,
                0
              ) / totalGradesByYear[i]
          ),
          cubicInterpolationMode: "monotone",
          borderColor: "#E53E3E",
        },
        {
          label: "b",
          data: filteredGradesByYear.map(
            (filteredGradesByYear, i) =>
              filteredGradesByYear.reduce(
                (output, grade) => output + grade.grade_b_count,
                0
              ) / totalGradesByYear[i]
          ),
          cubicInterpolationMode: "monotone",
          borderColor: "#DD6B20",
        },
        {
          label: "c",
          data: filteredGradesByYear.map(
            (filteredGradesByYear, i) =>
              filteredGradesByYear.reduce(
                (output, grade) => output + grade.grade_c_count,
                0
              ) / totalGradesByYear[i]
          ),
          cubicInterpolationMode: "monotone",
          borderColor: "#D69E2E",
        },
        {
          label: "d",
          data: filteredGradesByYear.map(
            (filteredGradesByYear, i) =>
              filteredGradesByYear.reduce(
                (output, grade) => output + grade.grade_d_count,
                0
              ) / totalGradesByYear[i]
          ),
          cubicInterpolationMode: "monotone",
          borderColor: "#38A169",
        },
        {
          label: "f",
          data: filteredGradesByYear.map(
            (filteredGradesByYear, i) =>
              filteredGradesByYear.reduce(
                (output, grade) => output + grade.grade_f_count,
                0
              ) / totalGradesByYear[i]
          ),
          cubicInterpolationMode: "monotone",
          borderColor: "#319795",
        },
        {
          label: "p",
          data: filteredGradesByYear.map(
            (filteredGradesByYear, i) =>
              filteredGradesByYear.reduce(
                (output, grade) => output + grade.grade_p_count,
                0
              ) / totalGradesByYear[i]
          ),
          cubicInterpolationMode: "monotone",
          borderColor: "#3182CE",
        },
        {
          label: "np",
          data: filteredGradesByYear.map(
            (filteredGradesByYear, i) =>
              filteredGradesByYear.reduce(
                (output, grade) => output + grade.grade_np_count,
                0
              ) / totalGradesByYear[i]
          ),
          cubicInterpolationMode: "monotone",
          borderColor: "#00B5D8",
        },
      ],
    };

    const options = {
      responsive: true,
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: "Grade Distribution Over Time",
        },
      },
      scales: {
        y: {
          type: "linear" as const,
          display: true,
          position: "left" as const,
        },
      },
    };

    return <Line options={options} data={sumFilteredGrades} />;
  }
}

export default LineChart;
