const Expense = require('../model/expense');

exports.getAll = (req, res, next)=>{
    Expense.fetchAll()
        .then((data) =>{
            // console.log(data[0]);
            res.json({data:data[0]})
        })
        .catch( err => console.log(err))
}

exports.addExpense = (req, res, next) =>{

    const amount = req.body.amount;
    const desci = req.body.desci;
    const cat = req.body.cat;

    const expense = new Expense(null, amount, desci, cat);

    expense.save()
        .then((result) => {
            res.json({msg:"Expense Added Successfully"});
        })
        .catch(err => console.log(err));
}

exports.deleteExpense = (req, res, next) =>{
    const id = req.params.index;

    Expense.deleteById(id)
        .then((responce)=>{
            res.json({msg: "Expense deleted Successfully"})
        })
        .catch(err => console.log(err));
}

exports.editExpense = (req, res, next) => {
    const editId = req.body.editId;
    const editAmount = req.body.editAmount;
    const editDescip = req.body.editDescip;
    const editCat = req.body.editCat;

    const expense = new Expense(editId, editAmount, editDescip, editCat);

    expense.save()
        .then((responce) => {
            res.json({msg:"Updated successfully"});
        })
        .catch(err => console.log(err));
}