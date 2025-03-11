

'use strict';

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulação de autenticação
    if (email === "usuario@exemplo.com" && password === "senha123") {
        alert("Login bem-sucedido!");
        window.location.href = "profile.html"; // Redireciona para o perfil
    } else {
        alert("Email ou senha incorretos.");
    }
});
