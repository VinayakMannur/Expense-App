// console.log("hello world")
let form = document.getElementById("formData")
let parent = document.getElementById("table")
let saveBtnDiv = document.getElementById('saveBtnDiv');

const formEdit = document.getElementById('table')
formEdit.addEventListener('click', editE)

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
        editBtn.setAttribute("data-bs-toggle","modal" )
        editBtn.setAttribute("data-bs-target","#exampleModal")

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

const update1 = document.getElementById('update');
update1.addEventListener('click', replaceText);

async function replaceText(){
    // console.log('in replcae text');
    let uid =  document.getElementById('uid');
    let uamount = document.getElementById('uamount');
    let udesc = document.getElementById('udesc');
    let ucat = document.getElementById('ucat');
    console.log(uid);

    await axios.post('http://localhost:9000/edit', {

        id : uid.value,
        amount : uamount.value,
        desci: udesc.value,
        cat : ucat.value
    })
        .then((responce) =>{
            console.log(responce);
            alert(responce.data.msg)
            location.reload()
        })
        .catch((err) =>{
            console.log(err);
        })
}

async function editPop(id){

    let uamount = document.getElementById('uamount');
    let udesc = document.getElementById('udesc');
    let ucat = document.getElementById('ucat');
    let uid = document.getElementById('uid');

    let listv = [];
    await axios.get("http://localhost:9000")
        .then((responce) => {
            listv = responce.data.data;
            // console.log(expense[0]);
            const update1 = document.getElementById('update');
            update1.addEventListener('click', replaceText);
        })

    listv.forEach((item) => {
        // console.log(item);

        if (item.id == id) {
            console.log("loging");
            uid.value = id
            uamount.value = item.amount
            udesc.value = item.desci
            ucat.value = item.cat
        }

    })
    
}

function editE(e){
    e.preventDefault;
    if(e.target.classList.contains('edit')){
        // console.log(e.target.parentElement.parentElement.firstElementChild.innerText);
        editPop(e.target.parentElement.parentElement.firstElementChild.innerText)
    }
}

