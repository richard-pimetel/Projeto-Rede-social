document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const loginForm = document.querySelector('.login-form');
    const btnEntrar = document.querySelector('.btn-entrar');
    const btnCadastrar = document.querySelector('.btn-cadastrar');
    const btnEsqueceuSenha = document.querySelector('.btn-esqueceu-senha');
    
    // Função para fazer login
    async function fazerLogin(email, senha) {
        try {
            const response = await fetch('https://back-spider.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }
            
            return data;
            
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    }
    
    // Evento de clique no botão Entrar
    btnEntrar.addEventListener('click', async function() {
        const email = document.querySelector('input[type="email"]').value;
        const senha = document.querySelector('input[type="password"]').value;
        
        // Validação básica
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos');
            return;
        }
        
        try {
            // Mostrar loading (opcional)
            btnEntrar.textContent = 'Carregando...';
            btnEntrar.disabled = true;
            
            // Fazer a requisição de login
            const resposta = await fazerLogin(email, senha);
            
            // Armazenar token e dados do usuário
            localStorage.setItem('token', resposta.token);
            localStorage.setItem('user', JSON.stringify(resposta.user));
            
            // Redirecionar para a página principal
            window.location.href = 'home.html';
            
        } catch (error) {
            alert('Falha no login: ' + error.message);
        } finally {
            // Restaurar botão
            btnEntrar.textContent = 'Entrar';
            btnEntrar.disabled = false;
        }
    });
    
    // Evento de submit no formulário (para permitir login com Enter)
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        btnEntrar.click(); // Dispara o mesmo comportamento do botão Entrar
    });
    
    // Botão Cadastrar
    btnCadastrar.addEventListener('click', function() {
        window.location.href = 'cadastro.html';
    });
    
    // Botão Esqueceu a Senha
    btnEsqueceuSenha.addEventListener('click', function() {
        window.location.href = 'esqueceu-senha.html';
    });
});