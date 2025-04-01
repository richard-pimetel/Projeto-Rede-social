document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const successMessage = document.getElementById('success-message');
    
    const emailInput = document.getElementById('email');
    const sendEmailBtn = document.getElementById('send-email-btn');
    
    const codeInputs = document.querySelectorAll('.code-input');
    const verifyCodeBtn = document.getElementById('verify-code-btn');
    const resendCodeBtn = document.getElementById('resend-code');
    const changeEmailBtn = document.getElementById('change-email');
    
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const resetPasswordBtn = document.getElementById('reset-password-btn');
    const goToLoginBtn = document.getElementById('go-to-login');
    
    // Mensagens de erro
    const emailError = document.getElementById('email-error');
    const codeError = document.getElementById('code-error');
    const passwordError = document.getElementById('password-error');
    
    // Requisitos de senha
    const lengthReq = document.getElementById('length-req');
    const numberReq = document.getElementById('number-req');
    const specialReq = document.getElementById('special-req');
    
    // Variáveis
    let currentStep = 1;
    let generatedCode = '';
    let userEmail = '';
    
    // Inicialização
    initCodeInputs();
    
    // Event Listeners
    sendEmailBtn.addEventListener('click', handleSendEmail);
    verifyCodeBtn.addEventListener('click', handleVerifyCode);
    resendCodeBtn.addEventListener('click', handleResendCode);
    changeEmailBtn.addEventListener('click', handleChangeEmail);
    resetPasswordBtn.addEventListener('click', handleResetPassword);
    goToLoginBtn.addEventListener('click', () => {
        window.location.href = '../login/index.html';
    });
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const isPassword = input.type === 'password';
            
            input.type = isPassword ? 'text' : 'password';
            this.textContent = isPassword ? 'Ocultar' : 'Mostrar';
        });
    });
    
    newPasswordInput.addEventListener('input', validatePassword);
    
    // Funções
    function initCodeInputs() {
        codeInputs.forEach(input => {
            input.addEventListener('input', function() {
                const nextIndex = parseInt(this.dataset.index) + 1;
                if (this.value.length === 1 && nextIndex < codeInputs.length) {
                    codeInputs[nextIndex].focus();
                }
            });
            
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value.length === 0) {
                    const prevIndex = parseInt(this.dataset.index) - 1;
                    if (prevIndex >= 0) {
                        codeInputs[prevIndex].focus();
                    }
                }
            });
        });
    }
    
    function handleSendEmail() {
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            emailError.style.display = 'block';
            return;
        }
        
        emailError.style.display = 'none';
        userEmail = email;
        
        // Gerar um código de 6 dígitos aleatório
        generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Simular envio de email
        simulateEmailSend(email, generatedCode);
        
        showStep(2);
    }
    
    function simulateEmailSend(email, code) {
        // Em produção, substitua por uma chamada real ao seu backend
        console.log(`Email enviado para: ${email}`);
        console.log(`Código de verificação: ${code}`);
        
        // Mostrar alerta com o código (apenas para demonstração)
        alert(`Um código de verificação foi enviado para: ${email}\n\nCódigo: ${code}\n\n(Em produção, isso seria enviado por email real)`);
    }
    
    function handleVerifyCode() {
        const enteredCode = Array.from(codeInputs)
            .map(input => input.value)
            .join('');
        
        if (enteredCode.length !== 6) {
            codeError.style.display = 'block';
            return;
        }
        
        // Verificar o código
        if (enteredCode !== generatedCode) {
            codeError.style.display = 'block';
            return;
        }
        
        codeError.style.display = 'none';
        showStep(3);
    }
    
    function handleResendCode() {
        // Gerar novo código
        generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Simular reenvio de email
        simulateEmailSend(userEmail, generatedCode);
        
        // Limpar os inputs de código
        codeInputs.forEach(input => input.value = '');
        codeInputs[0].focus();
        
        // Mostrar mensagem temporária
        showTemporaryMessage('Código reenviado com sucesso!', resendCodeBtn.parentNode);
    }
    
    function showTemporaryMessage(message, parentElement) {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.textContent = message;
        parentElement.insertBefore(success, resendCodeBtn.nextSibling);
        success.style.display = 'block';
        
        setTimeout(() => {
            success.style.display = 'none';
            success.remove();
        }, 3000);
    }
    
    function handleChangeEmail() {
        showStep(1);
        emailInput.value = userEmail;
        emailInput.focus();
    }
    
    function handleResetPassword() {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (newPassword !== confirmPassword) {
            passwordError.style.display = 'block';
            return;
        }
        
        if (!isPasswordValid(newPassword)) {
            alert('Por favor, certifique-se de que sua senha atende a todos os requisitos.');
            return;
        }
        
        passwordError.style.display = 'none';
        
        // Em produção, você enviaria a nova senha para o backend
        console.log(`Senha redefinida para ${userEmail}`);
        
        // Mostrar mensagem de sucesso
        showStep(4);
    }
    
    function showStep(stepNumber) {
        currentStep = stepNumber;
        
        // Esconder todos os passos
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Mostrar o passo atual
        if (stepNumber === 1) {
            step1.classList.add('active');
        } else if (stepNumber === 2) {
            step2.classList.add('active');
            codeInputs[0].focus();
        } else if (stepNumber === 3) {
            step3.classList.add('active');
            newPasswordInput.focus();
        } else if (stepNumber === 4) {
            successMessage.classList.add('active');
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isPasswordValid(password) {
        const hasMinLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return hasMinLength && hasNumber && hasSpecialChar;
    }
    
    function validatePassword() {
        const password = newPasswordInput.value;
        
        // Verificar requisitos
        const hasMinLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        // Atualizar visual dos requisitos
        updateRequirement(lengthReq, hasMinLength);
        updateRequirement(numberReq, hasNumber);
        updateRequirement(specialReq, hasSpecialChar);
    }
    
    function updateRequirement(element, isValid) {
        if (isValid) {
            element.classList.add('valid');
            element.classList.remove('invalid');
        } else {
            element.classList.add('invalid');
            element.classList.remove('valid');
        }
    }
});