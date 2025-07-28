// Logging utility for error handling and debugging
const Logger = {
    levels: {
        ERROR: 'error',
        WARN: 'warn',
        INFO: 'info',
        DEBUG: 'debug'
    },

    log(level, message, data = {}, context = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            data,
            context,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Console output with appropriate method
        switch (level) {
            case this.levels.ERROR:
                console.error(`[ERROR] ${timestamp} - ${message}`, logEntry);
                break;
            case this.levels.WARN:
                console.warn(`[WARN] ${timestamp} - ${message}`, logEntry);
                break;
            case this.levels.INFO:
                console.info(`[INFO] ${timestamp} - ${message}`, logEntry);
                break;
            case this.levels.DEBUG:
                console.log(`[DEBUG] ${timestamp} - ${message}`, logEntry);
                break;
            default:
                console.log(`[LOG] ${timestamp} - ${message}`, logEntry);
        }

        // Store in sessionStorage for debugging (optional)
        this.storeLog(logEntry);
    },

    error(message, error = null, context = {}) {
        const errorData = error ? {
            name: error.name,
            message: error.message,
            stack: error.stack
        } : {};
        this.log(this.levels.ERROR, message, errorData, context);
    },

    warn(message, data = {}, context = {}) {
        this.log(this.levels.WARN, message, data, context);
    },

    info(message, data = {}, context = {}) {
        this.log(this.levels.INFO, message, data, context);
    },

    debug(message, data = {}, context = {}) {
        this.log(this.levels.DEBUG, message, data, context);
    },

    storeLog(logEntry) {
        try {
            const logs = JSON.parse(sessionStorage.getItem('app_logs') || '[]');
            logs.push(logEntry);
            // Keep only last 100 logs
            if (logs.length > 100) {
                logs.splice(0, logs.length - 100);
            }
            sessionStorage.setItem('app_logs', JSON.stringify(logs));
        } catch (e) {
            console.warn('Failed to store log in sessionStorage:', e);
        }
    },

    getLogs() {
        try {
            return JSON.parse(sessionStorage.getItem('app_logs') || '[]');
        } catch (e) {
            console.warn('Failed to retrieve logs from sessionStorage:', e);
            return [];
        }
    },

    clearLogs() {
        sessionStorage.removeItem('app_logs');
    }
};

