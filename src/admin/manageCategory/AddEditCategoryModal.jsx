import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useCreateCategoryMutation, usePartialUpdateCategoryMutation } from '../../store/api/categoryEndpoints';

const AddEditCategoryModal = ({ visible, onCancel, category }) => {
  const [form] = Form.useForm();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = usePartialUpdateCategoryMutation();
  const [messageApi, contextHolder] = message.useMessage();

  React.useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);

  const handleSubmit = async (values) => {
    try {
      if (category) {
        await updateCategory({ id: category.id, ...values }).unwrap();
        messageApi.success('Category updated successfully');
      } else {
        await createCategory(values).unwrap();
        messageApi.success('Category created successfully');
      }
      onCancel();
    } catch (err) {
      messageApi.error('Failed to save category');
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={category ? 'Edit Category' : 'Add Category'}
        open={visible}
        onOk={() => form.submit()}
        onCancel={onCancel}
        okText={category ? 'Update' : 'Create'}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please input category name!' }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEditCategoryModal;