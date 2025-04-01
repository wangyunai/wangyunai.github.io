document.addEventListener('DOMContentLoaded', function() {
    // Publication filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Track filter usage
            if (typeof trackClick === 'function') {
                const section = this.closest('section').id;
                trackClick('Filters', 'Filter Applied', `${section} - ${filter}`);
            }
            
            // Show/hide publications based on filter
            publicationItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'flex';
                } else {
                    const pubYear = item.querySelector('.pub-year').innerText;
                    if (pubYear === filter) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if it's open
            document.querySelector('.nav-menu').classList.remove('active');
        });
    });

    // Mobile navigation toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuIcon.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Track mobile menu toggle
        if (typeof trackClick === 'function') {
            const action = navMenu.classList.contains('active') ? 'Open' : 'Close';
            trackClick('Navigation', 'Mobile Menu', action);
        }
        
        // Toggle between hamburger and X icon
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Load news items
    loadNews();
    
    // Setup news filters
    setupNewsFilters();
    
    // Load innovations
    loadInnovations();
    
    // Track page scroll depth
    trackScrollDepth();
    
    // Setup navigation active state
    handleScrollNavigation();
});

// Track scroll depth
function trackScrollDepth() {
    let scrollMarks = [25, 50, 75, 100];
    let marks = scrollMarks.map(mark => ({
        percent: mark,
        tracked: false
    }));
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;
        
        marks.forEach(mark => {
            if (scrollPercent >= mark.percent && !mark.tracked) {
                mark.tracked = true;
                if (typeof trackClick === 'function') {
                    trackClick('Engagement', 'Scroll Depth', `${mark.percent}%`);
                }
            }
        });
    });
}

// Add active class to navigation when scrolling
function handleScrollNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 300; // Offset to trigger active state earlier
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Load news items from news.js
function loadNews() {
    const newsContainer = document.querySelector('.news-container');
    
    // Clear existing content
    if (newsContainer) {
        newsContainer.innerHTML = '';
        
        // Sort news items by date (newest first)
        const sortedNews = [...labNews].sort((a, b) => {
            // Parse dates (assuming format like "March 2025" or "February 2024")
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return bDate - aDate; // Newest first
        });
        
        // Add each news item to the container (headline only)
        sortedNews.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item headline-only';
            
            // Create the news date element
            const newsDate = document.createElement('div');
            newsDate.className = 'news-date';
            newsDate.textContent = item.date;
            
            // Create the news title
            const newsTitle = document.createElement('h3');
            newsTitle.textContent = item.title;
            
            // Append date and title to the news item
            newsItem.appendChild(newsDate);
            newsItem.appendChild(newsTitle);
            
            // Add the complete news item to the container
            newsContainer.appendChild(newsItem);
        });
    }
}

// Filter news by year when clicking year buttons
function setupNewsFilters() {
    const filterButtons = document.querySelectorAll('.news-filters .filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Track filter usage
                if (typeof trackClick === 'function') {
                    trackClick('Filters', 'News Filter', filter);
                }
                
                const newsContainer = document.querySelector('.news-container');
                
                // Clear existing content
                if (newsContainer) {
                    newsContainer.innerHTML = '';
                    
                    let filteredNews = [];
                    
                    if (filter === 'all') {
                        filteredNews = [...labNews];
                    } else {
                        filteredNews = filterNewsByYear(filter);
                    }
                    
                    // Sort news items by date (newest first)
                    filteredNews.sort((a, b) => {
                        // Parse dates (assuming format like "March 2025" or "February 2024")
                        const aDate = new Date(a.date);
                        const bDate = new Date(b.date);
                        return bDate - aDate; // Newest first
                    });
                    
                    // Add filtered news items (headline only)
                    filteredNews.forEach(item => {
                        const newsItem = document.createElement('div');
                        newsItem.className = 'news-item headline-only';
                        
                        const newsDate = document.createElement('div');
                        newsDate.className = 'news-date';
                        newsDate.textContent = item.date;
                        
                        const newsTitle = document.createElement('h3');
                        newsTitle.textContent = item.title;
                        
                        newsItem.appendChild(newsDate);
                        newsItem.appendChild(newsTitle);
                        
                        newsContainer.appendChild(newsItem);
                    });
                }
            });
        });
    }
}

