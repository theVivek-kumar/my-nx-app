import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface DataContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
}

const DataContext = createContext<DataContextType>({
  products: [],
  loading: false,
  error: null,
  searchTerm: '',
  setSearchTerm: () => {},
  selectedCategory: '',
  setSelectedCategory: () => {},
  selectedRating: null,
  setSelectedRating: () => {},
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search term, category, and rating
  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = searchTerm.length < 3 || product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesRating = selectedRating ? product.rating.rate >= selectedRating : true;

    return matchesSearchTerm && matchesCategory && matchesRating;
  });

  return (
    <DataContext.Provider value={{ 
      products: filteredProducts, 
      loading, 
      error, 
      searchTerm, 
      setSearchTerm, 
      selectedCategory, 
      setSelectedCategory, 
      selectedRating, 
      setSelectedRating 
    }}>
      {children}
    </DataContext.Provider>
  );
};