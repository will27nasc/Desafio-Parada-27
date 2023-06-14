let s = el => document.querySelector(el);
let ss = el => document.querySelectorAll(el);

let handleSubmit = (event)=>{
    event.preventDefault();
    
    let send = true;

    let inputs = ss('input');

    clearErrors();

    for(let i=0;i<inputs.length;i++) {
        let input = inputs[i];
        let check = checkInput(input);
        if(check !== true) {
            send = false;
            showError(input, check);
        } else {
            showRight(input);
        }
    }

    if(send) {
        form.submit();
    }
}

let checkInput = (input)=>{
    let rules = input.getAttribute('data-rules');

    if(rules !== null) {
        rules = rules.split('|');
        for(let k in rules) {
            let rDetails = rules[k].split('=');
            switch(rDetails[0]) {
                case 'required':
                    if(input.value == '') {
                        return 'Campo não pode ser vazio.';
                    }
                break;

                case 'min':
                    if(input.value.length < rDetails[1]) {
                        return 'Campo tem que ter pelo menos '+rDetails[1]+' caracteres';
                    }
                break;

                case 'name':
                    if(input.value != '') {
                        let regex = /^[A-Z][a-z]*$/;
                        if(!regex.test(input.value)) {
                            return 'Nome digitado não é válido!';
                        }
                    }
                break;

                case 'lastName':
                    if(input.value != '') {
                        let regex = /^[A-Z][a-z]*$/;
                        if(!regex.test(input.value)) {
                            return 'Sobrenome digitado não é válido!';
                        }
                    }
                break;

                case 'email':
                    if(input.value != '') {
                        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if(!regex.test(input.value.toLowerCase())) {
                            return 'E-mail digitado não é válido!';
                        }
                    }
                break;

                case 'celular':
                    if(input.value != '') {
                        let regex = /\+\d{2}\s\(\d{2}\)\s\d{4,5}-?\d{4}/g;
                        if(!regex.test(input.value)) {
                            return 'Número de celular inválido!';
                        }
                    }
                break;

                case 'cpf':
                    if(input.value != '') {
                        let regex = /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/;
                        if(!regex.test(input.value)) {
                            return 'CPF Inválido!';
                        }
                    }
                break;
            }
        }
    }

    return true;
}

let showRight = (input)=>{
    input.style.borderColor = '#008000';

    s('.btt').style.border = '';
}

let showError = (input, error)=>{
    input.style.borderColor = '#d62828';
    input.style.borderWidth = '2px';

    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.elementSibling);
}

let clearErrors = ()=>{
    let inputs = ss('input');

    for(let i=0;i<inputs.length;i++) {
        inputs[i].style = '';
    }

    let errorElements = ss('.error');

    for(let i=0;i<errorElements.length;i++) {
        errorElements[i].remove();
    }
}

let form = s('#validation-form');
form.addEventListener('submit', handleSubmit);

