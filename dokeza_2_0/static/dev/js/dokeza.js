/* Place your project specific JS here. */

const annotTabs = $("#annot_tabs");
const allAnnots = $("#all__annots");
const myAnnots = $("#my__annots");
const allAnnotsList = $("#annots-all");
const myAnnotsList = $("#annots-my");
const annotationControl = $(".annotation-control");

allAnnots.click(() => {
  annotTabs.addClass("annotation__tabs--all");
  annotTabs.removeClass("annotation__tabs--my");
  allAnnots.addClass("annots__header--active");
  myAnnots.removeClass("annots__header--mine");
  allAnnotsList.show();
  myAnnotsList.hide();
});

myAnnots.click(() => {
  annotTabs.removeClass("annotation__tabs--all");
  annotTabs.addClass("annotation__tabs--my");
  myAnnots.addClass("annots__header--mine");
  allAnnots.removeClass("annots__header--active");
  myAnnotsList.show();
  allAnnotsList.hide();
});

const anIcon = $("#an_icon");
const annotPanel = $(".dz-annotations");

anIcon.click(() => {
  anIcon.toggleClass("annot_icon-active");
  annotPanel.toggleClass("annot_panel-active");
  annotationControl.toggleClass("annotation-control_active");
});

const navToggle = $(".navbar-toggler");
const navDropdown = $("#navbarSupportedContent");
navToggle.click(() => {
  navDropdown.slideToggle(300);
});
