'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const mockPages = [
  {
    id: '1',
    name: 'tech',
  },
  {
    id: '3',
    name: 'college',
  },
  {
    id: '4',
    name: 'gf',
  },
];

export function AppSidebar() {
  const [pages, setPages] = useState(mockPages);
  const [newPageTitle, setNewPageTitle] = useState('');

  const handleAddPage = () => {
    if (!newPageTitle.trim()) return;

    setPages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newPageTitle,
      },
    ]);

    setNewPageTitle('');
  };

  const handleDeletePage = (id: string) => {
    setPages((prev) => prev.filter((page) => page.id !== id));
  };

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="flex flex-row justify-between md:justify-center p-4">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-xl font-bold font-mono">Note0</h1>
        </div>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center gap-2 px-2 mb-2">
              <Input
                placeholder="New page title..."
                value={newPageTitle}
                onChange={(e) => setNewPageTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddPage();
                }}
                className="h-8"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleAddPage}
                disabled={!newPageTitle.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </SidebarGroupContent>

          <SidebarMenu>
            {pages.map((page) => (
              <SidebarMenuItem key={page.id}>
                <SidebarMenuButton>
                  <FileText className="w-4 h-4" />
                  <span>{page.name}</span>
                </SidebarMenuButton>
                <SidebarMenuAction
                  className="hover:text-destructive cursor-pointer"
                  onClick={() => handleDeletePage(page.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </SidebarMenuAction>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
