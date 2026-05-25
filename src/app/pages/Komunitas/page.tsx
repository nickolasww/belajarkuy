"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/app/lib/supabase";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaImage, FaTimes, FaUserCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

type Post = {
  id: string;
  content: string;
  created_at: string;
  author_name: string | null;
  image_url: string | null;
};

type CurrentUser = {
  id: string;
  username: string;
};

async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, content, created_at, author_name, image_url")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

async function createPost(payload: {
  content: string;
  author_name: string;
  image_url: string | null;
}) {
  const { error } = await supabase.from("posts").insert(payload);
  if (error) throw new Error(error.message);
}

function formatRelativeTime(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}d`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}j`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}hr`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

const AVATAR_COLORS = [
  "#f97316",
  "#fb923c",
  "#ea580c",
  "#c2410c",
  "#fdba74",
  "#f59e0b",
  "#d97706",
  "#b45309",
];

function getAvatarColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

const KomunitasPage = () => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // Ambil user dari session & profiles
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setIsUserLoading(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", session.user.id)
        .single();
      if (data?.username) {
        setCurrentUser({ id: session.user.id, username: data.username });
      }
      setIsUserLoading(false);
    };
    getUser();
  }, []);

  // Realtime update
  useEffect(() => {
    const channel = supabase
      .channel("posts-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["komunitas", "posts"] });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["komunitas", "posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 30,
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["komunitas", "posts"] });
    },
  });

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!content.trim() && !imageFile) return;
    if (!currentUser) {
      router.push("/pages/login");
      return;
    }

    setIsUploading(true);
    let imageUrl: string | null = null;

    try {
      // Upload gambar jika ada
      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const fileName = `${currentUser.id}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("post-images")
          .upload(fileName, imageFile, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from("post-images")
          .getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      mutation.mutate({
        content: content.trim(),
        author_name: currentUser.username,
        image_url: imageUrl,
      });

      setContent("");
      removeImage();
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Gagal mengupload gambar. Coba lagi.");
    } finally {
      setIsUploading(false);
    }
  };

  const isSubmitting = isUploading || mutation.isPending;
  const canSubmit =
    (content.trim() || imageFile) && currentUser && !isSubmitting;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoMdArrowRoundBack />
          </button>
          <div>
            <h1 className="font-bold text-gray-900 text-base leading-tight">
              Komunitas BelajarKuy
            </h1>
            <p className="text-gray-500 text-xs">
              {isLoading ? "..." : `${posts?.length ?? 0} postingan`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Compose Box */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          {!isUserLoading && !currentUser && (
            <div className="flex items-center justify-between py-3 px-4 bg-orange-50 rounded-xl border border-orange-100 mb-4">
              <p className="text-sm text-gray-600">Masuk untuk mulai posting</p>
              <Link
                href="/pages/login"
                className="px-4 py-1.5 bg-orange-500 text-white text-sm font-semibold rounded-full hover:bg-orange-400 transition-colors"
              >
                Masuk
              </Link>
            </div>
          )}

          <div className="flex gap-3">
            {/* Avatar user */}
            <div className="flex-shrink-0">
              {currentUser ? (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{
                    backgroundColor: getAvatarColor(currentUser.username),
                  }}
                >
                  {getInitials(currentUser.username)}
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaUserCircle className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleTextareaChange}
                placeholder={
                  currentUser
                    ? "Ada yang ingin kamu bagikan?"
                    : "Masuk untuk posting..."
                }
                disabled={!currentUser}
                rows={2}
                className="w-full resize-none text-gray-800 text-base placeholder:text-gray-400 outline-none bg-transparent leading-relaxed disabled:cursor-not-allowed"
              />

              {imagePreview && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                    >
                      <FaTimes className="w-2.5 h-2.5 text-white" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400 truncate max-w-[140px]">
                    {imageFile?.name}
                  </span>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className={`p-2 rounded-full transition-colors ${
                      currentUser
                        ? "text-orange-500 hover:bg-orange-50 cursor-pointer"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      if (!currentUser) e.preventDefault();
                    }}
                  >
                    <FaImage className="w-5 h-5" />
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="px-5 py-1.5 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold rounded-full transition-colors flex items-center gap-2"
                >
                  {isSubmitting && (
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  )}
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div>
          {isLoading && (
            <div className="flex justify-center py-16">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {isError && (
            <div className="text-center py-12 text-red-400 text-sm">
              Gagal memuat postingan. Coba refresh halaman.
            </div>
          )}

          {!isLoading && posts?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <p className="text-gray-400 text-sm">
                Belum ada postingan. Jadilah yang pertama!
              </p>
            </div>
          )}

          {posts?.map((post) => {
            const name = post.author_name ?? "Anonim";
            const avatarColor = getAvatarColor(name);
            const initials = getInitials(name);
            return (
              <article
                key={post.id}
                className="bg-white border-b border-gray-200 px-4 py-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: avatarColor }}
                    >
                      {initials}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900 text-sm">
                        {name}
                      </span>
                      <span className="text-gray-400 text-xs">·</span>
                      <span className="text-gray-400 text-xs">
                        {formatRelativeTime(post.created_at)}
                      </span>
                    </div>

                    {post.content && (
                      <p className="text-gray-800 text-sm mt-1 leading-relaxed whitespace-pre-wrap break-words">
                        {post.content}
                      </p>
                    )}

                    {post.image_url && (
                      <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200">
                        <Image
                          src={post.image_url}
                          alt="Post image"
                          width={600}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                          className="rounded-2xl"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KomunitasPage;
