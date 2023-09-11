const express = require('express');

const expressController = require('../controller/expense');

const router = express.Router();

router.get('/',expressController.getAll);

router.post('/add', expressController.addExpense);

router.get('/delete/:index', expressController.deleteExpense)

router.post('/edit', expressController.editExpense);

module.exports = router;