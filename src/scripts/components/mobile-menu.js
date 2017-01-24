import "babel-polyfill";
import $ from "../libs/jquery";
import as from "../libs/as";

class MobileMenu extends as.View {
    constructor(el){
        super(el);
        if (location.hash.length > 0) {
            this.navigate($(location.hash));
        }

        this.addListener("click", ".menu-toggle", this.toggleMenu);
        this.addListener("click", ".main-navigation-link", this.locationClicked);
        this.addListener("click", ".logo", this.locationClicked);
    }

    toggleMenu() {
        if (window.innerWidth < 1024) {
            this.el.toggleClass("menu-active");
        }
    }

    locationClicked(e) {
        e.preventDefault();
        const target = $(e.currentTarget).attr("href");
        this.navigate($(target));
        if (!$(e.currentTarget).hasClass("logo")){
            this.toggleMenu();
        }
    }

    navigate(target) {
        var offset = target.offset().top - 64;
        if (window.innerWidth <= 1024 && window.innerWidth > 540) { 
            offset = target.offset().top - 124;
        }
        if (window.innerWidth <= 540) { 
            offset = target.offset().top - 100;
        }
        $('html, body').animate({
          scrollTop: offset
        }, 1000);
    }

    static init(selector = ".header", base = $("body")) {
        base.find(selector).each((i, el) => {
            new MobileMenu($(el));
        });
    }
}

export default MobileMenu;