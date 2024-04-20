import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Loader } from './components/Loader';

interface dat {
  ip: string;
}

export interface Root {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
  readme: string;
}

function App() {
  const [result, setResult] = useState<string>(''.trim());
  const [data, setData] = useState<Root>({} as Root);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fun = async () => {
      const data = (await axios.get<dat>('https://api.ipify.org/?format=json')).data;
      setResult(data.ip);
    };
    fun();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (result) {
      const fun = async () => {
        try {
          const data = (await axios.get<Root>(`https://ipinfo.io/${result}/geo`)).data;
          setData(data);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      fun();
    }
  }, [result]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Ваша IP-информация </h1>
          <h2>{`Ваш город - ${data.city}`}</h2>
          <h2>{`Ваш регион - ${data.region}`}</h2>
          <h2>{`Time зона - ${data.timezone}`}</h2>
          <h2>{`IP адрес - ${data.ip}`}</h2>
          <h2>{`Организация - ${data.org}`}</h2>
          <h2>{`Почтовый Индекс - ${data.postal}`}</h2>
          <h2>{`Страна - ${data.country}`}</h2>
        </div>
      )}
    </>
  );
}

export default App;
