'use client';
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { signOutAction } from "../_actions/signOutAction";

export function AppBar() {
  const session = useSession();

  return (
    <header className="p-4 border-b right-20 flex justify-between items-center">
      <span>Olá, {session?.data?.user?.name} </span>

      <Button size="sm" onClick={signOutAction}>Sair</Button>
    </header>
  );
}
