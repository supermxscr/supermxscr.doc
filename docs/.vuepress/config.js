module.exports = {
  theme:"antdocs",
  title: "superM",
  description: "Don't say so much.",
  base: "/",
  head: [
    ["link",{ rel: "icon",href: "/assets/logo.png" }]
  ],
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    smoothScroll: true,
    nav: require("./config/nav"),
    sidebar: require("./config/sidebar"),
    lastUpdated: "Last Updated",
    // repo: "https://github.com/zpfz/vuepress-creator",
    editLinks: false,
  },
};