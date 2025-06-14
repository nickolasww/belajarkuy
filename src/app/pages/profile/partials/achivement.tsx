import type { Achievement } from "@/app/types/profile"
import { getRarityColor } from "@/app/utils/profile-utils"

interface AchievementsTabProps {
  achievements: Achievement[]
}

export default function AchievementsTab({ achievements }: AchievementsTabProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Achievements ({achievements.length})</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">{achievement.icon}</div>
            <h4 className="font-semibold mb-2">{achievement.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
            <div className="flex items-center justify-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                {achievement.rarity}
              </span>
              <span className="text-xs text-gray-500">{new Date(achievement.unlockedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
