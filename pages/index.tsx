import Table from "@/src/Components/TableLayout/Table";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

interface Country {
  name: string;
  flag: string;
}

export default function Home() {
  const [searchQueary, setSearchQueary] = useState<string>("");
  const [countryData, setCountryData] = useState<Array<Country>>([]);
  const [loading, setloading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueary(event.target.value);
  };

  useEffect(() => {
    if (searchQueary) {
      setloading(true);
      const getData = setTimeout(() => {
        axios
          .get(`${process.env.NEXT_PUBLIC_BASE_URL}/name/${searchQueary}`)
          .then((res) => {
            setCountryData(res?.data);
            setloading(false);
          })
          .catch((e) => {
            console.log(e);
            setloading(false);
            setCountryData([]);
          });
      }, 2000);
      return () => clearTimeout(getData);
    } else {
      setloading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/all`)
        .then((res) => {
          setCountryData(res?.data);
          setloading(false);
        })
        .catch((e) => {
          console.log(e);
          setloading(false);
        });
    }
  }, [searchQueary]);

  return (
    <>
      <label className="relative block m-2">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Start Searching..."
          type="text"
          name="search"
          onChange={handleChange}
          ref={inputRef}
        />
      </label>
      <div>
        <Table data={countryData} itemsPerPage={10} loading={loading} />
      </div>
    </>
  );
}
