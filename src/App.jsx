import React, { useState, useCallback } from "react";
import { Table, Pagination, Form } from "react-bootstrap";
import useSWR from "swr";
import debounce from 'lodash.debounce';
import "bootstrap/dist/css/bootstrap.css";
import "../public/app.css"

function Page({ index }) {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const debouncedChangeHandler = useCallback(
    debounce(handleFilterChange, 1000)
    , []);

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error } = useSWR(
    `http://localhost:3000/members?page=${index}&filter=${filter}`,
    fetcher
  );

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Form>
        <Form.Control
          type="text"
          placeholder="Filter by name"
          defaultValue={filter}
          onChange={debouncedChangeHandler}
        />
      </Form>
      <Table striped hover>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <div>
                  <div className="d-grid gap-0">
                    <p className="p-row-padding"><b>Name:</b></p>
                    <p className="p-row-padding"><b>Company:</b></p>
                    <p className="p-row-padding"><b>Title:</b></p>
                    <p className="p-row-padding"><b>Department:</b></p>
                  </div>
                </div>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className="p-row-padding">{item.firstName} {item.lastName}</p>
                    <p className="p-row-padding">{item.company}</p>
                    <p className="p-row-padding">{item.title}</p>
                    <p className="p-row-padding">{item.department}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className="p-row-padding"><b>Phone:</b></p>
                    <p className="p-row-padding"><b>Address:</b></p>
                    <p className="p-row-padding">&nbsp;</p>
                    <p className="p-row-padding"><b>Website:</b></p>
                  </div>
                </div>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className="p-row-padding">{item.phone}</p>
                    <p className="p-row-padding">{item.address}</p>
                    <p className="p-row-padding">{item.city}, {item.state} {item.zip}</p>
                    <p className="p-row-padding">{item.url}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <img
                    src={`${item.image}`}
                    alt=''
                    style={{ width: '120px'}}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

function App() {
  const [pageIndex, setPageIndex] = useState(1);
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data: total, error } = useSWR(
    `http://localhost:3000/members/count`,
    fetcher
  )
  if (error) return <div>Failed to load member count</div>;
  if (!total) return <div>Loading...</div>;

  return (
    <div>
      <Page index={pageIndex} />
      <Pagination>
        <Pagination.First onClick={() => setPageIndex(1)} />
        <Pagination.Prev onClick={() => setPageIndex(pageIndex - 1)} />
        <Pagination.Next onClick={() => setPageIndex(pageIndex + 1)} />
        <Pagination.Last onClick={() => setPageIndex(total.count / 5)}/>
      </Pagination>
    </div>
  )
}

export default App;
