// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                if (authenticateUser(username, password)) {
                    showNotification('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                } else {
                    showNotification('Invalid credentials. Please try again.', 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 2000);
        });
    }
    
    // Biometric login
    const biometricBtn = document.querySelector('.btn-social:nth-child(1)');
    if (biometricBtn) {
        biometricBtn.addEventListener('click', function() {
            showNotification('Biometric authentication initiated...', 'info');
            // Simulate biometric auth
            setTimeout(() => {
                if (Math.random() > 0.3) { // 70% success rate for demo
                    showNotification('Biometric authentication successful!', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    showNotification('Biometric authentication failed. Please try again.', 'error');
                }
            }, 1500);
        });
    }
    
    // OTP login
    const otpBtn = document.querySelector('.btn-social:nth-child(2)');
    if (otpBtn) {
        otpBtn.addEventListener('click', function() {
            showNotification('OTP sent to your registered mobile number', 'info');
            // In real implementation, this would trigger OTP sending
        });
    }
});

// Mock authentication function
function authenticateUser(username, password) {
    // Demo credentials
    const demoUsers = {
        'admin': 'admin123',
        'user': 'user123',
        'employee': 'emp123'
    };
    
    return demoUsers[username] === password;
}

// Password strength checker (for registration)
function checkPasswordStrength(password) {
    let strength = 0;
    const feedback = [];
    
    if (password.length >= 8) strength++;
    else feedback.push('Password should be at least 8 characters long');
    
    if (/[A-Z]/.test(password)) strength++;
    else feedback.push('Include uppercase letters');
    
    if (/[a-z]/.test(password)) strength++;
    else feedback.push('Include lowercase letters');
    
    if (/[0-9]/.test(password)) strength++;
    else feedback.push('Include numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    else feedback.push('Include special characters');
    
    return { strength, feedback };
}