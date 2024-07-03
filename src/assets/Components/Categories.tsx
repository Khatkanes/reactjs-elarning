import React, { useState, useEffect } from 'react';
import Axios from 'axios';

interface Course {
  category: string;
  description: string;
  id: number;
  name: string;
}

interface CategoriesProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}


const Categories: React.FC<CategoriesProps> = ({ selectedCategory, onCategoryChange }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    Axios.get(`https://f4c4351a-8914-43cf-aa7e-63f81b740b51-00-34me01lms6ol3.pike.replit.dev/courses`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const uniqueCategories = ['All', ...new Set(courses.map(course => course.category))];

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category === 'All' ? null : category);
  };

  return (
    <div className='cate'>
      {uniqueCategories.map(category => (
        <button 
          className='cate-btn'
          key={category}
          style={{
            borderRadius: 80,backgroundColor: category === selectedCategory ? '#393E46' : '#222831'
          }}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;