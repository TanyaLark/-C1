const button = document.getElementById("button");
button.addEventListener("click", function () {
  let loanAmount = +document.getElementById("input__amount").value;
  let termOfLoan = +document.getElementById("input__months").value;
  let rate = +document.getElementById("input__rate").value;
  let monthlyInterestRate = rate / 12 / 100; //месячная процентная ставка
  let coefficient =
    (monthlyInterestRate * (1 + monthlyInterestRate) ** termOfLoan) /
    ((1 + monthlyInterestRate) ** termOfLoan - 1);
  const monthlySumOfFee = loanAmount * coefficient;
  let resultString = `<thead>
  <tr>
    <th scope="col">Месяц</th>
    <th scope="col">Задолженность по кредиту</th>
    <th scope="col">Погашение кредита</th>
    <th scope="col">Проценты по кредиту</th>
    <th scope="col">Выплаты в месяц</th>
  </tr>
</thead>
<tbody >`;
  let totalRedemptionOfDebtOfLoan = 0;
  let totalPercentOfLoan = 0;
  for (let i = 1; i <= termOfLoan; i++) {
    let percentOfLoan = loanAmount * monthlyInterestRate;
    totalPercentOfLoan += percentOfLoan;
    let redemptionOfDebtOfLoan = monthlySumOfFee - percentOfLoan;
    totalRedemptionOfDebtOfLoan += redemptionOfDebtOfLoan;
    resultString += `<tr>
    <th scope="row">${i}</th>
    <td>${Math.round(loanAmount * 100) / 100}</td>
    <td>${Math.round(redemptionOfDebtOfLoan * 100) / 100}</td>
    <td>${Math.round(percentOfLoan * 100) / 100}</td>
    <td>${Math.round(monthlySumOfFee * 100) / 100}</td>
  </tr>`;
    loanAmount = loanAmount - redemptionOfDebtOfLoan;
  }
  resultString += `<tr>
    <th scope="row">Итого</th>
    <td></td>
    <td>${Math.round(totalRedemptionOfDebtOfLoan * 100) / 100}</td>
    <td>${Math.round(totalPercentOfLoan * 100) / 100}</td>
    <td>${Math.round(monthlySumOfFee * termOfLoan * 100) / 100}</td>
  </tr>
</tbody>`;
  const tableRows = document.getElementById("table__body");
  tableRows.innerHTML = resultString;
});
