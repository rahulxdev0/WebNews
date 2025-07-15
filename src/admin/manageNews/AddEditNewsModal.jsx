import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { useGetCategoriesQuery } from '../../store/api/categoryEndpoints';
import { useGetAreasQuery } from '../../store/api/areaEndpoints';
import { useCreateNewsMutation, usePartialUpdateNewsMutation } from '../../store/api/newsEndpoints';

const { TextArea } = Input;

const AddEditNewsModal = ({ visible, onCancel, news }) => {
  const [form] = Form.useForm();
  const [createNews] = useCreateNewsMutation();
  const [updateNews] = usePartialUpdateNewsMutation();
  const [fileList, setFileList] = useState([]);
  const { data: categories } = useGetCategoriesQuery();
  const { data: areas } = useGetAreasQuery();
  const [messageApi, contextHolder] = message.useMessage();

  React.useEffect(() => {
    if (news) {
      form.setFieldsValue({
        title: news.title,
        content: news.content,
        category_id: news.category_id,
        area_id: news.area_id,
      });
      if (news.image) {
        setFileList([{
          uid: '-1',
          name: 'current_image',
          status: 'done',
          url: news.image,
        }]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [news, form]);

  // const handleSubmit = async (values) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('title', values.title);
  //     formData.append('content', values.content);
  //     formData.append('category_id', values.category_id);
  //     formData.append('area_id', values.area_id);
      
  //     // Handle image upload properly
  //     if (fileList.length > 0 && fileList[0].originFileObj) {
  //       formData.append('image', fileList[0].originFileObj);
  //     }

  //     if (news) {
  //       await updateNews({ id: news.id, formData }).unwrap();
  //       messageApi.success('News updated successfully');
  //     } else {
  //       await createNews(formData).unwrap();
  //       messageApi.success('News created successfully');
  //     }
  //     onCancel();
  //   } catch (err) {
  //     console.error('Error saving news:', err);
  //     messageApi.error('Failed to save news');
  //   }
  // };

  // const uploadProps = {
  //   onRemove: () => {
  //     setFileList([]);
  //   },
  //   beforeUpload: (file) => {
  //     setFileList([file]);
  //     return false;
  //   },
  //   fileList,
  // };
  const handleSubmit = async (values) => {
  try {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('category_id', values.category_id);
    formData.append('area_id', values.area_id);
    
    // Log form values
    console.log('Form values:', values);
    
    console.log('File list:', fileList);
    
    // Handle image upload
    // if (fileList.length > 0 && fileList[0].originFileObj) {
    //   formData.append('image', fileList[0].originFileObj);
    //   console.log('Image file:', fileList[0]);
    // }
    if (fileList.length > 0 && fileList[0]) {
  // Directly use the file object since it's not wrapped
  formData.append('image', fileList[0]);
  console.log('Image file details:', {
    name: fileList[0].name,
    size: fileList[0].size,
    type: fileList[0].type,
    lastModified: new Date(fileList[0].lastModified)
  });
}

    // Log FormData contents (for debugging)
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (news) {
      const result = await updateNews({ id: news.id, formData }).unwrap();
      console.log('Update response:', result);
      messageApi.success('News updated successfully');
    } else {
      const result = await createNews(formData).unwrap();
      console.log('Create response:', result);
      messageApi.success('News created successfully');
    }
    onCancel();
  } catch (err) {
    console.error('Error saving news:', err);
    messageApi.error(err.data?.message || 'Failed to save news');
  }
};
  const uploadProps = {
  onRemove: () => {
    setFileList([]);
  },
  beforeUpload: (file) => {
    // Validate file type
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      messageApi.error('You can only upload image files!');
      return false;
    }
    
    // Validate file size (e.g., 2MB limit)
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageApi.error('Image must be smaller than 2MB!');
      return false;
    }
    
    setFileList([file]);
    return false; // Prevent automatic upload
  },
  fileList,
  maxCount: 1, // Allow only one file
  accept: 'image/*', // Accept only image files
};

  return (
    <>
      {contextHolder}
      <Modal
        title={news ? 'Edit News' : 'Add News'}
        open={visible}
        onOk={() => form.submit()}
        onCancel={onCancel}
        okText={news ? 'Update' : 'Create'}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input news title!' }]}
          >
            <Input placeholder="Enter news title" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please input news content!' }]}
          >
            <TextArea rows={6} placeholder="Enter news content" />
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true, message: 'Please select category!' }]}
          >
            <Select
              placeholder="Select category"
              options={categories?.map(category => ({
                value: category.id,
                label: category.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="area_id"
            label="Area"
            rules={[{ required: true, message: 'Please select area!' }]}
          >
            <Select
              placeholder="Select area"
              options={areas?.map(area => ({
                value: area.id,
                label: `${area.name} (${area.district?.name || 'Unknown'})`,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Image"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEditNewsModal;