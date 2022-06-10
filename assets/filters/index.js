import formatDate from "./formatDate";

export default {
  install(Vue) {
    Vue.filter("formatDate", formatDate);
  },
};
