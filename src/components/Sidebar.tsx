import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Home, Calendar, ClipboardList } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { path: '/reserve', label: 'Reserve a Spot', icon: <Calendar className="h-5 w-5" /> },
    { path: '/my-reservations', label: 'My Reservations', icon: <ClipboardList className="h-5 w-5" /> },
  ];

  return (
    <div className="hidden border-r bg-white md:block w-64">
      <div className="flex flex-col gap-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              location.pathname === item.path ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;