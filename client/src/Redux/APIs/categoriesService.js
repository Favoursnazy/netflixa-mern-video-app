import Axios from "./Axios";

//**************** PUBLIC API's ****************** */

//Get all categories API Function
export const getCategoriesService = async () => {
  const { data } = await Axios.get("/category");
  if (data) {
    return data;
  }
};

//******************* ADMIN API ********************* */

//create a new category API Function
export const createCategoryService = async (title, token) => {
  const { data } = await Axios.post("/category/create", title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data;
  }
};

//delete category API Function
export const deleteCategoryService = async (id, token) => {
  const { data } = await Axios.delete(`/category/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data;
  }
};

//Update category API Function
export const updateCategoryService = async (id, title, token) => {
  const { data } = await Axios.put(`/category/update/${id}`, title, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data;
  }
};
