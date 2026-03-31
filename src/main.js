import Vue from "vue";
import App from "./App.vue";
import "./styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

library.add(faFileLines);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.directive("reveal", {
  inserted(el, binding) {
    const delay = typeof binding.value === "number" ? binding.value : 0;
    el.style.setProperty("--reveal-delay", `${delay}ms`);
    el.classList.add("reveal");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            el.classList.add("is-visible");
            el.dataset.revealed = "true";
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 10% 0px" }
    );

    observer.observe(el);
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
