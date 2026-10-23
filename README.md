# Pokédex React + Vite

## Dupla

- Christiano Gonçalves Araujo
- Larissa Fineli

Pokédex interativa feita com **React + Vite** (Atividade 03 — Desenvolvimento e Integração de Aplicações Web).

## Funcionalidades

- Lista dos 151 Pokémon com ID, nome, tipos e todos os atributos
- Pesquisa por nome ou ID (atualiza enquanto digita)
- Filtro por tipo (tipos vindos do `pokedex-data.json`)
- Detalhes em modal com barras de atributos
- Área de treinadores (insígnias e Pokémon de cada um)
- Mensagem quando nada é encontrado
- Extras: favoritos, ordenação, Pokémon aleatório, modo escuro, layout responsivo
- **Meu time:** monte um time de até 6 Pokémon (pelo card, pelo modal de detalhes ou aleatório)
- **Batalhas:** desafie qualquer treinador numa batalha automática e animada, com vantagem de tipo, acerto crítico e barras de HP; os treinadores vencidos ficam marcados
- Favoritos, time e vitórias ficam salvos no `localStorage`

## Como funciona a batalha

A lógica fica em `src/battle.js`. Cada lado envia um Pokémon por vez e quem tem mais **Speed** ataca primeiro. O golpe usa o maior entre **Attack** e **Special Attack**, contra a **Defense** ou a **Special Defense** do adversário. O tipo do golpe é escolhido entre os tipos do atacante, buscando a maior vantagem pela tabela de tipos. O HP de batalha é `HP + 60`. Vence quem nocautear o time inteiro do outro.

## Como executar

```bash
npm install
npm run dev
```

Acesse **http://localhost:5173/pokedex-react/** no navegador.

Deploy: https://christiano-gonara.github.io/pokedex-react/

## Dados

Os dados estão em `src/data/pokedex-data.json` (tipos, Pokémon e treinadores).

## Imagens

Ícones: [Lucide](https://lucide.dev) (`lucide-react`).

Imagens carregadas da [PokéAPI sprites](https://github.com/PokeAPI/sprites) (`official-artwork/{id}.png`).

## Organização

```text
src/
├── assets/images/   # imagens locais (opcional)
├── components/      # Header, SearchBar, Filters, PokemonList, PokemonCard,
│                    # PokemonDetails, StatBar, TypeBadge, TypeFilter,
│                    # TrainerList, TeamView, BattleArena, Toast
├── css/             # estilos por componente
├── data/            # pokedex-data.json
├── App.jsx          # estado global (busca, filtro, favoritos, time, batalha)
├── battle.js        # simulação da batalha e tabela de tipos
├── main.jsx
├── index.css
└── utils.js         # cores dos tipos, rótulos e URL das imagens
```
