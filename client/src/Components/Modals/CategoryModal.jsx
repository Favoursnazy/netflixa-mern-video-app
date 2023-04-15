import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import { Input } from "../UsedInputs";
import MainModal from "./MainModal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  createCategoriesAction,
  updateCategoryAction,
} from "../../Redux/Actions/categoryAction";

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createCategory
  );
  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state) => state.updateCategory);

  //Handle create Category
  const createAndUpdateCategoryHandler = (e) => {
    e.preventDefault();
    if (title) {
      //if category is not empty then updtae else create a new category
      if (category) {
        dispatch(updateCategoryAction(category?._id, { title: title }));
        setModalOpen(!modalOpen);
      } else {
        dispatch(createCategoriesAction({ title: title }));
        setTitle("");
        setModalOpen(!modalOpen);
      }
    } else {
      toast.error("Please write a category title");
    }
  };

  //useEffect
  useEffect(() => {
    //error
    if (upError || isError) {
      toast.error(isError);
      dispatch({
        type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }

    //success
    if (isSuccess || upSuccess) {
      dispatch({
        type: isSuccess ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }
    //if category is not null then set title to category title
    if (category) {
      setTitle(category?.title);
    }

    //if modal is closed then set title to empty
    if (modalOpen === false) setTitle("");
  }, [dispatch, isError, upSuccess, category, upError, isSuccess, modalOpen]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold ">
          {category ? "Update" : "Create"}
        </h2>
        <form
          onSubmit={createAndUpdateCategoryHandler}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <Input
            placeholder="Actions"
            bg={false}
            type="text"
            label="Category Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading || upLoading}
            className="w-full flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {isLoading || upLoading ? (
              "Loading..."
            ) : category ? (
              <>
                <FaEdit /> Update Category
              </>
            ) : (
              <>
                <HiPlusCircle /> Add Category
              </>
            )}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CategoryModal;
