'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { ChevronsUpDown, FileText, Plus, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const mockPages = [
  {
    id: '1',
    name: 'tech',
  },
  {
    id: '2',
    name: 'college',
  },
  {
    id: '3',
    name: 'gf',
  },
];

export function AppSidebar() {
  const [pages, setPages] = useState(mockPages);
  const [newPageTitle, setNewPageTitle] = useState('');

  // Todo - get session from auth
  const session = true;

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

      <SidebarFooter>
        <SidebarGroup>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer ring-0">
                <SidebarMenuButton className="w-full justify-between gap-3 h-12">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 rounded-md" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground">
                        john@example.com
                      </span>
                    </div>
                  </div>
                  <ChevronsUpDown className="h-5 w-5 rounded-md" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => console.log('add auth  ')}
              className="w-full"
            >
              Sign In
            </Button>
          )}
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
