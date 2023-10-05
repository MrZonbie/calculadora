const previusOperationText = document.querySelector("#previus-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");



class calculator{
  
  constructor(previusOperationText, currentOperationText) {
    this.previusOperationText = previusOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ""


    this.locale = "pt-BR"
    this.dateEl = document.querySelector("#data");
    this.timeEl = document.querySelector("#hora");
    this.currentDate;
    this.initialize();


  }
  
  initialize(){
    setInterval(() => {
      this.displayDate = this.currentDate.toLocaleDateString("pt-BR");
      this.displayTime = this.currentDate.toLocaleTimeString("pt-BR");
    }, 1000)


    //this.timeEl.innerHTML = "18:20";
    //this.dateEl.innerHTML = "05/10/2023";
  }
  //hora

  setDisplayDateTime(){
    this.displayDate = this.currentDate.toLocaleDateString(this.locale);
    this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
  }
  get displayTime(){
    return this.timeEl.innerHTML;
  }
  set displayTime(value){
    this.timeEl.innerHTML = value
  }
  get displayDate(){
    return this.dateEl.innerHTML;
  }
  set displayDate(value){
    this.dateEl.innerHTML = value
  }
  get currentDate(){
    return new Date();
  }
  set currentDate(value){
    this.currentDate = value;
  }



  //add digit to calculator screen
  addDigit(digit) {

    // check if current operation already has a dot
    if(digit === "." && this.currentOperationText.innerText.includes(".")){
      return;
    }
    
    this.currentOperation = digit;
    this.updateScreen();
  }

  //precess all calculator operations
  processOperation(operation) {
      //check if current is empty
      if(this.currentOperationText.innerText === "" && operation !== "C") {
        //change operation
        if(this.previusOperationText.innerText !== ""){
            this.changeOperation(operation);
        }
        return;
      }


    // get current and previus value

    let operationValue
    const previus = +this.previusOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch(operation) {
      case "+":
         operationValue = previus + current
         this.updateScreen(operationValue, operation, current, previus)
        break;

      case "-":
         operationValue = previus - current
         this.updateScreen(operationValue, operation, current, previus)
        break;

      case "/":
         operationValue = previus / current
         this.updateScreen(operationValue, operation, current, previus)
        break;

      case "*":
         operationValue = previus * current
         this.updateScreen(operationValue, operation, current, previus)
        break;

        case "DEL":
         this.processDelOperator();
        break;

        case "CE":
         this.processClearCurrentOpertion();
        break;

        case "C":
         this.processClearOperation();
        break;

        case "=":
         this.processEqualOperator();
        break;

      default:
        return;
    }


  }


  //change values of the calculator screen
  updateScreen(operationValue = null, 
              operation= null, 
              current = null, 
              previus = null ){

    //console.log(operationValue, operation, current, previus);

    if(operationValue === null){
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //check if value is zero, if it is add current value
      if(previus === 0) {
        operationValue = current
      }

      //add current value to previus
      this.previusOperationText.innerText = `${operationValue} ${operation}` 
      this.currentOperationText.innerText = "";

    }

  }
// change math operation
changeOperation(operation){

  const mathOperations = ["*", "/", "+", "-"]

  if(!mathOperations.includes(operation)){
    return

  }
  
  this.previusOperationText.innerText = 
  this.previusOperationText.innerText.slice(0, -1) + operation;

  }

  //delete the last digit
processDelOperator(){
    this.currentOperationText.innerText = 
    this.currentOperationText.innerText.slice(0, -1);

  }

  //clear current operation
processClearCurrentOpertion(){
    this.currentOperationText.innerText = "";
  }
  //clear all operation
processClearOperation(){
    this.currentOperationText.innerText = "";
    this.previusOperationText.innerText = "";

  }
  //process an operation
processEqualOperator(){
    const operation = previusOperationText.innerText.split(" ")[1]

    this.processOperation(operation);
  }

}

const calc = new calculator(previusOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if(+value >= 0 || value === '.') {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }

  });
});
