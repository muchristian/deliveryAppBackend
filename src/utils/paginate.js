export const getPagination = (page, size) => {
    const limit = size ? +size : 6;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

  export const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, items, totalPages, currentPage };
  };

  