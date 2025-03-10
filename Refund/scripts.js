// Seleciona os elementos do formulário
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

// Seleciona os elementos da lista
const expenseList = document.querySelector('ul')
const expensesTotal = document.querySelector('aside header h2')
const expensesQuantity = document.querySelector('aside header p span')

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

    // Adiciona nome e categoria na div das informalções da despesa
    expenseInfo.append(expenseName, expenseCategory)

    // Criar o valor da despesa

    const expenseAmount = document.createElement('span')
    expenseAmount.classList.add('expense-amount')
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace('R$', '')}`

    // Cria o remover
    const removeIcon = document.createElement('img')
    removeIcon.classList.add('remove-icon')
    removeIcon.setAttribute('src', 'img/remove.svg')
    removeIcon.setAttribute('alt', 'remover')

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Adiciona o item na lista
    expenseList.append(expenseItem)

    formClear()

    //Atualiza os totais
    updateTotals()
  } catch (error) {
    console.log(error)
    alert('Ocorreu um erro ao adicionar o gasto. Tente novamente.')
  }
}

function updateTotals() {
  try {
    const items = expenseList.children

    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? 'despesas' : 'despesa'
    }`

    let total = 0

    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector('.expense-amount')

      let value = itemAmount.textContent
        .replace(/[^\d,]/g, '')
        .replace(',', '.')

      value = parseFloat(value)

      if (isNaN(value)) {
        return alert('Não foi possível calcular o total.')
      }

      total += Number(value)
    }

    const symbolBRL = document.createElement('small')
    symbolBRL.textContent = 'R$'

    total = formatCurrentBRL(total).toUpperCase().replace('R$', '')

    expensesTotal.innerHTML = ''

    expensesTotal.append(symbolBRL, total)
  } catch (error) {
    console.log(error)
    alert('Não foi possível atualizar os totais')
  }
}

expenseList.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-icon')) {
    const item = event.target.closest('.expense')
    item.remove()
  }
  updateTotals()
})

function formClear() {
  expense.value = ''
  category.value = ''
  amount.value = ''

  expense.focus()
}
