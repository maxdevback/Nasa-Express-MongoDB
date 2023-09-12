import { query } from "express";

class Utils {
  getQuery(query: { page?: unknown; limit?: unknown }) {
    console.log(query);
    let page = 1;
    let limit = 0;
    if (query.page && typeof +query.page === "number" && +query.page >= 1) {
      page = Math.abs(+query.page);
    }
    if (query.limit && typeof +query.limit === "number" && +query.limit >= 0) {
      limit = Math.abs(+query.limit);
    }
    const skip = (page - 1) * limit;

    return {
      skip,
      limit,
    };
  }
}

export default new Utils();
