// Dependencies
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Spin } from "antd";
import { debounce } from "lodash";

// Actions
import { getUsersList } from "../../redux/users/reducer";

// Components
import { LoadingOutlined } from "@ant-design/icons";
import UserListCard from "../../component/userList/UserListCard";
import ModalForm from "../../component/shared/Modal";
import UserForm from "../../component/shared/userForm";

function UsersList() {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.UserReducer.usersList);
  const loader = useSelector((state) => state.UserReducer.loading);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (!usersList.length) dispatch(getUsersList());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredUsers(usersList);
  }, [usersList]);

  //eslint-disable-next-line
  const onSearch = useCallback(
    debounce((event) => {
      const query = event.target.value.trim().toLowerCase();
      if (query) {
        const filtered = usersList.filter((user) =>
          [user.name, user.email, user.phone].some((field) =>
            field?.toLowerCase().includes(query)
          )
        );
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers(usersList);
      }
    }, 500),
    [usersList]
  );

  const handleAction = ({ action, data }) => {
    if (action === "like") {
      const updatedData = filteredUsers.map((user) => {
        if (user?.id === data?.id) {
          return { ...user, liked: !user?.liked };
        }
        return user;
      });
      setFilteredUsers(updatedData);
    } else if (action === "delete") {
      const updatedData = filteredUsers.filter((user) => user?.id !== data?.id);
      setFilteredUsers(updatedData);
    } else {
      setShowModal(true);
      setSelectedUser(data);
    }
  };

  // Handle form submission
  const handleSubmit = (values) => {
    const updatedUsers = filteredUsers.map((user) =>
      user.id === selectedUser.id ? { ...user, ...values } : user
    );
    setFilteredUsers(updatedUsers);
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className={"user-container"}>
      <div className="search-bar">
        <Input
          placeholder="Search User"
          onChange={onSearch}
          disabled={loader}
          allowClear
          className="search"
        />
      </div>

      <div className={`${!filteredUsers?.length ? "no-data" : ""}`}>
        <Spin
          spinning={loader}
          indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
        >
          {filteredUsers?.length > 0 ? (
            <UserListCard
              usersList={filteredUsers}
              handleAction={handleAction}
            />
          ) : (
            <div>No Data</div>
          )}
        </Spin>
      </div>

      {showModal && (
        <ModalForm
          showModal={showModal}
          handleCancel={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          title={"User info"}
        >
          <UserForm
            data={selectedUser}
            handleSubmit={handleSubmit}
            handleCancel={() => setShowModal(false)}
          />
        </ModalForm>
      )}
    </div>
  );
}

export default UsersList;
