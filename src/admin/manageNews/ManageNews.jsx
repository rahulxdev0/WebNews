import React, { useState } from "react";
import { Button, Card, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddEditNewsModal from "./AddEditNewsModal";
import NewsTable from "./NewsTable";
import { useGetNewsListQuery } from "../../store/api/newsEndpoints";

const ManageNews = () => {
  const { data: newsList, isLoading, isFetching } = useGetNewsListQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  console.log("news data", newsList);

  const handleAdd = () => {
    setSelectedNews(null);
    setModalVisible(true);
  };

  const handleEdit = (news) => {
    setSelectedNews(news);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedNews(null);
  };

  return (
    <Card
      title="Manage News"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add News
        </Button>
      }
    >
      <Spin spinning={isLoading || isFetching}>
        <NewsTable
          data={
            newsList ? (Array.isArray(newsList) ? newsList : [newsList]) : []
          }
          loading={isLoading}
          onEdit={handleEdit}
        />
      </Spin>

      <AddEditNewsModal
        visible={modalVisible}
        onCancel={handleModalClose}
        news={selectedNews}
      />
    </Card>
  );
};

export default ManageNews;
