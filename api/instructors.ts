import type { VercelRequest, VercelResponse } from "@vercel/node";
import { request as graphqlRequest, gql } from "graphql-request";

export default (request: VercelRequest, response: VercelResponse) => {
  response.setHeader(
    "Cache-Control",
    `max-age=86400, s-maxage=${86400 * 7}, stale-while-revalidate`
  );

  interface Response {
    allInstructors: {
      name: string;
      shortened_name: string;
    }[];
  }

  const query = gql`
    {
      allInstructors {
        name
        shortened_name
      }
    }
  `;

  graphqlRequest("https://api.peterportal.org/graphql/", query).then(
    (data: Response) => {
      const allInstructors = data.allInstructors.map(
        (instructor) => instructor
      );
      response.status(200).send(allInstructors);
    }
  );
};
