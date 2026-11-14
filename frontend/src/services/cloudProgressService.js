import { getSupabaseClient } from "./supabaseClient";

const pendingSaves = new Map();

export const loadCloudVocabCollection = async (userId) => {
  const { data, error } = await getSupabaseClient()
    .from("user_progress")
    .select("vocab_collection")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data?.vocab_collection ?? null;
};

export const saveCloudVocabCollection = (userId, collection) => {
  const previousSave = pendingSaves.get(userId) || Promise.resolve();
  const currentSave = previousSave
    .catch(() => {})
    .then(async () => {
      const { error } = await getSupabaseClient()
        .from("user_progress")
        .upsert(
          {
            user_id: userId,
            vocab_collection: collection,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

      if (error) throw error;
    });

  pendingSaves.set(userId, currentSave);
  return currentSave.finally(() => {
    if (pendingSaves.get(userId) === currentSave) pendingSaves.delete(userId);
  });
};
