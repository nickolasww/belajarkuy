"use client"

import { FaShieldAlt, FaEye, FaArrowRight, FaSignOutAlt } from "react-icons/fa"
import { IoMdNotifications, IoMdLock } from "react-icons/io"

interface SettingsTabProps {
  onLogout: () => void
}

export default function SettingsTab({ onLogout }: SettingsTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <IoMdNotifications className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive updates about your courses and achievements</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <IoMdNotifications className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-gray-600">Get notified about new courses and quiz reminders</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <FaEye className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium">Profile Visibility</h4>
                <p className="text-sm text-gray-600">Make your profile visible to other learners</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Privacy & Security</h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <IoMdLock className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
            </div>
            <FaArrowRight className="w-4 h-4 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <h4 className="font-medium">Privacy Settings</h4>
                <p className="text-sm text-gray-600">Manage your data and privacy preferences</p>
              </div>
            </div>
            <FaArrowRight className="w-4 h-4 text-gray-400" />
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-between p-4 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors text-orange-600"
          >
            <div className="flex items-center gap-3">
              <FaSignOutAlt className="w-5 h-5" />
              <div className="text-left">
                <h4 className="font-medium">Logout</h4>
                <p className="text-sm text-orange-500">Sign out from your account</p>
              </div>
            </div>
            <FaArrowRight className="w-4 h-4 text-orange-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
