import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TagManagement } from "./components/TagManagement";
import { CategoryManagement } from "./components/CategoryManagement";
import { Search, Bell, Maximize2, Languages } from "lucide-react";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("tags");

  return (
    <div className="size-full flex bg-background">
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border px-6 flex items-center justify-between bg-background">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm">
              应用市场
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-accent rounded-md transition-colors">
              <Search className="size-4" />
            </button>
            <button className="p-2 hover:bg-accent rounded-md transition-colors">
              <Languages className="size-4" />
            </button>
            <button className="p-2 hover:bg-accent rounded-md transition-colors">
              <Maximize2 className="size-4" />
            </button>
            <button className="p-2 hover:bg-accent rounded-md transition-colors relative">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-destructive rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 ml-2">
              <div className="w-7 h-7 bg-muted rounded-full flex items-center justify-center text-sm">
                E
              </div>
              <span className="text-sm">evan</span>
            </div>
          </div>
        </header>

        {activeMenu === "tags" && <TagManagement />}
        {activeMenu === "categories" && <CategoryManagement />}
        {activeMenu === "applications" && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            应用管理功能开发中...
          </div>
        )}
        {activeMenu === "users" && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            用户管理功能开发中...
          </div>
        )}
        {activeMenu === "statistics" && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            平台数据功能开发中...
          </div>
        )}
      </main>
    </div>
  );
}