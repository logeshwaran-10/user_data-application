import React from "react";
import { Modal, Flex, Button } from "antd";

const ModalForm = ({
  title,
  showModal,
  handleCancel,
  children,
  okText,
  onOk,
  cancelText,
}) => {
  return (
    <Flex vertical gap="middle" align="flex-start">
      <Modal
        title={title}
        centered
        closable={true}
        destroyOnClose
        open={showModal}
        onCancel={handleCancel}
        footer={
          okText
            ? [
                <Button key="cancel" onClick={handleCancel}>
                  {cancelText || "Cancel"}
                </Button>,
                <Button key="ok" type="primary" onClick={onOk}>
                  {okText}
                </Button>,
              ]
            : null
        }
      >
        {children}
      </Modal>
    </Flex>
  );
};

export default ModalForm;
