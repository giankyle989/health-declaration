const router = require("express").Router();
let Health = require("../models/health.model");
const {protect} = require('../middlewares/authMiddleware')
const {getHealth, addHealth, deleteHealth, updateHealth} = require('../controller/healthController')

// home
router.get('/', protect, getHealth)
// add
router.post('/add', protect, addHealth)
//delete
router.delete("/:id", protect, deleteHealth)
//update
router.put('/:id', protect, updateHealth)

module.exports = router;
