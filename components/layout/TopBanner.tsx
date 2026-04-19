"use client";

type TopBannerProps = {
  onClose: () => void;
};

const items = [
  "🎁 Bônus de 200% no primeiro depósito",
  "⚡ Saque em até 5 minutos",
  "🔒 Site 100% seguro e licenciado"
];

export default function TopBanner({ onClose }: TopBannerProps) {
  return (
    <div className="relative flex h-9 items-center justify-center bg-nova-blue font-medium text-white">
      <div className="flex w-full items-center justify-center px-10 text-xs md:hidden">
        <span className="text-center">{items[0]}</span>
      </div>

      <div className="hidden w-full items-center justify-center gap-6 px-6 text-sm md:flex">
        {items.flatMap((text, i) =>
          i === 0
            ? [<span key={text}>{text}</span>]
            : [
                <span key={`sep-${i}`} className="opacity-40">
                  |
                </span>,
                <span key={text}>{text}</span>
              ]
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-lg text-white/80 hover:text-white"
        aria-label="Fechar"
      >
        ✕
      </button>
    </div>
  );
}
