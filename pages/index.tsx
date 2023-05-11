import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper, TextField, Button } from '@material-ui/core';

interface IPAddress {
  rank: number;
  count: number;
  ip_address: string;
  country: string | null;
  hostname: string;
}

const IndexPage = () => {
  const [ipAddresses, setIpAddresses] = useState<IPAddress[]>([]);
  const [inputValue, setInputValue] = useState('');

  const fetchData = async (data: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:10000/api/top-ten-command?date=${data}`);
      console.log(response.data)
      setIpAddresses(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(inputValue);
  };

  return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          IPアドレス一覧
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
              label="Input"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              variant="outlined"
              style={{ marginRight: '1rem' }}
          />
          <Button type="submit" variant="contained" color="primary">
            送信
          </Button>
        </form>
        <Paper style={{ marginTop: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>順位</TableCell>
                <TableCell>回数</TableCell>
                <TableCell>IPアドレス</TableCell>
                <TableCell>国</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ipAddresses.map((ip, index) => (
                  ip.hostname === 'hanypod' ? <TableRow key={index}>
                    <TableCell>{ip.rank}</TableCell>
                    <TableCell>{ip.count}</TableCell>
                    <TableCell>{ip.ip_address}</TableCell>
                    <TableCell>{ip.country || '不明'}</TableCell>
                  </TableRow> : null
              ))}
            </TableBody>
            </Table>
         </Paper>
        <Paper style={{ marginTop: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>順位</TableCell>
                <TableCell>回数</TableCell>
                <TableCell>IPアドレス</TableCell>
                <TableCell>国</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ipAddresses.map((ip, index) => (
                  ip.hostname === 'cririn' ? <TableRow key={index}>
                    <TableCell>{ip.rank}</TableCell>
                    <TableCell>{ip.count}</TableCell>
                    <TableCell>{ip.ip_address}</TableCell>
                    <TableCell>{ip.country || '不明'}</TableCell>
                  </TableRow> : null
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
  );
};

export default IndexPage;
