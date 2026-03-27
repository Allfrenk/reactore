// import { BuyMeACoffeeButton } from '../general/BuyMeACoffeeButton'

export function Footer() {
  const mailTo = 'mailto:ale.cata.it@gmail.com?subject=Reactore%20-%20Contact'

  return (
    <footer className="app-footer footer-root shrink-0 border-t border-(--border-soft)">
      <div className="footer-container">
        {/* DISCLAIMER */}
        <p className="footer-disclaimer">
          Reactore is a personal portfolio and educational project. Support is voluntary
          and does not include any service.
        </p>

        {/* ACTIONS */}
        <div className="footer-actions">
          {/* LEFT ICONS */}
          <div className="footer-icons-left">
            {/* LINKEDIN */}
            <a
              href="https://www.linkedin.com/in/alessandrocatania-"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon group"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-(--text-muted) transition group-hover:text-[#0A66C2]"
                fill="currentColor"
              >
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4zM8.5 8.5h3.8v2.1h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.8 2.6 4.8 6V24h-4v-7.5c0-1.8 0-4-2.5-4s-2.9 2-2.9 3.9V24h-4z" />
              </svg>
            </a>

            {/* GITHUB */}
            <a
              href="https://github.com/Allfrenk"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon group"
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-(--text-muted) transition group-hover:text-(--text-primary)"
                fill="currentColor"
              >
                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8-1.7.8-1.7-.9-.2-1.5-.9-1.7-1.6-.2-.7-.2-1.3-.2-1.3 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.4 10.4 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.3-5 5.6.4.4.7 1.1.7 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z" />
              </svg>
            </a>

            {/* MAIL */}
            <a href={mailTo} className="footer-icon group" aria-label="Email">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-(--text-muted) transition group-hover:text-[#EA4335]"
                fill="currentColor"
              >
                <path d="M2 4h20v16H2V4zm10 7L4 6v12h16V6l-8 5z" />
              </svg>
            </a>
          </div>

          {/* RIGHT – BUY ME A COFFEE */}
          {/* <div className="footer-bmc">
            <BuyMeACoffeeButton />
          </div> */}
        </div>
      </div>
    </footer>
  )
}
