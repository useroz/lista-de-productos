
function updateList() {
  const tableBody = document.querySelector("#shoppingList tbody");
  tableBody.innerHTML = "";

  shoppingList.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>
        ${item.quantity}
        <button onclick="incrementProduct(${index})">+</button>
        <button onclick="removeProduct(${index})">-</button>
      </td>
      <td>${(item.price * item.quantity).toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });
}


function incrementProduct(index) {
  shoppingList[index].quantity += 1;
  updateList();
  updateTotal();
}


function removeProduct(index) {
  if (shoppingList[index].quantity > 1) {
    shoppingList[index].quantity -= 1;
  } else {
    shoppingList.splice(index, 1); 
  }
  updateList();
  updateTotal();
}