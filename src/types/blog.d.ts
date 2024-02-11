export enum MatchLevel {
  None = "none",
}
export enum Type {
  Comment = "comment",
  Story = "story",
}
export interface Blogs {
  exhaustive: Exhaustive;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  hits: Hit[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
  query: string;
  serverTimeMS: number;
}

export interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface Hit {
  _highlightResult: HighlightResult;
  _tags: string[];
  author: string;
  created_at: Date;
  created_at_i: number;
  num_comments: number;
  objectID: string;
  points: number;
  objectID: number;
  title: string;
  updated_at: Date;
  url: string;
  children?: number[];
}

export interface HighlightResult {
  author: Author;
  title: Author;
  url: Author;
}

export interface Author {
  matchLevel: MatchLevel;
  matchedWords: any[];
  value: string;
}

export interface ProcessingTimingsMS {
  _request: Request;
  total: number;
}

export interface Request {
  roundTrip: number;
}

//  blog details
export interface Blog {
  author: string;
  children: Blog[];
  created_at: Date;
  created_at_i: number;
  id: number;
  options: any[];
  parent_id: number | null;
  points: number | null;
  story_id: number;
  text: null | string;
  title: null | string;
  type: Type;
  url: null | string;
}
