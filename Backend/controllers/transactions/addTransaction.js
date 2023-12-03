import transaction from "../../models/transaction.js";
export const addTransaction = async (req, res, next) => {
  const { type, category, sum, comment, date } = req.body;

  const ownerId = req.user.id;
  

  try {
    const newTrasaction = new transaction({
      type,
      category,
      sum,
      comment,
      date,
      owner: ownerId,
    });
    const result = await transaction.create(newTrasaction);
    res.json({
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
