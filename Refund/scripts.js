// Seleciona os elementos do formulário
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

// Seleciona os elementos da lista
const expenseList = document.querySelector('ul')

amount.oninput = () => {
  let value = amount.value.replace(/\D/g, '')

  value = Number(value) / 100

  amount.value = formatCurrentBRL(value)
}

function formatCurrentBRL(value) {
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  return value
}
// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
  // Previne o comportamento padrão de recarregar a página
  event.preventDefault()

  // Cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  // Chama a função que irá adicionar o item na lista
  expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
  try {
    // Cria o elemento para a adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement('li')
    expenseItem.classList.add('expense')

    // Cria o ícone da categoria
    const expenseIcon = document.createElement('img')
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute('alt', newExpense.category_name)

    // Cria a info da despesa
    const expenseInfo = document.createElement('div')
    expenseInfo.classList.add('expense-icon')

    // Cria o nome da despesa
    const expenseName = document.createElement('strong')
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despesa
    const expenseCategory = document.createElement('span')
    expenseCategory.textContent = newExpense.category_name

    // Adiciona as informações no item
    expenseItem.append(expenseIcon)

    // Adiciona o item na lista
    expenseList.append(expenseItem)
  } catch (error) {
    console.log(error)
    alert('Ocorreu um erro ao adicionar o gasto. Tente novamente.')
  }
}