// Load research areas from research.js
function loadResearch() {
    const researchGrid = document.querySelector('.research-grid');
    
    if (researchGrid && typeof researchAreas !== 'undefined') {
        // Clear existing content
        researchGrid.innerHTML = '';
        
        // Add each research area
        researchAreas.forEach(area => {
            const researchItem = document.createElement('div');
            researchItem.className = 'research-item';
            
            const iconDiv = document.createElement('div');
            iconDiv.className = 'research-icon';
            
            const icon = document.createElement('i');
            icon.className = area.icon;
            iconDiv.appendChild(icon);
            
            const title = document.createElement('h3');
            title.textContent = area.title;
            
            const description = document.createElement('p');
            description.textContent = area.description;
            
            researchItem.appendChild(iconDiv);
            researchItem.appendChild(title);
            researchItem.appendChild(description);
            
            researchGrid.appendChild(researchItem);
        });
    }
}

// Load funding information from funding.js
function loadFunding() {
    const fundingContainer = document.querySelector('.funding-container');
    
    if (fundingContainer && typeof labFunding !== 'undefined') {
        // Clear existing content
        fundingContainer.innerHTML = '';
        
        // Add each funding item
        labFunding.forEach(grant => {
            const fundingItem = document.createElement('div');
            fundingItem.className = 'funding-item';
            
            const fundingHeader = document.createElement('div');
            fundingHeader.className = 'funding-header';
            
            const fundingTitle = document.createElement('div');
            fundingTitle.className = 'funding-title';
            fundingTitle.textContent = grant.title;
            
            const fundingAmount = document.createElement('div');
            fundingAmount.className = 'funding-amount';
            fundingAmount.textContent = grant.amount;
            
            fundingHeader.appendChild(fundingTitle);
            fundingHeader.appendChild(fundingAmount);
            
            const fundingPeriod = document.createElement('div');
            fundingPeriod.className = 'funding-period';
            fundingPeriod.textContent = grant.period;
            
            const fundingRole = document.createElement('div');
            fundingRole.className = 'funding-role';
            fundingRole.textContent = grant.role;
            
            const fundingAgency = document.createElement('div');
            fundingAgency.className = 'funding-agency';
            fundingAgency.textContent = grant.agency;
            
            const fundingProjectTitle = document.createElement('div');
            fundingProjectTitle.className = 'funding-project-title';
            fundingProjectTitle.textContent = grant.projectTitle;
            
            const fundingDescription = document.createElement('div');
            fundingDescription.className = 'funding-description';
            fundingDescription.textContent = grant.description;
            
            fundingItem.appendChild(fundingHeader);
            fundingItem.appendChild(fundingPeriod);
            fundingItem.appendChild(fundingRole);
            fundingItem.appendChild(fundingAgency);
            fundingItem.appendChild(fundingProjectTitle);
            fundingItem.appendChild(fundingDescription);
            
            fundingContainer.appendChild(fundingItem);
        });
    }
}

// Load team members from team.js
function loadTeam() {
    // Load PI
    const piSection = document.querySelector('.pi-card');
    if (piSection && typeof labTeam !== 'undefined') {
        const pi = labTeam.pi;
        
        const piPhoto = piSection.querySelector('.pi-photo img');
        if (piPhoto) {
            piPhoto.src = pi.photo;
            piPhoto.alt = pi.name;
        }
        
        const piName = piSection.querySelector('h3');
        if (piName) {
            piName.textContent = pi.name;
        }
        
        const piCVLink = piSection.querySelector('.cv-link');
        if (piCVLink) {
            piCVLink.href = pi.cvLink;
        }
    }
    
    // Load staff
    loadTeamCategory('staff', '.team-category:nth-of-type(1) .team-grid');
    
    // Load students
    loadTeamCategory('students', '.team-category:nth-of-type(2) .team-grid');
    
    // Load alumni
    loadTeamCategory('alumni', '.team-category:nth-of-type(3) .team-grid');
}

