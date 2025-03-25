const profile = {
    name: "Cazé tv",
    stats: {
        posts: "2 mil",
        followers: "989mil",
        following: "459"
    },
    bio: {
        intro: "(Apaixonado por futebol e corrida!)",
        details: [
            "Esportes favoritos (futebol, basquete, corrida, etc.)",
            "Time do coração: Corinthians"
        ]
    },
    isFollowing: false
};

// Elementos DOM
const DOM = {
    // Botões principais
    followBtn: document.getElementById('followBtn'),
    unfollowBtn: document.getElementById('unfollowBtn'),
    messageBtn: document.getElementById('messageBtn'),
    editBioBtn: document.getElementById('editBioBtn'),
    editProfileBtn: document.getElementById('editProfileBtn'),
    
    // Navegação
    navItems: document.querySelectorAll('.nav-item'),
    
    // Elementos do perfil
    profileName: document.querySelector('.profile-name'),
    postsCount: document.getElementById('postsCount'),
    followersCount: document.getElementById('followersCount'),
    followingCount: document.getElementById('followingCount'),
    bioIntro: document.getElementById('bioIntro'),
    bioDetailsList: document.getElementById('bioDetailsList'),
    
    // Notificação
    notification: document.getElementById('notification'),
    
    // Modal de Biografia
    bioModal: document.getElementById('bioModal'),
    bioEditor: document.getElementById('bioEditor'),
    closeBioModal: document.getElementById('closeBioModal'),
    cancelBioEdit: document.getElementById('cancelBioEdit'),
    saveBio: document.getElementById('saveBio'),
    
    // Modal de Perfil
    profileModal: document.getElementById('profileModal'),
    profileNameInput: document.getElementById('profileNameInput'),
    closeProfileModal: document.getElementById('closeProfileModal'),
    cancelProfileEdit: document.getElementById('cancelProfileEdit'),
    saveProfile: document.getElementById('saveProfile')
};

// Inicialização
document.addEventListener('DOMContentLoaded', init);

function init() {
    loadProfileData();
    setupEventListeners();
}

function loadProfileData() {
    // Atualiza dados do perfil
    DOM.profileName.textContent = profile.name;
    
    // Atualiza estatísticas
    DOM.postsCount.textContent = profile.stats.posts;
    DOM.followersCount.textContent = profile.stats.followers;
    DOM.followingCount.textContent = profile.stats.following;
    
    // Atualiza biografia
    DOM.bioIntro.textContent = profile.bio.intro;
    DOM.bioDetailsList.innerHTML = profile.bio.details.map(detail => 
        `<li class="bio-detail">${detail}</li>`
    ).join('');
    
    updateFollowButtons();
}

function updateFollowButtons() {
    DOM.followBtn.style.display = profile.isFollowing ? 'none' : 'flex';
    DOM.unfollowBtn.style.display = profile.isFollowing ? 'flex' : 'none';
}

function setupEventListeners() {
    // Botões de seguir/deixar de seguir
    DOM.followBtn.addEventListener('click', () => toggleFollow(true));
    DOM.unfollowBtn.addEventListener('click', () => toggleFollow(false));
    
    // Botão de mensagem
    DOM.messageBtn.addEventListener('click', () => {
        showNotification(`Abrindo chat com ${profile.name}...`);
    });
    
    // Navegação
    DOM.navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNavItem(this);
            showNotification(`Navegando para ${this.textContent.toLowerCase()}...`);
        });
    });
    
    // Modal de Biografia
    DOM.editBioBtn.addEventListener('click', openBioEditor);
    DOM.closeBioModal.addEventListener('click', closeBioEditor);
    DOM.cancelBioEdit.addEventListener('click', closeBioEditor);
    DOM.saveBio.addEventListener('click', saveBiography);
    DOM.bioModal.addEventListener('click', (e) => {
        if (e.target === DOM.bioModal) closeBioEditor();
    });
    
    // Modal de Perfil
    DOM.editProfileBtn.addEventListener('click', openProfileEditor);
    DOM.closeProfileModal.addEventListener('click', closeProfileEditor);
    DOM.cancelProfileEdit.addEventListener('click', closeProfileEditor);
    DOM.saveProfile.addEventListener('click', saveProfileChanges);
    DOM.profileModal.addEventListener('click', (e) => {
        if (e.target === DOM.profileModal) closeProfileEditor();
    });
}

function toggleFollow(follow) {
    profile.isFollowing = follow;
    const change = follow ? 1 : -1;
    profile.stats.followers = formatNumber(parseNumber(profile.stats.followers) + change);
    updateFollowButtons();
    loadProfileData();
    showNotification(follow ? 
        `Agora você está seguindo ${profile.name}!` : 
        `Você deixou de seguir ${profile.name}.`
    );
}

function setActiveNavItem(activeItem) {
    DOM.navItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');
}

// Modal de Biografia
function openBioEditor() {
    DOM.bioEditor.value = `${profile.bio.intro}\n${profile.bio.details.join('\n')}`;
    DOM.bioModal.classList.add('active');
}

function closeBioEditor() {
    DOM.bioModal.classList.remove('active');
}

function saveBiography() {
    const newBio = DOM.bioEditor.value;
    if (newBio.trim()) {
        const [intro, ...details] = newBio.split('\n').filter(line => line.trim());
        profile.bio.intro = intro || "(Sem descrição)";
        profile.bio.details = details;
        loadProfileData();
        showNotification("Biografia atualizada com sucesso!");
        closeBioEditor();
    }
}

// Modal de Perfil
function openProfileEditor() {
    DOM.profileNameInput.value = profile.name;
    DOM.profileModal.classList.add('active');
}

function closeProfileEditor() {
    DOM.profileModal.classList.remove('active');
}

function saveProfileChanges() {
    const newName = DOM.profileNameInput.value.trim();
    if (newName) {
        profile.name = newName;
        loadProfileData();
        showNotification("Perfil atualizado com sucesso!");
        closeProfileEditor();
    }
}

// Funções auxiliares
function parseNumber(str) {
    if (str.includes('mil')) return parseFloat(str.replace('mil', '')) * 1000;
    if (str.includes('mi')) return parseFloat(str.replace('mi', '')) * 1000000;
    return parseInt(str.replace(/\D/g, ''));
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'mi';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'mil';
    return num.toString();
}

function showNotification(message) {
    DOM.notification.textContent = message;
    DOM.notification.classList.add('show');
    setTimeout(() => DOM.notification.classList.remove('show'), 3000);
}