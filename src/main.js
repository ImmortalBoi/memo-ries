import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueTailwindDatepicker from 'vue-tailwind-datepicker';

import { VueFire } from "vuefire";
import { firebaseApp, auth, db } from "./firebase";
import "./index.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShieldHeart, faHouse, faMagnifyingGlass, faBookmark, faEdit, faTrashCan, faSun, faMoon, faFileShield } from '@fortawesome/free-solid-svg-icons'

library.add(faShieldHeart, faHouse, faMagnifyingGlass, faBookmark, faEdit, faTrashCan, faSun, faMoon, faFileShield)



const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(VueTailwindDatepicker);
app.use(router);

app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    auth,
    db,
});


app.mount("#app");
