export type FullRequestParams<ExpectedResults> = Request & {
    results: ExpectedResults;
};
