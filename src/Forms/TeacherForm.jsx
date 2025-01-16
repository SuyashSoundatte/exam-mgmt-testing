import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, ReactTable } from '../components/component.js';
import { useNavigate } from 'react-router-dom';

const TeacherForm = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/v1/getAllTeacher', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecords(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const teacherColumns = [
    {
      name: 'User ID',
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row) => row.fname,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lname,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={() => navigate(`/MainPage/TeacherMasterForm/${row.user_id}`)}>
          Add Files
        </button>
      ),
    },
  ];
  
  return (
    <div className="w-full max-w-8xl mx-auto p-4 space-y-6">
      <ReactTable records={records} loading={loading} error={error} customColumns={teacherColumns} />
    </div>
  );
};

export default TeacherForm;
