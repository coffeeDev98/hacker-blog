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
  blogDetails: (id: string) => `${envVariables.apiUrl}/items/${id}`,
  frontPage: `${envVariables.apiUrl}/search?tags=front_page`,
  fetchPage: (page: number) => `${envVariables.apiUrl}/search?page=${page}`,
};

export const theme = {
  // light
  cyan: "#92C7CF",
  aqua: "#AAD7D9",
  "vista-white": "#FBF9F1",
  satin: "#E5E1DA",
  // dark
  gunmetal: "#352F44",
  comet: "#5C5470",
  lily: "#B9B4C7",
  linen: "#FAF0E6",
};
export const colorSet = [
  {
    c1: "#f6d365",
    c2: "#fda085",
  },
  {
    c1: "#fbc2eb",
    c2: "#a6c1ee",
  },
  {
    c1: "#84fab0",
    c2: "#8fd3f4",
  },
  {
    c1: "#a1c4fd",
    c2: "#c2e9fb",
  },
  {
    c1: "#ffecd2",
    c2: "#fcb69f",
  },
];

export const getColorSet = (index?: number, length?: number) => {
  if (index && length) {
    return colorSet[(index % length) % colorSet.length];
  }

  return colorSet[Math.floor(Math.random() * colorSet.length)];
};
