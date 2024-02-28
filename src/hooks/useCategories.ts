import { useEffect, useState } from 'react';

const useCategories = (deps = []) => {
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(
    () => {
      setCategoryLoading(true);
      fetch('/api/category', {
        method: 'get',
      })
        .then((res) => res.json())
        .then((res) => setCategories(res))
        .finally(() => {
          setCategoryLoading(false);
        });
    },
    deps?.length ? [...deps] : []
  );

  return { categoryLoading, categories };
};

export default useCategories;
