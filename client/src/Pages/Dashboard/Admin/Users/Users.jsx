import React, { useEffect } from "react";
import SideBar from "../../../../Layout/Sidebar/Sidebar";
import Table2 from "../../../../Components/Table2";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Empty from "../../../../utils/Notifications/Empty";
import Loader from "../../../../utils/Notifications/Loader";
import {
  deletetUsersAction,
  getAllUsersAction,
} from "../../../../Redux/Actions/userAction";

const UserList = () => {
  const dispatch = useDispatch();

  const { isError, isLoading, users } = useSelector(
    (state) => state.adminGetAllUsers
  );

  //delete movie from state
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );

  //delete movie handle
  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deletetUsersAction(id));
    }
  };

  useEffect(() => {
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET ",
      });
    }
    return () => dispatch(getAllUsersAction());
  }, [dispatch, isError, deleteError, isSuccess]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Users</h2>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFunction={deleteUserHandler}
          />
        ) : (
          <Empty message="We Have No Users Now!!!" />
        )}
      </div>
    </SideBar>
  );
};

export default UserList;