// User notification utility
const Notification = {
    show(message, type = 'info', duration = 5000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
                    <div class="notification-content">
                        <span class="notification-message">${message}</span>
                        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
                    </div>
                `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, duration);
        }

        Logger.info('User notification displayed', { message, type, duration });
    },

    error(message, duration = 7000) {
        this.show(message, 'error', duration);
    },

    success(message, duration = 4000) {
        this.show(message, 'success', duration);
    },

    warning(message, duration = 5000) {
        this.show(message, 'warning', duration);
    }
};

// Enhanced freelancer database with job roles and detailed profiles
const freelancers = {
    beginner: {
        "logo-design": [
            { name: "Alex Chen", avatar: "AC", specialty: "Logo Design", experience: "1-2 years experience", rate: "$25/hour", location: "New York, NY", projects: 15 },
            { name: "Maya Patel", avatar: "MP", specialty: "Logo & Branding", experience: "2 years experience", rate: "$30/hour", location: "Austin, TX", projects: 22 }
        ],
        "web-design": [
            { name: "Jake Wilson", avatar: "JW", specialty: "Web Design", experience: "1 year experience", rate: "$20/hour", location: "Seattle, WA", projects: 8 },
            { name: "Lisa Kim", avatar: "LK", specialty: "Landing Pages", experience: "1.5 years experience", rate: "$28/hour", location: "San Diego, CA", projects: 12 }
        ],
        "branding": [
            { name: "Sam Rodriguez", avatar: "SR", specialty: "Brand Identity", experience: "2 years experience", rate: "$35/hour", location: "Miami, FL", projects: 18 }
        ],
        "illustration": [
            { name: "Emma Thompson", avatar: "ET", specialty: "Digital Illustration", experience: "1.5 years experience", rate: "$22/hour", location: "Portland, OR", projects: 14 }
        ],
        "ui-ux": [
            { name: "David Lee", avatar: "DL", specialty: "Mobile UI Design", experience: "2 years experience", rate: "$32/hour", location: "Chicago, IL", projects: 16 }
        ],
        "content-writing": [
            { name: "Sarah Johnson", avatar: "SJ", specialty: "Blog Writing", experience: "1 year experience", rate: "$18/hour", location: "Denver, CO", projects: 25 }
        ],
        "social-media": [
            { name: "Mike Chen", avatar: "MC", specialty: "Instagram Design", experience: "1.5 years experience", rate: "$24/hour", location: "Los Angeles, CA", projects: 30 }
        ],
        "video-editing": [
            { name: "Anna Davis", avatar: "AD", specialty: "Social Media Videos", experience: "2 years experience", rate: "$26/hour", location: "Nashville, TN", projects: 20 }
        ]
    },
    intermediate: {
        "logo-design": [
            { name: "Carlos Martinez", avatar: "CM", specialty: "Logo Design Expert", experience: "4 years experience", rate: "$55/hour", location: "Phoenix, AZ", projects: 65 },
            { name: "Nina Foster", avatar: "NF", specialty: "Brand Logo Design", experience: "3.5 years experience", rate: "$50/hour", location: "Boston, MA", projects: 58 }
        ],
        "web-design": [
            { name: "Ryan Cooper", avatar: "RC", specialty: "E-commerce Design", experience: "4 years experience", rate: "$60/hour", location: "San Francisco, CA", projects: 42 },
            { name: "Zoe Williams", avatar: "ZW", specialty: "Responsive Web Design", experience: "3 years experience", rate: "$48/hour", location: "Atlanta, GA", projects: 38 }
        ],
        "branding": [
            { name: "Jordan Blake", avatar: "JB", specialty: "Complete Brand Identity", experience: "4.5 years experience", rate: "$65/hour", location: "Washington, DC", projects: 35 }
        ],
        "illustration": [
            { name: "Taylor Swift", avatar: "TS", specialty: "Character Design", experience: "3.5 years experience", rate: "$45/hour", location: "Minneapolis, MN", projects: 52 }
        ],
        "ui-ux": [
            { name: "Morgan Ali", avatar: "MA", specialty: "UX Research & Design", experience: "4 years experience", rate: "$70/hour", location: "Philadelphia, PA", projects: 28 }
        ],
        "content-writing": [
            { name: "Casey Rivers", avatar: "CR", specialty: "Technical Writing", experience: "3 years experience", rate: "$40/hour", location: "Raleigh, NC", projects: 75 }
        ],
        "social-media": [
            { name: "Alex Harper", avatar: "AH", specialty: "Social Media Strategy", experience: "4 years experience", rate: "$55/hour", location: "Las Vegas, NV", projects: 85 }
        ],
        "video-editing": [
            { name: "Jamie Parker", avatar: "JP", specialty: "Corporate Video Editing", experience: "3.5 years experience", rate: "$52/hour", location: "Salt Lake City, UT", projects: 48 }
        ]
    },
    expert: {
        "logo-design": [
            { name: "Victoria Sterling", avatar: "VS", specialty: "Premium Logo Design", experience: "8 years experience", rate: "$120/hour", location: "New York, NY", projects: 180 },
            { name: "Marcus Gold", avatar: "MG", specialty: "Luxury Brand Logos", experience: "7 years experience", rate: "$110/hour", location: "Los Angeles, CA", projects: 156 }
        ],
        "web-design": [
            { name: "Isabella Rose", avatar: "IR", specialty: "Enterprise Web Design", experience: "6 years experience", rate: "$95/hour", location: "San Francisco, CA", projects: 78 },
            { name: "Sebastian Vale", avatar: "SV", specialty: "High-End Web Solutions", experience: "9 years experience", rate: "$125/hour", location: "Seattle, WA", projects: 92 }
        ],
        "branding": [
            { name: "Olivia Stark", avatar: "OS", specialty: "Strategic Brand Consultant", experience: "10 years experience", rate: "$150/hour", location: "Chicago, IL", projects: 65 }
        ],
        "illustration": [
            { name: "Phoenix Wright", avatar: "PW", specialty: "Creative Illustration Director", experience: "7 years experience", rate: "$85/hour", location: "Portland, OR", projects: 120 }
        ],
        "ui-ux": [
            { name: "Nova Bright", avatar: "NB", specialty: "Senior UX Architect", experience: "8 years experience", rate: "$140/hour", location: "Austin, TX", projects: 55 }
        ],
        "content-writing": [
            { name: "Sage Morgan", avatar: "SM", specialty: "Content Strategy Lead", experience: "6 years experience", rate: "$75/hour", location: "Denver, CO", projects: 200 }
        ],
        "social-media": [
            { name: "River Stone", avatar: "RS", specialty: "Social Media Creative Director", experience: "7 years experience", rate: "$90/hour", location: "Miami, FL", projects: 150 }
        ],
        "video-editing": [
            { name: "Storm Chase", avatar: "SC", specialty: "Senior Video Producer", experience: "9 years experience", rate: "$105/hour", location: "Nashville, TN", projects: 88 }
        ]
    }
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        try {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                Logger.debug('Navigation scroll triggered', { targetId }, { function: 'smoothScrolling' });
            } else {
                Logger.warn('Navigation target not found', { targetId }, { function: 'smoothScrolling' });
            }
        } catch (error) {
            Logger.error('Error during smooth scrolling navigation', error, { function: 'smoothScrolling' });
        }
    });
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Special handling for timeline
            if (entry.target.classList.contains('timeline-section')) {
                setTimeout(() => {
                    animateTimeline();
                }, 500);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.step-card, .section-card, .demo-form, .timeline-section').forEach(el => {
    observer.observe(el);
});

// Demo functionality
const findButton = document.getElementById('findButton');
const loadingSpinner = document.getElementById('loadingSpinner');
const buttonText = document.getElementById('buttonText');
const freelancerCard = document.getElementById('freelancerCard');
const budgetSelect = document.getElementById('budget');
const skillSelect = document.getElementById('skill');
const jobRoleSelect = document.getElementById('jobRole');

findButton.addEventListener('click', handleFindFreelancer);

function handleFindFreelancer() {
    const budget = budgetSelect.value;
    const skill = skillSelect.value;
    const jobRole = jobRoleSelect.value;

    if (!budget || !skill || !jobRole) {
        const missingFields = [];
        if (!jobRole) missingFields.push('job role');
        if (!budget) missingFields.push('budget');
        if (!skill) missingFields.push('experience level');

        const errorMessage = `Please select ${missingFields.join(', ')}`;
        Logger.warn('Form validation failed - missing required fields', {
            missingFields,
            formData: { budget, skill, jobRole }
        }, { function: 'handleFindFreelancer' });

        Notification.warning(errorMessage);
        return;
    }

    // Start loading
    findButton.disabled = true;
    loadingSpinner.style.display = 'inline-block';
    buttonText.textContent = 'Finding Perfect Match...';
    freelancerCard.classList.remove('show');

    // Simulate AI matching time
    setTimeout(() => {
        try {
            // Get freelancers for the selected skill level and job role
            const availableFreelancers = freelancers[skill] && freelancers[skill][jobRole];

            if (!availableFreelancers || availableFreelancers.length === 0) {
                Logger.warn('No freelancers found for criteria', {
                    skill,
                    jobRole,
                    budget,
                    availableSkills: Object.keys(freelancers),
                    availableJobRoles: freelancers[skill] ? Object.keys(freelancers[skill]) : []
                }, { function: 'handleFindFreelancer' });

                // Fallback to a default freelancer if no match found
                const fallbackFreelancer = {
                    name: "Available Soon",
                    avatar: "AS",
                    specialty: "Coming Soon",
                    experience: "Expanding our network",
                    rate: "Contact us",
                    location: "Worldwide",
                    projects: 0
                };
                updateFreelancerCard(fallbackFreelancer);
                Notification.info('No exact matches found. We\'re expanding our network for this skill combination.');
            } else {
                // Pick a random freelancer from available matches
                const randomFreelancer = availableFreelancers[Math.floor(Math.random() * availableFreelancers.length)];

                Logger.info('Freelancer match found', {
                    freelancer: randomFreelancer,
                    criteria: { skill, jobRole, budget },
                    totalMatches: availableFreelancers.length
                }, { function: 'handleFindFreelancer' });

                updateFreelancerCard(randomFreelancer);
            }
        } catch (error) {
            Logger.error('Error during freelancer matching process', error, {
                function: 'handleFindFreelancer',
                formData: { skill, jobRole, budget }
            });

            Notification.error('Sorry, there was an error finding freelancers. Please try again.');

            // Reset button state on error
            findButton.disabled = false;
            loadingSpinner.style.display = 'none';
            buttonText.textContent = 'Find My Freelancer';
            return;
        }

        // Show the card
        freelancerCard.classList.add('show');

        // Reset button
        findButton.disabled = false;
        loadingSpinner.style.display = 'none';
        buttonText.textContent = 'Find Another Match';
    }, 2500);
}

function updateFreelancerCard(freelancer) {
    try {
        const elements = {
            avatar: document.getElementById('freelancerAvatar'),
            name: document.getElementById('freelancerName'),
            specialty: document.getElementById('freelancerSpecialty'),
            experience: document.getElementById('freelancerExperience'),
            rate: document.getElementById('freelancerRate'),
            hireButton: document.querySelector('.hire-button')
        };

        // Validate all elements exist
        const missingElements = Object.entries(elements)
            .filter(([key, element]) => !element)
            .map(([key]) => key);

        if (missingElements.length > 0) {
            throw new Error(`Missing DOM elements: ${missingElements.join(', ')}`);
        }

        // Update elements
        elements.avatar.textContent = freelancer.avatar || 'N/A';
        elements.name.textContent = freelancer.name || 'Unknown';
        elements.specialty.textContent = freelancer.specialty || 'General';
        elements.experience.textContent = freelancer.experience || 'Experience level not specified';
        elements.rate.textContent = freelancer.rate || 'Rate not available';

        // Update hire button
        const firstName = (freelancer.name || 'Freelancer').split(' ')[0];
        elements.hireButton.textContent = `Hire ${firstName}`;

        // Check current freelancer state after updating card
        setTimeout(() => {
            checkFreelancerResponses();
        }, 100);

        Logger.info('Freelancer card updated successfully', { freelancer }, { function: 'updateFreelancerCard' });

    } catch (error) {
        Logger.error('Failed to update freelancer card', error, {
            function: 'updateFreelancerCard',
            freelancer
        });

        Notification.error('Error displaying freelancer information. Please try again.');
    }
}

// Hiring system state management
let hiringRequests = JSON.parse(localStorage.getItem('hiringRequests') || '[]');
let freelancerStates = JSON.parse(localStorage.getItem('freelancerStates') || '{}');

function handleHire() {
    const freelancerName = document.getElementById('freelancerName').textContent;
    const freelancerId = freelancerName.replace(/\s+/g, '').toLowerCase();
    
    // Check if freelancer is already booked
    if (freelancerStates[freelancerId] === 'booked') {
        Notification.warning('This freelancer is currently booked and not available for new projects.');
        return;
    }
    
    // Open hiring modal
    openHiringModal(freelancerName);
}

function openHiringModal(freelancerName) {
    const modal = document.getElementById('hiringModal');
    const modalFreelancerName = document.getElementById('modalFreelancerName');
    
    modalFreelancerName.textContent = freelancerName;
    modal.classList.add('show');
    
    // Reset form
    document.getElementById('hiringForm').reset();
    
    Logger.info('Hiring modal opened', { freelancerName }, { function: 'openHiringModal' });
}

function closeHiringModal() {
    const modal = document.getElementById('hiringModal');
    modal.classList.remove('show');
    
    Logger.info('Hiring modal closed', {}, { function: 'closeHiringModal' });
}

// Handle hiring form submission
document.getElementById('hiringForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const freelancerName = document.getElementById('modalFreelancerName').textContent;
    const freelancerId = freelancerName.replace(/\s+/g, '').toLowerCase();
    const clientName = document.getElementById('clientName').value;
    const companyName = document.getElementById('companyName').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const offerPrice = document.getElementById('offerPrice').value;
    
    // Validate form
    if (!clientName || !companyName || !jobDescription || !offerPrice) {
        Notification.warning('Please fill in all required fields.');
        return;
    }
    
    // Create hiring request
    const hiringRequest = {
        id: Date.now().toString(),
        freelancerName,
        freelancerId,
        clientName,
        companyName,
        jobDescription,
        offerPrice,
        status: 'pending',
        timestamp: new Date().toISOString()
    };
    
    // Add to hiring requests
    hiringRequests.push(hiringRequest);
    localStorage.setItem('hiringRequests', JSON.stringify(hiringRequests));
    
    // Update button state to "Hiring in Progress"
    updateHireButtonState(freelancerId, 'hiring-in-progress');
    
    // Close modal
    closeHiringModal();
    
    // Show success notification
    Notification.success(`Hire request sent to ${freelancerName}! They will review and respond soon.`);
    
    Logger.info('Hiring request submitted', {
        hiringRequest,
        totalRequests: hiringRequests.length
    }, { function: 'hiringFormSubmit' });
});

function updateHireButtonState(freelancerId, state) {
    const hireButton = document.querySelector('.hire-button');
    const freelancerName = document.getElementById('freelancerName').textContent;
    const firstName = freelancerName.split(' ')[0];
    
    // Remove all state classes
    hireButton.classList.remove('hiring-in-progress', 'hired');
    
    switch(state) {
        case 'hiring-in-progress':
            hireButton.classList.add('hiring-in-progress');
            hireButton.textContent = 'Hiring in Progress';
            hireButton.disabled = true;
            break;
        case 'hired':
            hireButton.classList.add('hired');
            hireButton.textContent = 'Hired ✓';
            hireButton.disabled = true;
            
            // Add reject button
            if (!document.querySelector('.reject-button')) {
                const rejectButton = document.createElement('button');
                rejectButton.className = 'reject-button';
                rejectButton.textContent = 'End Project';
                rejectButton.onclick = () => handleRejectProject(freelancerId);
                hireButton.parentNode.appendChild(rejectButton);
            }
            break;
        default:
            hireButton.textContent = `Hire ${firstName}`;
            hireButton.disabled = false;
            
            // Remove reject button if exists
            const rejectButton = document.querySelector('.reject-button');
            if (rejectButton) {
                rejectButton.remove();
            }
    }
    
    // Update freelancer state
    freelancerStates[freelancerId] = state === 'hired' ? 'booked' : state;
    localStorage.setItem('freelancerStates', JSON.stringify(freelancerStates));
    
    Logger.info('Hire button state updated', {
        freelancerId,
        state,
        freelancerStates
    }, { function: 'updateHireButtonState' });
}

function handleRejectProject(freelancerId) {
    if (confirm('Are you sure you want to end this project? This action cannot be undone.')) {
        // Reset freelancer state
        delete freelancerStates[freelancerId];
        localStorage.setItem('freelancerStates', JSON.stringify(freelancerStates));
        
        // Update button back to normal
        updateHireButtonState(freelancerId, 'default');
        
        Notification.info('Project ended. This freelancer is now available for new projects.');
        
        Logger.info('Project rejected/ended', { freelancerId }, { function: 'handleRejectProject' });
    }
}

// Function to simulate freelancer accepting a job (for demo purposes)
function simulateFreelancerAccept(freelancerId) {
    updateHireButtonState(freelancerId, 'hired');
    Notification.success('Great news! The freelancer has accepted your project and is now hired.');
}

// Check for freelancer responses and update UI accordingly
function checkFreelancerResponses() {
    const hiringRequests = JSON.parse(localStorage.getItem('hiringRequests') || '[]');
    const currentFreelancerName = document.getElementById('freelancerName')?.textContent;
    
    if (!currentFreelancerName) return;
    
    const currentFreelancerId = currentFreelancerName.replace(/\s+/g, '').toLowerCase();
    
    // Check if there's an accepted request for current freelancer
    const acceptedRequest = hiringRequests.find(r => 
        r.freelancerId === currentFreelancerId && r.status === 'accepted'
    );
    
    if (acceptedRequest) {
        updateHireButtonState(currentFreelancerId, 'hired');
        return;
    }
    
    // Check if there's a pending request
    const pendingRequest = hiringRequests.find(r => 
        r.freelancerId === currentFreelancerId && r.status === 'pending'
    );
    
    if (pendingRequest) {
        updateHireButtonState(currentFreelancerId, 'hiring-in-progress');
        return;
    }
    
    // Check if freelancer is booked by someone else
    const freelancerStates = JSON.parse(localStorage.getItem('freelancerStates') || '{}');
    if (freelancerStates[currentFreelancerId] === 'booked') {
        const hireButton = document.querySelector('.hire-button');
        if (hireButton) {
            hireButton.textContent = 'Currently Booked';
            hireButton.disabled = true;
            hireButton.style.background = 'linear-gradient(135deg, #718096, #4a5568)';
        }
    }
}

// Add link to freelancer dashboard in navigation (for demo purposes)
function addFreelancerDashboardLink() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && !document.querySelector('.freelancer-dashboard-link')) {
        const dashboardLink = document.createElement('li');
        dashboardLink.innerHTML = '<a href="freelancer-dashboard.html" class="freelancer-dashboard-link">Freelancer Dashboard</a>';
        navLinks.appendChild(dashboardLink);
    }
}

// Timeline animation
function animateTimeline() {
    const progressBar = document.querySelector('.timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Animate progress bar
    if (window.innerWidth > 768) {
        progressBar.style.width = '100%';
    } else {
        progressBar.style.height = '100%';
    }

    // Animate timeline items
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 200);
    });
}

// Form interactivity with enhanced validation
[budgetSelect, skillSelect, jobRoleSelect].forEach(select => {
    select.addEventListener('change', () => {
        if (budgetSelect.value && skillSelect.value && jobRoleSelect.value) {
            findButton.style.background = 'linear-gradient(135deg, #059669, #047857)';
            findButton.style.transform = 'scale(1.02)';
            setTimeout(() => {
                findButton.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                findButton.style.transform = 'scale(1)';
            }, 200);
        }
    });
});

// Mobile menu toggle (placeholder)
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
    Logger.debug('Mobile menu toggle clicked', {}, { function: 'mobileMenuToggle' });
    Notification.info('Mobile menu feature coming soon in full implementation');
});

// Add some interactive effects to cards
document.querySelectorAll('.step-card, .section-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // Trigger animations for elements in viewport
    const elements = document.querySelectorAll('.step-card, .section-card, .demo-form');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('animate');
        }
    });
});

// Handle window resize for responsive timeline
window.addEventListener('resize', () => {
    try {
        const progressBar = document.querySelector('.timeline-progress');
        if (progressBar && (progressBar.style.width || progressBar.style.height)) {
            if (window.innerWidth <= 768) {
                progressBar.style.width = '100%';
                progressBar.style.height = '100%';
            } else {
                progressBar.style.height = '100%';
                progressBar.style.width = '100%';
            }
        }
    } catch (error) {
        Logger.error('Error handling window resize for timeline', error, { function: 'windowResize' });
    }
});

// Global error handling
window.addEventListener('error', (event) => {
    Logger.error('Uncaught JavaScript error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error ? event.error.stack : null
    }, { function: 'globalErrorHandler' });
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    Logger.error('Unhandled promise rejection', {
        reason: event.reason,
        promise: event.promise
    }, { function: 'globalPromiseRejectionHandler' });
});

// Initialize logging
Logger.info('Application initialized', {
    userAgent: navigator.userAgent,
    url: window.location.href,
    timestamp: new Date().toISOString()
}, { function: 'initialization' });

// Initialize hiring system
document.addEventListener('DOMContentLoaded', function() {
    // Add freelancer dashboard link to navigation
    addFreelancerDashboardLink();
    
    // Check for freelancer responses every 5 seconds
    setInterval(checkFreelancerResponses, 5000);
    
    // Initial check
    setTimeout(checkFreelancerResponses, 1000);
});
