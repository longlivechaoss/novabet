"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-nova-bg px-6 text-center">
      <Link
        href="/"
        className="absolute left-6 top-6"
        aria-label="NovaBet"
      >
        <img src="/images/logo-novabet.webp" alt="NovaBet" className="h-10 w-auto" />
      </Link>

      <div className="slot-swing text-9xl">🎰</div>
      <div className="mt-6 bg-gradient-to-r from-nova-blue via-nova-blueBright to-nova-blue bg-clip-text text-8xl font-black text-transparent">
        404
      </div>
      <h1 className="mt-4 text-2xl text-white">Ops! Essa página não existe</h1>
      <p className="mt-2 text-nova-textMuted">Mas você pode ganhar na NovaBet!</p>
      <button
        type="button"
        onClick={() => {
          window.location.href = "/";
        }}
        className="mt-8 rounded-full bg-nova-blue px-10 py-4 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
      >
        VOLTAR AO INÍCIO
      </button>
    </div>
  );
}

