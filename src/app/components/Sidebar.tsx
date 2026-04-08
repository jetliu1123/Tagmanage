import { Box, Tag, Users, BarChart3, FolderOpen } from "lucide-react";
import { cn } from "./ui/utils";

interface SidebarProps {
  activeMenu?: string;
  onMenuChange?: (menuId: string) => void;
}

export function Sidebar({ activeMenu = "tags", onMenuChange }: SidebarProps) {
  const menuItems = [
    { id: "applications", label: "应用管理", icon: Box },
    { id: "categories", label: "类型管理", icon: FolderOpen },
    { id: "tags", label: "标签管理", icon: Tag },
    { id: "users", label: "用户管理", icon: Users },
    { id: "statistics", label: "平台数据", icon: BarChart3 },
  ];

  return (
    <aside className="w-52 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="px-6 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 6V10C3 14.5 6.5 17.5 10 18C13.5 17.5 17 14.5 17 10V6L10 2Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-base text-sidebar-foreground">Connect-X</h1>
        </div>
      </div>

      <div className="px-2 py-3 text-sm text-sidebar-foreground/60">开发者专区</div>

      <nav className="px-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeMenu;

          return (
            <button
              key={item.id}
              onClick={() => onMenuChange?.(item.id)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-2 py-3 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/60">
          管理后台
        </div>
      </div>
    </aside>
  );
}
