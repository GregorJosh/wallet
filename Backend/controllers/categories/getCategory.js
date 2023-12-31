import Category from "#models/category.js";

/**
 * GET /api/categories/{id}
 *
 * @security BearerAuth

 * @param {string} id.path.required - ID of the category to retrieve
 * @return {ResponseWithDataSchema<Category>} 200 - Success, returns the category
 * @return {ResponseSchema} 400 - Error: Bad Request
 * @return {ResponseSchema} 404 - Error: Not Found
 */

export const getUserCategoryById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      description: "No category Id",
    });
  }

  let result;

  for (const cid of req.user.categories) {
    if (cid === id) {
      result = await Category.findOne({ _id: id }).lean();
    }
  }

  if (!result) {
    return res.status(404).json({
      statusCode: 404,
      description: "Category not found",
    });
  }

  return res.status(200).json({
    statusCode: 200,
    description: "Category details",
    data: result,
  });
};
