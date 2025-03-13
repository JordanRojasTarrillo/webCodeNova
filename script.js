// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 50,
        delay: 50
    });

    // Preloader
    setTimeout(function() {
        if (document.querySelector('.preloader')) {
            document.querySelector('.preloader').classList.add('fade-out');
        }
    }, 1000);

    // Cambiar estilo del navbar al hacer scroll
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajuste para el navbar fijo
                    behavior: 'smooth'
                });
            }
            
            // Cerrar el menú móvil si está abierto
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Contador de estadísticas (animación de números)
    function animateCounters() {
        const counters = document.querySelectorAll('.fw-bold.text-primary');
        const speed = 200;

        counters.forEach(counter => {
            const target = +counter.innerText.replace('+', '');
            let count = 0;
            const increment = target / speed;
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count) + '+';
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target + '+';
                }
            };
            
            updateCount();
        });
    }

    // Activar contador cuando la sección sea visible
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Efecto de typing para el texto del hero
    function typeEffect(element, text, speed) {
        let i = 0;
        element.innerHTML = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.innerText;
        setTimeout(() => {
            typeEffect(heroTitle, originalText, 100);
        }, 1000);
    }

    // Efecto de hover 3D para las tarjetas de servicios
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = ((y - rect.height / 2) / 10) * -1;
            const yRotation = (x - rect.width / 2) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Validación del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar el formulario
            // Por ahora, solo mostraremos un mensaje de éxito
            
            const formElements = contactForm.elements;
            let isValid = true;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    isValid = false;
                    formElements[i].classList.add('is-invalid');
                } else {
                    formElements[i].classList.remove('is-invalid');
                }
            }
            
            if (isValid) {
                // Crear un elemento para mostrar el mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
                
                // Insertar el mensaje después del formulario
                contactForm.parentNode.appendChild(successMessage);
                
                // Resetear el formulario
                contactForm.reset();
                
                // Eliminar el mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Añadir efecto de parallax al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax para el hero
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Añadir animación a los elementos cuando entran en el viewport
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                animateObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        animateObserver.observe(element);
    });

    // Añadir efecto de zoom a las imágenes del portafolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.portfolio-info').style.opacity = '1';
            this.querySelector('.portfolio-info').style.bottom = '0';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.portfolio-info').style.opacity = '0';
            this.querySelector('.portfolio-info').style.bottom = '-80px';
        });
    });

    // Añadir efecto de hover a los enlaces sociales
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Añadir un botón de "volver arriba"
    const body = document.querySelector('body');
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.width = '40px';
    scrollToTopBtn.style.height = '40px';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.backgroundColor = 'var(--primary-color)';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.justifyContent = 'center';
    scrollToTopBtn.style.alignItems = 'center';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.zIndex = '999';
    scrollToTopBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    scrollToTopBtn.style.transition = 'all 0.3s ease';
    
    body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Añadir preloader a la página
    if (!document.querySelector('.preloader')) {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<div class="spinner"></div>';
        document.body.prepend(preloader);
        
        // Ocultar preloader cuando la página esté cargada
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Añadir efecto de cambio de color al navbar cuando pasa por diferentes secciones
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Añadir efecto de contador para los números en la sección "Sobre Nosotros"
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializar popovers de Bootstrap
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});


