class Carousel {
    constructor (slideToScroll){
        this.slideToScroll = slideToScroll;
        this.currentItem = 0;
        this.container = document.querySelector('.carousel_container');
        this.slides = [].slice.call(this.container.children);
        this.indicators = document.querySelector('.indicators');
        this.buttons = [];
        this.next = document.querySelector(".carousel_next");
        this.prev = document.querySelector(".carousel_prev");
        this.setStyle();
        this.createPagination(this.slides.length);
        
        this.next.addEventListener("click", (e) => {
            e.preventDefault()
            this.nextSlide()
        });
        
        this.prev.addEventListener("click", (e) => {
            e.preventDefault()
            this.previousSlide()
        });
    }

    setStyle() {  
        let ratio = this.slides.length / this.slideToScroll;
        this.container.style.width = (ratio * 100) + "%";
        this.slides.forEach(item => item.style.width = ((100 / this.slideToScroll) / ratio) + "%");
    }

    nextSlide() {
        this.goToSlide(this.currentItem + 1);
    }

    previousSlide() {
        this.goToSlide(this.currentItem - 1);
    }

    goToSlide(index) {
        if (index < 0) {
            index = this.slides.length - this.slideToScroll;
        }
        else if (index >= this.slides.length || ((this.slides[this.currentItem + this.slideToScroll] === undefined) && index > this.currentItem)) {
            index = 0;
        }
        let translasteX = index * -100 / this.slides.length;
        this.container.style.transform = 'translate3d(' + translasteX + '%, 0, 0)';
        let activeButton = this.buttons[Math.floor(index / this.slideToScroll)];
        if (activeButton) {
            this.buttons.forEach(button => button.classList.remove('indicator_active'));
            activeButton.classList.add('indicator_active');
        }
        this.currentItem = index
    }

    createPagination(numberOfSlide) {
        for (let i = 0 ; i < numberOfSlide ; i++) {
            let button = document.createElement("div");
            button.classList.add("indicator");
            button.addEventListener('click', () => this.goToSlide(i));
            this.indicators.appendChild(button);
            this.buttons.push(button);
        };
        this.buttons[0].classList.add('indicator_active');
    }
}

const carousel = new Carousel(1);


