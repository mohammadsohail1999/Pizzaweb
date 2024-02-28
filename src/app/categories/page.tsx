'use client';
import React, { useEffect, useState } from 'react';
import authHoc from '../Hoc/AuthHoc';
import { redirect } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import useCategories from '@/hooks/useCategories';
import CircularLoader from '@/components/loader/CircularLoader';
import { BiEdit } from 'react-icons/bi';

const CategoriesPage = ({ profile }) => {
  const [newCat, setNewCategory] = useState('');

  const [callHook, setcallHook] = useState({});

  const { categories, categoryLoading } = useCategories([callHook]);

  const [editCategory, setEditCategory] = useState(null);

  if (profile && profile?.admin === false) {
    return redirect('/profile');
  }

  const submitHandler = async (e: React.FormEvent<SubmitEvent>) => {
    e.preventDefault();

    if (newCat) {
      fetch('/api/category', {
        method: editCategory ? 'PUT' : 'POST',
        body: JSON.stringify(
          editCategory
            ? {
                name: newCat,
                _id: editCategory?._id,
              }
            : {
                name: newCat,
              }
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.ok) {
          setcallHook({ ...callHook });
        }
      });

      if (editCategory) {
        setEditCategory(null);
      }

      setNewCategory('');
    }
  };

  return (
    <AdminLayout admin={profile ? profile?.admin : false}>
      <CircularLoader open={categoryLoading} handleClose={() => {}} />
      <form className="mt-8" onSubmit={submitHandler}>
        <div>
          <div>
            <label htmlFor="cat">
              {editCategory ? 'Update' : 'New'} category name
            </label>
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => setNewCategory(e.target.value)}
                id="cat"
                type="text"
                value={newCat}
                placeholder="Enter Category"
                className="grow"
              />
              <button className="bg-primary basis-36 text-white">
                {editCategory ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div>
        {categories?.length ? (
          <div className="space-y-3 mt-4">
            <h3 className="font-semibold">Edit Category:</h3>
            {categories?.map((cat) => {
              return (
                <button
                  key={cat?._id}
                  className="bg-gray-200 rounded-xl p-2 px-4 flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    setEditCategory(cat);
                    setNewCategory(cat?.name);
                  }}
                >
                  <span>{cat?.name}</span>
                  <BiEdit />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default authHoc(CategoriesPage);
