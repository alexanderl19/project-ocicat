import type { VercelRequest, VercelResponse } from "@vercel/node";
import { request as graphqlRequest, gql } from "graphql-request";

export default (request: VercelRequest, response: VercelResponse) => {
  response.setHeader(
    "Cache-Control",
    `max-age=86400, s-maxage=${86400 * 7}, stale-while-revalidate`
  );

  interface Response {
    grades: {
      grade_distributions: {
        course_offering: {
          course: {
            department: string;
            department_name: string;
          };
        };
      }[];
    };
  }

  const query = gql`
    {
      grades {
        grade_distributions {
          course_offering {
            course {
              department
              department_name
            }
          }
        }
      }
    }
  `;

  graphqlRequest("https://api.peterportal.org/graphql/", query).then(
    (data: Response) => {
      const allDepartments = Array.from(
        data.grades.grade_distributions
          .reduce((allDepartments, gradeDistribution) => {
            allDepartments.set(
              gradeDistribution.course_offering.course.department,
              gradeDistribution.course_offering.course
            );
            return allDepartments;
          }, new Map())
          .values()
      );
      response.status(200).send(allDepartments);
    }
  );
};
