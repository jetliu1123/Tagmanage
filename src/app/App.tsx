import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TagDialog, Tag } from "./components/TagDialog";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./components/ui/alert-dialog";
import { Search, Plus, Pencil, Trash2, Bell, Maximize2, Languages } from "lucide-react";

export default function App() {
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "全部", color: "#6366F1" },
    { id: "2", name: "官方", color: "#3B82F6" },
    { id: "3", name: "商店", color: "#8B5CF6" },
    { id: "4", name: "企业官网", color: "#EC4899" },
    { id: "5", name: "认证", color: "#10B981" },
    { id: "6", name: "基础设施", color: "#F59E0B" },
    { id: "7", name: "SEO", color: "#EF4444" },
    { id: "8", name: "安全", color: "#14B8A6" },
    { id: "9", name: "文档", color: "#8B5CF6" },
    { id: "10", name: "知识库", color: "#3B82F6" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingTagId, setDeletingTagId] = useState<string | null>(null);

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveTag = (tagData: Omit<Tag, "id"> & { id?: string }) => {
    if (tagData.id) {
      setTags((prev) =>
        prev.map((tag) =>
          tag.id === tagData.id
            ? { ...tag, name: tagData.name, color: tagData.color }
            : tag
        )
      );
    } else {
      const newTag: Tag = {
        id: Date.now().toString(),
        name: tagData.name,
        color: tagData.color,
      };
      setTags((prev) => [...prev, newTag]);
    }
    setEditingTag(null);
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setDialogOpen(true);
  };

  const handleDeleteClick = (tagId: string) => {
    setDeletingTagId(tagId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingTagId) {
      setTags((prev) => prev.filter((tag) => tag.id !== deletingTagId));
      setDeletingTagId(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleAddNew = () => {
    setEditingTag(null);
    setDialogOpen(true);
  };

  return (
    <div className="size-full flex bg-background">
      <Sidebar activeMenu="tags" />

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

        <div className="flex-1 overflow-auto px-6 py-6">
          <div className="max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1">标签管理</h2>
                <p className="text-sm text-muted-foreground">
                  管理您的所有插件标签
                </p>
              </div>
              <Button onClick={handleAddNew}>
                <Plus className="size-4" />
                新增标签
              </Button>
            </div>

            <div className="bg-card rounded-lg border border-border">
              <div className="p-4 border-b border-border">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索标签名称或ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>标签名称</TableHead>
                    <TableHead>标签ID</TableHead>
                    <TableHead>颜色</TableHead>
                    <TableHead>预览</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTags.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        {searchQuery ? "未找到匹配的标签" : "暂无标签"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTags.map((tag) => (
                      <TableRow key={tag.id}>
                        <TableCell>{tag.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {tag.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: tag.color }}
                            />
                            <span className="text-sm text-muted-foreground">
                              {tag.color}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="inline-flex items-center justify-center rounded-md px-3 py-1 text-sm text-white"
                            style={{ backgroundColor: tag.color }}
                          >
                            {tag.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(tag)}
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(tag.id)}
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <div className="px-4 py-3 border-t border-border text-sm text-muted-foreground">
                共 {filteredTags.length} 个标签
              </div>
            </div>
          </div>
        </div>
      </main>

      <TagDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tag={editingTag}
        onSave={handleSaveTag}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除这个标签吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}