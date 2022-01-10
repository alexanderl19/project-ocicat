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
            }
          }
        }
      }
    }
  `;

  graphqlRequest("https://api.peterportal.org/graphql/", query).then(
    (data: Response) => {
      const allDepartments = Array.from(
        new Set(
          data.grades.grade_distributions.map(
            (gradeDistribution) =>
              gradeDistribution.course_offering.course.department
          )
        )
      );
      response.status(200).send(allDepartments);
    }
  );
};
