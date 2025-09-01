// Inicializa EmailJS
(function() { emailjs.init("JJlMmd0kLsgrJvzn8"); })();

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for(let i=0; i<9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if(resto === 10) resto = 0;
    if(resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for(let i=0; i<10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if(resto === 10) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}

document.getElementById("agendamentoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeCompleto = document.getElementById("nomeCompleto").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;
    const dataAgendamento = document.getElementById("dataAgendamento").value;

    if (!validarCPF(cpf)) {
        alert("Digite um CPF válido.");
        return;
    }

    if (!/^\d{10,11}$/.test(telefone.replace(/\D/g, ""))) {
        alert("Digite um número de telefone válido.");
        return;
    }

    const templateParams = { nomeCompleto, cpf, telefone, dataNascimento, dataAgendamento };

    emailjs.send("service_lfca5g9", "template_5hu65rb", templateParams)
        .then(function(response) {
            console.log("✅ E-mail enviado:", response);
            document.getElementById("mensagemSucesso").style.display = "block";
            document.getElementById("agendamentoForm").reset();
        }, function(error) {
            console.error("❌ Erro:", error);
            alert("Erro ao enviar agendamento. Tente novamente.");
        });
});
