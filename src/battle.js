// Simulação de batalha: cada lado envia um Pokémon por vez, até um time ficar sem Pokémon.
// Gera uma lista de "quadros" (snapshots) que o componente BattleArena reproduz passo a passo.

const CHART = {
  Normal: { half: ['Rock', 'Steel'], zero: ['Ghost'] },
  Fire: { double: ['Grass', 'Ice', 'Bug', 'Steel'], half: ['Fire', 'Water', 'Rock', 'Dragon'] },
  Water: { double: ['Fire', 'Ground', 'Rock'], half: ['Water', 'Grass', 'Dragon'] },
  Electric: { double: ['Water', 'Flying'], half: ['Electric', 'Grass', 'Dragon'], zero: ['Ground'] },
  Grass: {
    double: ['Water', 'Ground', 'Rock'],
    half: ['Fire', 'Grass', 'Poison', 'Flying', 'Bug', 'Dragon', 'Steel'],
  },
  Ice: { double: ['Grass', 'Ground', 'Flying', 'Dragon'], half: ['Fire', 'Water', 'Ice', 'Steel'] },
  Fighting: {
    double: ['Normal', 'Ice', 'Rock', 'Dark', 'Steel'],
    half: ['Poison', 'Flying', 'Psychic', 'Bug'],
    zero: ['Ghost'],
  },
  Poison: { double: ['Grass'], half: ['Poison', 'Ground', 'Rock', 'Ghost'], zero: ['Steel'] },
  Ground: { double: ['Fire', 'Electric', 'Poison', 'Rock', 'Steel'], half: ['Grass', 'Bug'], zero: ['Flying'] },
  Flying: { double: ['Grass', 'Fighting', 'Bug'], half: ['Electric', 'Rock', 'Steel'] },
  Psychic: { double: ['Fighting', 'Poison'], half: ['Psychic', 'Steel'], zero: ['Dark'] },
  Bug: { double: ['Grass', 'Psychic', 'Dark'], half: ['Fire', 'Fighting', 'Poison', 'Flying', 'Ghost', 'Steel'] },
  Rock: { double: ['Fire', 'Ice', 'Flying', 'Bug'], half: ['Fighting', 'Ground', 'Steel'] },
  Ghost: { double: ['Psychic', 'Ghost'], half: ['Dark'], zero: ['Normal'] },
  Dragon: { double: ['Dragon'], half: ['Steel'] },
  Dark: { double: ['Psychic', 'Ghost'], half: ['Fighting', 'Dark'] },
  Steel: { double: ['Ice', 'Rock'], half: ['Fire', 'Water', 'Electric', 'Steel'] },
}

const MOVES = {
  Normal: 'Tackle',
  Typeless: 'Tackle',
  Fire: 'Flamethrower',
  Water: 'Surf',
  Electric: 'Thunderbolt',
  Grass: 'Razor Leaf',
  Ice: 'Ice Beam',
  Fighting: 'Karate Chop',
  Poison: 'Sludge Bomb',
  Ground: 'Earthquake',
  Flying: 'Wing Attack',
  Psychic: 'Psychic',
  Bug: 'Bug Bite',
  Rock: 'Rock Slide',
  Ghost: 'Shadow Ball',
  Dragon: 'Dragon Claw',
  Dark: 'Bite',
  Steel: 'Iron Tail',
}

function effectiveness(moveType, defender) {
  const entry = CHART[moveType] ?? {}
  return defender.types.reduce((mult, { name }) => {
    if (entry.zero?.includes(name)) return 0
    if (entry.double?.includes(name)) return mult * 2
    if (entry.half?.includes(name)) return mult * 0.5
    return mult
  }, 1)
}

function chooseMove(attacker, defender) {
  let best = { type: 'Normal', mult: 0 }
  for (const { name } of attacker.types) {
    const mult = effectiveness(name, defender)
    if (mult > best.mult) best = { type: name, mult }
  }
  // Se nenhum tipo acerta, usa um golpe neutro para a batalha não travar
  if (best.mult === 0) return { name: 'Struggle', mult: 1, stab: 1 }
  return { name: MOVES[best.type] ?? 'Tackle', mult: best.mult, stab: 1.5 }
}

function computeDamage(attacker, defender) {
  const { stats: a } = attacker
  const { stats: d } = defender
  const physical = a.attack >= a.specialAttack
  const atk = physical ? a.attack : a.specialAttack
  const def = physical ? d.defense : d.specialDefense
  const move = chooseMove(attacker, defender)
  const critical = Math.random() < 1 / 16
  const base = Math.floor((22 * 70 * atk) / def / 50) + 2
  const random = 0.85 + Math.random() * 0.15
  const damage = Math.max(1, Math.floor(base * move.stab * move.mult * random * (critical ? 1.5 : 1)))
  return { move, damage, critical }
}

const toFighter = (pokemon) => ({ pokemon, maxHp: pokemon.stats.hp + 60, hp: pokemon.stats.hp + 60 })

export function simulateBattle(playerTeam, trainer, trainerTeam) {
  const sides = {
    you: { name: 'Você', team: playerTeam.map(toFighter), index: 0 },
    foe: { name: trainer.name, team: trainerTeam.map(toFighter), index: 0 },
  }
  const frames = []

  const active = (side) => sides[side].team[Math.min(sides[side].index, sides[side].team.length - 1)]
  const alive = (side) => sides[side].index < sides[side].team.length

  const snap = (message, extra = {}) => {
    const view = (side) => ({
      ...active(side),
      index: sides[side].index,
      fainted: sides[side].team.filter((f) => f.hp === 0).length,
    })
    frames.push({ message, you: view('you'), foe: view('foe'), ...extra })
  }

  snap(`${trainer.name} quer batalhar!`)
  snap(`Vai, ${active('you').pokemon.name}! ${trainer.name} enviou ${active('foe').pokemon.name}!`, { entering: 'both' })

  let turns = 0
  while (alive('you') && alive('foe') && turns < 300) {
    turns++
    const you = active('you')
    const foe = active('foe')
    const youFirst =
      you.pokemon.stats.speed === foe.pokemon.stats.speed
        ? Math.random() < 0.5
        : you.pokemon.stats.speed > foe.pokemon.stats.speed
    const order = youFirst ? ['you', 'foe'] : ['foe', 'you']

    for (const side of order) {
      const other = side === 'you' ? 'foe' : 'you'
      const attacker = active(side)
      const defender = active(other)
      const { move, damage, critical } = computeDamage(attacker.pokemon, defender.pokemon)
      defender.hp = Math.max(0, defender.hp - damage)

      const notes = []
      if (critical) notes.push('Acerto crítico!')
      if (move.mult > 1) notes.push('É super efetivo!')
      if (move.mult < 1) notes.push('Não é muito efetivo...')
      snap(`${attacker.pokemon.name} usou ${move.name}! ${notes.join(' ')}`.trim(), {
        attacker: side,
        damage: { side: other, value: damage },
      })

      if (defender.hp === 0) {
        sides[other].index++
        snap(`${defender.pokemon.name} desmaiou!`, { faint: other })
        if (alive(other)) {
          const owner = other === 'you' ? 'Você enviou' : `${trainer.name} enviou`
          snap(`${owner} ${active(other).pokemon.name}!`, { entering: other })
        }
        break
      }
    }
  }

  const winner = alive('you') ? 'you' : 'foe'
  snap(winner === 'you' ? `Você venceu ${trainer.name}!` : `Você perdeu para ${trainer.name}...`, { winner })
  return frames
}
