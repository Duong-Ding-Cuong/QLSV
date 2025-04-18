import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm, Space, Modal, Form, Input, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import Banner from '../components/layout/Banner';
import MenuNav from '../components/layout/MenuNav';
import FooterComponent from '../components/layout/FooterComponent';
import Header from '../components/layout/Header';

const AdminPage = () => {
  const [students, setStudents] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [editingStudent, setEditingStudent] = useState(null); // Student being edited
  const [form] = Form.useForm(); // Form instance for modal

  // Fetch student data from API
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('https://qlsv-tbkt.onrender.com/v1/student', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log response to inspect structure
      console.log('API Response:', response.data);

      // Normalize data to ensure it's an array
      let data = response.data;
      if (!Array.isArray(data)) {
        if (data?.data) data = data.data; // e.g., { data: [...] }
        else if (data?.students) data = data.students; // e.g., { students: [...] }
        else data = []; // Fallback to empty array
      }

      // Ensure data is an array
      if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        message.error('Invalid data format from API!');
        setStudents([]);
        return;
      }

      // Map data to ensure consistent structure
      const normalizedData = data.map((item) => ({
        id: item.id || item._id || 'Unknown', // Handle different ID formats
        name: item.name || 'Unknown',
        email: item.email || 'Unknown',
      }));

      setStudents(normalizedData);
      message.success('Loaded student data successfully!');
    } catch (error) {
      console.error('Fetch students error:', error);
      message.error('Failed to load student data!');
      setStudents([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Delete a student
  const handleDelete = async (studentId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`https://qlsv-tbkt.onrender.com/v1/student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(students.filter((student) => student.id !== studentId));
      message.success('Student deleted successfully!');
    } catch (error) {
      console.error('Delete student error:', error);
      message.error('Failed to delete student!');
    }
  };

  // Open modal for editing
  const handleEdit = (student) => {
    setEditingStudent(student);
    form.setFieldsValue(student); // Populate form with student data
    setIsModalVisible(true);
  };

  // Handle modal form submission
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem('accessToken');

      // Send update request to API
      await axios.put(
        `https://qlsv-tbkt.onrender.com/v1/student/${editingStudent.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update student in state
      setStudents(
        students.map((student) =>
          student.id === editingStudent.id ? { ...student, ...values } : student
        )
      );

      message.success('Student updated successfully!');
      setIsModalVisible(false);
      form.resetFields();
      setEditingStudent(null);
    } catch (error) {
      console.error('Update student error:', error);
      message.error('Failed to update student!');
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingStudent(null);
  };

  // Define table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn thực sự muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Fetch data on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <MenuNav />
      <div style={{ padding: '50px' }}>
        <h2 className="text-center mb-5">Quản lí sinh viên</h2>
        <Table
          columns={columns}
          dataSource={students}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Student"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default AdminPage;