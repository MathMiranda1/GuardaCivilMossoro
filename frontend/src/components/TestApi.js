import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestApi = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/up')
      .then(response => setData(response.data))
      .catch(error => setData(error.message));
  }, []);

  return (
    <div>
      <h2>Teste de Integração com o Back-End</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestApi;
