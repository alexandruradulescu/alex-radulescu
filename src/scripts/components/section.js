import "babel-polyfill";
import $ from "../libs/jquery";
import as from "../libs/as";

class Section extends as.View {
    constructor(el){
        super(el);
        this.sectionContent = this.$(".section-content");
        this.isContentCenter();

        this.addListener("resize", "window", this.isContentCenter);
    }

    isContentCenter() {
        if (this.sectionContent.height() < window.innerHeight - 124) {
            this.sectionContent.addClass("is-centered");
        } else {
            this.sectionContent.removeClass("is-centered");
        }
    }

    static init(selector = ".section", base = $(".main-container")) {
        base.find(selector).each((i, el) => {
            new Section($(el));
        });
    }
}

export default Section;