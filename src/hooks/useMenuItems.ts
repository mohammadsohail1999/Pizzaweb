import React, { useEffect, useState } from 'react';

const useMenuItems = (deps = []) => {
  const [menuItemsLoading, setMenuItemLoading] = useState(false);
  const [menuItems, setMenuItems] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () => {
      setMenuItemLoading(true);

      fetch('/api/menu-items', {
        method: 'Get',
      })
        .then((res) => res.json())
        .then((response) => setMenuItems(response))
        .finally(() => {
          setMenuItemLoading(false);
        });
    },
    deps?.length ? deps : []
  );

  return { menuItems, menuItemsLoading };
};

export default useMenuItems;
