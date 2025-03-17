import React, { useState } from 'react';
import { Table, Pagination, Input, Select, Button, Spin, Alert, ConfigProvider } from 'antd';
import { useData } from './DataContext';

const { Search } = Input;
const { Option } = Select;

const ProductTable: React.FC = () => {
  const { products, loading, error, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, selectedRating, setSelectedRating } = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Unique categories for the dropdown
  const categories = [...new Set(products.map(product => product.category))];
  const ratings = [1, 2, 3, 4, 5];

  // Filtered products based on search term, category, and rating
  const filteredProducts = products.filter(product => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedRating ? product.rating.rate >= selectedRating : true)
    );
  });

  // Paginated data
  const paginatedData = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedRating(null);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Count',
      dataIndex: 'rating',
      key: 'count',
      render: (rating: { count: number }) => rating.count,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: { rate: number; count: number }) => `${rating.rate} / 5`,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff', // Primary color
         
        },
      }}
    >
      <div style={{ padding: '1.25em', maxWidth: '75em', margin: '0 auto' }}>
        {/* Filters Section */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1em',
            marginBottom: '1.5em',
          }}
        >
          {/* Search Bar */}
          <Search
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, minWidth: '12.5em' }}
          />

          {/* Category Filter */}
          <Select
            placeholder="Filter by category"
            value={selectedCategory || undefined}
            onChange={(value) => setSelectedCategory(value)}
            style={{ flex: 1, minWidth: '12.5em' }}
          >
            <Option value="">All Categories</Option>
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>

          {/* Rating Filter */}
          <Select
            placeholder="Filter by rating"
            value={selectedRating || undefined}
            onChange={(value) => setSelectedRating(value)}
            style={{ flex: 1, minWidth: '12.5em' }}
          >
            <Option value="">All Ratings</Option>
            {ratings.map(rating => (
              <Option key={rating} value={rating}>{rating} stars & up</Option>
            ))}
          </Select>

          {/* Reset Filters Button */}
          <Button
            type="primary"
            onClick={resetFilters}
            style={{ flex: 1, minWidth: '12.5em',}}
          >
            Reset Filters
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '1em' }}
          />
        )}

        {/* Loading Spinner */}
        {loading ? (
          <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25em' }} />
        ) : (
          <>
            {/* Product Table */}
            <Table 
              dataSource={paginatedData}
              columns={columns}
              loading={loading}
              pagination={false}
              rowKey="id"
              style={{ overflowX: 'auto' }}
            />

            {/* Pagination */}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredProducts.length}
              onChange={(page) => setCurrentPage(page)}
              style={{ marginTop: '1em', textAlign: 'right' }}
            />
          </>
        )}
      </div>
    </ConfigProvider>
  );
};

export default ProductTable;