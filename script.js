// JavaScript para funcionalidades interativas
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animar hamburger menu
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.product-card, .podcast-card, .partnership-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animação sequencial para produtos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Copiar código do cupom ao clicar
    document.querySelectorAll('.coupon-code').forEach(coupon => {
        coupon.addEventListener('click', function() {
            navigator.clipboard.writeText(this.textContent).then(function() {
                // Feedback visual
                const originalBackground = coupon.style.background;
                const originalTransform = coupon.style.transform;
                
                coupon.style.background = '#22c55e';
                coupon.style.transform = 'scale(1.05)';
                
                // Adicionar texto de feedback temporário
                const originalText = coupon.textContent;
                coupon.textContent = 'COPIADO!';
                
                setTimeout(() => {
                    coupon.style.background = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
                    coupon.style.transform = 'scale(1)';
                    coupon.textContent = originalText;
                }, 1500);
            }).catch(function() {
                // Fallback para navegadores que não suportam clipboard API
                console.log('Não foi possível copiar o cupom');
            });
        });
        
        // Adicionar cursor pointer e tooltip
        coupon.style.cursor = 'pointer';
        coupon.title = 'Clique para copiar o cupom';
    });

    // Parallax effect para hero
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Efeito hover nos cards de produto
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // Efeito de loading para botões
    document.querySelectorAll('.product-btn, .partnership-btn, .btn-youtube, .whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Adicionar animação de loading se for um link externo
            if (this.href && this.href !== '#') {
                const originalText = this.textContent;
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                
                // Criar elemento de loading
                const loader = document.createElement('div');
                loader.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: loading 1s ease-in-out;
                `;
                
                this.appendChild(loader);
                
                setTimeout(() => {
                    if (this.contains(loader)) {
                        this.removeChild(loader);
                    }
                }, 1000);
            }
        });
    });

    // Contador animado para seção hero
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Efeito de digitação para título hero
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Aplicar efeito de digitação no título se desejar
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }

    // Scroll reveal animation
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);

    // Adicionar classe reveal aos elementos que devem ser animados
    document.querySelectorAll('.section-title, .about-description, .youtube-text, .partnership-text').forEach(el => {
        el.classList.add('reveal');
    });

    // Preloader (opcional)
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Analytics tracking para clicks (substitua pelos seus códigos de tracking)
    function trackClick(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    }

    // Track clicks nos produtos
    document.querySelectorAll('.product-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            trackClick('Product', 'click', productName);
        });
    });

    // Track clicks no YouTube
    document.querySelector('.btn-youtube')?.addEventListener('click', function() {
        trackClick('Social', 'youtube_click', 'Subscribe Button');
    });

    // Track clicks no WhatsApp
    document.querySelector('.whatsapp-btn')?.addEventListener('click', function() {
        trackClick('Contact', 'whatsapp_click', 'Podcast Contact');
    });

    console.log('Orlando Costa Website - Script carregado com sucesso! 🚀');
});