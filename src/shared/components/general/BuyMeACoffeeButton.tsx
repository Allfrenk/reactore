type BuyMeACoffeeButtonProps = {
  slug?: string
  className?: string
}

export function BuyMeACoffeeButton({
  slug = 'allfrenk',
  className = '',
}: BuyMeACoffeeButtonProps) {
  return (
    <a
      href={`https://www.buymeacoffee.com/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center transition-transform hover:-translate-y-px`}
    >
      <img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        style={{
          height: 30, // 🔹 allineata alle icone
          width: 'auto',
          maxWidth: 160, // 🔹 evita che domini visivamente
        }}
      />
    </a>
  )
}
