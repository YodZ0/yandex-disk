import React, { useState } from 'react';

import { SlLogout } from 'react-icons/sl';

import API from '../../services/api.jsx';
import { useAuth } from '../../OAuthContext.jsx';

import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import Label from '../../components/Label/Label.jsx';
import ContentTable from '../../components/ContentTable/ContentTable.jsx';
import Empty from '../../components/Empty/Empty.jsx';

import './Content.css';

export default function Content() {
  const [isEmpty, setEmpty] = useState(true);
  const [public_key, setPublicKey] = useState('');
  const [contentData, setContentData] = useState([]);

  const { isLogged, logout } = useAuth();

  async function fetchData(event) {
    event.preventDefault();

    try {
      const response = await API.post('/v1/disk/public-resources', { public_key }, { withCredentials: true });
      if (response.data && response.data.public_resources) {
        const data = response.data.public_resources;
        setContentData(data);
        setEmpty(data.length === 0);
      } else {
        setEmpty(true);
      }
    } catch (error) {
      console.error(error);
      setEmpty(true);
    }
  }

  return (
    <div className="content-page">
      <div className="content-header">
        <Button title="Logout" icon={<SlLogout />} onClick={logout} />
        <h1 className="content-title">Данные диска</h1>
      </div>
      <Label position='left'>
        Public-key:
        <Input
          name="test"
          hint="Enter public-key"
          onChange={(e) => { setPublicKey(e.target.value) }}
        />
        <Button title="Load" onClick={fetchData} />
      </Label>

      <div className="content-container">
        {!isEmpty ? <ContentTable title="Tests" data={contentData} /> : <Empty />}
      </div>

    </div >
  );
};
