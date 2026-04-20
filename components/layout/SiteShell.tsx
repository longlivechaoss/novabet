"use client";

import { ReactNode, useEffect, useState } from "react";

import ModalCadastro from "@/components/auth/ModalCadastro";
import ModalLogin from "@/components/auth/ModalLogin";
import RoletaSorte from "@/components/engagement/RoletaSorte";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import TopBanner from "@/components/layout/TopBanner";
import ModalDeposito from "@/components/wallet/ModalDeposito";
import ModalSaque from "@/components/wallet/ModalSaque";

export type SiteShellRenderContext = {
  isLogado: boolean;
  abrirCadastro: () => void;
  abrirLogin: () => void;
  abrirDeposito: () => void;
  abrirSaque: () => void;
  abrirRoleta: () => void;
};

type SiteShellProps = {
  children: ReactNode | ((context: SiteShellRenderContext) => ReactNode);
  withSidebar?: boolean;
  withFooter?: boolean;
  showSidebarToggle?: boolean;
  initialLoggedIn?: boolean;
  rawContent?: boolean;
  mainClassName?: string;
  contentClassName?: string;
};

export default function SiteShell({
  children,
  withSidebar = true,
  withFooter = false,
  showSidebarToggle = true,
  initialLoggedIn = false,
  rawContent = false,
  mainClassName = "min-h-screen transition-all duration-300",
  contentClassName = "mx-auto flex w-full max-w-[1440px] flex-col px-4 py-8 lg:px-8"
}: SiteShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalDeposito, setModalDeposito] = useState(false);
  const [modalSaque, setModalSaque] = useState(false);
  const [modalRoleta, setModalRoleta] = useState(false);
  const [isLogado, setIsLogado] = useState(initialLoggedIn);
  const [topBannerVisivel, setTopBannerVisivel] = useState(true);

  const alturaTopo = topBannerVisivel ? 36 + 56 : 56;

  useEffect(() => {
    document.documentElement.style.setProperty("--top-banner-height", topBannerVisivel ? "36px" : "0px");

    return () => {
      document.documentElement.style.setProperty("--top-banner-height", "0px");
    };
  }, [topBannerVisivel]);

  function abrirCadastro() {
    setModalLogin(false);
    setModalCadastro(true);
  }

  function abrirLogin() {
    setModalCadastro(false);
    setModalLogin(true);
  }

  function concluirLogin() {
    setModalLogin(false);
    setIsLogado(true);
  }

  const renderContext: SiteShellRenderContext = {
    isLogado,
    abrirCadastro,
    abrirLogin,
    abrirDeposito: () => setModalDeposito(true),
    abrirSaque: () => setModalSaque(true),
    abrirRoleta: () => setModalRoleta(true)
  };

  const renderedChildren = typeof children === "function" ? children(renderContext) : children;

  return (
    <div className="min-h-screen bg-nova-bg">
      {topBannerVisivel ? (
        <div className="fixed left-0 right-0 top-0 z-40">
          <TopBanner onClose={() => setTopBannerVisivel(false)} />
        </div>
      ) : null}
      <Header
        isLogado={isLogado}
        onToggleSidebar={() => setSidebarOpen((current) => !current)}
        onOpenCadastro={abrirCadastro}
        onOpenLogin={abrirLogin}
        onOpenDeposito={() => setModalDeposito(true)}
        onOpenSaque={() => setModalSaque(true)}
        onLogout={() => setIsLogado(false)}
        showSidebarToggle={withSidebar ? showSidebarToggle : false}
      />

      {withSidebar ? (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenRoleta={() => {
            setModalRoleta(true);
            setSidebarOpen(false);
          }}
        />
      ) : null}

      <main
        className={`${mainClassName} ${withSidebar ? "ml-0 lg:ml-[240px]" : ""} !pb-[58px] ${withFooter ? "md:!pb-0" : "md:!pb-10"}`}
        style={{ paddingTop: `${alturaTopo}px`, overflowX: 'hidden' }}
      >
        {rawContent ? renderedChildren : <div className={contentClassName}>{renderedChildren}</div>}
        {withFooter ? <Footer /> : null}
      </main>

      {modalCadastro ? <ModalCadastro onClose={() => setModalCadastro(false)} /> : null}
      {modalLogin ? (
        <ModalLogin
          onClose={() => setModalLogin(false)}
          onOpenCadastro={abrirCadastro}
          onLoginSuccess={concluirLogin}
        />
      ) : null}
      {modalDeposito && isLogado ? (
        <ModalDeposito onClose={() => setModalDeposito(false)} />
      ) : null}
      {modalSaque && isLogado ? <ModalSaque onClose={() => setModalSaque(false)} /> : null}
      {modalRoleta ? <RoletaSorte onClose={() => setModalRoleta(false)} /> : null}

      <BottomNav />
    </div>
  );
}
