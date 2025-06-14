"use client"

import { FaUserCircle, FaEdit, FaShare } from "react-icons/fa"
import { MdEmail, MdLocationOn, MdLanguage, MdDateRange } from "react-icons/md"
import type { User } from "@/app/types/profile"

interface ProfileHeaderProps {
  user: User
  isEditing: boolean
  editForm: {
    name: string
    bio: string
    location: string
    website: string
  }
  onEditFormChange: (field: string, value: string) => void
  onSaveProfile: () => void
  onStartEditing: () => void
  onCancelEditing: () => void
}

export default function ProfileHeader({
  user,
  isEditing,
  editForm,
  onEditFormChange,
  onSaveProfile,
  onStartEditing,
  onCancelEditing,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8 pt-32">   

      <div className="px-6 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 sm:-mt-20">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full p-2 shadow-lg">
              <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center">
                <FaUserCircle className="w-16 h-16 sm:w-24 sm:h-24 text-orange-600" />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition-colors">
              <FaEdit className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => onEditFormChange("name", e.target.value)}
                  className="text-2xl font-bold border-b-2 border-orange-300 focus:border-orange-500 outline-none bg-transparent"
                />
                <textarea
                  value={editForm.bio}
                  onChange={(e) => onEditFormChange("bio", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md resize-none"
                  rows={2}
                  placeholder="Tell us about yourself..."
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => onEditFormChange("location", e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Location"
                  />
                  <input
                    type="url"
                    value={editForm.website}
                    onChange={(e) => onEditFormChange("website", e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Website"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <MdEmail className="w-4 h-4" />
                  {user.email}
                </p>
                {user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                  {user.location && (
                    <span className="flex items-center gap-1">
                      <MdLocationOn className="w-4 h-4" />
                      {user.location}
                    </span>
                  )}
                  {user.website && (
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-600 flex items-center gap-1"
                    >
                      <MdLanguage className="w-4 h-4" />
                      Website
                    </a>
                  )}
                  {user.joinDate && (
                    <span className="flex items-center gap-1">
                      <MdDateRange className="w-4 h-4" />
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={onSaveProfile}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={onCancelEditing}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onStartEditing}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <FaEdit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FaShare className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