// Helper function to load a specific team category
function loadTeamCategory(category, selector) {
    const teamGrid = document.querySelector(selector);
    
    if (teamGrid && typeof labTeam !== 'undefined' && labTeam[category]) {
        // Clear existing content
        teamGrid.innerHTML = '';
        
        // Add each team member
        labTeam[category].forEach(member => {
            const teamMember = document.createElement('div');
            teamMember.className = 'team-member';
            
            const memberPhoto = document.createElement('div');
            memberPhoto.className = 'member-photo';
            
            if (member.photo) {
                const img = document.createElement('img');
                img.src = member.photo;
                img.alt = member.name;
                memberPhoto.appendChild(img);
            } else {
                const icon = document.createElement('i');
                icon.className = 'fas fa-user';
                memberPhoto.appendChild(icon);
            }
            
            const memberName = document.createElement('h4');
            memberName.textContent = member.name;
            
            const memberRole = document.createElement('p');
            memberRole.className = 'member-role';
            memberRole.textContent = member.role;
            
            teamMember.appendChild(memberPhoto);
            teamMember.appendChild(memberName);
            teamMember.appendChild(memberRole);
            
            if (member.department) {
                const memberDept = document.createElement('p');
                memberDept.className = 'member-dept';
                memberDept.textContent = member.department;
                teamMember.appendChild(memberDept);
            }
            
            if (member.institution) {
                const memberInst = document.createElement('p');
                memberInst.className = 'member-inst';
                memberInst.textContent = member.institution;
                teamMember.appendChild(memberInst);
            }
            
            if (member.currentPosition) {
                const memberPosition = document.createElement('p');
                memberPosition.className = 'member-position';
                memberPosition.textContent = member.currentPosition;
                teamMember.appendChild(memberPosition);
            }
            
            if (member.graduationYear) {
                const memberYear = document.createElement('p');
                memberYear.className = 'member-year';
                memberYear.textContent = `Graduated: ${member.graduationYear}`;
                teamMember.appendChild(memberYear);
            }
            
            teamGrid.appendChild(teamMember);
        });
    }
}

// Load publications from publications.js
function loadPublications() {
    const publicationsGrid = document.querySelector('.publications-grid');
    const publicationFilters = document.querySelector('.publication-filters');
    
    if (publicationsGrid && typeof labPublications !== 'undefined') {
        // Clear existing content
        publicationsGrid.innerHTML = '';
        
        // Ensure filters are up to date
        if (publicationFilters) {
            // Keep 'All' button and recreate year buttons
            const allButton = publicationFilters.querySelector('[data-filter="all"]');
            publicationFilters.innerHTML = '';
            
            if (allButton) {
                publicationFilters.appendChild(allButton);
            } else {
                const newAllButton = document.createElement('button');
                newAllButton.className = 'filter-btn active';
                newAllButton.setAttribute('data-filter', 'all');
                newAllButton.textContent = 'All';
                publicationFilters.appendChild(newAllButton);
            }
            
            // Add year buttons in descending order
            const years = Object.keys(labPublications).sort((a, b) => b - a);
            years.forEach(year => {
                const yearButton = document.createElement('button');
                yearButton.className = 'filter-btn';
                yearButton.setAttribute('data-filter', year);
                yearButton.textContent = year;
                publicationFilters.appendChild(yearButton);
            });
            
            // Add event listeners to new buttons
            setupPublicationFilters();
        }
        
        // Display all publications
        displayPublications('all');
    }
}

