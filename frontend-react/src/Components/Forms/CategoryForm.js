import React from "react";

const CategoryForm = ({ submitForm, newCategory, setNewCategory }) => {
  return (
    <>
      <div className="bg-light p-2">
        <form onSubmit={submitForm}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-outline-info m-3">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default CategoryForm;
