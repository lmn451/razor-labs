import React from "react";
import { Factory, Info, Bell, FileText, Settings, LogOut } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-[72px] bg-indigo-900 flex flex-col justify-between items-stretch p-4">
        <div className="flex flex-col gap-7 mt-2">
          <div></div>
          <div className="p-2 rounded-4xl mx-auto bg-cyan-300">
            <Factory />
          </div>
          <div className="p-2 hover:bg-indigo-800 rounded-4xl mx-auto">
            <Info color="white" />
          </div>
          <div className="p-2 hover:bg-indigo-800 rounded-4xl mx-auto">
            <Bell color="white" />
          </div>
          <div className="p-2 hover:bg-indigo-800 rounded-4xl mx-auto">
            <FileText color="white" />
          </div>
          <div className="p-2 hover:bg-indigo-800 rounded-4xl mx-auto">
            <Settings color="white" />
          </div>
        </div>
        <div className="text-center text-xs text-indigo-300">
          <button className="bg-indigo-800 text-white rounded-full !p-1 hover:bg-indigo-700">
            <LogOut />
          </button>
          <div>
            <div className="w-9 h-9 bg-indigo-100 text-indigo-900 rounded-full flex items-center justify-center font-semibold text-base mb-2 mx-auto mt-2">
              EG
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col bg-white">
        <header className="h-14 flex flex-row justify-between items-center px-8 py-3 shadow-md bg-white">
          <span className="text-xl font-bold tracking-wide">
            <span className="text-indigo-900">DataMind</span>
            <span className="text-blue-500 ml-0.5">AI</span>
          </span>
        </header>
        <main className="flex-1 bg-white overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
