// Dados iniciais dos posts
let posts = [
    {
        id: 1,
        author: "João Silva",
        content: "Que jogo incrível ontem! 🏆⚽ O Brasil jogou demais e garantiu mais uma vitória importante nas eliminatórias!",
        imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=1000",
        likes: 156,
        comments: [
            { id: 1, author: "Maria", content: "Concordo! Foi espetacular!" },
            { id: 2, author: "Pedro", content: "Melhor jogo do ano até agora!" }
        ],
        isLiked: false
    },
    {
        id: 2,
        author: "Ana Costa",
        content: "Treino concluído! 💪 Mais um dia de dedicação na academia. Foco total na preparação para o campeonato estadual de natação!",
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000",
        likes: 89,
        comments: [
            { id: 3, author: "Carlos", content: "Arrasou! Continue assim!" },
            { id: 4, author: "Julia", content: "Você é inspiração! 🏊‍♀️" }
        ],
        isLiked: false
    },
    {
        id: 3,
        author: "Lucas Mendes",
        content: "Final épica no campeonato de basquete! 🏀 O último quarto foi eletrizante, e nossa equipe conseguiu a virada nos segundos finais!",
        imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1000",
        likes: 234,
        comments: [
            { id: 5, author: "Rafael", content: "Que jogo incrível! Parabéns!" },
            { id: 6, author: "Amanda", content: "Vocês merecem! Jogaram muito!" }
        ],
        isLiked: false
    },
    {
        id: 4,
        author: "Mariana Santos",
        content: "Primeira medalha de ouro na competição de ginástica artística! 🥇 Anos de treino e dedicação valeram a pena!",
        imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?auto=format&fit=crop&q=80&w=1000",
        likes: 445,
        comments: [
            { id: 7, author: "Sofia", content: "Parabéns, Mari! Você merece!" },
            { id: 8, author: "Diego", content: "Que apresentação incrível! 👏" }
        ],
        isLiked: false
    },
    {
        id: 5,
        author: "Ricardo Oliveira",
        content: "Grande dia de surf! 🏄‍♂️ As ondas estavam perfeitas em Maresias. Quem mais curtiu esse fim de semana no mar?",
        imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=1000",
        likes: 178,
        comments: [
            { id: 9, author: "Thiago", content: "Ondas perfeitas mesmo! 🌊" },
            { id: 10, author: "Fernanda", content: "Que lugar incrível!" }
        ],
        isLiked: false
    },
    {
        id: 6,
        author: "Carolina Lima",
        content: "Mais um treino intenso de vôlei concluído! 🏐 Preparação a todo vapor para o torneio nacional do próximo mês.",
        imageUrl: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=1000",
        likes: 92,
        comments: [
            { id: 11, author: "Beatriz", content: "Vai arrasar no torneio! 💪" },
            { id: 12, author: "Leonardo", content: "Time está jogando muito!" }
        ],
        isLiked: false
    }
];

