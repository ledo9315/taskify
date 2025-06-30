"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between border-b border-primary/30 pb-4">
        <div className="flex items-center gap-x-1.5">
          <Image alt="Logo" src="/logo.svg" width={36} height={36}></Image>
          <h1 className="text-4xl font-medium tracking-tight leading-0 pb-1">
            taskify
          </h1>
        </div>
        <Link href="/add-task">
          <Button className="rounded-none button-clickable bg-transparent text-primary hover:ring-1 hover:ring-accent font-normal py-1.5 px-5 text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer">
            + Neu
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
