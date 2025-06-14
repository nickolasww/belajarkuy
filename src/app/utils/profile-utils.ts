export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Common":
      return "text-gray-600 bg-gray-100"
    case "Rare":
      return "text-blue-600 bg-blue-100"
    case "Epic":
      return "text-purple-600 bg-purple-100"
    case "Legendary":
      return "text-yellow-600 bg-yellow-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600 bg-green-100"
    case "Medium":
      return "text-yellow-600 bg-yellow-100"
    case "Hard":
      return "text-red-600 bg-red-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}
