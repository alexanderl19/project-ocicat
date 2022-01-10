import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
  BarElement,
  Title,
  Tooltip,
  Legend
);

export declare interface GraphProps {
  instructors: Instructor[];
  quarters: Quarter[];
  years: Year[];
  departments: Department[];
  course: string;
  class: string;
}

class Graph extends React.Component<GraphProps> {
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
    const selectedYears = this.props.years;
    const selectedDepartments = this.props.departments.map(
      (department) => department.department
    );
    const selectedInstructors = this.props.instructors.map(
      (instructor) => instructor.shortened_name
    );
    const filteredGrades = this.grades.filter((grade) => {
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
          !(selectedYears && selectedYears.some((year) => gradeYears === year))
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

    const labels = ["A", "B", "C", "D", "F", "P", "NP"];
    const sumFilteredGrades = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: [
            filteredGrades.reduce(
              (output, grade) => output + grade.grade_a_count,
              0
            ),
            filteredGrades.reduce(
              (output, grade) => output + grade.grade_b_count,
              0
            ),
            filteredGrades.reduce(
              (output, grade) => output + grade.grade_c_count,
              0
            ),
            filteredGrades.reduce(
              (output, grade) => output + grade.grade_d_count,
              0
            ),
            filteredGrades.reduce(
              (output, grade) => output + grade.grade_f_count,
              0
            ),
            filteredGrades.reduce(
              (output, grade) => output + grade.grade_p_count,
              0
            ),
            filteredGrades.reduce(
              (output, grade) => output + grade.grade_np_count,
              0
            ),
          ],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
      },
    };

    return (
      <Bar options={options} width={100} height={50} data={sumFilteredGrades} />
    );
  }
}

export default Graph;
