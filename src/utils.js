export const TYPE_COLORS = {
  Typeless: '#9aa0a6',
  Normal: '#a8a77a',
  Fire: '#ee8130',
  Water: '#6390f0',
  Grass: '#7ac74c',
  Electric: '#f7d02c',
  Ice: '#96d9d6',
  Fighting: '#c22e28',
  Poison: '#a33ea1',
  Ground: '#e2bf65',
  Flying: '#a98ff3',
  Psychic: '#f95587',
  Bug: '#a6b91a',
  Rock: '#b6a136',
  Ghost: '#735797',
  Dark: '#705746',
  Dragon: '#6f35fc',
  Steel: '#b7b7ce',
}

// Texto escuro ou branco, o que tiver mais contraste com a cor do tipo (WCAG)
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const textOn = (hex) => {
  const l = luminance(hex)
  const withWhite = 1.05 / (l + 0.05)
  const withDark = (l + 0.05) / (luminance('#241f19') + 0.05)
  return withWhite >= withDark ? '#fff' : '#241f19'
}

export const STAT_LABELS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  specialAttack: 'Atq. Esp.',
  specialDefense: 'Def. Esp.',
  speed: 'Velocidade',
}

export const STAT_SHORT = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  specialAttack: 'SpA',
  specialDefense: 'SpD',
  speed: 'SPE',
}

export const formatId = (id) => `#${String(id).padStart(3, '0')}`

// Imagens: PokéAPI sprites (fonte documentada no README)
export const imageUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export const totalStats = (pokemon) => Object.values(pokemon.stats).reduce((a, b) => a + b, 0)

export function difficultyOf(team) {
  if (team.length === 0) return 'Fácil'
  const avg = team.reduce((sum, p) => sum + totalStats(p), 0) / team.length
  if (avg < 380) return 'Fácil'
  if (avg < 470) return 'Médio'
  return 'Difícil'
}

const portraits = import.meta.glob('./assets/images/trainers/*.png', { eager: true, import: 'default' })

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z]+/g, '-')
    .replace(/^-|-$/g, '')

export const portraitOf = (name) => portraits[`./assets/images/trainers/${slug(name)}.png`]
