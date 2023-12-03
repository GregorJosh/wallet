import category from "../../models/category.js";

export const getCategory = async (req, res, next) => {
  const result = await category.find({});
  const usersId = req.user.id;
  
  res.json({
    statusCode: 200,
    data: result,
  });
};
