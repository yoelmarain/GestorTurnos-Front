import { NavLink } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  end: boolean;
}

interface HeaderProps {
  navItems: NavItem[];
}

export function Header({ navItems }: HeaderProps) {
  return (
    <header className="w-full bg-black/40 shadow-md shadow-white/20 flex direction-row items-center">
        <div className="flex flex-col items-center px-4">
                <img 
                    src="/logo.png" 
                    alt="Barber House Logo" 
                    className="h-24 w-auto drop-shadow-2xl"
                />
        </div>
      <nav className="container mx-auto py-4">
        <ul className="flex items-center justify-start space-x-4">
          {navItems.map((item, index) => (
            <li key={index} className="group">
              <NavLink
                to={item.to}
                end={item.end}
                className="block"
              >
                {({ isActive }) => (
                  <div className={`flex flex-col items-center p-2 rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-gray-800/80 border border-gray-600"
                        : "bg-transparent group-hover:bg-gray-800/50"
                    }`}>
                    <span className={`text-lg font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-gray-300 group-hover:text-white"
                    }`}>
                      {item.label}
                    </span>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
