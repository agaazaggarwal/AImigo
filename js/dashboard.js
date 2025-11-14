// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initDashboard();
    initCharts();
    initAIAssistant();
    initNotifications();
    
    // Mobile menu toggle for dashboard
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle dashboard';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.dashboard-header').appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Logout functionality
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                showNotification('Logging out...', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }
    
    // Notification bell
    const notificationBtn = document.querySelector('.btn-notification');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('No new notifications', 'info');
            this.querySelector('.notification-badge').style.display = 'none';
        });
    }
    
    // Quick action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            handleQuickAction(action);
        });
    });
    
    // AI Assistant questions
    const questionButtons = document.querySelectorAll('.question-btn');
    questionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.textContent;
            handleAIQuestion(question);
        });
    });
    
    // AI Chat input
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

function initDashboard() {
    // Simulate loading data
    setTimeout(() => {
        updatePerformanceMetrics();
        loadRecentActivities();
    }, 1000);
}

function initCharts() {
    // Initialize attendance chart
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        // Simple chart implementation (in real app, use Chart.js)
        attendanceCtx.innerHTML = `
            <div style="display: flex; align-items: end; height: 160px; gap: 10px; justify-content: center; padding: 20px 0;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 20px; height: 120px; background: var(--gradient); border-radius: 4px;"></div>
                    <span style="font-size: 0.8rem; margin-top: 5px;">Mon</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 20px; height: 80px; background: var(--gradient); border-radius: 4px;"></div>
                    <span style="font-size: 0.8rem; margin-top: 5px;">Tue</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 20px; height: 140px; background: var(--gradient); border-radius: 4px;"></div>
                    <span style="font-size: 0.8rem; margin-top: 5px;">Wed</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 20px; height: 100px; background: var(--gradient); border-radius: 4px;"></div>
                    <span style="font-size: 0.8rem; margin-top: 5px;">Thu</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 20px; height: 160px; background: var(--gradient); border-radius: 4px;"></div>
                    <span style="font-size: 0.8rem; margin-top: 5px;">Fri</span>
                </div>
            </div>
        `;
    }
}

function initAIAssistant() {
    console.log('AI Assistant initialized');
}

function initNotifications() {
    // Simulate real-time notifications
    setInterval(() => {
        const badge = document.querySelector('.notification-badge');
        if (badge && Math.random() > 0.8) { // 20% chance every 30 seconds
            const current = parseInt(badge.textContent);
            badge.textContent = current + 1;
            badge.style.display = 'flex';
            
            // Show notification
            if (current + 1 === 1) {
                showNotification('New notification received', 'info');
            }
        }
    }, 30000);
}

function updatePerformanceMetrics() {
    // Animate metric bars
    const metrics = document.querySelectorAll('.metric-fill');
    metrics.forEach(metric => {
        const width = metric.style.width;
        metric.style.width = '0';
        setTimeout(() => {
            metric.style.width = width;
        }, 500);
    });
}

function loadRecentActivities() {
    // Activities are already in HTML, this would typically fetch from API
    console.log('Recent activities loaded');
}

function handleQuickAction(action) {
    const actions = {
        'Apply Leave': () => {
            showNotification('Opening leave application form...', 'info');
            // In real app, open leave application modal
        },
        'Download Payslip': () => {
            showNotification('Downloading payslip for March...', 'success');
            // Simulate download
            setTimeout(() => {
                showNotification('Payslip downloaded successfully', 'success');
            }, 1500);
        },
        'Update Profile': () => {
            showNotification('Redirecting to profile settings...', 'info');
            // In real app, redirect to profile page
        },
        'Get Help': () => {
            showNotification('Connecting you with HR support...', 'info');
            // In real app, open help desk
        }
    };
    
    if (actions[action]) {
        actions[action]();
    }
}

function handleAIQuestion(question) {
    const chatContainer = document.querySelector('.ai-chat');
    const responses = {
        'Check leave balance': 'You have 12 days of leave remaining this year.',
        'Apply for leave': 'I can help you apply for leave. Please specify the dates and type of leave.',
        'Payroll query': 'Your last payroll was processed on March 28th. The amount credited was ₹75,000.',
        'Update profile': 'You can update your profile information in the "My Profile" section.'
    };
    
    // Add user question
    addChatMessage(question, 'user');
    
    // Simulate AI thinking
    setTimeout(() => {
        const response = responses[question] || 'I understand you\'re asking about: "' + question + '". How can I assist you with this?';
        addChatMessage(response, 'ai');
    }, 1000);
}

function sendMessage() {
    const input = document.querySelector('.chat-input input');
    const message = input.value.trim();
    
    if (message) {
        handleAIQuestion(message);
        input.value = '';
    }
}

function addChatMessage(message, sender) {
    const chatContainer = document.querySelector('.ai-chat');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-avatar" style="background: var(--secondary);">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        messageDiv.style.flexDirection = 'row-reverse';
        messageDiv.querySelector('.message-content').style.marginLeft = '0';
        messageDiv.querySelector('.message-content').style.marginRight = '15px';
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
    }
    
    // Insert before the quick questions
    const quickQuestions = document.querySelector('.quick-questions');
    chatContainer.insertBefore(messageDiv, quickQuestions);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initDashboard, handleQuickAction };
}