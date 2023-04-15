import React, { useEffect, useState } from "react";
import SideBar from "../../../../Layout/Sidebar/Sidebar";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../../Components/Table2";
import CategoryModal from "../../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAction } from "../../../../Redux/Actions/categoryAction";
import Loader from "../../../../utils/Notifications/Loader";
import Empty from "../../../../utils/Notifications/Empty";
import toast from "react-hot-toast";

const MovieList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  //all categories
  const { categories, isLoading } = useSelector(
    (state) => state.getAllCategory
  );

  //delete category
  const { isSuccess, isError } = useSelector((state) => state.deleteCatgory);
  const HandleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category")) {
      dispatch(deleteCategoryAction(id));
    }
  };

  const OnEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    //get all categories
    if (modalOpen === false) {
      setCategory("");
    }
    //check if error
    if (isError) {
      toast.error(isError);
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }
    //if succefull
    if (isSuccess) {
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }
  }, [modalOpen, dispatch, isError, isSuccess]);

  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Create
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteFunction={HandleDeleteCategory}
          />
        ) : (
          <Empty message="You Have No Categories Yet, Please Creat One " />
        )}
      </div>
    </SideBar>
  );
};

export default MovieList;
