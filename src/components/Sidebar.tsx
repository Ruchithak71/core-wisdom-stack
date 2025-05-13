
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  BarChart, 
  Compass, 
  Users, 
  FileQuestion, 
  Settings, 
  FolderPlus, 
  MessageCircle,
  Library,
  Search,
  Home,
  Folder,
  BarChart2,
  FileUp,
  Code,
  Server,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { categories } from '@/data/mockData';

interface SidebarProps {
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const mainNavItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/' },
    { name: 'Browse', icon: <Compass className="h-5 w-5" />, path: '/browse' },
    { name: 'My Files', icon: <FileText className="h-5 w-5" />, path: '/my-files' },
    { name: 'Create New', icon: <FolderPlus className="h-5 w-5" />, path: '/create' },
  ];

  const libraryNavItems = categories.map((category) => {
    let icon;
    switch (category.icon) {
      case 'FileText':
        icon = <FileText className="h-5 w-5" />;
        break;
      case 'Lightbulb':
        icon = <Lightbulb className="h-5 w-5" />;
        break;
      case 'Code':
        icon = <Code className="h-5 w-5" />;
        break;
      case 'Server':
        icon = <Server className="h-5 w-5" />;
        break;
      case 'Users':
        icon = <Users className="h-5 w-5" />;
        break;
      default:
        icon = <Folder className="h-5 w-5" />;
    }
    
    return {
      name: category.name,
      icon: icon,
      path: `/category/${category.id}`,
      id: category.id
    };
  });

  const toolsNavItems = [
    { name: 'Analytics', icon: <BarChart2 className="h-5 w-5" />, path: '/analytics' },
    { name: 'Discussions', icon: <MessageCircle className="h-5 w-5" />, path: '/discussions' },
    { name: 'FAQs', icon: <FileQuestion className="h-5 w-5" />, path: '/faqs' },
    { name: 'Upload Files', icon: <FileUp className="h-5 w-5" />, path: '/upload' },
  ];

  return (
    <div className="h-full border-r bg-sidebar text-sidebar-foreground w-64 p-3 flex flex-col gap-2">
      <ScrollArea className="flex-1">
        <div className="space-y-5">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Button
                key={item.name}
                variant={activePage === item.path ? 'secondary' : 'ghost'}
                className={cn(
                  "w-full justify-start",
                  activePage === item.path
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
                asChild
              >
                <Link to={item.path}>
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              </Button>
            ))}
          </div>

          <div className="space-y-1">
            <h3 className="px-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
              Library
            </h3>
            {libraryNavItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                asChild
              >
                <Link to={item.path}>
                  {item.icon}
                  <span className="ml-2 truncate">{item.name}</span>
                </Link>
              </Button>
            ))}
          </div>

          <div className="space-y-1">
            <h3 className="px-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
              Tools
            </h3>
            {toolsNavItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                asChild
              >
                <Link to={item.path}>
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="pt-2">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          asChild
        >
          <Link to="/settings">
            <Settings className="h-5 w-5" />
            <span className="ml-2">Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
