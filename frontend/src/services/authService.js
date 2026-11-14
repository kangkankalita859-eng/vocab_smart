import { getSupabaseClient } from "./supabaseClient";

export const authService = {
  login(email) {
    return getSupabaseClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
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
