/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlaceHolder from "../loader/PlaceHolder";
import No from "../image/no.png"
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import datePicker from "../datePicker"
import MonthYear from "../MonthYear";
import './style.css'

const BeerTable = () => {

    const [tableData, setTableData] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [dataLoading, setDataLoading] = React.useState(false);

    React.useEffect(() => {
        fetchApi();
    }, [pageNumber]);

    const fetchApi = () => {
        setDataLoading(true);

        // let baseURL = `https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=10`;
        let baseURL = `https://api.punkapi.com/v2/beers?brewed_before=10-2011`;
        axios.get(baseURL).then((response) => {
            if (response.status === 200) {
                setTableData(response.data);
                setDataLoading(false)
                console.log(response.data)
            } else {
                setTableData([]);
                setDataLoading(false)
            }
        });
    };

    if (!tableData) return null;

    const pageClick = (a) => {
        setPageNumber(a);
        console.log(a)
    };

    //pagination

    let active = 1;
    let items = [];
    for (let number = 1; number <= 8; number++) {
        items.push(
            <Pagination.Item onClick={() => pageClick(number)} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }



    return (
        <div className="beer">
            <Container>
                <Row>
                    <Col>
                        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>


                        <div className="">


                            <ButtonGroup aria-label="Basic example">
                                <Button variant="secondary">All</Button>
                                <Button variant="secondary">Brewed before</Button>
                                <Button variant="secondary">Brewed after</Button>
                            </ButtonGroup>

                         <MonthYear />

                        </div>
                        <div className="table-wrapper">

                            <Table responsive="sm" className="data-table" >
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Contributed by</th>
                                        <th>Tag Line</th>
                                        <th>Attenuation level</th>
                                        <th>First brewed

                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {dataLoading ?
                                        <tr>
                                            <td colSpan={6}>
                                                <PlaceHolder />
                                            </td>
                                        </tr> : <>
                                            {tableData.length > 0 ? tableData.map((item) =>
                                                <tr>
                                                    <td>
                                                        <p>{item.id}</p>
                                                    </td>
                                                    <td>
                                                        <p>{item.name}</p>
                                                    </td>
                                                    <td>
                                                        <p>{item.contributed_by}</p>
                                                    </td>
                                                    <td>
                                                        <p>{item.tagline}</p>
                                                    </td>
                                                    <td>
                                                        <p>{item.attenuation_level}</p>
                                                    </td>
                                                    <td>
                                                        <p>{item.first_brewed}</p>
                                                    </td>
                                                </tr>

                                            ) : <>
                                                <img alt="Enniyal" src={No} width="100%" height="50" />
                                                <p>No data</p>
                                            </>
                                            }
                                        </>
                                    }

                                </tbody>
                            </Table>
                        </div>
                        <div className="page-wrapper ">
                            <Pagination className="text-right">{items}</Pagination>
                        </div>

                    </Col>
                </Row>

            </Container>

        </div>
    );
};

export default BeerTable;
