// console.log("hello world")
let form = document.getElementById("formData")
let parent = document.getElementById("table")
let saveBtnDiv = document.getElementById('saveBtnDiv');

form.addEventListener('submit', addData)
parent.addEventListener('click', removeItem)

showExpenses()

async function addData(e) {
    e.preventDefault()
    let amount = document.getElementById("specificSizeInputName").value
    let descip = document.getElementById("specificSizeInputGroupUsername").value
    let cat = document.getElementById("specificSizeSelect").value

    // console.log(amount, descip, cat);

    let data = {
        amount: amount,
        desci: descip,
        cat: cat
    }

    await axios.post("http://localhost:9000/add", data)
        .then((responce) => {
            alert(responce.data.msg);
        })
        .catch(err => console.log(err));

    location.reload();

}


async function showExpenses() {

    let expense = [];
    await axios.get("http://localhost:9000")
        .then((responce) => {
            expense = responce.data.data;
            // console.log(expense[0]);
        })

    // let expenses = JSON.parse(localStorage.getItem('uExpense'))
    // console.log(expenses);

    expense.forEach((exp,i) => {
        // console.log(exp);

        let row = document.createElement('tr')
        let index = document.createElement("td")
        let span = document.createElement('span');
        span.style = 'display:none',
        span.textContent = exp.id
        index.textContent = i+1
        index.setAttribute("scope", "row")
        let tamt = document.createElement("td")
        tamt.textContent = exp.amount
        let tdesc = document.createElement("td")
        tdesc.textContent = exp.desci
        let tcat = document.createElement("td")
        tcat.textContent = exp.cat
        let tact = document.createElement("td")

        let delBtn = document.createElement("button")
        delBtn.className = "btn btn-sm btn-danger delete"
        delBtn.textContent = "X"

        let editBtn = document.createElement("button")
        editBtn.className = "btn btn-sm btn-success edit"

        editBtn.textContent = "Edit"

        tact.appendChild(delBtn)
        tact.appendChild(editBtn)
        row.appendChild(span)
        row.appendChild(index)
        row.appendChild(tamt)
        row.appendChild(tdesc)
        row.appendChild(tcat)
        row.appendChild(tact)

        parent.appendChild(row)
    })
}

async function removeItem(e) {

    if (e.target.classList.contains("delete")) {
        // console.log("deleting");
        let node = e.target.parentElement.parentElement;
        // console.log(node);
        let index = node.firstElementChild.innerText;
        // console.log(index);

        axios.get(`http://localhost:9000/delete/${index}`)
            .then((responce) => {
                alert(responce.data.msg)
            })
            .catch(err => console.log(err));
        
        location.reload();
    }
}

