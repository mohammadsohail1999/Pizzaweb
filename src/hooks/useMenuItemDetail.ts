import React, { useEffect, useState } from 'react';

const useMenuItemDetail = (deps = [], id: string) => {
  const [menuItemDetail, setMenuItemDetail] = useState(null);

  useEffect(
    () => {
      if (id) {
        fetch(`/api/menu-items/${id}`)
          .then((res) => res.json())
          .then((res) => setMenuItemDetail(res));
      }
    },
    deps?.length ? deps : []
  );

  return { menuItemDetail };
};

export default useMenuItemDetail;
