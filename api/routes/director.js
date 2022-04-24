const express = require("express");
const router = express.Router();

// GET routes
router.get("/", (req, res, next) => {
    res.json({
        message: "Director - GET"
    });
});

// POST
router.post("/", (req, res, next) => {
    res.json({
        message: "Director - POST"
    });
});

// GET by id
router.get("/:directorId", (req, res, next) => {
    const directorId = req.params.directorId;
    res.json({
        message: "Director - GET",
        id: directorId
    });
});

// PATCH by id
router.patch("/:directorId", (req, res, next) => {
    const directorId = req.params.directorId;
    res.json({
        message: "Director - PATCH",
        id: directorId
    });
});

// DELETE by id
router.delete("/:directorId", (req, res, next) => {
    const directorId = req.params.directorId;
    res.json({
        message: "Director - DELETE",
        id: directorId
    });
});

module.exports = router;