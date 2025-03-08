// Dependencies
import React, { useState } from "react";
import { Space, Card, Row, Col, Typography, Divider } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
} from "@ant-design/icons";

//Components
import GenerateAvatar from "../../component/shared/generateAvatar";
import Modal from "../shared/Modal";

const { Meta } = Card;
const { Text, Link } = Typography;

const labels = [
  { key: "email", icon: <MailOutlined />, copyable: true },
  { key: "phone", icon: <PhoneOutlined />, copyable: false },
  { key: "website", icon: <GlobalOutlined />, copyable: false },
];

function ListCard({ usersList, handleAction }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = () => {
    handleAction({ action: "delete", data: selectedUser });
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="user-card">
      <Row gutter={[20, 20]}>
        {usersList &&
          usersList.map((user) => (
            <Col key={user?.id} xs={24} sm={12} lg={8} xl={6} xxl={4}>
              <Card
                hoverable
                cover={
                  <>
                    <GenerateAvatar name={user?.username} />
                    <Divider />
                  </>
                }
                actions={[
                  <span
                    key="like"
                    className={`icon like ${user?.liked ? "liked" : ""}`}
                    onClick={() => handleAction({ action: "like", data: user })}
                  >
                    {user?.liked ? <HeartFilled /> : <HeartOutlined />}
                  </span>,
                  <EditOutlined
                    key="edit"
                    onClick={() => handleAction({ action: "edit", data: user })}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDeleteClick(user)}
                  />,
                ]}
              >
                <Space>
                  <Meta
                    title={user?.name}
                    description={
                      <div>
                        {labels.map((list, index) => (
                          <div key={`des-${index}`}>
                            <Space>
                              {list?.icon}
                              {list?.key === "website" ? (
                                <Link
                                  type="secondary"
                                  href={`https://${user?.[list?.key]}`}
                                  target="_blank"
                                >
                                  {user?.[list?.key]}
                                </Link>
                              ) : (
                                <Text
                                  type="secondary"
                                  copyable={list?.copyable}
                                >
                                  {user?.[list?.key]}
                                </Text>
                              )}
                            </Space>
                          </div>
                        ))}
                      </div>
                    }
                  />
                </Space>
              </Card>
            </Col>
          ))}
      </Row>

      <Modal
        title="Confirm"
        showModal={showModal}
        onOk={confirmDelete}
        handleCancel={() => setShowModal(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <Text>Are you sure you want to delete?</Text>
      </Modal>
    </div>
  );
}

export default ListCard;
