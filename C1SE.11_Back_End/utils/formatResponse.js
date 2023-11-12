function formatResponse(result, page, limit) {
  const [data, total] = result;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  return {
    data,
    meta: {
      pagination: {
        limit,
        page,
        total,
        prevPage,
        nextPage,
        lastPage,
      },
    },
  };
}

module.exports = { formatResponse };
