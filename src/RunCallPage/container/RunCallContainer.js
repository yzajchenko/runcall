import { useEffect, useState } from "react";
import RunCallLayout from "../components/RunCallLayout";
import api from "../../apiConfig";

function RunCallContainer() {
  const [runCall, setRunCall] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [countPage, setCountPage] = useState(1);
  const [search, setSearch] = useState("");
  const [numberPage, setNumberPage] = useState(1);
  const [isInbound, setIsInbound] = useState(false);
  const [sorts, setSorts] = useState("-comment");

  const response = () => {
    setCountPage(Math.ceil(10001 / pageSize));
    api
      .get(
        `GetCallResults?Page=${numberPage}&&PageSize=${pageSize}&&sorts=${sorts}&&filters=isInbound==${isInbound},phone|comment@=${search}`
      )
      .then((resp) => {
        const runCallRes = resp.data;
        const runCallNew = runCallRes.map((item) => {
          const data = new Date(item.dateCreated);
          let month;
          let date;
          let hours;
          let minutes;
          let seconds;
          if (data.getMonth() < 10) {
            month = "0" + data.getMonth();
          } else {
            month = data.getMonth();
          }
          const year = data.getFullYear();

          if (data.getDate() < 10) {
            date = "0" + data.getDate();
          } else {
            date = data.getDate();
          }

          if (data.getHours() < 10) {
            hours = "0" + data.getHours();
          } else {
            hours = data.getHours();
          }

          if (data.getMinutes() < 10) {
            minutes = "0" + data.getMinutes();
          } else {
            minutes = data.getMinutes();
          }

          if (data.getSeconds() < 10) {
            seconds = "0" + data.getSeconds();
          } else {
            seconds = data.getSeconds();
          }
          return {
            ...item,
            dateCreated: `Дата:${date}-${month}-${year} Время:${hours}:${minutes}:${seconds}`,
          };
        });

        setRunCall(runCallNew);
      });
  };

  useEffect(() => {
    response();
  }, [pageSize, numberPage, sorts, search, isInbound]);

  const handleChange = (event) => {
    setPageSize(event.target.value);
  };

  const handleChangeSorts = (event) => {
    setSorts(event.target.value);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeFilters = (event) => {
    setIsInbound(event.target.checked);
  };

  const handleChangeToPage = (event) => {
    const numberPage = event.target.innerText;
    setNumberPage(numberPage);
  };

  return (
    <RunCallLayout
      runCall={runCall}
      handleChangeSorts={handleChangeSorts}
      sorts={sorts}
      countPage={countPage}
      handleChange={handleChange}
      pageSize={pageSize}
      handleChangeToPage={(event) => handleChangeToPage(event)}
      isInbound={isInbound}
      handleChangeFilters={handleChangeFilters}
      handleChangeSearch={handleChangeSearch}
      search={search}
    />
  );
}

export default RunCallContainer;
