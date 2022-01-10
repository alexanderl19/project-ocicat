import type { VercelRequest, VercelResponse } from "@vercel/node";
import { request as graphqlRequest, gql } from "graphql-request";

export default (request: VercelRequest, response: VercelResponse) => {
  response.setHeader(
    "Cache-Control",
    `max-age=31536000, s-maxage=${86400 * 7}, stale-while-revalidate`
  );

  interface Response {
    grades: {
      grade_distributions: {
        grade_a_count: number;
        grade_b_count: number;
        grade_c_count: number;
        grade_d_count: number;
        grade_f_count: number;
        grade_p_count: number;
        grade_np_count: number;
        grade_w_count: number;
        course_offering: {
          section: {
            code: string;
          };
          year: string;
          quarter: string;
          instructors: {
            shortened_name: string;
          }[];
          course: {
            id: string;
            department: string;
          };
        };
      }[];
    };
  }

  const query = gql`
    query getGrades($year: String!) {
      grades(year: $year) {
        grade_distributions {
          grade_a_count
          grade_b_count
          grade_c_count
          grade_d_count
          grade_f_count
          grade_p_count
          grade_np_count
          grade_w_count
          course_offering {
            section {
              code
            }
            year
            quarter
            instructors {
              shortened_name
            }
            course {
              id
              department
            }
          }
        }
      }
    }
  `;

  const { year } = request.query;
  const variables = {
    year: year,
  };

  graphqlRequest("https://api.peterportal.org/graphql/", query, variables).then(
    (data: Response) => {
      const allGrades = data.grades.grade_distributions.map(
        (gradeDistribution) => {
          const courseOffering = gradeDistribution.course_offering;
          return {
            grade_a_count: gradeDistribution.grade_a_count,
            grade_b_count: gradeDistribution.grade_b_count,
            grade_c_count: gradeDistribution.grade_c_count,
            grade_d_count: gradeDistribution.grade_d_count,
            grade_f_count: gradeDistribution.grade_f_count,
            grade_p_count: gradeDistribution.grade_p_count,
            grade_np_count: gradeDistribution.grade_np_count,
            grade_w_count: gradeDistribution.grade_w_count,
            instructors: courseOffering.instructors.map(
              (instructor) => instructor.shortened_name
            ),
            quarter: courseOffering.quarter,
            year: courseOffering.year,
            department: courseOffering.course.department,
            course_id: courseOffering.course.id,
            code: courseOffering.section.code,
          };
        }
      );
      response.status(200).send(allGrades);
    }
  );
};
