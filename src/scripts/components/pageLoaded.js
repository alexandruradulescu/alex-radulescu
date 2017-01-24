import "babel-polyfill";
import $ from "../libs/jquery";
import as from "../libs/as";

class PageLoaded extends as.View {
    constructor(el){
        super(el);
        this.el.removeClass("is-loading");
        this.$(".loader-container").addClass("is-loaded");
        setTimeout(function() {
            $(".loader-container").remove();
            $("body").addClass("is-loaded");
        }, 1000);
    }


    static init(selector = "body") {
        new PageLoaded($(selector));
    }
}

export default PageLoaded;