import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "@/types";

const useLoadImage = (songs: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!songs) {
    return null;
  }

  const { data: ImageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(songs.img_path);

  return ImageData.publicUrl;
};

export default useLoadImage;
