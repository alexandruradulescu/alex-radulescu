import "babel-polyfill";
import $ from "./libs/jquery";
import MobileMenu from "./components/mobile-menu";
import Section from "./components/section";
import Accordion from "./components/accordion";
import ScrollSpy from "./components/scrollSpy";
import PageLoaded from "./components/pageLoaded";

$(() => {
    Section.init();
    MobileMenu.init();
    Accordion.init();
    ScrollSpy.init();
    PageLoaded.init();
});
