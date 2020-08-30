const router = require("express").Router();
const Exercise = require("../dataBase/models/exercises.model");

router.route("/").get((req, res) => {
    Exercise.find()
        .then((exercises) => {
            res.json(exercises).status(200);
        })
        .catch((e) => {
            res.status(400).json("error: " + e);
        });
});
router.route("/add").post((req, res) => {
    const { userName, description, duration, date } = req.body;
    const newExercise = new Exercise({
        userName,
        description,
        duration,
        date,
    });
    newExercise
        .save()
        .then((exercise) => {
            res.json(exercise);
        })
        .catch((e) => {
            res.json("error: " + e).status(400);
        });
});

router.route("/:id").get(async(req, res) => {
    const { id } = req.params;
    try {
        const exercise = await Exercise.findById(id);
        res.json(exercise);
    } catch (e) {
        res.json("error: " + e).status(400);
    }
});

router.route("/:id").delete(async(req, res) => {
    const { id } = req.params;
    try {
        const exercise = await Exercise.findByIdAndDelete(id);
        res.json({ info: "exercise deleted", result: exercise });
    } catch (e) {
        res.json("error: " + e).status(400);
    }
});

router.route("/update/:id").post(async(req, res) => {
    const { id } = req.params;
    try {
        const exercise = await Exercise.findById(id);
        const available = ["userName", "description", "duration", "date"];
        available.forEach((item) => {
            if (req.body[item]) {
                exercise[item] = req.body[item];
            }
        });
        exercise
            .save()
            .then((newExercise) =>
                res.json({ info: "exercise updated", result: newExercise })
            )
            .catch((e) => res.json("error: " + e));
    } catch (e) {
        res.json("error: " + e).status(400);
    }
});
module.exports = router;