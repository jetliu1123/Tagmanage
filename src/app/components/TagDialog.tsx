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

export interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag?: Tag | null;
  onSave: (tag: Omit<Tag, "id"> & { id?: string }) => void;
}

const PRESET_COLORS = [
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#F59E0B", // amber
  "#10B981", // green
  "#EF4444", // red
  "#6366F1", // indigo
  "#14B8A6", // teal
];

export function TagDialog({ open, onOpenChange, tag, onSave }: TagDialogProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);

  useEffect(() => {
    if (tag) {
      setName(tag.name);
      setColor(tag.color);
    } else {
      setName("");
      setColor(PRESET_COLORS[0]);
    }
  }, [tag, open]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        id: tag?.id,
        name: name.trim(),
        color,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tag ? "编辑标签" : "新增标签"}</DialogTitle>
          <DialogDescription>
            {tag ? "修改标签的名称和颜色" : "创建一个新的标签"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">标签名称</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入标签名称"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                }
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>标签颜色</Label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  className="w-8 h-8 rounded-md border-2 transition-all hover:scale-110"
                  style={{
                    backgroundColor: presetColor,
                    borderColor: color === presetColor ? "#000" : "transparent",
                  }}
                  onClick={() => setColor(presetColor)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>预览</Label>
            <div
              className="inline-flex items-center justify-center rounded-md px-3 py-1 text-sm text-white w-fit"
              style={{ backgroundColor: color }}
            >
              {name || "标签预览"}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            {tag ? "保存" : "创建"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
