// Features page functionality
document.addEventListener('DOMContentLoaded', function() {
    initFeaturesFilter();
    initFeatureAnimations();
    initComparisonTable();
});

function initFeaturesFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const featureCategories = document.querySelectorAll('.feature-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter features
            featureCategories.forEach(categoryElement => {
                if (category === 'all' || categoryElement.getAttribute('data-category') === category) {
                    categoryElement.style.display = 'block';
                    setTimeout(() => {
                        categoryElement.style.opacity = '1';
                        categoryElement.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    categoryElement.style.opacity = '0';
                    categoryElement.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        categoryElement.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show notification
            const categoryNames = {
                'all': 'All Features',
                'core': 'Core HR Features',
                'attendance': 'Attendance Features',
                'performance': 'Performance Features',
                'security': 'Security Features',
                'analytics': 'Analytics Features'
            };
            
            showNotification(`Showing ${categoryNames[category]}`, 'info');
        });
    });
}

function initFeatureAnimations() {
    // Animate feature items on scroll
    const featureItems = document.querySelectorAll('.feature-item-detailed');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Animate orbiting features
    const featureOrbs = document.querySelectorAll('.feature-orb');
    featureOrbs.forEach((orb, index) => {
        orb.style.animationDelay = `${index * 2.6}s`;
    });
}

function initComparisonTable() {
    // Add hover effects to comparison table
    const comparisonRows = document.querySelectorAll('.comparison-row');
    
    comparisonRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.02)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
    });
}

// Feature interaction handlers
document.addEventListener('DOMContentLoaded', function() {
    const featureItems = document.querySelectorAll('.feature-item-detailed');
    
    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            const featureName = this.querySelector('h3').textContent;
            showFeatureDemo(featureName);
        });
    });
});

function showFeatureDemo(featureName) {
    const demos = {
        'Employee Enrolment': 'Automated onboarding workflow demonstration',
        'Smart Attendance': 'Biometric and GPS tracking system demo',
        'Online Performance Evaluation': 'Digital assessment platform preview',
        'Service Book Management': 'Digital service record management demo',
        'Advanced Analytics': 'Real-time analytics dashboard preview'
    };
    
    const demo = demos[featureName];
    if (demo) {
        showNotification(`Demo available for: ${featureName}`, 'info');
        // In real app, this would open a modal with the demo
        console.log(`Opening demo for: ${featureName} - ${demo}`);
    }
}