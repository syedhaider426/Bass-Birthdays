module.exports = {
  ScrollToTableTop: () => {
    document.getElementById("table").scrollIntoView({ behavior: "smooth" });
  },

  ScrollToNavbarTop: () => {
    document.getElementById("navbar").scrollIntoView({ behavior: "smooth" });
  }
};
