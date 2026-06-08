import React from "react";
import { Outlet } from "react-router-dom";
import GlinficoNav from "./GlinficoNav";
import GlinficoFooter from "./GlinficoFooter";

export default function GlinficoLayout() {
  return (
    <div className="star-bg min-h-screen">
      <GlinficoNav />
      <main className="pt-16">
        <Outlet />
      </main>
      <GlinficoFooter />
    </div>
  );
}