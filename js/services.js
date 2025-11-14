// Services page functionality
document.addEventListener('DOMContentLoaded', function() {
    initServicesFilter();
    initServiceAnimations();
});

function initServicesFilter() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const serviceItems = document.querySelectorAll('.service-item');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter services
            serviceItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show notification
            const categoryNames = {
                'all': 'All Services',
                'ai': 'AI Powered',
                'core': 'Core HR',
                'analytics': 'Analytics',
                'security': 'Security'
            };
            
            showNotification(`Showing ${categoryNames[category]}`, 'info');
        });
    });
}

function initServiceAnimations() {
    // Animate service items on scroll
    const serviceItems = document.querySelectorAll('.service-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Animate orbiting elements
    const orbitingElements = document.querySelectorAll('.orbiting-element');
    orbitingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });
}

// Service interaction handlers
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            showServiceDetails(serviceName);
        });
    });
});

function showServiceDetails(serviceName) {
    const details = {
        'AI HR Assistant': {
            description: 'Advanced AI-powered assistant for instant HR support',
            features: ['24/7 Availability', 'Multi-language Support', 'Context Understanding'],
            tech: ['NLP', 'Machine Learning', 'Cloud AI']
        },
        'Predictive Analytics': {
            description: 'Machine learning models for workforce insights',
            features: ['Turnover Prediction', 'Performance Forecasting', 'Trend Analysis'],
            tech: ['Python', 'TensorFlow', 'Data Analytics']
        }
        // Add more service details as needed
    };
    
    const service = details[serviceName];
    if (service) {
        const modalContent = `
            <h3>${serviceName}</h3>
            <p>${service.description}</p>
            <div class="feature-list">
                <h4>Key Features:</h4>
                ${service.features.map(feature => `<span>✓ ${feature}</span>`).join('')}
            </div>
            <div class="tech-stack">
                <h4>Technology Stack:</h4>
                ${service.tech.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        `;
        
        // In a real app, you would show a modal with this content
        showNotification(`Viewing details for: ${serviceName}`, 'info');
        console.log('Service Details:', modalContent);
    }
}