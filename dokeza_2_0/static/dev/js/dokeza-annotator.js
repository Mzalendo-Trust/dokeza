/* This is for Annotator 1.2.10 library */

// jQuery(function ($) {
//     $('#content').annotator().annotator('setupPlugins');
// });

(function() {
  /* Version 1  -- according to the documents */
  const content = $("#content").annotator();

  content
    .annotator("addPlugin", "Auth", {
      tokenUrl: `${window.location.origin}/api/auth/token/`
    })
    .annotator("addPlugin", "Store", {
      // The endpoint of the store on your server.
      prefix: `${window.location.origin}/annotations`,
      urls: {
        read: "/",
        create: "/create/",
        update: "/update/:id/",
        destroy: "/delete/:id/",
        search: "/search/"
      },
      annotationData: {
        uri: window.location.href
      }
    })
    .annotator("addPlugin", "Tags");

  const annotator = $("#content")
    .annotator()
    .data("annotator");

  annotator.addPlugin("Permissions", {
    permissions: {
      read: ["group:__world__"],
      update: [],
      delete: [],
      admin: []
    },
    showViewPermissionsCheckbox: true,
    showEditPermissionsCheckbox: false
    // userAuthorize: function(action, annotation, user) {
    //   var token, tokens, _i, _len;
    //   # Fine-grained custom authorization
    //   if (annotation.permissions) {
    //     tokens = annotation.permissions[action] || [];
    //     # Empty or missing tokens array so anyone can perform action
    //     if (tokens.length === 0) {
    //       return true;
    //     }
    //     for (_i = 0, _len = tokens.length; _i < _len; _i++) {
    //       token = tokens[_i];
    //       if (this.userId(user) === token) {
    //         return true;
    //       }
    //     }
    //     # No tokens matched, action should not be perfomed.
    //     return false;
    //   # Coarse-grained authorization
    //   } else if (annotation.user) {
    //     if (user) {
    //      # If @user is set, and the annotation belongs to @user, allow.
    //       return this.userId(user) === this.userId(annotation.user);
    //     } else {
    //       return false;
    //   } }
    //   # No authorization info on annotation: free-for-all!
    //   return true;
    // },
  });

  /* Repo */

  // Setup the annotator on the page.
  // var app = $('#content').annotator();
  // app.include(annotator.identity.simple);
  // app.include(annotator.storage.http, {
  //   prefix: window.location.origin,
  // });
  // app.include(function() {
  //   return {
  //     beforeAnnotationCreated: function(annotation) {
  //       annotation.uri = window.location.href;
  //     }
  //   }
  // });
  // app.start().then(function() {
  //   app.annotations.load({
  //     uri: window.location.href
  //   });
  // });
})();

/* Plugin for adding likes onto an annotation */
// a_likes.click(function(){
//   var url = store_url + '/annotations/' + a.id + '/likes',
//     data = { like: { user: { id: user.id, name: user.name } }};
//   $.ajax({
//     url: url,
//     data: data,
//     type: 'POST'
//   })

// Plugin_01: We need to add a plugin that checks if the user is logged in and if not,
// on highlighting the text to annotate, the button should show the login link.
