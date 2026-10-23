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
- Favoritos ficam salvos no `localStorage`

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

Imagens dos treinadores (pixel art) em `src/assets/images/trainers/`, baixadas dos sprites do [Pokémon Showdown](https://play.pokemonshowdown.com/sprites/trainers/).

Imagens dos Pokémon carregadas da [PokéAPI sprites](https://github.com/PokeAPI/sprites) (`official-artwork/{id}.png`).

## Organização

```text
src/
├── assets/images/   # retratos dos treinadores
├── components/      # Header, SearchBar, Filters, PokemonList, PokemonCard,
│                    # PokemonDetails, StatBar, TypeBadge, TypeFilter,
│                    # TrainerList, PageHero, KantoBadge, Footer
│   └── heroes/      # PokedexHero, TrainersHero, FavoritesHero
├── css/             # estilos por componente
├── data/            # pokedex-data.json
├── App.jsx          # estado global (busca, filtro, ordenação, favoritos)
├── main.jsx
├── index.css
└── utils.js         # cores dos tipos, rótulos e URL das imagens
```