// Função para renderizar os posts
function renderPosts() {
    const feed = document.getElementById('feed');
    feed.innerHTML = posts.map(post => `
        <div class="post" data-id="${post.id}">
            <div class="post-header">
                <div class="avatar"></div>
                <div class="post-user-info">
                    <div class="post-author">${post.author}</div>
                    <div class="post-time">Agora mesmo</div>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post" class="post-image">` : ''}
            <div class="interaction-buttons">
                <button class="interaction-btn ${post.isLiked ? 'liked' : ''}" onclick="handleLike(${post.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${post.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>${post.likes}</span>
                </button>
                <button class="interaction-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    <span>${post.comments.length}</span>
                </button>
            </div>
            <div class="comments">
                ${post.comments.map(comment => `
                    <div class="comment">
                        <div class="comment-avatar"></div>
                        <div class="comment-content">
                            <div class="comment-author">${comment.author}</div>
                            <div class="comment-text">${comment.content}</div>
                        </div>
                    </div>
                `).join('')}
                <div class="add-comment">
                    <input type="text" class="comment-input" placeholder="Escreva um comentário..." data-post-id="${post.id}">
                    <button class="send-comment" onclick="handleComment(${post.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para lidar com curtidas
function handleLike(postId) {
    posts = posts.map(post => {
        if (post.id === postId) {
            return {
                ...post,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !post.isLiked
            };
        }
        return post;
    });
    renderPosts();
}

// Função para adicionar comentários
function handleComment(postId) {
    const input = document.querySelector(`input[data-post-id="${postId}"]`);
    const content = input.value.trim();
    
    if (!content) return;

    posts = posts.map(post => {
        if (post.id === postId) {
            return {
                ...post,
                comments: [...post.comments, {
                    id: Date.now(),
                    author: "Você",
                    content: content
                }]
            };
        }
        return post;
    });

    input.value = '';
    renderPosts();
}

// Função para criar novo post
function handlePost() {
    const content = document.getElementById('newPostText').value.trim();
    const imageUrl = document.getElementById('newPostImage')?.value.trim();

    if (!content) return;

    const newPost = {
        id: Date.now(),
        author: "Você",
        content: content,
        imageUrl: imageUrl || undefined,
        likes: 0,
        comments: [],
        isLiked: false
    };

    posts = [newPost, ...posts];
    document.getElementById('newPostText').value = '';
    if (document.getElementById('newPostImage')) {
        document.getElementById('newPostImage').value = '';
    }
    renderPosts();
}

// Inicializar o feed
document.addEventListener('DOMContentLoaded', renderPosts);

// home.js - Versão atualizada com chat e temas sincronizados

// Perfil do usuário (compartilhado com a página de perfil)
const profile = {
    name: "Cazé tv",
    messages: JSON.parse(localStorage.getItem('chatMessages')) || [],
    settings: JSON.parse(localStorage.getItem('profileSettings')) || {
        notifications: true,
        sound: true,
        privateAccount: false,
        theme: "light"
    }
};

// Elementos DOM
const DOM = {
    chatModal: document.createElement('div'),
    chatMessages: document.createElement('div'),
    chatMessageInput: document.createElement('input'),
    sendMessageBtn: document.createElement('button'),
    closeChatModal: document.createElement('button'),
    unreadCount: document.createElement('span'),
    notification: document.createElement('div'),
    messageIcon: document.querySelector('.nav-icons a:nth-child(3)')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar tema salvo
    applyTheme(profile.settings.theme);
    
    // Configurar chat
    setupChat();
    
    // Configurar notificações
    setupNotification();
    
    // Inicializar contador de mensagens não lidas
    updateUnreadCount();
});

// Aplicar tema
function applyTheme(theme) {
    document.body.className = theme;
    
    // Atualizar variáveis CSS baseadas no tema
    const root = document.documentElement;
    if (theme === 'blue') {
        root.style.setProperty('--sidebar-bg', '#0A2D5C');
        root.style.setProperty('--primary', '#a8c6fa');
    } else if (theme === 'green') {
        root.style.setProperty('--sidebar-bg', '#1A4D2E');
        root.style.setProperty('--primary', '#b8e0c8');
    } else if (theme === 'purple') {
        root.style.setProperty('--sidebar-bg', '#4B2A5E');
        root.style.setProperty('--primary', '#d8c0e3');
    } else { // light
        root.style.setProperty('--sidebar-bg', '#09377B');
        root.style.setProperty('--primary', '#b3b2b2');
    }
}

