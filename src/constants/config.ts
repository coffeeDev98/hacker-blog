export const envVariables = {
  apiUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
};

export const urls = {
  search: `${envVariables.apiUrl}/search`,
  searchWithQuery: (q: string) => `${envVariables.apiUrl}/search?query=${q}`,
  searchWithQueryAndTag: (q: string, t: string) =>
    `${envVariables.apiUrl}/search?query=${q}&tags=${t}`,
  storyComments: (s: string) =>
    `${envVariables.apiUrl}/search?tags=comments,story_${s}`,
  frontPage: `${envVariables.apiUrl}/search?tags=front_page`,
  fetchPage: (page: number) => `${envVariables.apiUrl}/search?page=${page}`,
};
