window.addEventListener("load", function () {
    document.querySelector(".preloader").classList.add("opacity-0");
    this.setTimeout(function () {
        document.querySelector(".preloader").style.display = "none";
    }, 1000)
})
const filterContainer = document.querySelector('.portfolio-filter'),
    filterBtns = filterContainer.children,
    portfolioitems = document.querySelectorAll(".portfolio-item"),
    totalPortfolioItems = portfolioitems.length;

for (let i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener('click', function () {
        filterContainer.querySelector('.active').classList.remove("active");
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');
        for (let k = 0; k < totalPortfolioItems; k++) {
            if (filterValue === portfolioitems[k].getAttribute("data-category")) {
                portfolioitems[k].classList.remove('hide');
                portfolioitems[k].classList.add('show');
            } else {
                portfolioitems[k].classList.remove('show');
                portfolioitems[k].classList.add('hide');
            } if (filterValue === 'all') {
                portfolioitems[k].classList.remove('hide');
                portfolioitems[k].classList.add('show');
            }
        }
    });
}


//Portfolio Lightbox
const lightbox = document.querySelector(".lightbox"),
    lightboxImg = lightbox.querySelector(".lightbox-img"),
    lightboxClose = lightbox.querySelector('.lightbox-close'),
    lightboxText = lightbox.querySelector(".caption-text"),
    lightboxCounter = lightbox.querySelector('.caption-counter');
let itemIndex = 0;

for (let i = 0; i < totalPortfolioItems; i++) {
    portfolioitems[i].addEventListener('click', function () {
        itemIndex = i;
        changeItem(i);
        toggleLightbox();
    });
}
function nextItem() {
    if (itemIndex === totalPortfolioItems - 1) {
        itemIndex = 0;
    } else {
        itemIndex++;
    }
    changeItem();
}
function prevItem() {
    if (itemIndex === 0) {
        itemIndex = totalPortfolioItems - 1;
    } else {
        itemIndex--;
    }
    changeItem();
}
function toggleLightbox() {
    lightbox.classList.toggle("open");
}

function changeItem() {
    imgSrc = portfolioitems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML = portfolioitems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML = (itemIndex + 1) + " of " + portfolioitems.length;
}
//close Lightbox
lightbox.addEventListener('click', function (event) {
    if (event.target === lightboxClose || event.target === lightbox) {
        toggleLightbox();
    }
})
//Aside Navbar
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        // remove back-section class
        removeBackSectionClass();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                // add back-section class
                addBackSectionClass(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })
}

function removeBackSectionClass() {
    for (let k = 0; k < totalSection; k++) {
        allSection[k].classList.remove("back-section")
    }
}
function addBackSectionClass(num) {
    allSection[num].classList.add("back-section");
}
function showSection(element) {
    // remove class .active from all sections
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector('#' + target).classList.add("active");
}

function updateNav(element) {
    for (i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}
document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");
    console.log(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackSectionClass();
    addBackSectionClass(sectionIndex);
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", asideSectionTogglerBtn);;

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}
