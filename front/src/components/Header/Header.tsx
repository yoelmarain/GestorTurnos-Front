import { Link, useLocation } from "react-router-dom";

interface LinkItem {
  title: string;
  url: string;
  rol: string;
}

interface HeaderProps {
  linkItems: LinkItem[];
}

export function Header({ linkItems }: HeaderProps) {
  const location = useLocation();

  const isActive = (item: LinkItem) => {
    const targetPath = `${item.rol}/${item.title}`.toLowerCase();
    return location.pathname.toLowerCase().startsWith(`/${targetPath}`);
  };

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
          {linkItems.map((item, index) => (
            <li key={index} className="group">
              <Link
                to={`/${item.rol}/${item.url}`}
                className="block"
              >
                <div className={`flex flex-col items-center p-2 rounded-md transition-colors duration-200 ${
                    isActive(item)
                      ? "bg-gray-800/80 border border-gray-600" 
                      : "bg-transparent group-hover:bg-gray-800/50"
                  }`}>
                  <span className={`text-lg font-medium transition-colors duration-200 ${
                    isActive(item)
                      ? "text-white" 
                      : "text-gray-300 group-hover:text-white"
                  }`}>
                    {item.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
