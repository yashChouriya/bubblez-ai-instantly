module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: ";",
      },
      my_target: {
        files: {
          "dest/embed.js": [
            "./src/styles.js",
            "./src/actions.js",
            "./src/flows/active-or-pause-campaign.js",
            "./src/flows/export-campaign-file.js",
            "./src/flows/open-campaign-analytics.js",
            "./src/flows/update-campaign-name.js",
            "./src/flows/add-new-campaign.js",
            "./src/flows/forgot-password-request.js",
            "./src/flows/open-campaign-leads.js",
            "./src/flows/update-users-email.js",
            "./src/flows/add-new-member-in-workspace.js",
            "./src/flows/get-shareable-campaign-link.js",
            "./src/flows/open-campaign-options.js",
            "./src/flows/update-users-name.js",
            "./src/flows/connect-imap-or-smtp-email-account.js",
            "./src/flows/open-campaign-schedule.js",
            "./src/flows/update-users-password.js",
            "./src/flows/delete-campaign.js",
            "./src/flows/login.js",
            "./src/flows/open-campaign-sequences.js",
            "./src/flows/update-workspace-name.js",
            "./src/flows/download-campaign-analytics.js",
            "./src/flows/logout.js",
            "./src/flows/open-email-setting.js",
            "./src/flows/duplicate-campaign.js",
            "./src/flows/navigate-to-side-menu.js",
            "./src/flows/sign-up.js",
            "./src/flows/enable-or-disable-email-warmup.js",
            "./src/flows/open-billings-page.js",
            "./src/flows/start-product-tour.js",
            "./src/flow_mappings.js",
            "./src/index.js",
          ],
        },
      },
    },
  });
  grunt.loadNpmTasks("grunt-contrib-concat");
  // Other task configurations

  // Register default task(s) or create custom tasks
  grunt.registerTask("default", ["concat"]);
};
