const inputWrap = document.createElement('div');
const inputField = document.createElement('input');
const body = document.querySelector('body');

let objExpense = {};
let exchangeRate = {};
const rate = {"AED":0.938297,"AFN":19.733057,"ALL":26.653476,"AMD":134.904053,"ANG":0.459348,"AOA":159.269401,"ARS":23.361358,"AUD":0.336108,"AWG":0.459799,"AZN":0.434461,"BAM":0.422952,"BBD":0.510888,"BDT":21.681797,"BGN":0.422533,"BHD":0.096297,"BIF":498.238751,"BMD":0.255444,"BND":0.344341,"BOB":1.770864,"BRL":1.435953,"BSD":0.255444,"BTC":0.000005,"BTN":18.584134,"BWP":2.818392,"BYN":0.672916,"BZD":0.51583,"CAD":0.321063,"CDF":502.841423,"CHF":0.238968,"CLF":0.006737,"CLP":185.886467,"CNH":1.66848,"CNY":1.668612,"COP":925.614574,"CRC":156.407358,"CUC":0.255444,"CUP":6.577686,"CVE":23.907014,"CZK":5.671485,"DJF":45.558518,"DKK":1.606695,"DOP":14.560104,"DZD":34.206521,"EGP":4.026284,"ERN":3.831987,"ETB":10.588601,"EUR":0.21607,"FJD":0.529101,"FKP":0.186448,"GBP":0.186448,"GEL":0.853183,"GGP":0.186448,"GHS":1.467911,"GIP":0.186448,"GMD":13.104283,"GNF":2571.023801,"GTQ":1.975589,"GYD":53.60441,"HKD":1.98443,"HNL":6.165591,"HRK":1.636733,"HTG":20.326016,"HUF":78.815721,"IDR":3689.2677,"ILS":0.84397,"IMP":0.186448,"INR":18.547159,"IQD":373.327157,"IRR":10764.414682,"ISK":32.349442,"JEP":0.186448,"JMD":37.340592,"JOD":0.18111,"JPY":27.827935,"KES":28.047763,"KGS":21.66203,"KHR":1037.28023,"KMF":105.338857,"KPW":229.899697,"KRW":289.559038,"KWD":0.077182,"KYD":0.213269,"KZT":107.737557,"LAK":2405.489983,"LBP":386.941155,"LKR":50.925685,"LRD":44.281253,"LSL":3.78487,"LYD":1.152165,"MAD":2.306065,"MDL":4.551773,"MGA":970.261878,"MKD":13.329757,"MMK":360.832401,"MNT":728.941568,"MOP":2.04764,"MRO":91.193503,"MRU":9.183669,"MUR":10.294398,"MVR":3.946612,"MWK":201.204409,"MXN":5.337798,"MYR":1.056772,"MZN":18.305126,"NAD":3.760137,"NGN":104.789991,"NIO":8.931839,"NOK":2.194199,"NPR":29.735244,"NZD":0.365954,"OMR":0.098344,"PAB":0.255444,"PEN":0.951408,"PGK":0.902827,"PHP":12.42683,"PKR":39.641755,"PLN":1,"PYG":1669.662613,"QAR":0.930072,"RON":1.056083,"RSD":25.427087,"RUB":19.494703,"RWF":254.408773,"SAR":0.958029,"SBD":2.032301,"SCR":5.416665,"SDG":97.324205,"SEK":2.198012,"SGD":0.344017,"SHP":0.186448,"SLL":2615.619985,"SOS":148.05098,"SRD":3.615556,"SSP":33.27415,"STD":5277.411946,"STN":5.287693,"SVC":2.239305,"SYP":321.257287,"SZL":3.785291,"THB":7.951975,"TJS":2.917322,"TMT":0.896609,"TND":0.707325,"TOP":0.58483,"TRY":2.028276,"TTD":1.739263,"TWD":7.296123,"TZS":593.460732,"UAH":7.134827,"UGX":937.901825,"USD":0.255444,"UYU":11.279372,"UZS":2689.023083,"VES":465359.047765,"VND":5902.71676,"VUV":28.073826,"WST":0.648576,"XAF":141.732469,"XAG":0.010173,"XAU":0.000147,"XCD":0.69035,"XDR":0.179428,"XOF":141.732469,"XPD":0.000097,"XPF":25.78398,"XPT":0.000218,"YER":63.950449,"ZAR":3.813678,"ZMW":5.644093,"ZWL":82.253003}
let totalPrice = 0;

inputField.classList.add('input__field-js');
inputWrap.classList.add('input__wrap');
inputWrap.classList.add('input__wrap-main');
inputWrap.append(inputField);
body.append(inputWrap);

/* validation command line */
class CheckParams {
    checkData(params, count) {
        if(params.length !== count) {
            tempText('entered incomplete data');
            return false;
        }
        return true;	
    }
    checkDate(params, count) {
        if(!params[count].match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)) {
            tempText('entered wrong date');
            return false;
        }
        return true;
    }
    checkPrice(params, count) {
        if(!params[count].match(/^\d*(\.\d+)?$/)) {
            tempText('entered wrong price');
            return false;
        }
        return true;
    }
    checkCurrency(params, count) {
        if(!exchangeRate.hasOwnProperty(params[count])) {
            tempText('entered wrong currency');
            return false;
        }
        return true;
    }
}

const addExp = new CheckParams;

/*Event handling enter*/
inputField.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        const inputValue = inputField.value
        getInputField(inputValue);
    }
});

