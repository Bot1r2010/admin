const tableBody = document.querySelector('.table-body')
const logoutBtn = document.getElementById('logoutBtn')
let products = []

function fetchProducts(){
  fetch('https://fakestoreapi.com/products')
    .then(r=>r.json())
    .then(data=>{products = data; renderTable()})
}

function renderTable(){
  tableBody.innerHTML = ''
  products.forEach((p,i)=>{
    const tr = document.createElement('tr')
    tr.dataset.id = p.id
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${p.title}</td>
      <td class="small">${p.category}</td>
      <td><span class="truncate">${truncate(p.description,100)}</span></td>
      <td>$${Number(p.price).toFixed(2)}</td>
      <td><img src="${p.image}" alt=""></td>
      <td><button class="viewBtn">View</button></td>
      <td><button class="editBtn">Edit</button></td> 
      <td><button class="deleteBtn" data-id="${p.id}">Delete</button></td>
    `
    tableBody.appendChild(tr)
  })
}

function truncate(str,n){
  if(!str) return ''
  return str.length>n?str.slice(0,n-1)+'…':str
}

function openView(p){
  const overlay = document.createElement('div')
  document.body.appendChild(overlay)
  function remove(){overlay.remove();document.removeEventListener('keydown', onKey)}
  overlay.addEventListener('click', e=>{if(e.target===overlay) remove()})
  function onKey(e){if(e.key==='Escape') remove()}
  document.addEventListener('keydown', onKey)
}

tableBody.addEventListener('click', e => {
  if (e.target.classList.contains('viewBtn')) {
    const row = e.target.closest('tr')
    if (!row) return
    const id = row.dataset.id
    const p = products.find(x => String(x.id) === String(id))
    if (p) openView(p)
    return
  }

  if (e.target.classList.contains('deleteBtn')) {
    if (confirm('')) {
      const row = e.target.closest('tr')
      const id = row.dataset.id
      products = products.filter(p => String(p.id) !== String(id))
      row.remove()
      
      fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .catch(err => console.error(err))
    }
  }
})

logoutBtn.addEventListener('click', ()=>{location.href = '../index.html'})

document.querySelectorAll('.navbar-list a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault()
    document.querySelectorAll('.navbar-list a').forEach(x=>x.classList.remove('active'))
    a.classList.add('active')
  })
})

fetchProducts()