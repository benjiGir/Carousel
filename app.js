class Carousel {
    constructor (visible){
        this.visible = visible;
        this.currentItem = 0;
        this.container = document.querySelector('.carousel_container');
        this.items = [].slice.call(this.container.children);
        this.indicators = document.querySelector('.indicators');
        this.buttons = [];
        this.next = document.querySelector(".carousel_next");
        this.prev = document.querySelector(".carousel_prev");
        this.setStyle();
        this.createPagination(this.items.length);
        
        this.next.addEventListener("click", (e) => {
            e.preventDefault()
            this.next()
        });
        
        this.prev.addEventListener("click", (e) => {
            e.preventDefault()
            this.previous()
        });
    }

    setStyle() {
        
        let ratio = this.items.length / this.visible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach((item) => item.style.width = ((100 / this.visible) / ratio) + "%");
    }

    next() {
        this.goToItem(this.currentItem + 1);
    }

    previous() {
        this.goToItem(this.currentItem - 1);
    }

    goToItem(index) {
        if (index < 0) {
            index = this.items.length - this.visible;
        }
        else if (index >= this.items.length || ((this.items[this.currentItem + this.visible] === undefined) && index > this.currentItem)) {
            index = 0;
        }
        let translasteX = index * -100 / this.items.length;
        this.container.style.transform = 'translate3d(' + translasteX + '%, 0, 0)';
        let activeButton = this.buttons[Math.floor(index / this.visible)];
        if (activeButton) {
            this.buttons.forEach(button => button.classList.remove('indicator_active'));
            activeButton.classList.add('indicator_active');
        }
        this.currentItem = index;

    }

    createPagination(numberSlide) {
        for (let i = 0 ; i < numberSlide ; i++) {
            let button = document.createElement("div");
            button.classList.add("indicator");
            button.addEventListener('click', () => this.goToItem(i));
            this.indicators.appendChild(button);
            this.buttons.push(button);
        };
        this.buttons[0].classList.add('indicator_active');
    }

}

const carousel = new Carousel(1);


