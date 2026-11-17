import { getSupabaseClient } from "./supabaseClient";

export const authService = {
  login(email, password) {
    return getSupabaseClient().auth.signInWithPassword({
      email,
      password,
    });
  },

  signUp(email, password) {
    return getSupabaseClient().auth.signUp({
      email,
      password,
    });
  },

  requestPasswordReset(email) {
    return getSupabaseClient().auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
  },

  updatePassword(password) {
    return getSupabaseClient().auth.updateUser({ password });
  },

  getSession() {
    return getSupabaseClient().auth.getSession();
  },

  onAuthStateChange(callback) {
    return getSupabaseClient().auth.onAuthStateChange(callback);
  },

  logout() {
    return getSupabaseClient().auth.signOut();
  },
};
