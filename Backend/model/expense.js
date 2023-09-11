const db  = require('../util/database');

module.exports = class Expense{
    constructor(id, amount, desci, cat){
        this.id = id;
        this.amount = amount;
        this.desci = desci;
        this.cat = cat;
    }

    save(){
        if(!this.id){
            // console.log('adding expense');
            return db.execute('INSERT INTO expense (amount, desci, cat) VALUES (?, ?, ?)',
            [this.amount, this.desci, this.cat]);
        }
        else{
            console.log('in update');
            return db.execute('UPDATE expense SET amount=?, desci=?, cat=? WHERE id=?',
            [this.amount, this.desci, this.cat, this.id]);
        }
    }

    static deleteById(id) {
        return db.execute('DELETE FROM expense WHERE id=?',[id])
    }

    static fetchAll(){
        return db.execute('SELECT * FROM expense');
    }
}