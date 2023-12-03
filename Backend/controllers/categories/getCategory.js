import category from "#models/category.js";
/**
 * GET /api/categories/:id
 *
 * @security BearerAuth
 * @param {string} id.query
 * @return {ResponseWithDataSchema} 200 - succes
 * @return {ResponseSchema} 400 - bad request
 */
export const getCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id) {
      const result = await category.find({ _id: id });
      return res.json({ statusCode: 200, data: result });
    }
    const result = await category.find({});
    const usersId = req.user.id;

    res.json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      description: error.message,
    });
  }
};
