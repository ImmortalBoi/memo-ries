// store.js
import { reactive } from 'vue'
import { auth } from './firebase'
import { db } from './firebase'

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref as dbRef } from "firebase/database";

export const store = reactive({
  user: null,
  loggedIn: false,
  signIn: async function(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        this.user = auth.currentUser;
        this.loggedIn = true;
        return { success: true };
      })
      .catch((error) => {
        console.log(error);
        return { success: false, error: error.code + error.message };
      });
    return result;
  },

  signUp: async function(email, password) {
    let result = await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        this.user = auth.currentUser;
        return { success: true };
      })
      .catch((error) => {
        console.error(error);
        return { success: false, error: error.code + error.message };
      });

    if (result.success) {
      result = await set(dbRef(db, 'users/' + this.user.uid), { email: email })
        .then(() => {
          console.log("completed");
          return { success: true };
        })
        .catch((error) => {
          console.error(error);
          return { success: false, error: error.code + error.message };
        });
    }
    return result;
  }
});
