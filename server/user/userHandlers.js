const UserDB = require('../db/user');

module.exports = {
  getCurrentUser: async (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      //user is not authenticated
      res.sendStatus(401);
    }
  },
  updateUser: async (req, res) => {
    if (!req.user) return res.sendStatus(401);

    if (!req.user.user_id === req.params.id) return res.sendStatus(401);

    //validate goals update
    const {
      vegetable_goals,
      fruit_goals,
      protein_goals,
      grain_goals,
    } = req.body;

    function isValidGoal(number) {
      if (Number.isInteger(number) && number >= 0 && number <= 10) return true;

      return false;
    }

    if (
      !isValidGoal(vegetable_goals) ||
      !isValidGoal(fruit_goals) ||
      !isValidGoal(protein_goals) ||
      !isValidGoal(grain_goals)
    ) {
      return res
        .status(400)
        .json('User goals must be a postive integer between 0-10');
    }

    //update db
    try {
      const user = await UserDB.updateUser(
        req.params.id,
        vegetable_goals,
        fruit_goals,
        protein_goals,
        grain_goals
      );

      res.status(201).json(user);
    } catch (err) {
      //error in updating db
      console.log(err);
      res.sendStatus(500);
    }
  },
};
