type metaFunction = (key: number) => JSX.Element;

export interface Seo {
  title?: metaFunction;
  description?: metaFunction;
  canonical?: metaFunction;
  metas?: metaFunction;
  schema?: metaFunction;
}

type SeoObject = Record<string, Seo>;

export const renderPageSeo = (seoObject: SeoObject, page: string): any => {
  const seoPageObject = seoObject[page];
  if (seoPageObject) {
    return Object.values(seoPageObject).map((seoCategoryFunction, index) =>
      seoCategoryFunction(index)
    );
  }
};
