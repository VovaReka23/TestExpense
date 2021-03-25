const inputWrap = document.createElement('div');
const inputField = document.createElement('input');
const body = document.querySelector('body');

let objExpense = {};
let exchangeRate = {};
const rate = {"AED":4.343252,"AFN":91.347193,"ALL":123.561629,"AMD":624.731838,"ANG":2.122839,"AOA":737.263536,"ARS":108.134093,"AUD":1.555311,"AWG":2.128477,"AZN":1.994227,"BAM":1.954669,"BBD":2.387881,"BDT":100.202307,"BGN":1.957691,"BHD":0.445878,"BIF":2323.587667,"BMD":1.182487,"BND":1.591268,"BOB":8.184037,"BRL":6.607503,"BSD":1.182697,"BTC":2.1152894e-5,"BTN":85.887192,"BWP":13.02485,"BYN":3.109852,"BYR":23176.752298,"BZD":2.383883,"CAD":1.485269,"CDF":2361.427402,"CHF":1.10587,"CLF":0.031177,"CLP":860.257732,"CNY":7.715255,"COP":4312.53141,"CRC":722.820498,"CUC":1.182487,"CUP":31.335915,"CVE":110.669085,"CZK":26.238804,"DJF":210.1518,"DKK":7.435951,"DOP":67.425713,"DZD":158.317271,"EGP":18.641322,"ERN":17.737704,"ETB":47.536792,"EUR":1,"FJD":2.435952,"FKP":0.863183,"GBP":0.86321,"GEL":3.94918,"GGP":0.863183,"GHS":6.78741,"GIP":0.863183,"GMD":60.656344,"GNF":11854.43543,"GTQ":9.130175,"GYD":248.142553,"HKD":9.185438,"HNL":28.544908,"HRK":7.572532,"HTG":93.934184,"HUF":364.856812,"IDR":17103.556331,"ILS":3.906855,"IMP":0.863183,"INR":85.883352,"IQD":1729.387767,"IRR":49788.630283,"ISK":149.722902,"JEP":0.863183,"JMD":172.563462,"JOD":0.838415,"JPY":128.574182,"KES":129.838579,"KGS":100.27151,"KHR":4791.438249,"KMF":487.628275,"KPW":1064.198315,"KRW":1340.893932,"KWD":0.357442,"KYD":0.985614,"KZT":497.904144,"LAK":11109.469018,"LBP":1792.677636,"LKR":235.352743,"LRD":204.984072,"LSL":17.406809,"LTL":3.491578,"LVL":0.715274,"LYD":5.319655,"MAD":10.683183,"MDL":21.161826,"MGA":4469.802279,"MKD":61.630481,"MMK":1667.575124,"MNT":3364.654004,"MOP":9.463157,"MRO":422.147785,"MUR":47.657198,"MVR":18.269426,"MWK":931.211581,"MXN":24.653502,"MYR":4.885447,"MZN":84.819643,"NAD":17.405886,"NGN":449.937491,"NIO":41.481893,"NOK":10.149268,"NPR":137.419507,"NZD":1.694735,"OMR":0.455256,"PAB":1.182697,"PEN":4.40536,"PGK":4.180047,"PHP":57.433572,"PKR":184.585517,"PLN":4.623975,"PYG":7716.314941,"QAR":4.30546,"RON":4.886273,"RSD":117.510175,"RUB":90.250508,"RWF":1167.70627,"SAR":4.434981,"SBD":9.407814,"SCR":25.075325,"SDG":450.527727,"SEK":10.17298,"SGD":1.591049,"SHP":0.863183,"SLL":12094.480332,"SOS":691.755006,"SRD":16.736927,"STD":24364.092882,"SVC":10.348851,"SYP":1487.177956,"SZL":17.406047,"THB":36.668677,"TJS":13.482389,"TMT":4.150531,"TND":3.274295,"TOP":2.70228,"TRY":9.364475,"TTD":8.037924,"TWD":33.677829,"TZS":2742.188537,"UAH":32.973007,"UGX":4334.487778,"USD":1.182487,"UYU":52.332904,"UZS":12424.987958,"VEF":215832747227.9768,"VND":27294.764537,"VUV":129.677489,"WST":2.997439,"XAF":655.573,"XAG":0.047059,"XAU":0.000682,"XCD":3.195731,"XDR":0.829114,"XOF":654.508282,"XPF":119.797171,"YER":296.036093,"ZAR":17.642096,"ZMK":10643.788043,"ZMW":26.083481,"ZWL":380.761322}
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
