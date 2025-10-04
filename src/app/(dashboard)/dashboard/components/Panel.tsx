"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  House,
  IdCard,
  LogOut,
  ReceiptText,
  Search,
  Settings,
  Tag,
  User,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { ProfileButton } from "./ProfileButton";
import { MenuBurger } from "./MenuBurger";
import ProfileButton from "./ProfileButton";

const PanelItem = ({
  icon,
  label,
  active = false,
  path = "#",
  className = "",
  headerLink = false,
  onClick = () => {},
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  path?: string;
  className?: string;
  headerLink?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={path}
      onClick={onClick}
      className={
        (headerLink
          ? "header-mobile-link "
          : "flex items-center gap-3 px-3 py-2 rounded-lg font-medium font-app text-tiny text-black ") +
        (active ? "bg-blue-100! text-blue-700! " : "hover:bg-gray-100") +
        " " +
        className
      }
    >
      <span>{icon}</span>
      {label}
    </Link>
  );
};

const PanesItemList = ({
  mobile = false,
  onItemClick = () => {},
}: {
  mobile?: boolean;
  onItemClick?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <>
      <PanelItem
        icon={<House className="w-5 h-5" />}
        label="Inicio"
        path="/dashboard"
        active={pathname === "/dashboard"}
        headerLink={mobile}
        onClick={onItemClick}
      />

      <PanelItem
        icon={<ReceiptText className="w-5 h-5" />}
        label="Artículos y servicios"
        path="/dashboard/articles"
        active={pathname === "/dashboard/articles"}
        headerLink={mobile}
        onClick={onItemClick}
      />

      <PanelItem
        icon={<Tag className="w-5 h-5" />}
        label="Pagos y facturas"
        path="/dashboard/payments"
        active={pathname === "/dashboard/payments"}
        headerLink={mobile}
        onClick={onItemClick}
      />

      <PanelItem
        icon={<IdCard className="w-5 h-5" />}
        label="Clientes"
        path="/dashboard/customers"
        active={pathname === "/dashboard/customers"}
        headerLink={mobile}
        onClick={onItemClick}
      />

      <PanelItem
        icon={<ChartNoAxesCombined className="w-5 h-5" />}
        label="Informes"
        path="/dashboard/reports"
        active={
          pathname === "/dashboard/reports" ||
          pathname.startsWith("/dashboard/reports/")
        }
        headerLink={mobile}
        onClick={onItemClick}
      />

      {/* Ya sin roles */}
      <PanelItem
        icon={<UsersRound className="w-5 h-5" />}
        label="Personal"
        path="/dashboard/staff"
        active={pathname === "/dashboard/staff"}
        headerLink={mobile}
        onClick={onItemClick}
      />

      <hr className={!mobile ? "border-t-neutral-200 mt-0 my-4" : "hidden"} />

      <PanelItem
        icon={<BriefcaseBusiness className="w-5 h-5" />}
        label="Mi negocio"
        path="/dashboard/business"
        active={pathname === "/dashboard/business"}
        headerLink={mobile}
        onClick={onItemClick}
      />

      <PanelItem
        className="border-b-0!"
        icon={<Settings className="w-5 h-5" />}
        path="/dashboard/settings"
        active={pathname === "/dashboard/settings"}
        label="Ajustes"
        headerLink={mobile}
        onClick={onItemClick}
      />
    </>
  );
};

export const Panel = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const urlQuery = searchParams.get("query");
  const [query, setQuery] = useState(urlQuery || "");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value) {
        setMenuOpen(false);
        router.push(`/dashboard/search?query=${encodeURIComponent(value)}`);
      }
    }
  };

  return (
    <aside className="fixed z-50 middle:relative border-b border-b-neutral-300 w-full bg-[#fafafa] middle:border-0 middle:border-r border-[#ededed] h-14 middle:h-auto px-3 middle:p-4 middle:space-y-4 flex flex-col justify-center middle:justify-between ">
      <div className="flex middle:flex-col justify-between items-center middle:items-stretch">
        {/* Logo */}
        <Link
          className="h-full middle:h-8 flex flex-[1] items-center justify-start md:justify-center middle:mt-4 middle:mb-6"
          href="/dashboard"
        >
          <picture>
            <source
              media="(max-width:1023px)"
              srcSet={"/stocker.svg"}
            />
            <img className="h-8" src={"/images/logo.svg"} alt="" />
          </picture>
        </Link>

        {/* Search Bar */}
        <div className="flex-[4] middle:w-full middle:mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-full dashboard-search">
            <Search className="w-4 h-4 text-gray-700" />
            <input
              type="text"
              spellCheck="false"
              placeholder="Buscar"
              autoComplete="$search_off"
              onKeyDown={handleSearch}
              className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-500"
              defaultValue={query}
            />
          </div>
        </div>

        {/* Desktop */}
        <nav className="space-y-2 hidden lg:block">
          <PanesItemList />
        </nav>

        {/* Mobile */}
        <MenuBurger
          nav="mt-14 px-0! justify-between"
          buttonHolder="flex-[1] flex justify-end items-center"
          isOpen={menuOpen}
          setIsOpen={setMenuOpen}
        >
          <div className="w-full flex flex-col ">
            <PanesItemList
              mobile={true}
              onItemClick={() => setMenuOpen(false)}
            />
          </div>
          <div className="w-full flex flex-col">
            <PanelItem
              className="border-t"
              icon={<User className="w-5 h-5" />}
              label="Perfil"
              path="/dashboard/search"
              active={pathname === "/dashboard/search"}
              headerLink={true}
              onClick={() => setMenuOpen(false)}
            />
            <PanelItem
              icon={<LogOut className="w-5 h-5" />}
              label="Cerrar sesión"
              headerLink={true}
              path="/logout"
            />
          </div>
        </MenuBurger>
      </div>
      <div className="relative w-full border-t border-t-[#ededed] py-6 hidden lg:block">
        <ProfileButton />
      </div>
    </aside>
  );
};
