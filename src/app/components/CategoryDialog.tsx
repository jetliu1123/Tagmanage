import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  onSave: (category: Omit<Category, "id"> & { id?: string }) => void;
}

const PRESET_ICONS = [
  "📁",
  "💼",
  "⚡",
  "🔧",
  "📚",
  "📢",
  "👥",
  "🎨",
  "🔒",
  "📊",
  "🌐",
  "🚀",
];

export function CategoryDialog({ open, onOpenChange, category, onSave }: CategoryDialogProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(PRESET_ICONS[0]);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setIcon(category.icon);
    } else {
      setName("");
      setIcon(PRESET_ICONS[0]);
    }
  }, [category, open]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        id: category?.id,
        name: name.trim(),
        icon,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "编辑类型" : "新增类型"}</DialogTitle>
          <DialogDescription>
            {category ? "修改类型的名称和图标" : "创建一个新的类型"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">类型名称</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入类型名称"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                }
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>类型图标</Label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_ICONS.map((presetIcon) => (
                <button
                  key={presetIcon}
                  type="button"
                  className="w-10 h-10 rounded-md border-2 transition-all hover:scale-110 flex items-center justify-center text-xl"
                  style={{
                    borderColor: icon === presetIcon ? "#000" : "#e5e7eb",
                  }}
                  onClick={() => setIcon(presetIcon)}
                >
                  {presetIcon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>预览</Label>
            <div className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-muted w-fit">
              <span className="text-xl">{icon}</span>
              <span className="text-sm">{name || "类型预览"}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            {category ? "保存" : "创建"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
