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
