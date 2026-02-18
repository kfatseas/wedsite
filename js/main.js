/* ============================================
   WEDDING WEBSITE - MAIN JAVASCRIPT
   Animations, Interactions & Raccoon Surprises 🦝
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- PAGE LOADER ----
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('loaded'), 1800);
  }

  // ---- NAVBAR ----
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect on navbar
  const handleNavScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
  }

  // Close nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle?.classList.remove('active');
    });
  });

  // ---- HERO PARALLAX ----
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
    });
  }

  // ---- HERO PARTICLES ----
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particleContainer.appendChild(particle);
    }
  }

  // ---- COUNTDOWN TIMER ----
  const countdownElements = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds')
  };

  if (countdownElements.days) {
    // Set your wedding date here!
    const weddingDate = new Date('2027-09-04T16:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) {
        countdownElements.days.textContent = '0';
        countdownElements.hours.textContent = '0';
        countdownElements.minutes.textContent = '0';
        countdownElements.seconds.textContent = '0';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Animate number changes
      animateNumber(countdownElements.days, days);
      animateNumber(countdownElements.hours, hours);
      animateNumber(countdownElements.minutes, minutes);
      animateNumber(countdownElements.seconds, seconds);
    };

    const animateNumber = (element, newValue) => {
      if (element.textContent !== String(newValue)) {
        element.style.transform = 'translateY(-10px)';
        element.style.opacity = '0';
        setTimeout(() => {
          element.textContent = newValue;
          element.style.transform = 'translateY(10px)';
          setTimeout(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
          }, 50);
        }, 150);
      }
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ---- SCROLL REVEAL ANIMATIONS ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children, .timeline-item');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- SMOOTH ANCHOR SCROLLING ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- ITINERARY TABS ----
  const tabs = document.querySelectorAll('.itinerary-tab');
  const tabContents = document.querySelectorAll('.itinerary-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabContents.forEach(content => {
        content.style.display = 'none';
        content.querySelectorAll('.timeline-item').forEach(item => {
          item.classList.remove('visible');
        });
      });

      const activeContent = document.getElementById(target);
      if (activeContent) {
        activeContent.style.display = 'block';
        // Re-trigger animations
        setTimeout(() => {
          activeContent.querySelectorAll('.timeline-item').forEach((item, index) => {
            setTimeout(() => item.classList.add('visible'), index * 150);
          });
        }, 100);
      }
    });
  });

  // ============================================
  //  🦝 RACCOON EASTER EGGS & FUN STUFF 🦝
  // ============================================

  // ---- RACCOON PEEK FROM CORNER ----
  const raccoonPeek = document.createElement('div');
  raccoonPeek.classList.add('raccoon-peek');
  raccoonPeek.innerHTML = '🦝';
  raccoonPeek.title = 'Click me! 🦝';
  document.body.appendChild(raccoonPeek);

  let peekTimeout;
  const triggerPeek = () => {
    raccoonPeek.classList.add('peeking');
    clearTimeout(peekTimeout);
    peekTimeout = setTimeout(() => {
      raccoonPeek.classList.remove('peeking');
    }, 5000);
  };

  // Raccoon peeks when you scroll to certain points
  let lastScrollY = 0;
  let peekThreshold = window.innerHeight;
  window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollY - lastScrollY) > peekThreshold) {
      triggerPeek();
      lastScrollY = window.scrollY;
      peekThreshold = window.innerHeight * (1 + Math.random() * 1.5);
    }
  });

  // Click the raccoon for a surprise
  let raccoonClicks = 0;
  raccoonPeek.addEventListener('click', () => {
    raccoonClicks++;
    
    const messages = [
      "🦝 *munches on wedding cake*",
      "🦝 Did someone say open bar?",
      "🦝 I'm the ring bearer!",
      "🦝 Best. Wedding. Ever.",
      "🦝 Is this seat taken?",
      "🦝 I object! Just kidding 💕",
      "🦝 *steals bouquet*",
      "🦝 Save me a dance!",
      "🦝 Kythera? More like Ky-THERE-a raccoon!",
    ];

    const tooltip = document.createElement('div');
    tooltip.classList.add('raccoon-tooltip');
    tooltip.textContent = messages[raccoonClicks % messages.length];
    tooltip.style.position = 'fixed';
    tooltip.style.bottom = '60px';
    tooltip.style.right = '20px';
    document.body.appendChild(tooltip);

    setTimeout(() => tooltip.classList.add('show'), 10);
    setTimeout(() => {
      tooltip.classList.remove('show');
      setTimeout(() => tooltip.remove(), 300);
    }, 2500);

    // After 5 clicks, show a secret hint
    if (raccoonClicks >= 5 && !hintShown) {
      showRaccoonHint('Psst! There are raccoons hiding in the text too... look for the dotted underlines! 👀');
      hintShown = true;
    }
  });

  // ---- RACCOON HINT SYSTEM ----
  let hintShown = false;
  
  const showRaccoonHint = (message) => {
    const banner = document.createElement('div');
    banner.classList.add('raccoon-hint-banner');
    banner.innerHTML = `🦝 ${message}`;
    document.body.appendChild(banner);
    
    setTimeout(() => banner.classList.add('show'), 100);
    
    banner.addEventListener('click', () => {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500);
    });
    
    setTimeout(() => {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500);
    }, 6000);
  };

  // ---- RACCOON COUNTER (always visible!) ----
  let raccoonsFound = 0;
  const raccoonHiddenEls = document.querySelectorAll('.raccoon-hidden');
  const totalRaccoons = raccoonHiddenEls.length;

  const raccoonCounter = document.createElement('div');
  raccoonCounter.classList.add('raccoon-counter');
  raccoonCounter.innerHTML = `🦝 <span id="raccoon-count">0</span>/${totalRaccoons} found`;
  document.body.appendChild(raccoonCounter);

  // Show the counter right away after a short delay
  setTimeout(() => {
    raccoonCounter.classList.add('show');
  }, 3000);

  const updateRaccoonCount = () => {
    const countEl = document.getElementById('raccoon-count');
    if (countEl) {
      countEl.textContent = raccoonsFound;
    }
    if (raccoonsFound >= totalRaccoons) {
      raccoonCounter.innerHTML = '🦝 You found them all! 🎉';
      celebrateRaccoons();
    }
  };

  // Hidden raccoon clickables
  raccoonHiddenEls.forEach(el => {
    el.addEventListener('click', (e) => {
      if (!el.classList.contains('found')) {
        el.classList.add('found');
        raccoonsFound++;
        updateRaccoonCount();
        
        // Big satisfying raccoon pop at click location
        const rect = el.getBoundingClientRect();
        const pop = document.createElement('span');
        pop.textContent = '🦝';
        pop.style.cssText = `
          position: fixed;
          top: ${rect.top - 30}px;
          left: ${rect.left + rect.width / 2 - 25}px;
          font-size: 3.5rem;
          pointer-events: none;
          z-index: 10000;
          animation: raccoonPop 0.8s ease forwards;
        `;
        document.body.appendChild(pop);
        setTimeout(() => pop.remove(), 900);

        // Show encouraging message
        const encouragements = [
          `Nice find! ${raccoonsFound}/${totalRaccoons} 🎉`,
          `You spotted one! ${raccoonsFound}/${totalRaccoons} 👀`,
          `Sneaky raccoon caught! ${raccoonsFound}/${totalRaccoons} 🦝`,
          `Got 'em! ${raccoonsFound}/${totalRaccoons} ✨`,
          `Raccoon wrangler! ${raccoonsFound}/${totalRaccoons} 🏆`,
        ];
        showRaccoonHint(encouragements[Math.floor(Math.random() * encouragements.length)]);

        // Burst of mini emojis around the click
        for (let i = 0; i < 8; i++) {
          const spark = document.createElement('span');
          spark.textContent = ['✨', '💛', '⭐', '🌟', '🐾'][Math.floor(Math.random() * 5)];
          const angle = (i / 8) * Math.PI * 2;
          const distance = 60 + Math.random() * 30;
          spark.style.cssText = `
            position: fixed;
            top: ${rect.top}px;
            left: ${rect.left + rect.width / 2}px;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            opacity: 1;
          `;
          document.body.appendChild(spark);
          
          requestAnimationFrame(() => {
            spark.style.top = (rect.top + Math.sin(angle) * distance) + 'px';
            spark.style.left = (rect.left + rect.width / 2 + Math.cos(angle) * distance) + 'px';
            spark.style.opacity = '0';
            spark.style.transform = 'scale(0.3)';
          });
          
          setTimeout(() => spark.remove(), 700);
        }
      }
    });
  });

  // ---- RACCOON CELEBRATION ----
  const celebrateRaccoons = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const raccoon = document.createElement('div');
        raccoon.textContent = '🦝';
        raccoon.style.cssText = `
          position: fixed;
          top: -50px;
          left: ${Math.random() * 100}%;
          font-size: ${Math.random() * 30 + 20}px;
          pointer-events: none;
          z-index: 10000;
          animation: raccoonRain ${Math.random() * 2 + 2}s linear forwards;
        `;
        document.body.appendChild(raccoon);
        setTimeout(() => raccoon.remove(), 4000);
      }, i * 150);
    }

    // Add the rain animation dynamically
    if (!document.getElementById('raccoon-rain-style')) {
      const style = document.createElement('style');
      style.id = 'raccoon-rain-style';
      style.textContent = `
        @keyframes raccoonRain {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // ---- RACCOON FOOTPRINT TRAIL ----
  let footprintCount = 0;
  const maxFootprints = 8;
  let lastFootprintTime = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastFootprintTime < 400) return; // Throttle
    
    // Show footprints more often (1 in 8 chance per qualified move)
    if (Math.random() > 0.12) return;

    lastFootprintTime = now;
    footprintCount++;

    if (footprintCount > maxFootprints) return;

    const footprint = document.createElement('div');
    footprint.classList.add('raccoon-footprint');
    footprint.textContent = '🐾';
    footprint.style.left = (e.clientX + 10 + Math.random() * 20) + 'px';
    footprint.style.top = (e.clientY + 10 + Math.random() * 20) + 'px';
    footprint.style.fontSize = (12 + Math.random() * 6) + 'px';
    document.body.appendChild(footprint);

    setTimeout(() => footprint.classList.add('show'), 10);
    setTimeout(() => {
      footprint.remove();
      footprintCount--;
    }, 3500);
  });

  // ---- PARALLAX SCROLL EFFECTS ----
  const parallaxDividers = document.querySelectorAll('.parallax-bg');
  window.addEventListener('scroll', () => {
    parallaxDividers.forEach(bg => {
      const rect = bg.parentElement.getBoundingClientRect();
      const speed = 0.3;
      bg.style.transform = `translateY(${rect.top * speed}px)`;
    });
  });

  // ---- IMAGE HOVER TILT EFFECT ----
  document.querySelectorAll('.story-image-wrapper, .photo-grid-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  // ---- KONAMI CODE RACCOON ----
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        celebrateRaccoons();
        
        // Change cursor to raccoon temporarily
        document.body.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><text y=\'28\' font-size=\'28\'>🦝</text></svg>"), auto';
        setTimeout(() => {
          document.body.style.cursor = 'default';
        }, 5000);
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ---- ACTIVE NAV LINK HIGHLIGHTING ----
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length > 0 && navLinksAll.length > 0) {
    const activateNav = () => {
      const scrollPos = window.scrollY + 200;
      
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
          navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', activateNav);
  }

  // ---- TYPEWRITER EFFECT FOR HERO ----
  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl) {
    const text = typewriterEl.dataset.text || typewriterEl.textContent;
    typewriterEl.textContent = '';
    typewriterEl.style.borderRight = '2px solid var(--color-accent-light)';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      typewriterEl.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          typewriterEl.style.borderRight = 'none';
        }, 1000);
      }
    }, 80);
  }

  // ---- PAGE TRANSITION FOR INTERNAL LINKS ----
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        pageTransition.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    });
  }

  // ---- INITIAL RACCOON PEEK (quick! so people notice) ----
  setTimeout(() => {
    triggerPeek();
  }, 2500);

  // Show a hint after 8 seconds if no raccoons found yet
  setTimeout(() => {
    if (raccoonsFound === 0) {
      showRaccoonHint('Psst! Can you find all the raccoons hiding on this page? Look for dotted underlines and 🦝 emojis!');
    }
  }, 8000);

  // ---- CONSOLE RACCOON ----
  console.log('%c 🦝 ', 'font-size: 40px');
  console.log(
    '%cA raccoon has infiltrated this wedding website!\nFind all hidden raccoons for a surprise! 🎉',
    'font-family: Georgia, serif; font-size: 14px; color: #c9a96e; padding: 10px;'
  );

});
