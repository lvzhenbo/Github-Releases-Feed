export interface Res {
  viewer: Viewer;
}

export interface Viewer {
  starredRepositories: StarredRepositories;
}

export interface StarredRepositories {
  totalCount: number;
  pageInfo: PageInfo;
  nodes: StarredRepositoriesNode[];
}

export interface StarredRepositoriesNode {
  name: string;
  url: string;
  owner: Owner;
  releases: Releases;
}

export interface Owner {
  login: string;
  avatarUrl: string;
  url: string;
}

export interface Releases {
  nodes: ReleasesNode[];
}

export interface ReleasesNode {
  id: string;
  name: string;
  tagName: string;
  description: string;
  publishedAt: string;
  url: string;
}

export interface PageInfo {
  startCursor: string;
  hasPreviousPage: boolean;
  endCursor: string;
  hasNextPage: boolean;
}
