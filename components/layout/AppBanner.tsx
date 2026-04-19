export default function AppBanner() {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-nova-bg via-nova-card to-nova-blue/50 p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex rounded-xl border border-nova-blue/30 bg-white/10 px-3 py-1 text-xs font-bold text-nova-text">
            📱 APP NOVABET
          </span>
          <h2 className="mt-4 text-3xl font-black text-white">Leve o cassino no seu bolso</h2>

          <ul className="mt-4 space-y-2 text-sm text-nova-text">
            <li>✓ Notificações de promoções exclusivas</li>
            <li>✓ Saque rápido direto pelo app</li>
            <li>✓ Biometria para login</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-xl bg-nova-blue px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
            >
              📱 Google Play
            </button>
            <button
              type="button"
              className="rounded-xl bg-nova-blue px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
            >
              🍎 App Store
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <div className="flex h-96 w-48 items-center justify-center rounded-[2rem] border border-nova-blueBright/30 bg-nova-card text-center">
            <div>
              <img
                src="/images/logo-novabet.webp"
                alt="NovaBet"
                className="mx-auto h-8 w-auto"
              />
              <p className="mt-3 text-sm text-nova-text">Experiência rápida e premium</p>
            </div>
          </div>

          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-2xl bg-white text-5xl">
            📱
          </div>
        </div>
      </div>
    </section>
  );
}

