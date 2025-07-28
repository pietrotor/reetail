import { useState } from "react";

import { FinixNotice } from "./FinixNotice";
import { PlaidNotice } from "./PlaidNotice";

export const VariableNotice = () => {
  const [selected, setSelected] = useState<"plaid" | "finix">("plaid");
  return (
    <>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="horizontal-list-radio-license"
              type="radio"
              value="plaid"
              name="list-radio"
              checked={selected === "plaid"}
              onChange={() => setSelected("plaid")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="horizontal-list-radio-license"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ACH
            </label>
          </div>
        </li>
        <li className="w-full dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="horizontal-list-radio-passport"
              type="radio"
              value="finix"
              name="list-radio"
              checked={selected === "finix"}
              onChange={() => setSelected("finix")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="horizontal-list-radio-passport"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Credit Card
            </label>
          </div>
        </li>
      </ul>
      <div className="flex flex-col px-[65px]">
        {selected == "plaid" && <PlaidNotice />}
        {selected == "finix" && <FinixNotice />}
      </div>
    </>
  );
};
