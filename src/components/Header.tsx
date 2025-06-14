
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-600">LocalMart</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Categories</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Stores</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Deals</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={onCartClick}
              className="relative flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
