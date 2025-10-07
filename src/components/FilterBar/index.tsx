import React, { useState, useEffect } from "react";

import { Dialog, Menu } from "@/components/Base/Headless";
import {
  formatCurrency,
  monthsDate,
  daysDate,
  generateYearsArray,
  calculateCurrentDate,
  booleanOption,
  paidedOption
} from "@/utils/helper";

const yearsDate = generateYearsArray();
const currentYear = calculateCurrentDate().year;
const currentMonth = calculateCurrentDate().month;

import {FormSelect, } from "@/components/Base/Form";


interface FilterProps {
  filter: {
    locationId?: string;
    day?: string;
    month?: string;
    year?: string;
    // mes?: string;
    // ano?: string;
    state?: string;
    wasPaid?: string;
    wasDeleted?: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      locationId?: string;
      day?: string;
      month?: string;
      year?: string;
      state?: string;
      wasPaid?: string;
      wasDeleted?: string;
    }>
  >;
  locations?: { id: string; name: string }[];
  dataList?: { id: string; name: string }[];
  selected?: string;
  typeTextList?: string;
  typeOfList?: string;
  hasDate?: boolean;
  onlyDate?: boolean;
}

export const List: React.FC<FilterProps> = ({
  selected,
  typeTextList,
  filter,
  setFilter,
  dataList,
  locations,
  typeOfList,
}) => {
  return (
    <FormSelect
      className="!box uppercase mr-3"
      onChange={
        (e) =>
          setFilter((prevFilter) => ({
            ...prevFilter,
            ...(typeOfList === "locationId" && { locationId: e.target.value }),
            ...(typeOfList === "day" && { day: e.target.value }),
            ...(typeOfList === "month" && { month: e.target.value }),
            ...(typeOfList === "year" && { year: e.target.value }),
            ...(typeOfList === "wasPaid" && { wasPaid: e.target.value }),
            ...(typeOfList === "wasRemoved" && { wasRemoved: e.target.value }),
          }))
      }
    >
      <option value="" selected>
        {`${typeTextList} `}
      </option>
      {Array.isArray(dataList) &&
        dataList?.map((item, i) => (
          <option
            key={i}
            value={item?.id}
            selected={item?.id === selected && true}
          >
            {item.name}
          </option>
        ))}
    </FormSelect>
  );
};

export const FilterBar: React.FC<FilterProps> = ({
  filter,
  setFilter,
  dataList,
  locations,
  hasDate,
  onlyDate,
}) => {
  return (
    <div className="mt-2">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:flex lg:items-center lg:gap-4">
        {/* Residence List */}
        {/* <pre>onlyDate={JSON.stringify(locations)}</pre> */}
        {/* {(typeof onlyDate !== "undefined" || onlyDate === false) && (
          <div className={`w-full ${hasDate && "lg:w-1/2"}`}>
            <List
              selected={filter.locationId}
              typeTextList={"-SEDES"}
              filter={filter}
              setFilter={setFilter}
              dataList={locations}
              typeOfList="locationId"
              // className="w-full"
            />
          </div>
        )} */}
          <div className="w-full lg:w-1/2 min-w-36">
              <List
                selected={filter.wasPaid}
                typeTextList={"-Pagados-"}
                filter={filter}
                setFilter={setFilter}
                dataList={paidedOption}
                typeOfList="wasPaid"
                
              />
            </div>
          {/* <div className="w-full lg:w-1/2 min-w-36">
              <List
                selected={filter.wasDeleted}
                typeTextList={"-Vigentes-"}
                filter={filter}
                setFilter={setFilter}
                dataList={booleanOption}
                typeOfList="wasDeleted"
                
              />
            </div> */}
        {/* Month and Year container */}
        {hasDate && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-1/2 lg:flex lg:items-center">
            <div className="w-full lg:w-1/2 min-w-36">
              <List
                selected={filter.day}
                typeTextList={"-Todos-"}
                filter={filter}
                setFilter={setFilter}
                dataList={daysDate}
                typeOfList="day"
              />
            </div>
            <div className="w-full lg:w-1/2 min-w-36">
              <List
                selected={filter.month}
                typeTextList={"-Mes-"}
                filter={filter}
                setFilter={setFilter}
                dataList={monthsDate}
                typeOfList="month"
                // className="w-full"
              />
            </div>
            <div className="w-full lg:w-1/2  min-w-20">
              <List
                selected={filter.year}
                typeTextList={"-Año-"}
                filter={filter}
                setFilter={setFilter}
                dataList={yearsDate}
                typeOfList="year"
                // className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