/*get the value of the entered command*/
function getInputField (inputValue) {
    const paramInput = inputValue.match(/(?<=“)[^“”]*(?=”)|[^\s“”]+/g);
    switch (paramInput[0]) {
        case 'add':
            if(addExp.checkData(paramInput, 5) && addExp.checkDate(paramInput, 1) && addExp.checkPrice(paramInput, 2) && addExp.checkCurrency(paramInput, 3) ) {
				addExpense(paramInput);
				templateExpense(objExpense);
                scrollDown();
			}
          break;
        case 'list':
            if(addExp.checkData(paramInput, 1)){
                listExpense(objExpense);
                scrollDown();
            }
          break;
        case 'clear':
            if(addExp.checkData(paramInput, 2) && addExp.checkDate(paramInput, 1)){
                clearExpense(paramInput[1]);
                templateExpense(objExpense);
                scrollDown();
            }
          break;
        case 'total':
            if(addExp.checkData(paramInput, 2) && addExp.checkCurrency(paramInput, 1)){
                totalExpense(objExpense, paramInput[1]);
                scrollDown();
            }
            break;
        case 'info': 
            infoTemp();
            scrollDown();
            break;
        default:
            tempText('You entered the wrong command. Please enter info to display the commands');
            scrollDown();
      }
}


/*add expense*/
function addExpense(paramPurchase) {
    const id = parseInt(Math.random() * 1000000);
    const date = paramPurchase[1];
    if (objExpense.hasOwnProperty(paramPurchase[1])) {
        objExpense[date]["id__" + id] = {
            price: paramPurchase[2],
            currency: paramPurchase[3],
            product: paramPurchase[4],
        }
    } else {
        objExpense[date] = {
            ["id__" + id]: {
                price: paramPurchase[2],
                currency: paramPurchase[3],
                product: paramPurchase[4],
            }
        }
    }
}
/*list expense*/
function listExpense (param) {
    /*sort object expense*/
    const sortObj = Object.keys(objExpense).sort().reduce(
        (obj, key) => { 
          obj[key] = objExpense[key]; 
          return obj;
        }, 
        {}
      );
      templateExpense(sortObj);
}
/*clean object key expense*/
function clearExpense (date) {
    delete objExpense[date]; 
}
/*total expense*/
function totalExpense(obj, currency) {
    for (const property in obj) {
        const objItem = obj[property];
        for (const item in objItem) {
            const curen = objItem[item].currency;
            totalPrice = totalPrice + (objItem[item].price / exchangeRate[curen]);
        }
        totalPrice *= exchangeRate[currency]
    }
    const mess = totalPrice + " " + currency;
    tempText(mess);
}

/* Get the current exchange rate with host https://api.exchangerate.host*/
function getCurrency() {
    const requestURL = 'https://api.exchangerate.host/latest?base=PLN';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        const response = request.response;
        exchangeRate = response.rates || rate;
    }
}

function templateExpense(obj) {
    const fragment = document.createDocumentFragment();
    const inputReadOnly = document.createElement('input');
    const inputReadOnlyWrap = document.createElement('div');
    inputReadOnlyWrap.classList.add('input__wrap');
    inputReadOnlyWrap.append(inputReadOnly);
    inputReadOnly.readOnly = true;
    inputReadOnly.value = inputField.value;
    inputWrap.insertAdjacentElement('beforebegin', inputReadOnlyWrap);
    
    for (const property in obj) {
        const ul = document.createElement('ul');
        ul.classList.add('product__info');
        const span = document.createElement('span');
        span.innerHTML = property;
        ul.append(span);
        const objItem = obj[property];
        for (const item in objItem) {
            const li = document.createElement('li');
            li.classList.add('product');
            li.innerHTML = `${objItem[item].product} ${objItem[item].price} ${objItem[item].currency}`;
            ul.append(li);
        }
        fragment.append(ul);
        for (const element of fragment.children) {
            inputWrap.insertAdjacentElement('beforebegin', element);
        }
        inputField.value= "";
    }
    
}

function tempText(mess) {
    const inputReadOnly = document.createElement('input');
    const inputReadOnlyWrap = document.createElement('div');
    inputReadOnlyWrap.classList.add('input__wrap');
    inputReadOnlyWrap.append(inputReadOnly);
    inputReadOnly.readOnly = true;
    const textError = document.createElement('p');
    textError.innerHTML = mess;
    inputReadOnly.value = inputField.value;
    inputWrap.insertAdjacentElement('beforebegin', inputReadOnlyWrap);
    inputWrap.insertAdjacentElement('beforebegin', textError);
    inputField.value= "";
}

function infoTemp() {
    const inputReadOnly = document.createElement('input');
    const inputReadOnlyWrap = document.createElement('div');
    inputReadOnlyWrap.classList.add('input__wrap');
    inputReadOnlyWrap.append(inputReadOnly);
    inputReadOnly.readOnly = true;
    const textInfo = htmlToElement(`<ul class="info">
                            <li>add expense <span>add yyyy-mm-dd price curency product</span></li>
                            <li>show all expense <span>list</span></li>
                            <li>clean expense <span>clear yyyy-mm-dd </span></li>
                            <li>show price expense <span>total curency </span></li>
                        </ul>`);
    inputReadOnly.value = inputField.value;
    inputWrap.insertAdjacentElement('beforebegin', inputReadOnlyWrap);
    inputWrap.insertAdjacentElement('beforebegin', textInfo);

    inputField.value= "";
}


function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); 
    template.innerHTML = html;
    return template.content.firstChild;
}

function scrollDown() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
}

getCurrency();
inputField.focus();
