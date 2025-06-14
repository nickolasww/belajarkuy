"use client"
import { useState, useEffect } from "react"
import { FaPlay, FaExternalLinkAlt, FaYoutube } from "react-icons/fa"

interface VideoPlayerProps {
  videoUrl?: string
  title: string
  className?: string
}

// Mock function to get YouTube video ID based on title
const getYouTubeVideoId = (title: string): string => {
  const videoMappings: Record<string, string> = {
    "Sign up to Webflow": "6h649f2fB9Q",
    "Complete React Development Course": "Ke90Tje7VS0",
    "JavaScript Fundamentals": "PkZNo7MFNFg",
    "Python Programming": "rfscVS0vtbw",
    "Web Development Bootcamp": "pQN-pnXPaVg",
    "Machine Learning": "ukzFI9rgwfU",
    "CSS Grid & Flexbox": "jV8B24rSN5o",
    "Node.js & Express": "fBNz5xF-Kx4",
    "Database Design & SQL": "HXV3zeQKqGY",
    "DevOps with Docker": "3c-iBn73dDE",
  }

  // Try to find exact match first
  if (videoMappings[title]) {
    return videoMappings[title]
  }

  // Try to find partial match
  const partialMatch = Object.keys(videoMappings).find(
    (key) => title.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(title.toLowerCase()),
  )

  if (partialMatch) {
    return videoMappings[partialMatch]
  }

  // Default fallback video
  return "PkZNo7MFNFg"
}

// Function to search YouTube (mock implementation)
const searchYouTubeVideo = async (query: string): Promise<string> => {
  // For now, return mock result
  return getYouTubeVideoId(query)
}

const VideoPlayer = ({ videoUrl, title, className = "" }: VideoPlayerProps) => {
  const [videoId, setVideoId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [showInfo, setShowInfo] = useState(true)

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setIsLoading(true)
        setError("")

        // If videoUrl is provided and it's a YouTube URL, extract video ID
        if (videoUrl && videoUrl.includes("youtube.com")) {
          const urlParams = new URLSearchParams(videoUrl.split("?")[1])
          const id = urlParams.get("v")
          if (id) {
            setVideoId(id)
            setIsLoading(false)
            return
          }
        }

        // If videoUrl is provided and it's a YouTube short URL
        if (videoUrl && videoUrl.includes("youtu.be/")) {
          const id = videoUrl.split("youtu.be/")[1]?.split("?")[0]
          if (id) {
            setVideoId(id)
            setIsLoading(false)
            return
          }
        }

        // Search for video based on title
        const searchQuery = `${title} tutorial programming course`
        const id = await searchYouTubeVideo(searchQuery)
        setVideoId(id)
      } catch (err) {
        setError("Failed to load video")
        console.error("Error loading video:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadVideo()
  }, [title, videoUrl])

  const getYouTubeEmbedUrl = (id: string) => {
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&showinfo=0`
  }

  const openInYouTube = () => {
    if (videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
    }
  }

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 ${className}`}>
        <div className="relative bg-gray-100 aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading video...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !videoId) {
    return (
      <div className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 ${className}`}>
        <div className="relative bg-gray-100 aspect-video flex items-center justify-center">
          <div className="text-center p-8">
            <FaPlay className="text-gray-400 text-4xl mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Video not available</p>
            <p className="text-sm text-gray-500">Unable to load video for: {title}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 ${className}`}>
      <div className="relative bg-black">
        <iframe
          src={getYouTubeEmbedUrl(videoId)}
          title={title}
          className="w-full aspect-video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* YouTube Overlay Info */}
        <div className="absolute top-4 right-4">
          <button
            onClick={openInYouTube}
            className="bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70 transition-all flex items-center gap-2"
            title="Open in YouTube"
          >
            <FaYoutube className="text-red-500" />
            <FaExternalLinkAlt size={12} />
          </button>
        </div>
      </div>

      {/* Video Info */}
      {showInfo && (
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FaYoutube className="text-red-500" />
                  YouTube Video
                </span>
                <span>•</span>
                <span>HD Quality</span>
                <span>•</span>
                <span>Subtitles Available</span>
              </div>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
            >
              ✕
            </button>
          </div>

          {/* Video Actions */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={openInYouTube}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm"
            >
              <FaYoutube />
              Watch on YouTube
            </button>
            <button
              onClick={() => {
                const searchQuery = `${title} tutorial`
                const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`
                window.open(searchUrl, "_blank")
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Find More Videos
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
