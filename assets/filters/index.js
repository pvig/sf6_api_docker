import formatDate from "./formatDate";
import formatDateIndex from "./formatDateIndex";

export default {
  install(Vue) {
    Vue.filter("formatDate", formatDate);
    Vue.filter("formatDateIndex", formatDateIndex);
  },
};
