import "babel-polyfill";
import $ from "../libs/jquery";
import as from "../libs/as";

class ScrollSpy extends as.View {
    constructor(el){
        super(el);
        this.menuItems = this.$(".main-navigation-link");
        this.lastSection = this.$(".main-navigation-link[href=#contact]");
        this.sectionsList = this.menuItems.map(function(i, element){
            var item = $(element.getAttribute("href"));
            if (item.length) { 
                return item; 
            }
        });
        this.calculateTopBuffer();

        this.addListener("scroll", "window", this.onScroll);
        this.addListener("resize", "window", this.calculateTopBuffer);
    }

    calculateTopBuffer() {
        if (window.innerWidth < 540) {
            this.topBuffer = 101;
        } else if (window.innerWidth < 1024) {
            this.topBuffer = 125;
        } else {
            this.topBuffer = 65;
        }
    }

    onScroll() {
        const fromTop = window.pageYOffset + this.topBuffer;
        
        let currentScrollItem = this.sectionsList.map(function(i, element){
            if (element.offset().top < fromTop)
            return element;
        });
        currentScrollItem = currentScrollItem[currentScrollItem.length-1];
        
        const currentId = currentScrollItem && currentScrollItem.length ? currentScrollItem[0].id : "";
        if (this.lastId !== currentId) {
            this.menuItems.removeClass("is-active");
            if (currentId.length > 0) {
                this.lastId = currentId;
                this.menuItems.removeClass("is-active");
                $(".main-navigation-link[href=#"+currentId+"]").addClass("is-active");
            } else {
                this.lastId = "";
            }
        }
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            this.lastId = "";
            this.menuItems.removeClass("is-active");
            this.lastSection.addClass("is-active");
        }
    }

    static init(selector = "body") {
        new ScrollSpy($(selector));
    }
}

export default ScrollSpy;