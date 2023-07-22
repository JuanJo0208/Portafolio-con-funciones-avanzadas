/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('sidebar'),
      navToggle = document.getElementById('nav-toggle'),
      navclose = document.getElementById('nav-close')

/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */
if(navToggle)   {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-sidebar')
    })
}

/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */
if(navclose)   {
    navclose.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar')
    })
}


/*=============== SKILLS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContent = document.querySelectorAll('[data-content]')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.target)

            tabContent.forEach(tabContents => {
                tabContents.classList.remove('skills__active')
            });

            target.classList.add('skills__active');
            
            
            tabs.forEach(tab => {
                tab.classList.remove('skills__active')
            });

            tab.classList.add('skills__active');
        });
    });


/*=============== MIXITUP FILTER PORTFOLIO ===============*/
var mixerPortafolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/*===== Link Active Work =====*/
const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
    linkWork.forEach(l=> l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l=> l.addEventListener("click", activeWork))


/*===== Work Popup =====*/
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("work__button")){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement)
    }
})

function togglePortfolioPopup() {
    document.querySelector(".portfolio__popup").classList.toggle("open");
}

document.querySelector(".portfolio__popup-close").addEventListener("click", togglePortfolioPopup);

function portfolioItemDetails(portfolioItem){
    document.querySelector(".pp__thumbnail img").src = portfolioItem.querySelector(".work__img").src;
    document.querySelector(".portfolio__popup-subtitle span").innerHTML = portfolioItem.querySelector(".work__title").innerHTML;
    document.querySelector(".portfolio__popup-body").innerHTML = portfolioItem.querySelector(".portafolio__item-details").innerHTML;
}

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach( (modalBtn, i) => {
    modalBtn.addEventListener("click", () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click",() => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*=============== SWIPER TESTIMONIAL ===============*/
let swiper = new Swiper(".testimonial__container", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },

  });

/*=============== INPUT ANIMATION ===============*/
const inputs = document.querySelectorAll(".input");

function focusFunc(){
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunction() {
    let parent = this.parentNode;
    if(this.value == ""){
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur",  blurFunction);
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


/*=============== SHOW SCROLL UP ===============*/
// Obtener todas las secciones que tiene una id definida
const sections = document.querySelectorAll("section[id]")

// Añadir un escuchador de evento de scroll
window.addEventListener("scroll", navHighLighter);

function navHighLighter() 
{
    // Obtener la actual posicion de scroll
    let scrollY = window.pageYOffset;
    // Ahora iteramos cada seccion y obtner su id su alto y su medida de cada una
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute("id");

        // - Ahora si el scroll actual entra en el espacio de la seccion actual añadimos la clase .active al correspondiente nav link si no lo removemnos
        // - Para conocer que link necesita añadir la clase, usamos la variable sectionId y lo comparños con la navegacion para añadirle la clase
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        {
            document.querySelector('.nav__item a[href*=' + sectionId + ']').classList.add("active-link")
        }
        else{
            document.querySelector('.nav__item a[href*=' + sectionId + ']').classList.remove("active-link")
        }
    })
}



/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
    e.preventDefault()

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_j6rdpjj', 'template_axsy375', '#contact-form', '3Tp9oT6ifq_tosFJ1')
        .then(() => {
            // Mostrar mensaje enviado
            contactMessage.textContent = 'Mensaje Mandado Correctamente ✅'
            contactMessage.setAttribute("style", "background-color:#33999e;");

            // Remover el mensaje luego de 5 secundos
            setTimeout(() =>{
                contactMessage.textContent = ''
            }, 5000)

            // Limpiar los campos
            contactForm.reset()
        }, () =>{
            // Mostrar mensaje de error
            contactMessage.textContent = 'Mensaje no Enviado (service error) ❌'
            contactMessage.setAttribute("style", "background-color:#690b09;");
        })
}

contactForm.addEventListener('submit', sendEmail)
