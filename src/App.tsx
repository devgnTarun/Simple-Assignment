import { Fragment, useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getProducts } from './action';
import { useSearchParams } from 'react-router-dom';
import { ProductDes } from './types';
import ProductCard from './components/ProductCard';

function App() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [productList, setProductList] = useState<ProductDes[]>([]);

  const { products, error, loading, totalProducts } = useSelector((state: any) => state.products);
  const { category } = useSelector((state: any) => state.category);

  const query = searchParams.get('s') || '';
  const categoryParam = searchParams.get('category') || '';
  const limit = 10;

  useEffect(() => {
    dispatch(getCategory() as any);
  }, [dispatch]);

  useEffect(() => {

    if (page === 1) {
      setProductList([]);
    }

    dispatch(getProducts({ query, category: categoryParam, page, limit }) as any);
  }, [query, categoryParam, page, dispatch]);


  useEffect(() => {
    if (page === 1) {
      setProductList(products);
    } else {
      setProductList((prevProducts) => [...prevProducts, ...products]);
    }
  }, [products, page]);


  useEffect(() => {
    if (productList.length >= totalProducts) {
      setHasMore(false);
    }
  }, [productList.length, totalProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchField = (e.target as HTMLFormElement).elements.namedItem('search') as HTMLInputElement;
    const newParams: any = { s: searchField.value };
    setSearchParams(newParams);
    setPage(1);
    setHasMore(true);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'All') {
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);
        params.delete('category');
        return params;
      });
    } else {
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);
        params.set('category', selectedCategory);
        params.delete('s');
        return params;
      });
    }
    setPage(1);
    setHasMore(true);
  };

  // Infinite scroll 
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 &&
      !loading &&
      hasMore
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <Fragment>
      <div className='flex flex-col max-w-[500px] mx-auto min-h-screen items-center px-4'>
        <h1 className='text-gray-800 font-bold my-3 text-4xl mb-6'>
          Cool <span className='text-blue-700'>Products</span>
        </h1>

        {/* Filters */}
        <form onSubmit={handleSearch} className='flex gap-[10px] px-3 py-4 rounded-xl shadow-sm w-full'>
          <select
            value={categoryParam}
            onChange={handleCategoryChange}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
          >
            <option value="All">All</option>
            {category && category.map((e: string, index: number) =>
              <option key={index} value={e} className="capitalize">{e}</option>
            )}
          </select>
          <div className="relative w-full">
            <input defaultValue={query} type="text" id="search" name='search' className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Search any product..." required />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>

        {/* Products */}
        <div className='flex flex-wrap mt-[20px] gap-[5px]'>
          {loading && page === 1 ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            productList.map((product: ProductDes, index: number) => (
              <ProductCard key={index} product={product} />
            ))
          )}
        </div>

        {/* Show loading message when fetching more products */}
        {loading && page > 1 && productList?.length < 10 && <p className='h-[100px] flex items-center justify-center w-full text-gray-900 font-semibold'>Loading more products...</p>}
      </div>
    </Fragment>
  );
}

export default App;
