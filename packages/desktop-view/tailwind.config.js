const {parentModule} = require("./index");
const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,tsx}",
    parentModule.contentPath + "/src/**/*.{html,js,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

