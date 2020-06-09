const getPaginationPagesCount = (
  perPage: number,
  totalCount: number
): number => {
  const divided = totalCount / perPage;

  return divided % 1 === 0 ? divided : Math.trunc(divided) + 1;
};

export default getPaginationPagesCount;
