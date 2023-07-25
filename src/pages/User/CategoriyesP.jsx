import { useCallback, useState } from "react";
import { useEffect } from "react";
import { Form, InputGroup, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { limit } from "../../constants";
import { request } from "../../server/Request";

import "./style.scss";

const CategoriyesP = () => {
  const [category, setCategory] = useState({});
  const [allCategory, setAllCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [total, setTotal] = useState(0);
  

  let { _id } = useParams();

  useEffect(() => {
    document.querySelector("head title").textContent = "Categories ";
  });

  const dataCategory = useCallback(async () => {
    setCategoryLoading(true);
    try {
      let { data } = await request(`post/lastone?${_id}`);
      setCategory(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCategoryLoading(false);
    }
  }, [_id]);

  useEffect(() => {
    dataCategory();
  }, [dataCategory]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        setCategoryLoading(true);
        let { data } = await request(
          `category?page=${page}&limit=${limit}&search=${search}`
        );

        let { data: getData } = await request(`category?search=${search}`);
        setTotal(getData.data.length);
        setAllCategory(data.data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setCategoryLoading(false);
      }
    };
    getCategory();
  }, [search, page]);

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  const handlePage = (i) => {
    setPage(i);
  };

  const items = [];
  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    items.push(
      <Pagination.Item
        key={i}
        onClick={() => handlePage(i)}
        active={i === page}
      >
        {i}
      </Pagination.Item>
    );
  }

  let pagination = total > limit && <Pagination>{items}</Pagination>;
  return (
    <div className="container">
      <section>
        <div className="desc ">
          <div className="container"></div>
          <h3>{category?.category?.name}</h3>
          <p className="text">{category?.description}</p>
          <h5>Blog {">" + category?.category?.name} </h5>
        </div>
      </section>
      <section>
        <div className="container">
          <InputGroup className="mt-4 mb-4">
            <Form.Control
              placeholder="Search..."
              onChange={handleSearch}
              value={search}
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
      </section>
      <section>
        <div className="container">
          <ul className="CardContent ">
            {categoryLoading ? (
              <Loading />
            ) : (
              allCategory.map((c) => (
                <li className="card" key={c._id}>
                  <img className="img-fluid" src="/blog.svg" alt="" />
                  <div className="mx-4">
                    <span>{c.name}</span>
                    <h3>Top 6 free website mockup tools 2022</h3>
                    <p>{c.description}</p>
                  </div>
                </li>
              ))
            )}
            {pagination}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CategoriyesP;
