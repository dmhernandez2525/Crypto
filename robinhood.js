setInterval(function () {
  var test = [];

  document
    .querySelectorAll("[data-testid=PortfolioValue]")[0]
    .children[0].children[0].firstChild.firstChild.children.forEach((ele) =>
      test.push(ele.innerText)
    );

  console.log(test.join(""));
}, 1000);

document
  .querySelectorAll("[data-testid=OrderFormPrimaryButtonSubmit]")[0]
  .click();

let spans = document.getElementsByTagName("span");
let spanContainer;

for (let i = 0; i < spans.length; i++) {
  if (spans[i].outerText === "Done") {
    spanContainer = spans[i].parentNode;
    break;
  }
}

console.log(spanContainer);
