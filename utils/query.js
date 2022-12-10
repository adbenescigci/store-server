//RESULT WITH all req.query

export const getAll = async (Model, reqQuery) => {
  const queryObj = { ...reqQuery };
  const excludedFields = ['page', 'sort', 'limit', 'fields', 'filter'];
  excludedFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = JSON.parse(queryStr);

  const sortBy = reqQuery.sort?.split(',').join(' ') || '-processTime';
  const fields = reqQuery.fields?.split(',').join(' ') || '-__v';
  const page = reqQuery.page * 1 || 1;
  const limit = reqQuery.limit * 1 || 100;
  const skip = (page - 1) * limit;
  let filter = undefined;

  if (reqQuery?.filter) filter = JSON.parse(reqQuery?.filter);
  console.log(filter, query);
  // const programs = await Program.find({
  //   $or: [{ students: _id }, { manager: _id }, { director: _id }],
  // });

  // and operator (max,min,goldTYpes,transtypes,paymenttypes)

  try {
    const result = await Model.find(query)
      .sort(sortBy)
      .select(fields)
      .skip(skip)
      .limit(limit);
    return result;
  } catch (error) {
    return error;
  }
};

//TAKE CHILD ID BEFORE SAVE PARENT
export const getChildIds = (children, id, Model) => {
  let result = [];
  children.forEach((el) => {
    const child = new Model({
      transaction: id,
      ...el,
    });
    try {
      child.save();
    } catch (error) {
      res.status(409).json({
        message: error.message,
      });
    }
    result.push(child._id);
  });
  return result;
};
