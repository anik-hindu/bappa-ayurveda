import { absoluteUrl } from "@/lib/seo";

const siteRoot = absoluteUrl("/");

export const SCHEMA_IDS = {
  organization: `${siteRoot}#organization`,
  website: `${siteRoot}#website`,
  logo: `${siteRoot}#logo`,
  founder: absoluteUrl("/authors/shivansh-mishra#person"),
  person: (path: string) => `${absoluteUrl(path)}#person`,
  webpage: (path: string) => `${absoluteUrl(path)}#webpage`,
  article: (path: string) => `${absoluteUrl(path)}#article`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
  definedTerm: (path: string) => `${absoluteUrl(path)}#term`,
  itemList: (path: string) => `${absoluteUrl(path)}#itemlist`,
  definedTermSet: (path: string) => `${absoluteUrl(path)}#termset`,
  blogPosting: (path: string) => `${absoluteUrl(path)}#article`,
} as const;