// Configurar chat
function setupChat() {
    // Criar estrutura do modal de chat
    DOM.chatModal.className = 'chat-modal';
    DOM.chatModal.innerHTML = `
        <div class="chat-container">
            <div class="chat-header">
                <h3>Chat com Cazé tv</h3>
                <button class="chat-close">&times;</button>
                <span class="unread-count">0</span>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <input type="text" placeholder="Digite sua mensagem...">
                <button>
                    <span>Enviar</span>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(DOM.chatModal);
    
    // Atualizar referências DOM
    DOM.chatMessages = DOM.chatModal.querySelector('.chat-messages');
    DOM.chatMessageInput = DOM.chatModal.querySelector('input');
    DOM.sendMessageBtn = DOM.chatModal.querySelector('.chat-input button');
    DOM.closeChatModal = DOM.chatModal.querySelector('.chat-close');
    DOM.unreadCount = DOM.chatModal.querySelector('.unread-count');
    
    // Event listeners
    DOM.messageIcon.addEventListener('click', (e) => {
        e.preventDefault();
        openChat();
    });
    
    DOM.sendMessageBtn.addEventListener('click', sendMessage);
    DOM.chatMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    DOM.closeChatModal.addEventListener('click', closeChat);
    DOM.chatModal.addEventListener('click', (e) => {
        if (e.target === DOM.chatModal) closeChat();
    });
}

// Funções do chat
function openChat() {
    DOM.chatModal.classList.add('active');
    markMessagesAsRead();
    updateUnreadCount();
    renderMessages();
}

function closeChat() {
    DOM.chatModal.classList.remove('active');
}

function renderMessages() {
    DOM.chatMessages.innerHTML = '';
    profile.messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.received ? 'received' : 'sent'}`;
        messageDiv.innerHTML = `
            ${msg.received ? `<strong>${msg.sender}</strong><br>` : ''}
            ${msg.text}
            <span class="message-time">${msg.time}</span>
        `;
        DOM.chatMessages.appendChild(messageDiv);
    });
    DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
}

function sendMessage() {
    const text = DOM.chatMessageInput.value.trim();
    if (text) {
        const userMessage = {
            sender: "Você",
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            received: false,
            read: true
        };
        
        profile.messages.push(userMessage);
        localStorage.setItem('chatMessages', JSON.stringify(profile.messages));
        
        renderMessages();
        DOM.chatMessageInput.value = '';
        
        // Simular resposta automática
        setTimeout(() => {
            const replies = [
                "E aí, tudo bem?",
                "O que você achou do último jogo?",
                "To preparando um vídeo novo, qual tema você gostaria?"
            ];
            const replyMessage = {
                sender: "Cazé tv",
                text: replies[Math.floor(Math.random() * replies.length)],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                received: true,
                read: false
            };
            
            profile.messages.push(replyMessage);
            localStorage.setItem('chatMessages', JSON.stringify(profile.messages));
            
            renderMessages();
            updateUnreadCount();
            
            if (!DOM.chatModal.classList.contains('active')) {
                showNotification("Nova mensagem de Cazé tv");
            }
        }, 1000 + Math.random() * 2000);
    }
}

function markMessagesAsRead() {
    profile.messages.forEach(msg => {
        if (msg.received) msg.read = true;
    });
    localStorage.setItem('chatMessages', JSON.stringify(profile.messages));
}

function updateUnreadCount() {
    const unread = profile.messages.filter(msg => msg.received && !msg.read).length;
    DOM.unreadCount.textContent = unread;
    DOM.unreadCount.style.display = unread > 0 ? 'flex' : 'none';
    
    // Atualizar também o ícone de mensagens na navbar
    const navUnread = document.querySelector('.nav-icons a:nth-child(3) .unread-count');
    if (navUnread) {
        navUnread.textContent = unread;
        navUnread.style.display = unread > 0 ? 'flex' : 'none';
    }
}

// Configurar notificações
function setupNotification() {
    DOM.notification.className = 'notification';
    document.body.appendChild(DOM.notification);
}

function showNotification(message) {
    if (!profile.settings.notifications) return;
    
    DOM.notification.textContent = message;
    DOM.notification.classList.add('show');
    
    setTimeout(() => {
        DOM.notification.classList.remove('show');
    }, 3000);
}

// Verificar alterações no tema (usando localStorage)
function checkForThemeChanges() {
    const savedSettings = localStorage.getItem('profileSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (settings.theme !== profile.settings.theme) {
            profile.settings.theme = settings.theme;
            applyTheme(settings.theme);
        }
    }
}

// Verificar alterações periodicamente
setInterval(checkForThemeChanges, 1000);