// Display publications based on filter
function displayPublications(filter) {
    const publicationsGrid = document.querySelector('.publications-grid');
    
    if (publicationsGrid) {
        // Clear existing content
        publicationsGrid.innerHTML = '';
        
        // Get years to display
        let years = [];
        if (filter === 'all') {
            years = Object.keys(labPublications).sort((a, b) => b - a);
        } else {
            years = [filter];
        }
        
        // Add publications for each year
        years.forEach(year => {
            if (labPublications[year]) {
                labPublications[year].forEach(pub => {
                    const pubItem = document.createElement('div');
                    pubItem.className = 'publication-item';
                    
                    const pubYear = document.createElement('div');
                    pubYear.className = 'pub-year';
                    pubYear.textContent = year;
                    
                    const pubContent = document.createElement('div');
                    pubContent.className = 'pub-content';
                    
                    const pubTitle = document.createElement('h3');
                    pubTitle.textContent = pub.title;
                    
                    const pubAuthors = document.createElement('p');
                    pubAuthors.className = 'authors';
                    pubAuthors.textContent = pub.authors;
                    
                    const pubJournal = document.createElement('p');
                    pubJournal.className = 'journal';
                    pubJournal.textContent = pub.journal;
                    
                    pubContent.appendChild(pubTitle);
                    pubContent.appendChild(pubAuthors);
                    pubContent.appendChild(pubJournal);
                    
                    if (pub.pages) {
                        const pubPages = document.createElement('p');
                        pubPages.className = 'pages';
                        pubPages.textContent = pub.pages;
                        pubContent.appendChild(pubPages);
                    }
                    
                    if (pub.doi || pub.pdf) {
                        const pubLinks = document.createElement('div');
                        pubLinks.className = 'pub-links';
                        
                        if (pub.pdf) {
                            const pdfLink = document.createElement('a');
                            pdfLink.href = pub.pdf;
                            pdfLink.className = 'pub-link';
                            pdfLink.innerHTML = '<i class="fas fa-file-pdf"></i> PDF';
                            pubLinks.appendChild(pdfLink);
                        }
                        
                        if (pub.doi) {
                            const doiLink = document.createElement('a');
                            doiLink.href = pub.doi;
                            doiLink.className = 'pub-link';
                            doiLink.innerHTML = '<i class="fas fa-external-link-alt"></i> DOI';
                            pubLinks.appendChild(doiLink);
                        }
                        
                        pubContent.appendChild(pubLinks);
                    }
                    
                    pubItem.appendChild(pubYear);
                    pubItem.appendChild(pubContent);
                    
                    publicationsGrid.appendChild(pubItem);
                });
            }
        });
    }
}

// Setup publication filter buttons
function setupPublicationFilters() {
    const filterButtons = document.querySelectorAll('.publication-filters .filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Display filtered publications
                displayPublications(filter);
            });
        });
    }
}

// Load innovations from innovations.js
function loadInnovations() {
    const innovationsContainer = document.querySelector('.innovations-grid');
    
    if (innovationsContainer && typeof labInnovations !== 'undefined') {
        // Clear existing content
        innovationsContainer.innerHTML = '';
        
        // Add each innovation
        labInnovations.forEach(item => {
            const innovationItem = document.createElement('div');
            innovationItem.className = 'innovation-item';
            
            const innovationHeader = document.createElement('div');
            innovationHeader.className = 'innovation-header';
            
            const innovationTitle = document.createElement('h3');
            innovationTitle.textContent = item.title;
            
            const innovationStatus = document.createElement('span');
            innovationStatus.className = 'innovation-status';
            innovationStatus.textContent = item.status;
            innovationStatus.classList.add(item.status.toLowerCase().replace(' ', '-'));
            
            innovationHeader.appendChild(innovationTitle);
            innovationHeader.appendChild(innovationStatus);
            
            const innovationDescription = document.createElement('p');
            innovationDescription.className = 'innovation-description';
            innovationDescription.textContent = item.description;
            
            const innovationTags = document.createElement('div');
            innovationTags.className = 'innovation-tags';
            
            // Add technology tags
            item.technologies.forEach(tech => {
                const techTag = document.createElement('span');
                techTag.className = 'innovation-tag';
                techTag.textContent = tech;
                innovationTags.appendChild(techTag);
            });
            
            // Add year
            const yearTag = document.createElement('span');
            yearTag.className = 'innovation-year';
            yearTag.textContent = item.year;
            innovationTags.appendChild(yearTag);
            
            innovationItem.appendChild(innovationHeader);
            innovationItem.appendChild(innovationDescription);
            innovationItem.appendChild(innovationTags);
            
            innovationsContainer.appendChild(innovationItem);
        });
    }
}

// Simplify news display
function simplifyNews() {
    const newsItems = document.querySelectorAll('.news-item');
    
    if (newsItems.length > 0) {
        newsItems.forEach(item => {
            // Remove hover effects
            item.style.transition = 'none';
            
            // Simplify the design
            item.classList.add('simple-news');
            
            // Make date more prominent
            const dateElement = item.querySelector('.news-date');
            if (dateElement) {
                dateElement.classList.add('simple-date');
            }
        });
    }
} 