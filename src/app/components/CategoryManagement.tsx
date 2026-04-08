import { useState } from "react";
import { CategoryDialog, Category } from "./CategoryDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Search, Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "全部", icon: "📁" },
    { id: "2", name: "办公协作", icon: "💼" },
    { id: "3", name: "效率提升", icon: "⚡" },
    { id: "4", name: "开发工具", icon: "🔧" },
    { id: "5", name: "知识库", icon: "📚" },
    { id: "6", name: "沟通营销", icon: "📢" },
    { id: "7", name: "人力资源", icon: "👥" },
    { id: "8", name: "设计工具", icon: "🎨" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveCategory = (categoryData: Omit<Category, "id"> & { id?: string }) => {
    if (categoryData.id) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryData.id
            ? { ...category, name: categoryData.name, icon: categoryData.icon }
            : category
        )
      );
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: categoryData.name,
        icon: categoryData.icon,
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleDeleteClick = (categoryId: string) => {
    setDeletingCategoryId(categoryId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingCategoryId) {
      setCategories((prev) => prev.filter((category) => category.id !== deletingCategoryId));
      setDeletingCategoryId(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl mb-1">类型管理</h2>
              <p className="text-sm text-muted-foreground">
                管理您的所有应用类型
              </p>
            </div>
            <Button onClick={handleAddNew}>
              <Plus className="size-4" />
              新增类型
            </Button>
          </div>

          <div className="bg-card rounded-lg border border-border">
            <div className="p-4 border-b border-border">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="搜索类型名称或ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>类型名称</TableHead>
                  <TableHead>类型ID</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                      {searchQuery ? "未找到匹配的类型" : "暂无类型"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {category.id}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(category)}>
                              <Pencil className="size-4" />
                              编辑
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleDeleteClick(category.id)}
                            >
                              <Trash2 className="size-4" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <div className="px-4 py-3 border-t border-border text-sm text-muted-foreground">
              共 {filteredCategories.length} 个类型
            </div>
          </div>
        </div>
      </div>

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={editingCategory}
        onSave={handleSaveCategory}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除这个类型吗？此操作无法撤销。
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
    </>
  );
}
