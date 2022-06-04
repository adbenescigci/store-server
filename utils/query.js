export const getAll = (Model, reqQuery) => {
  const queryObj = { ...reqQuery };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = JSON.parse(queryStr);

  const sortBy = reqQuery.sort?.split(",").join(" ") || "-processTime";
  const fields = reqQuery.fields?.split(",").join(" ") || "-__v";
  const page = reqQuery.page * 1 || 1;
  const limit = reqQuery.limit * 1 || 100;
  const skip = (page - 1) * limit;

  try {
    const result = Model.find(query)
      .sort(sortBy)
      .select(fields)
      .skip(skip)
      .limit(limit);
    return result;
  } catch (error) {
    return error;
  }
};
