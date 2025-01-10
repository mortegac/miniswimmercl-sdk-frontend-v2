import React, { useId, useState } from "react";

import CreatableSelect from "react-select/creatable";
import "./style.css";
export interface Option {
  label: string;
  value: string;
}
interface Props {
  isLoading: Boolean;
  fn: (e: any) => void;
  handleCreate: (e: any) => void;
  name: string;
  text?: string;
  value: string;
  list: string[];
}

const ListParams: React.FC<Props> = ({
  list,
  text,
  value,
  isLoading = false,
  fn,
  handleCreate,
  name,
}) => {
  const id = useId();

  const selected: any = list.filter((item: any) => item.value === value);

  return (
    <>
      {/* <pre>{JSON.stringify(list, null, 2)}</pre> */}
      <div className="">
        <CreatableSelect
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              // borderRadius: 9999,
              paddingTop: 3,
              paddingBottom: 3,
              paddingLeft: 6,
              paddingRight: 6,
              // borderColor: state.isFocused ? "grey" : "red",
            }),
          }}
          key={`${useId}-LISTPARAMS`}
          isClearable
          isDisabled={Boolean(isLoading)}
          isLoading={Boolean(isLoading)}
          onChange={(e: any) =>
            fn({
              preventDefault: () => { },
              target: {
                type: "list",
                name: name,
                value: e.value,
              },
            })
          }
          // onChange={(selectedStep01: any) =>
          //   setSelectedStep01(
          //     {
          //       label: String(selectedStep01?.label || ""),
          //       value: selectedStep01?.value || "'",
          //     },
          //     "typeOfVehicle"
          //   )
          // }
          onCreateOption={handleCreate}
          options={list}
          value={selected}
          // value={{ label: text, value: value }}
          // className="text-lg py-0.5 rounded-md "
          className="mr-8 focus:z-10"
        />
      </div>
    </>
  );
};

// export default IconStatus;
// const IconStatus_ = React.memo(IconStatus);
export default ListParams;
