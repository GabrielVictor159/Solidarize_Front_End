import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Head } from "./head";
import { useContext, useEffect, useState } from "react";
import { SizeProportionProvider } from "./sizeProportionProvider";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main>{children}</main>
      <footer className="w-full flex flex-col items-center  justify-center py-3">
		<br/>
        <div className="text-center mb-3">
          <p>Conectando ONGs e empresas para um futuro mais solidário.</p>
          <p>Facilitamos doações para causas que importam.</p>
        </div>
		<br/>
        <div className="text-default-600 mb-3">
          © {new Date().getFullYear()} Solidarize. Todos os direitos
          reservados.
        </div>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://www.linkedin.com/in/gabriel-victor159/"
          title="Creator page Linkedin"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">Gabriel</p>
        </Link>
      </footer>
    </div>
  );
}
