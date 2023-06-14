let c = el => document.querySelector(el);

let limpa_formulario = () => {
    c("#i_rua").value = ("");
    c("#i_bairro").value = ("");
    c("#i_cidade").value = ("");
    c("#i_estado").value = ("");
}

let atualiza_formulario = conteudo => {
    if(!("erro" in conteudo)){
        c("#i_rua").value = (conteudo.logradouro);
        c("#i_bairro").value = (conteudo.bairro);
        c("#i_cidade").value = (conteudo.localidade);
        c("#i_estado").value = (conteudo.uf);
    }else{
        limpa_formulario();
        alert("CEP não encontrado!");
    }
}

let pesquisa_cep = valor => {

    var cep = valor.replace(/\D/g, "");

    if(cep != ""){

        var validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)){

            c("#i_rua").value = "...";
            c("#i_bairro").value = "...";
            c("#i_cidade").value = "...";
            c("#i_estado").value = "...";

            var script = document.createElement("script");
            script.src = "https://viacep.com.br/ws/"+cep+"/json/?callback=atualiza_formulario";

            document.body.appendChild(script);

        }else{
            limpa_formulario();
            alert("Formato de CEP inválido!");
        }

    }else{
        limpa_formulario();
    }

}

