import { Database, Github, Image } from './icons'
import '../css/Footer.css'
import Logo from './Logo'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo />
          <div>
            <strong>Christiano Gonçalves Araujo e Larissa Fineli</strong>
            <span>Atividade 03 · Desenvolvimento e Integração de Aplicações Web · PUC Minas</span>
          </div>
        </div>
        <nav className="footer-links">
          <span>
            <Database size={14} /> pokedex-data.json
          </span>
          <a href="https://pokeapi.co" target="_blank" rel="noreferrer">
            <Image size={14} /> Imagens: PokéAPI
          </a>
          <a href="https://github.com/christiano-gonara/pokedex-react" target="_blank" rel="noreferrer">
            <Github size={14} /> Repositório
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
