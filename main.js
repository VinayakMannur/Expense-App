// console.log("hello world")
let form = document.getElementById("formData")
let parent = document.getElementById("table")

form.addEventListener('submit',addData)
parent.addEventListener('click',removeItem)
parent.addEventListener('click',editItem)

// console.log(localStorage.getItem('uExpense')==null);
if(localStorage.getItem('uExpense')==null){
    localStorage.setItem('uExpense',JSON.stringify({list:[]})) 
}

showExpenses()



function addData(e) {
    e.preventDefault()
   let amount = document.getElementById("specificSizeInputName").value
   let descip = document.getElementById("specificSizeInputGroupUsername").value
   let cat = document.getElementById("specificSizeSelect").value

   console.log(amount,descip,cat);

   

   let localData = (localStorage.getItem('uExpense'));

    localData = JSON.parse(localData);

    let data = {
        id : `${localData.list.length+1}`,
        amount : `${amount}`,
        desc : `${descip}`,
        cat : `${cat}`
       }

    localData.list.push(data)
    localStorage.setItem(`uExpense`,JSON.stringify(localData))

}


function showExpenses() {

    let expenses = JSON.parse(localStorage.getItem('uExpense'))
   

    expenses.list.forEach((exp,i)=>{
        console.log(exp);
        
        let row = document.createElement('tr')
        let index = document.createElement("td")
        index.textContent = i+1
        index.setAttribute("scope","row")
        let tamt = document.createElement("td")
        tamt.textContent = exp.amount
        let tdesc = document.createElement("td")
        tdesc.textContent = exp.desc
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

        row.appendChild(index)
        row.appendChild(tamt)
        row.appendChild(tdesc)
        row.appendChild(tcat)
        row.appendChild(tact)

        parent.appendChild(row)
    })

    
    
}

function removeItem(e) {
    
    if(e.target.classList.contains("delete")){
        // console.log("deleting");
        let node = e.target.parentElement.parentElement;
        // console.log(node);
        let index = node.firstElementChild.innerText;
        let expenses = JSON.parse(localStorage.getItem('uExpense'))
        // console.log(`expenses${expenses}`);
        expenses.list.forEach((exp)=>{
            if(exp.id===index){
                console.log(exp);
                let nI = ( expenses.list.indexOf(exp))
                expenses.list.splice(nI,1)
                localStorage.setItem("uExpense",JSON.stringify(expenses))
            }

        })
    }
    
   
}


function editItem(e) {
    if(e.target.classList.contains("edit")){
        // console.log("editing");
        let amount = document.getElementById("specificSizeInputName")
        let descip = document.getElementById("specificSizeInputGroupUsername")
        let cat = document.getElementById("specificSizeSelect")

        let node = e.target.parentElement.parentElement;
        // console.log(node);
        let index = node.firstElementChild.innerText;
        // console.log(index);
        let expenses = JSON.parse(localStorage.getItem('uExpense'))
        expenses.list.forEach((exp)=>{
            if(exp.id===index){
                amount.value = exp.amount
                descip.value = exp.desc
                cat.value = exp.cat
                let nI = ( expenses.list.indexOf(exp))
                expenses.list.splice(nI,1)
                localStorage.setItem("uExpense",JSON.stringify(expenses))
            }
        })

    }

    
}