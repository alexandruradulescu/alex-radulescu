import "babel-polyfill";
import as from "../libs/as";
import $ from "../libs/jquery";

class Popup extends as.View {
    constructor(el){
        super(el);
        this.popup = this.$(".popup");
        this.popupContent = this.$(".popup-content");

        this.addListener("click", ".popup-close", this.closePopup);
        this.addListener("click", ".popup-background", this.closePopup);
        this.addListener("click", ".popup-toggle", this.openPopup);
    }

    closePopup() {
        this.popup.removeClass("is-active");
        this.popupContent.html();
    }

    openPopup(e) {
        var data = $(e.currentTarget).find(".popup-data").html();
        this.popupContent.html(data);
        this.popup.addClass("is-active");
    }

    static init(selector = "body") {
        new Popup($(selector));
    }
}

export default Popup;