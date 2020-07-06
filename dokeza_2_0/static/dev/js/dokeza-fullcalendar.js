(function() {
  $(".dz-events__calender").fullCalendar({
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,listWeek"
    },
    editable: false,
    navLinks: true,
    eventLimit: true,
    events: {
      url: "/api/public-participation/events"
    },
    loading(bool) {
      $(".dz-events__loading").toggle(bool);
    }
  });
})();
