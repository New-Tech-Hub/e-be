import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  currency: string;
  categories?: {
    name: string;
    slug: string;
  };
}

interface SearchBarProps {
  onClose?: () => void;
  className?: string;
}

const SearchBar = ({ onClose, className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            id,
            name,
            price,
            image_url,
            currency,
            categories (
              name,
              slug
            )
          `)
          .ilike('name', `%${query}%`)
          .eq('is_active', true)
          .limit(8);

        if (error) throw error;
        setResults(data || []);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleResultClick = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    onClose?.();
  };

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setResults([]);
      setShowResults(false);
      onClose?.();
    }
  };

  const formatCurrency = (amount: number, currency: string = 'NGN') => {
    if (currency === 'NGN') {
      return `₦${amount.toLocaleString()}`;
    }
    return `${currency} ${amount.toLocaleString()}`;
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 cursor-pointer" 
          onClick={handleSearch}
        />
        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
          onFocus={() => query.length >= 2 && setShowResults(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e);
            }
          }}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => {
              setQuery("");
              setResults([]);
              setShowResults(false);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </form>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-2">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground">No products found for "{query}"</p>
            </div>
          ) : (
            <div className="p-2">
              <p className="text-xs text-muted-foreground px-2 py-1 mb-2">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/${product.categories?.slug || 'products'}`}
                  onClick={handleResultClick}
                  className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gold">
                        {formatCurrency(product.price, product.currency)}
                      </p>
                      {product.categories && (
                        <span className="text-xs text-muted-foreground">
                          {product.categories.name}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default SearchBar;